import { Location } from '../types/location';
import defaultLocations from '../data/backups/default_locations.json';

// Use localStorage to persist locations
const getStorageKey = (worldId: string) => `locations_${worldId}`;
const getPreviousStateKey = (worldId: string) => `map_locations_previous_${worldId}`;

const isDefaultLocation = (locationName: string): boolean => {
  const defaultLocs = defaultLocations.locations as Location[];
  return defaultLocs.some(loc => loc.name === locationName);
};

const getStoredLocations = (worldId: string): Location[] => {
  try {
    const stored = localStorage.getItem(getStorageKey(worldId));
    if (stored) {
      return JSON.parse(stored) as Location[];
    }
    
    // If no localStorage entry exists, use default locations
    console.log('No locations found in localStorage, using default locations');
    const defaultLocs = defaultLocations.locations as Location[];
    
    // Save default locations to localStorage
    localStorage.setItem(getStorageKey(worldId), JSON.stringify(defaultLocs));
    return defaultLocs;
  } catch (error) {
    console.error('Error loading locations from storage:', error);
    return defaultLocations.locations as Location[]; // Return default locations as fallback
  }
};

const getPreviousState = (worldId: string): Location[] | null => {
  try {
    const stored = localStorage.getItem(getPreviousStateKey(worldId));
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading previous state from storage:', error);
    return null;
  }
};

const saveToStorage = (worldId: string, locations: Location[]) => {
  try {
    // Save current state as previous before updating
    const currentState = localStorage.getItem(getStorageKey(worldId));
    if (currentState) {
      localStorage.setItem(getPreviousStateKey(worldId), currentState);
    }
    // Save new state
    localStorage.setItem(getStorageKey(worldId), JSON.stringify(locations));
  } catch (error) {
    console.error('Error saving locations to storage:', error);
  }
};

// Initialize locations from storage or defaults
let currentWorldId: string | null = null;
let locations: Location[] = [];
let previousLocations: Location[] | null = null;

export const locationService = {
  initializeWorld: (worldId: string) => {
    if (currentWorldId !== worldId) {
      currentWorldId = worldId;
      locations = getStoredLocations(worldId);
      previousLocations = getPreviousState(worldId);
    }
  },

  getLocations: (worldId: string): Location[] => {
    locationService.initializeWorld(worldId);
    return getStoredLocations(worldId);
  },

  getPreviousLocations: (worldId: string): Location[] | null => {
    return previousLocations ? [...previousLocations] : null;
  },

  saveLocations: (worldId: string, locations: Location[]) => {
    // Save to localStorage
    localStorage.setItem(getStorageKey(worldId), JSON.stringify(locations));
    // Update default_locations.json through the API
    fetch('http://localhost:3001/api/backup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        worldId,
        locations: locations // Save the entire current state
      })
    }).catch(error => {
      console.error('Error updating default locations:', error);
    });
  },

  addLocation: (worldId: string, location: Location): void => {
    locationService.initializeWorld(worldId);
    locations = [...locations, location];
    saveToStorage(worldId, locations);
  },

  updateLocation: (worldId: string, location: Location): void => {
    locationService.initializeWorld(worldId);
    const index = locations.findIndex(loc => loc.name === location.name);
    if (index !== -1) {
      locations = [
        ...locations.slice(0, index),
        location,
        ...locations.slice(index + 1)
      ];
      saveToStorage(worldId, locations);
    }
  },

  deleteLocation: (worldId: string, locationName: string): void => {
    locationService.initializeWorld(worldId);
    locations = locations.filter(loc => loc.name !== locationName);
    saveToStorage(worldId, locations);
  },

  undo: (worldId: string): Location[] | null => {
    locationService.initializeWorld(worldId);
    if (previousLocations) {
      // Swap current and previous states
      const temp = [...locations];
      locations = [...previousLocations];
      previousLocations = temp;
      // Update storage
      localStorage.setItem(getStorageKey(worldId), JSON.stringify(locations));
      localStorage.setItem(getPreviousStateKey(worldId), JSON.stringify(previousLocations));
      return [...locations];
    }
    return null;
  },

  isDefaultLocation: (locationName: string): boolean => {
    return isDefaultLocation(locationName);
  }
}; 