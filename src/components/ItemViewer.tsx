import React, { useState, useEffect, useMemo } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  SelectChangeEvent, 
  InputAdornment, 
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Popover
} from '@mui/material';
import { Search as SearchIcon, FilterList as FilterIcon, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { useBorderColor } from '../hooks/useBorderColor';
import { useWorld } from '../contexts/WorldContext';
import Checkbox from '@mui/material/Checkbox';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { ItemsAPI } from '../api/items';
import type { Item } from '../types/item';

const rarityColors = {
  COMMON: { bg: 'rgba(75, 85, 99, 0.4)', text: 'rgba(209, 213, 219, 1)', border: 'rgba(107, 114, 128, 1)' },
  UNCOMMON: { bg: 'rgba(20, 83, 45, 0.4)', text: 'rgba(134, 239, 172, 1)', border: 'rgba(74, 222, 128, 1)' },
  RARE: { bg: 'rgba(30, 58, 138, 0.4)', text: 'rgba(96, 165, 250, 1)', border: 'rgba(59, 130, 246, 1)' },
  VERY_RARE: { bg: 'rgba(88, 28, 135, 0.4)', text: 'rgba(192, 132, 252, 1)', border: 'rgba(168, 85, 247, 1)' },
  LEGENDARY: { bg: 'rgba(133, 77, 14, 0.4)', text: 'rgba(253, 224, 71, 1)', border: 'rgba(234, 179, 8, 1)' },
};

const ItemViewer: React.FC = () => {
  const { selectedWorld } = useWorld();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRarity, setSelectedRarity] = useState('ALL');
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [anchorPosition, setAnchorPosition] = useState<{ mouseX: number; mouseY: number } | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const borderColor = useBorderColor();
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ key: 'name', direction: 'asc' });

  const categories = ['ALL', 'ARMOR', 'WEAPON', 'ADVENTURING_GEAR', 'TOOLS'];
  const rarities = ['ALL', 'COMMON', 'UNCOMMON', 'RARE', 'VERY_RARE', 'LEGENDARY'];

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleRarityChange = (event: SelectChangeEvent) => {
    setSelectedRarity(event.target.value);
  };

  const handleItemHover = (event: React.MouseEvent<HTMLElement>, item: Item) => {
    setAnchorPosition({ mouseX: event.clientX, mouseY: event.clientY });
    setSelectedItem(item);
  };

  const handleItemLeave = () => {
    setAnchorPosition(null);
    setSelectedItem(null);
  };

  const handleSort = (column: string) => {
    setSortConfig((prev) => {
      if (prev.key === column) {
        return { key: column, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key: column, direction: 'asc' };
    });
  };

  useEffect(() => {
    const loadItems = async () => {
      if (!selectedWorld) {
        setItems([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        let fetchedItems: Item[];

        if (selectedCategory !== 'ALL') {
          fetchedItems = await ItemsAPI.getItemsByCategory(selectedWorld.id, selectedCategory);
        } else if (selectedRarity !== 'ALL') {
          fetchedItems = await ItemsAPI.getItemsByRarity(selectedWorld.id, selectedRarity);
        } else {
          fetchedItems = await ItemsAPI.getItemsByWorldId(selectedWorld.id);
        }

        setItems(fetchedItems);
      } catch (err) {
        console.error('Failed to load items:', err);
        setError('Failed to load items. Please try again later.');
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [selectedWorld, selectedCategory, selectedRarity]);

  const filteredItems = useMemo(() => {
    if (!searchTerm) return items;

    return items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  const sortedItems = useMemo(() => {
    const sorted = [...filteredItems];
    sorted.sort((a, b) => {
      let aValue: any = a[sortConfig.key as keyof Item];
      let bValue: any = b[sortConfig.key as keyof Item];
      
      if (sortConfig.key === 'cost') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else {
        aValue = aValue?.toString().toLowerCase();
        bValue = bValue?.toString().toLowerCase();
      }
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredItems, sortConfig]);

  const formatCost = (cost: number) => {
    const gold = Math.floor(cost / 100);
    const silver = Math.floor((cost % 100) / 10);
    const copper = cost % 10;
    return `${gold > 0 ? gold + ' gp ' : ''}${silver > 0 ? silver + ' sp ' : ''}${copper > 0 ? copper + ' cp' : ''}`.trim();
  };

  if (!selectedWorld) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-400">Please select a world to view items</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-400">Loading items...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      overflow: 'hidden',
      background: 'linear-gradient(to bottom right, #1B0A20, #2D1B36)',
      pt: '80px', // Account for header height
      px: { xs: 2, sm: 3, md: 4 },
    }}>
      <Box sx={{
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2, 
          mb: 4 
        }}>
          <SparklesIcon className="w-8 h-8 text-purple-400" />
          <Typography variant="h4" sx={{ 
            fontWeight: 'bold',
            color: 'white',
          }}>
            Items
          </Typography>
        </Box>

        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            mb: 4, 
            borderRadius: 2,
            bgcolor: 'rgba(31, 41, 55, 0.6)',
            border: `1px solid ${borderColor.borderSecondary}`,
          }}
        >
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <TextField
              fullWidth
              label="Search Items"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.9)' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                flex: 1,
                minWidth: '200px',
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'rgba(17, 24, 39, 0.6)',
                  color: 'white',
                  '& fieldset': {
                    borderColor: borderColor.borderSecondary,
                  },
                  '&:hover fieldset': {
                    borderColor: borderColor.borderPrimary,
                  },
                  '& input': {
                    color: 'white',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.9)',
                },
              }}
            />
            
            <FormControl sx={{ minWidth: '150px' }}>
              <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Category</InputLabel>
              <Select
                value={selectedCategory}
                label="Category"
                onChange={handleCategoryChange}
                sx={{
                  bgcolor: 'rgba(17, 24, 39, 0.4)',
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: borderColor.borderSecondary,
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: borderColor.borderPrimary,
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: borderColor.borderPrimary,
                  },
                  '& .MuiSelect-icon': {
                    color: 'rgba(255, 255, 255, 0.7)',
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: 'rgba(17, 24, 39, 0.98)',
                      color: 'white',
                      '& .MuiMenuItem-root': {
                        bgcolor: 'rgba(17, 24, 39, 0.98)',
                        color: 'white',
                        '&.Mui-selected': {
                          bgcolor: 'rgba(31, 41, 55, 1)',
                          color: 'white',
                        },
                        '&:hover': {
                          bgcolor: 'rgba(31, 41, 55, 1)',
                          color: 'white',
                        },
                      },
                    },
                  },
                }}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat} sx={{ color: 'white' }}>
                    {cat === 'ALL' ? 'All' : cat.charAt(0) + cat.slice(1).toLowerCase().replace('_', ' ')}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl sx={{ minWidth: '150px' }}>
              <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Rarity</InputLabel>
              <Select
                value={selectedRarity}
                label="Rarity"
                onChange={handleRarityChange}
                sx={{
                  bgcolor: 'rgba(17, 24, 39, 0.4)',
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: borderColor.borderSecondary,
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: borderColor.borderPrimary,
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: borderColor.borderPrimary,
                  },
                  '& .MuiSelect-icon': {
                    color: 'rgba(255, 255, 255, 0.7)',
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: 'rgba(17, 24, 39, 0.98)',
                      color: 'white',
                      '& .MuiMenuItem-root': {
                        bgcolor: 'rgba(17, 24, 39, 0.98)',
                        color: 'white',
                        '&.Mui-selected': {
                          bgcolor: 'rgba(31, 41, 55, 1)',
                          color: 'white',
                        },
                        '&:hover': {
                          bgcolor: 'rgba(31, 41, 55, 1)',
                          color: 'white',
                        },
                      },
                    },
                  },
                }}
              >
                {rarities.map((rar) => (
                  <MenuItem key={rar} value={rar} sx={{ color: 'white' }}>
                    {rar === 'ALL' ? 'All' : rar.charAt(0) + rar.slice(1).toLowerCase().replace('_', ' ')}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Paper>

        <TableContainer 
          component={Paper} 
          elevation={0}
          sx={{ 
            bgcolor: 'rgba(31, 41, 55, 0.4)',
            border: `1px solid ${borderColor.borderSecondary}`,
            borderRadius: 2,
            flex: '1 1 auto',
            minHeight: 0,
            maxHeight: 'calc(100vh - 300px)',
            overflow: 'auto',
            mb: 4,
            '& .MuiTable-root': {
              borderCollapse: 'separate',
              borderSpacing: 0,
            },
            '& .MuiTableHead-root': {
              position: 'sticky',
              top: 0,
              zIndex: 1,
              bgcolor: 'rgba(55, 65, 81, 0.8)',
              '& th': {
                borderBottom: `1px solid ${borderColor.borderSecondary}`,
                fontWeight: 'bold',
                textTransform: 'none',
                fontSize: '0.95rem',
                letterSpacing: 0,
                padding: '8px 12px',
                color: 'rgba(255,255,255,0.85)',
                background: 'rgba(55, 65, 81, 0.8)',
              },
            },
          }}
        >
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" sx={{ width: 36, background: 'rgba(55, 65, 81, 0.8)' }} />
                <TableCell>
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none', width: 'fit-content' }}
                    onClick={() => handleSort('name')}
                  >
                    Name
                    {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? <ArrowUpward fontSize="small" sx={{ verticalAlign: 'middle', ml: 0.5 }} /> : <ArrowDownward fontSize="small" sx={{ verticalAlign: 'middle', ml: 0.5 }} />)}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none', width: 'fit-content' }}
                    onClick={() => handleSort('category')}
                  >
                    Category
                    {sortConfig.key === 'category' && (sortConfig.direction === 'asc' ? <ArrowUpward fontSize="small" sx={{ verticalAlign: 'middle', ml: 0.5 }} /> : <ArrowDownward fontSize="small" sx={{ verticalAlign: 'middle', ml: 0.5 }} />)}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none', width: 'fit-content' }}
                    onClick={() => handleSort('rarity')}
                  >
                    Rarity
                    {sortConfig.key === 'rarity' && (sortConfig.direction === 'asc' ? <ArrowUpward fontSize="small" sx={{ verticalAlign: 'middle', ml: 0.5 }} /> : <ArrowDownward fontSize="small" sx={{ verticalAlign: 'middle', ml: 0.5 }} />)}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none', width: 'fit-content' }}
                    onClick={() => handleSort('cost')}
                  >
                    Cost
                    {sortConfig.key === 'cost' && (sortConfig.direction === 'asc' ? <ArrowUpward fontSize="small" sx={{ verticalAlign: 'middle', ml: 0.5 }} /> : <ArrowDownward fontSize="small" sx={{ verticalAlign: 'middle', ml: 0.5 }} />)}
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedItems.map((item) => (
                <TableRow
                  key={item.name}
                  onMouseEnter={(e) => handleItemHover(e, item)}
                  onMouseLeave={handleItemLeave}
                  sx={{ 
                    cursor: 'pointer',
                    height: 44,
                    '&:hover': {
                      bgcolor: 'rgba(75, 85, 99, 0.7)',
                    },
                    '& td': {
                      borderColor: borderColor.borderSecondary,
                      color: 'rgba(255,255,255,0.85)',
                      fontSize: '0.95rem',
                      padding: '8px 12px',
                      verticalAlign: 'middle',
                    },
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox size="small" sx={{ color: 'rgba(120,120,120,0.7)' }} />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        component="img"
                        src={item.image ? `${item.image}` : '/images/items/default.png'}
                        alt={item.name}
                        sx={{ width: 28, height: 28, objectFit: 'contain', mr: 1, borderRadius: 0.5, border: `1px solid ${borderColor.borderSecondary}`, background: 'rgba(31,41,55,0.7)' }}
                      />
                      <Typography sx={{ 
                        color: rarityColors[item.rarity as keyof typeof rarityColors]?.text,
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        lineHeight: 1.2,
                      }}>
                        {item.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{item.category.replace('_', ' ')}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.rarity}
                      size="small"
                      sx={{
                        bgcolor: rarityColors[item.rarity as keyof typeof rarityColors]?.bg,
                        color: rarityColors[item.rarity as keyof typeof rarityColors]?.text,
                        border: `1px solid ${rarityColors[item.rarity as keyof typeof rarityColors]?.border}`,
                        fontWeight: 'bold',
                        height: 22,
                        fontSize: '0.85rem',
                      }}
                    />
                  </TableCell>
                  <TableCell>{formatCost(item.cost)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Popover
          sx={{ pointerEvents: 'none' }}
          open={Boolean(anchorPosition)}
          anchorReference="anchorPosition"
          anchorPosition={anchorPosition ? { top: anchorPosition.mouseY, left: anchorPosition.mouseX } : undefined}
          onClose={handleItemLeave}
          disableRestoreFocus
        >
          {selectedItem && (
            <Paper 
              sx={{ 
                p: 2, 
                maxWidth: 400,
                bgcolor: 'rgba(17, 24, 39, 0.95)',
                border: `1px solid ${borderColor.borderSecondary}`,
                borderRadius: 2,
              }}
            >
              <Box
                component="img"
                src={selectedItem?.image ? selectedItem.image : '/images/items/default.png'}
                alt={selectedItem?.name}
                sx={{
                  width: '100%',
                  height: 140,
                  objectFit: 'contain',
                  bgcolor: 'rgba(31, 41, 55, 0.4)',
                  mb: 2,
                  borderRadius: 1,
                  border: `1px solid ${borderColor.borderSecondary}`,
                }}
              />
              <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                {selectedItem.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
                {selectedItem.description}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {selectedItem.classification && (
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    <strong>Classification:</strong> {selectedItem.classification}
                  </Typography>
                )}
                {selectedItem.armor && (
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    <strong>Armor Class:</strong> {selectedItem.armor.ac}
                  </Typography>
                )}
                {selectedItem.weapon && (
                  <>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      <strong>Damage:</strong> {selectedItem.weapon.damage} {selectedItem.weapon.damage_type}
                    </Typography>
                    {selectedItem.weapon.properties.length > 0 && (
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        <strong>Properties:</strong> {selectedItem.weapon.properties.join(', ')}
                      </Typography>
                    )}
                  </>
                )}
                {selectedItem.gear && (
                  <>
                    {selectedItem.gear.capacity && (
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        <strong>Capacity:</strong> {selectedItem.gear.capacity}
                      </Typography>
                    )}
                    {selectedItem.gear.usage && (
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        <strong>Usage:</strong> {selectedItem.gear.usage}
                      </Typography>
                    )}
                  </>
                )}
                {selectedItem.tools && (
                  <>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      <strong>Type:</strong> {selectedItem.tools.type.replace('_', ' ')}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      <strong>Proficiency:</strong> {selectedItem.tools.proficiency.replace('_', ' ')}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      <strong>Usage:</strong> {selectedItem.tools.usage}
                    </Typography>
                  </>
                )}
              </Box>
            </Paper>
          )}
        </Popover>
      </Box>
    </Box>
  );
};

export default ItemViewer; 