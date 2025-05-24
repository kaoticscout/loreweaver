import { useState, useCallback, useEffect } from 'react';
import { Location, LocationType } from '../types/location';
import { locationService } from '../services/locationService';
import { useWorld } from '../contexts/WorldContext';

export function useLocationManagement() {
  const { selectedWorld } = useWorld();
  const [locations, setLocations] = useState<Location[]>(() => 
    selectedWorld ? locationService.getLocations(selectedWorld.id) : []
  );
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [locationHistory, setLocationHistory] = useState<Location[][]>([]);

  const addLocation = useCallback((name: string, description: string, type: LocationType, x: number, y: number, region?: string) => {
    if (!selectedWorld) {
      console.error('No world selected when trying to add location');
      return;
    }
    
    setLocationHistory(prev => [...prev, locations]);

    // Create a base location object
    const baseLocation = {
      id: `loc-${Date.now()}`,
      name,
      description,
      type,
      coordinates: { x, y },
      region,
      images: [
        '/art/environments/Saltmarsh_1920x1080_WallpaperTemplate.png',
        '/art/environments/dnd_idrfm_wall1_1920.png',
        '/art/environments/1920x1080-terrain-wa.png',
      ]
    };

    // Create the specific location type based on the type parameter
    let newLocation: Location;
    switch (type) {
      case 'Village':
      case 'City':
      case 'Large City':
        newLocation = {
          ...baseLocation,
          type,
          population: 0,
          primaryRaces: [],
          notableFeatures: [],
          services: [],
          localGovernment: ''
        } as Location;
        break;
      case 'Landmark':
        newLocation = {
          ...baseLocation,
          type,
          significance: '',
          history: '',
          notableFeatures: []
        } as Location;
        break;
      case 'Ruins':
        newLocation = {
          ...baseLocation,
          type,
          age: '',
          originalPurpose: '',
          currentState: '',
          dangers: []
        } as Location;
        break;
      case 'Stronghold':
        newLocation = {
          ...baseLocation,
          type,
          owner: '',
          garrison: 0,
          defenses: [],
          notableFeatures: [],
          access: ''
        } as Location;
        break;
      case 'Fort':
        newLocation = {
          ...baseLocation,
          type,
          garrison: 0,
          commander: '',
          defenses: [],
          purpose: '',
          access: ''
        } as Location;
        break;
      case 'Point of Interest':
        newLocation = {
          ...baseLocation,
          type,
          significance: '',
          features: []
        } as Location;
        break;
      case 'Shop':
        newLocation = {
          ...baseLocation,
          type,
          owner: '',
          specialties: [],
          inventory: [],
          services: [],
          hours: ''
        } as Location;
        break;
      case 'Other':
        newLocation = {
          ...baseLocation,
          type,
          customFields: {}
        } as Location;
        break;
      default:
        throw new Error(`Invalid location type: ${type}`);
    }

    // First update the local state
    setLocations(prev => [...prev, newLocation]);
    
    // Then update the service with the world ID
    try {
      locationService.initializeWorld(selectedWorld.id);
      locationService.addLocation(selectedWorld.id, newLocation);
    } catch (error) {
      console.error('Error adding location:', error);
      // Revert the local state if the service update fails
      setLocations(prev => prev.filter(loc => loc.id !== newLocation.id));
      throw error; // Re-throw to let the caller handle the error
    }
  }, [locations, selectedWorld]);

  const updateLocation = useCallback((location: Location) => {
    if (!selectedWorld) return;
    
    setLocationHistory(prev => [...prev, locations]);
    setLocations(prev => prev.map(loc => 
      loc.name === location.name ? {
        ...location,
        images: location.images || [
          '/art/environments/Saltmarsh_1920x1080_WallpaperTemplate.png',
          '/art/environments/dnd_idrfm_wall1_1920.png',
          '/art/environments/1920x1080-terrain-wa.png',
        ]
      } : loc
    ));
    locationService.updateLocation(selectedWorld.id, location);
  }, [locations, selectedWorld]);

  const deleteLocation = useCallback((id: string) => {
    if (!selectedWorld) return;
    
    setLocationHistory(prev => [...prev, locations]);
    setLocations(prev => prev.filter(loc => loc.id !== id));
    locationService.deleteLocation(selectedWorld.id, id);
  }, [locations, selectedWorld]);

  const selectLocation = useCallback((name: string | null) => {
    setSelectedLocation(name);
  }, []);

  const setHovered = useCallback((name: string | null) => {
    setHoveredLocation(name);
  }, []);

  const toggleEditMode = useCallback(() => {
    setIsEditMode(prev => !prev);
  }, []);

  const saveLocations = useCallback(() => {
    if (!selectedWorld) return;
    locationService.saveLocations(selectedWorld.id, locations);
    setLocationHistory([]); // Clear history after saving
  }, [locations, selectedWorld]);

  const undoLocations = useCallback(() => {
    if (!selectedWorld) return false;
    
    if (locationHistory.length > 0) {
      const previousState = locationHistory[locationHistory.length - 1];
      setLocations(previousState);
      setLocationHistory(prev => prev.slice(0, -1));
      return true;
    }
    return false;
  }, [locationHistory, selectedWorld]);

  // Update locations when world changes
  useEffect(() => {
    if (selectedWorld) {
      const worldLocations = locationService.getLocations(selectedWorld.id);
      setLocations(worldLocations);
      setLocationHistory([]);
    } else {
      setLocations([]);
      setLocationHistory([]);
    }
  }, [selectedWorld]);

  return {
    locations,
    selectedLocation,
    hoveredLocation,
    isEditMode,
    addLocation,
    updateLocation,
    deleteLocation,
    selectLocation,
    setHovered,
    toggleEditMode,
    saveLocations,
    undoLocations,
    setLocations,
    setLocationHistory
  };
} 