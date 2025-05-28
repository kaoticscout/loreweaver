import { useState, useCallback, useEffect } from 'react';
import { Location, LocationType } from '../types/location';
import { locationService } from '../services/locationService';
import { useWorld } from '../contexts/WorldContext';

interface LocationWithImages extends Omit<Location, 'type'> {
  type: LocationType;
  images?: string[];
  // City-specific fields
  basicInformation?: {
    population: string;
    primaryRaces: string[];
    deities: any[];
  };
  economy?: {
    primaryIndustry?: string;
    gdp?: string;
    currency?: string;
    tradeGoods?: string[];
    tradePartners?: string[];
    transportationRoutes?: string[];
    economicPolicies?: string[];
    marketRegulations?: string[];
  };
  cityHistory?: {
    founding: string;
    majorEvents: string[];
    currentEra: string;
  };
  keyFigures?: any[];
  dungeons?: any[];
  pointsOfInterest?: any[];
  restAreas?: any[];
  shops?: any[];
  biography?: string;
}

export function useLocationManagement() {
  const { selectedWorld } = useWorld();
  const [locations, setLocations] = useState<LocationWithImages[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [locationHistory, setLocationHistory] = useState<LocationWithImages[][]>([]);

  // Load locations when world changes
  useEffect(() => {
    if (selectedWorld) {
      locationService.getLocations(selectedWorld.id)
        .then(fetchedLocations => {
          setLocations(fetchedLocations);
          setLocationHistory([]);
        })
        .catch(error => {
          console.error('Error loading locations:', error);
          setLocations([]);
        });
    } else {
      setLocations([]);
      setLocationHistory([]);
    }
  }, [selectedWorld]);

  const addLocation = useCallback(async (name: string, description: string, type: LocationType, x: number, y: number, region?: string) => {
    if (!selectedWorld) {
      console.error('No world selected when trying to add location');
      return;
    }
    
    setLocationHistory(prev => [...prev, locations]);

    // Create a base location object
    const baseLocation = {
      id: `loc-${Date.now()}`,
      worldId: selectedWorld.id,
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
    let newLocation: LocationWithImages;
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
          localGovernment: '',
          history: '',
          basicInformation: {
            population: '0',
            primaryRaces: [],
            deities: []
          },
          economy: {
            primaryIndustry: '',
            gdp: '',
            currency: '',
            tradeGoods: [],
            tradePartners: [],
            transportationRoutes: [],
            economicPolicies: [],
            marketRegulations: []
          },
          keyFigures: [],
          dungeons: [],
          pointsOfInterest: [],
          restAreas: [],
          shops: [],
          biography: ''
        } as LocationWithImages;
        break;
      case 'Landmark':
        newLocation = {
          ...baseLocation,
          type,
          significance: '',
          history: '',
          notableFeatures: []
        };
        break;
      case 'Ruins':
        newLocation = {
          ...baseLocation,
          type,
          age: '',
          originalPurpose: '',
          currentState: '',
          dangers: []
        };
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
        };
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
        };
        break;
      case 'Point of Interest':
        newLocation = {
          ...baseLocation,
          type,
          significance: '',
          features: []
        };
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
        };
        break;
      case 'Other':
        newLocation = {
          ...baseLocation,
          type,
          customFields: {}
        };
        break;
      default:
        throw new Error(`Invalid location type: ${type}`);
    }

    try {
      // First update the database
      await locationService.addLocation(newLocation);
      // Then update the local state
      setLocations(prev => [...prev, newLocation]);
    } catch (error) {
      console.error('Error adding location:', error);
      throw error;
    }
  }, [locations, selectedWorld]);

  const updateLocation = useCallback(async (location: LocationWithImages) => {
    if (!selectedWorld) return;
    
    setLocationHistory(prev => [...prev, locations]);
    try {
      // First update the database
      await locationService.updateLocation(location.id, location);
      // Then update the local state
      setLocations(prev => prev.map(loc => 
        loc.id === location.id ? {
          ...location,
          images: location.images || [
            '/art/environments/Saltmarsh_1920x1080_WallpaperTemplate.png',
            '/art/environments/dnd_idrfm_wall1_1920.png',
            '/art/environments/1920x1080-terrain-wa.png',
          ]
        } : loc
      ));
    } catch (error) {
      console.error('Error updating location:', error);
      throw error;
    }
  }, [locations, selectedWorld]);

  const deleteLocation = useCallback(async (id: string) => {
    if (!selectedWorld) return;
    
    setLocationHistory(prev => [...prev, locations]);
    try {
      // First update the database
      await locationService.deleteLocation(id);
      // Then update the local state
      setLocations(prev => prev.filter(loc => loc.id !== id));
    } catch (error) {
      console.error('Error deleting location:', error);
      throw error;
    }
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
    setLocations,
    setLocationHistory
  };
} 