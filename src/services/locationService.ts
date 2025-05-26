import { Location } from '../types/location';
import { DatabaseService } from './database';

export const locationService = {
  getLocations: async (worldId: string): Promise<Location[]> => {
    try {
      const locations = await DatabaseService.getAllLocations();
      return locations.filter(location => location.worldId === worldId);
    } catch (error) {
      console.error('Error fetching locations:', error);
      return [];
    }
  },

  addLocation: async (location: Location): Promise<void> => {
    try {
      await DatabaseService.createLocation(location);
    } catch (error) {
      console.error('Error adding location:', error);
      throw error;
    }
  },

  updateLocation: async (id: string, location: Partial<Location>): Promise<void> => {
    try {
      await DatabaseService.updateLocation(id, location);
    } catch (error) {
      console.error('Error updating location:', error);
      throw error;
    }
  },

  deleteLocation: async (id: string): Promise<void> => {
    try {
      await DatabaseService.deleteLocation(id);
    } catch (error) {
      console.error('Error deleting location:', error);
      throw error;
    }
  }
}; 