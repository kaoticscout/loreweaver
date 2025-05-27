import { Location } from '../types/location';

export const locationService = {
  getLocations: async (worldId: string): Promise<Location[]> => {
    try {
      const response = await fetch(`http://localhost:3001/api/worlds/${worldId}/locations`);
      if (!response.ok) {
        throw new Error('Failed to fetch locations');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching locations:', error);
      throw error;
    }
  },

  addLocation: async (location: Location): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:3001/api/locations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(location),
      });
      if (!response.ok) {
        throw new Error('Failed to add location');
      }
    } catch (error) {
      console.error('Error adding location:', error);
      throw error;
    }
  },

  updateLocation: async (id: string, location: Partial<Location>): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:3001/api/locations/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(location),
      });
      if (!response.ok) {
        throw new Error('Failed to update location');
      }
    } catch (error) {
      console.error('Error updating location:', error);
      throw error;
    }
  },

  deleteLocation: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:3001/api/locations/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete location');
      }
    } catch (error) {
      console.error('Error deleting location:', error);
      throw error;
    }
  }
}; 