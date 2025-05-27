import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Region } from '../types/region';
import { Location } from '../types/location';
import { Dungeon, DungeonEncounter, DungeonTreasure } from '../types/dungeon';
import { WorldView } from './WorldView';

interface WorldRouterProps {
  regions: Region[];
  onAddRegion: (name: string, description: string) => void;
  onAddCity: (regionId: string, name: string, description: string) => void;
  lastAddedId: string | null;
  onDungeonSelect?: (dungeonId: string | null) => void;
}

export default function WorldRouter({ regions, onAddRegion, onAddCity, lastAddedId, onDungeonSelect }: WorldRouterProps) {
  const { regionId, cityId, locationId, dungeonId } = useParams();
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedDungeon, setSelectedDungeon] = useState<Dungeon | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [notification, setNotification] = useState<{ 
    open: boolean; 
    message: string; 
    severity: 'success' | 'error' 
  }>({ 
    open: false, 
    message: '', 
    severity: 'success' 
  });

  useEffect(() => {
    if (regionId) {
      const region = regions.find((r) => r.id === regionId) || null;
      setSelectedRegion(region);
      if (region) {
        if (cityId) {
          const city = region.locations?.find((l) => l.id === cityId && (l.type === 'City' || l.type === 'Large City')) || null;
          setSelectedLocation(city);
          if (city && dungeonId) {
            // Convert the location dungeon to the full Dungeon type
            const locationDungeon = city.dungeons?.find((d) => d.id === dungeonId);
            if (locationDungeon) {
              const fullDungeon: Dungeon = {
                id: locationDungeon.id,
                name: locationDungeon.name,
                description: locationDungeon.description,
                level: locationDungeon.level,
                difficulty: 'Medium', // Default value
                challengeRating: 1, // Default value
                location: {
                  region: region.id,
                  environment: locationDungeon.environment
                },
                inhabitants: [],
                treasures: locationDungeon.treasures,
                hazards: locationDungeon.traps,
                history: '',
                encounters: [],
                treasure: []
              };
              setSelectedDungeon(fullDungeon);
            } else {
              setSelectedDungeon(null);
            }
          } else {
            setSelectedDungeon(null);
          }
        } else if (locationId) {
          // Find the location in the region's locations
          const location = region.locations?.find((l) => l.id === locationId) || null;
          setSelectedLocation(location);
          setSelectedDungeon(null);
        } else {
          setSelectedLocation(null);
          setSelectedDungeon(null);
        }
      }
    } else {
      setSelectedRegion(null);
      setSelectedLocation(null);
      setSelectedDungeon(null);
    }
  }, [regionId, cityId, locationId, dungeonId, regions]);

  const handleRegionSelect = (region: Region | null) => {
    if (region) {
      navigate(`/world/${region.id}`);
    } else {
      navigate('/world');
    }
  };

  const handleLocationSelect = (location: Location | null) => {
    if (location) {
      const parentRegion = regions.find(region => 
        region.locations?.some(l => l.id === location.id)
      );
      if (parentRegion) {
        // Check if it's a city by looking at the type field
        const isCity = location.type === 'City' || location.type === 'Large City';
        const path = isCity ? 'city' : 'location';
        navigate(`/world/${parentRegion.id}/${path}/${location.id}`);
      } else if (selectedRegion && selectedRegion.id) {
        const isCity = location.type === 'City' || location.type === 'Large City';
        const path = isCity ? 'city' : 'location';
        navigate(`/world/${selectedRegion.id}/${path}/${location.id}`);
      }
    }
  };

  const handleDungeonSelect = (dungeonId: string | null) => {
    if (dungeonId === null) {
      navigate(`/world/${selectedRegion?.id}/city/${selectedLocation?.id}`);
    } else if (selectedLocation) {
      navigate(`/world/${selectedRegion?.id}/city/${selectedLocation.id}/dungeon/${dungeonId}`);
    }
  };

  const handleBack = () => {
    if (selectedDungeon) {
      navigate(`/world/${selectedRegion?.id}/city/${selectedLocation?.id}`);
    } else if (selectedLocation) {
      navigate(`/world/${selectedRegion?.id}`);
    } else if (selectedRegion) {
      navigate('/world');
    }
  };

  const handleHome = () => {
    navigate('/world');
  };

  const handleLocationDrag = async (location: Location, newX: number, newY: number) => {
    // Update the location in the current state
    setLocations(prev => prev.map(loc => 
      loc.id === location.id ? {
        ...location,
        coordinates: {
          x: newX,
          y: newY
        }
      } : loc
    ));

    setNotification({
      open: true,
      message: 'Location position updated. Click Save to confirm changes.',
      severity: 'success'
    });
  };

  const handleAddDungeon = (cityId: string) => {
    // Handle adding a dungeon
  };

  const handleDungeonClose = () => {
    handleLocationSelect(null);
    handleRegionSelect(null);
  };

  return (
    <WorldView
      regions={regions}
      onRegionSelect={handleRegionSelect}
      onAddRegion={onAddRegion}
      onAddCity={onAddCity}
      selectedRegion={selectedRegion}
      selectedLocation={selectedLocation}
      onLocationSelect={handleLocationSelect}
      onBack={handleBack}
      onHome={handleHome}
      lastAddedId={lastAddedId}
      selectedDungeon={selectedDungeon}
      onDungeonSelect={handleDungeonSelect}
    />
  );
} 