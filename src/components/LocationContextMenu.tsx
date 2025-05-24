import { Menu, MenuItem } from '@mui/material';
import { LocationType } from '../types/location';
import { getLocationIcon } from '../utils/locationIcons';

interface LocationContextMenuProps {
  open: boolean;
  position: { x: number; y: number } | null;
  onClose: () => void;
  onLocationTypeSelect: (type: LocationType) => void;
}

export function LocationContextMenu({
  open,
  position,
  onClose,
  onLocationTypeSelect
}: LocationContextMenuProps) {
  const locationTypes: { type: LocationType; label: string }[] = [
    { type: 'City', label: 'Add City' },
    { type: 'Large City', label: 'Add Large City' },
    { type: 'Village', label: 'Add Village' },
    { type: 'Landmark', label: 'Add Landmark' },
    { type: 'Ruins', label: 'Add Ruins' },
    { type: 'Stronghold', label: 'Add Stronghold' },
    { type: 'Fort', label: 'Add Fort' },
    { type: 'Point of Interest', label: 'Add Point of Interest' },
    { type: 'Shop', label: 'Add Shop' }
  ];

  return (
    <Menu
      open={open}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={
        position
          ? { top: position.y, left: position.x }
          : undefined
      }
    >
      {locationTypes.map(({ type, label }) => (
        <MenuItem 
          key={type}
          onClick={() => onLocationTypeSelect(type)}
          className="flex items-center gap-2"
        >
          {getLocationIcon(type, "h-5 w-5")}
          {label}
        </MenuItem>
      ))}
    </Menu>
  );
} 