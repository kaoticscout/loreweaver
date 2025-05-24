import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Region } from '../types/region';
import { City, Dungeon } from '../types/city';
import { Location } from '../types/location';
import { WorldView } from './WorldView';

interface WorldRouterProps {
  regions: Region[];
  onAddRegion: (name: string, description: string) => void;
  onAddCity: (regionId: string, name: string, description: string) => void;
  lastAddedId: string | null;
}

export default function WorldRouter({ regions, onAddRegion, onAddCity, lastAddedId }: WorldRouterProps) {
  const { regionId, cityId, locationId, dungeonId } = useParams();
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<City | Location | null>(null);
  const [selectedDungeon, setSelectedDungeon] = useState<Dungeon | null>(null);

  useEffect(() => {
    if (regionId) {
      const region = regions.find((r) => r.id === regionId) || null;
      setSelectedRegion(region);
      if (region) {
        if (cityId) {
          const city = region.cities.find((c) => c.id === cityId) || null;
          setSelectedLocation(city);
          if (city && dungeonId) {
            const dungeon = city.dungeons.find((d) => d.id === dungeonId) || null;
            setSelectedDungeon(dungeon);
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

  const handleLocationSelect = (location: City | Location | null) => {
    if (location) {
      const parentRegion = regions.find(region => 
        region.cities.some(c => c.id === location.id) || 
        region.locations?.some(l => l.id === location.id)
      );
      if (parentRegion) {
        // Check if it's a city by looking for the coordinates property
        const isCity = 'coordinates' in location && Array.isArray(location.coordinates);
        const path = isCity ? 'city' : 'location';
        navigate(`/world/${parentRegion.id}/${path}/${location.id}`);
      } else if (selectedRegion && selectedRegion.id) {
        const isCity = 'coordinates' in location && Array.isArray(location.coordinates);
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