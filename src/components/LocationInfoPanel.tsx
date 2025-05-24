import { Location } from '../types/location';
import { Paper, Box, Typography, Button, IconButton } from '@mui/material';
import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';
import { getLocationIcon } from '../utils/locationIcons';

interface LocationInfoPanelProps {
  location: Location;
  isEditMode: boolean;
  onClose: () => void;
  onDelete?: (location: Location) => void;
  onSelect: (location: Location) => void;
}

export function LocationInfoPanel({
  location,
  isEditMode,
  onClose,
  onDelete,
  onSelect
}: LocationInfoPanelProps) {
  return (
    <Paper className="absolute top-4 right-4 z-40 w-[300px] bg-black/90 rounded overflow-hidden border border-white/20">
      <Box className="p-2 border-b border-white/10 flex items-center gap-1 relative">
        {getLocationIcon(location.type, "h-5 w-5 text-white")}
        <Typography className="font-bold text-white text-base">
          {location.name}
        </Typography>
        {isEditMode && onDelete && (
          <IconButton
            onClick={() => onDelete(location)}
            className="absolute right-8 top-1/2 -translate-y-1/2 text-red-500 p-1 hover:bg-red-500/10"
          >
            <TrashIcon className="h-5 w-5" />
          </IconButton>
        )}
        <IconButton
          onClick={onClose}
          className="absolute right-1 top-1/2 -translate-y-1/2 text-white/80 p-1 hover:bg-white/10"
        >
          <XMarkIcon className="h-5 w-5" />
        </IconButton>
      </Box>
      <Box className="p-2">
        <Typography className="text-white/80 mb-2 text-sm leading-relaxed">
          {location.description}
        </Typography>
        <Box className="flex gap-1 justify-end">
          <Button
            onClick={onClose}
            className="text-[#F5F5DC] hover:bg-[#F5F5DC]/10"
          >
            Close
          </Button>
          <Button
            onClick={() => {
              onSelect(location);
              onClose();
            }}
            className="bg-[#F5F5DC] text-black hover:bg-[#F5F5DC]/80"
          >
            View Details
          </Button>
        </Box>
      </Box>
    </Paper>
  );
} 