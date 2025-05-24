import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, TextField, Button } from '@mui/material';
import { Location, LocationType } from '../types/location';

interface NewLocationDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (location: Omit<Location, 'x' | 'y'> & { x: number; y: number }) => void;
  x: number;
  y: number;
  type: LocationType;
}

export function NewLocationDialog({
  open,
  onClose,
  onSave,
  x,
  y,
  type
}: NewLocationDialogProps) {
  const [newLocation, setNewLocation] = useState({
    name: '',
    description: '',
    type
  });

  const handleSave = () => {
    if (!newLocation.name || !newLocation.description) return;

    onSave({
      ...newLocation,
      x,
      y
    });

    setNewLocation({
      name: '',
      description: '',
      type
    });
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{
        className: "bg-[#1a1a1a]"
      }}
    >
      <DialogTitle>Add New Location</DialogTitle>
      <DialogContent>
        <Box className="flex flex-col gap-2 mt-2">
          <TextField
            label="Location Name"
            value={newLocation.name}
            onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
            fullWidth
            className="[&_.MuiInputBase-input]:text-[#F5F5DC] [&_.MuiInputLabel-root]:text-[#F5F5DC]"
          />
          <TextField
            label="Description"
            value={newLocation.description}
            onChange={(e) => setNewLocation({ ...newLocation, description: e.target.value })}
            multiline
            rows={4}
            fullWidth
            className="[&_.MuiInputBase-input]:text-[#F5F5DC] [&_.MuiInputLabel-root]:text-[#F5F5DC]"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} className="text-[#F5F5DC]">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
} 