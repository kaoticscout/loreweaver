import { Location } from '../types/location';
import { locationService } from '../services/locationService';
import { useWorld } from '../contexts/WorldContext';

export const backupLocations = async (worldId: string) => {
  // Get current locations from localStorage
  const currentLocations = locationService.getLocations(worldId);
  
  // Create the backup file content
  const backupContent = JSON.stringify({
    timestamp: new Date().toISOString(),
    worldId,
    locations: currentLocations
  }, null, 2);

  try {
    // Send a POST request to update the server-side file
    const response = await fetch('http://localhost:3001/api/backup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: backupContent
    });

    if (!response.ok) {
      throw new Error('Failed to update server backup');
    }

    return true;
  } catch (error) {
    console.error('Error creating backup:', error);
    return false;
  }
};

export const restoreFromBackup = async (worldId: string) => {
  try {
    // Create file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    // Wait for file selection
    const file = await new Promise<File>((resolve) => {
      input.onchange = (e) => {
        const files = (e.target as HTMLInputElement).files;
        if (files && files[0]) {
          resolve(files[0]);
        }
      };
      input.click();
    });
    
    // Read file content
    const content = await file.text();
    const backupData = JSON.parse(content);
    
    if (!backupData.locations || !Array.isArray(backupData.locations)) {
      throw new Error('Invalid backup file format');
    }

    // Verify the backup is for the correct world
    if (backupData.worldId && backupData.worldId !== worldId) {
      throw new Error('Backup file is from a different world');
    }
    
    // Save the locations to localStorage
    locationService.saveLocations(worldId, backupData.locations);
    
    return true;
  } catch (error) {
    console.error('Error restoring from backup:', error);
    return false;
  }
}; 