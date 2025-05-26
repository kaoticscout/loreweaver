import { useRef, useState, useEffect, useCallback } from 'react'
import { Region } from '../types/region'
import { City } from '../types/city'
import { Location, LocationType, Road } from '../types/location'
import { useLocationManagement } from '../hooks/useLocationManagement'
import { useMapControl, MIN_ZOOM, MAX_ZOOM, ZOOM_STEP } from '../hooks/useMapControl'
import { locationService } from '../services/locationService'
import { LocationInfoPanel } from './LocationInfoPanel'
import { LocationContextMenu } from './LocationContextMenu'
import { NewLocationDialog } from './NewLocationDialog'
import { ExplorerPanel } from './ExplorerPanel'
import { WelcomePanel } from './WelcomePanel'
import { DungeonView } from './DungeonView'
import { LocationView } from './LocationView'

import { useBorderColor } from '../hooks/useBorderColor'

import { RegionView } from './RegionView'
import { CityView } from './CityView'
import { Switch, FormControlLabel, IconButton, Alert, Snackbar, Box, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography, InputLabel, FormControl, Select, Divider } from '@mui/material'
import {
  PlusIcon,
  MinusIcon,
  ArrowPathIcon,
  HomeIcon,
  BuildingLibraryIcon,
  TrashIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  BuildingStorefrontIcon,
  FlagIcon,
  SparklesIcon,
  ShieldExclamationIcon,
  PencilIcon,
  ChevronRightIcon,
  ChevronLeftIcon
} from '@heroicons/react/24/outline'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import SaveIcon from '@mui/icons-material/Save'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import { backupLocations, restoreFromBackup } from '../utils/backupUtils'
import { useNavigate } from 'react-router-dom'
import { useWorld } from '../contexts/WorldContext'
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap'
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap'
import { v4 as uuidv4 } from 'uuid'
import { Dungeon } from '../types/dungeon'


interface WorldViewProps {
  regions: Region[]
  onRegionSelect: (region: Region | null) => void
  onAddRegion: (name: string, description: string) => void
  onAddCity: (regionId: string, name: string, description: string) => void
  selectedRegion: Region | null
  selectedLocation: City | Location | null
  onLocationSelect: (location: City | Location | null) => void
  onBack: () => void
  onHome: () => void
  lastAddedId: string | null
  selectedDungeon?: Dungeon | null
  onDungeonSelect?: (dungeonId: string | null) => void
}

export function WorldView({
  regions,
  onRegionSelect,
  onAddRegion,
  onAddCity,
  selectedRegion,
  selectedLocation,
  onLocationSelect,
  onBack,
  onHome,
  lastAddedId,
  selectedDungeon: selectedDungeonProp,
  onDungeonSelect
}: WorldViewProps) {
  const { selectedWorld } = useWorld();
  const borderColor = useBorderColor();
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 })
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageNaturalSize, setImageNaturalSize] = useState({ width: 0, height: 0 })
  const [visibleLocationTypes, setVisibleLocationTypes] = useState<Set<LocationType>>(
    new Set(['City', 'Large City', 'Village', 'Landmark', 'Ruins', 'Stronghold', 'Fort', 'Point of Interest', 'Shop'])
  )
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
    mapX: number;
    mapY: number;
    locationToDelete?: Location;
  } | null>(null)
  const [newLocationDialog, setNewLocationDialog] = useState(false)
  const [newLocation, setNewLocation] = useState<{
    name: string;
    description: string;
    type: LocationType;
    x: number;
    y: number;
    region?: string;
  }>({
    name: '',
    description: '',
    type: 'City',
    x: 0,
    y: 0,
    region: undefined
  })
  const [notification, setNotification] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success'
  })
  const [imageError, setImageError] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [draggedLocation, setDraggedLocation] = useState<{
    name: string;
    initialX: number;
    initialY: number;
    startX: number;
    startY: number;
  } | null>(null);
  const [isLegendExpanded, setIsLegendExpanded] = useState(true);
  const [editLocationDialog, setEditLocationDialog] = useState(false);
  const [expandedRegions, setExpandedRegions] = useState<Record<string, boolean>>({});
  const [isExplorerVisible, setIsExplorerVisible] = useState(true);
  const [editingLocation, setEditingLocation] = useState<{
    name: string;
    description: string;
    type: LocationType;
    x: number;
    y: number;
    region?: string;
    originalName: string;
  } | null>(null);
  const [roads, setRoads] = useState<Road[]>([]);
  const [roadCreationState, setRoadCreationState] = useState<{
    isCreating: boolean;
    startLocation: Location | null;
    currentPoint: { x: number; y: number } | null;
    type: 'Major' | 'Minor' | 'Path';
    waypoints: Array<{ id: string; x: number; y: number }>;
    isWaypointMode: boolean; // New flag to indicate if we're in waypoint mode
  }>({
    isCreating: false,
    startLocation: null,
    currentPoint: null,
    type: 'Major',
    waypoints: [],
    isWaypointMode: false
  });
  const [roadPopup, setRoadPopup] = useState<{
    road: Road;
    x: number;
    y: number;
  } | null>(null);

  const {
    locations,
    selectedLocation: selectedLocationId,
    hoveredLocation,
    isEditMode: locationEditMode,
    addLocation,
    updateLocation,
    deleteLocation,
    selectLocation,
    setHovered,
    toggleEditMode,
    setLocations,
    setLocationHistory
  } = useLocationManagement();

  const {
    zoom,
    pan,
    isDragging,
    dragStart,
    handleWheel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    zoomIn,
    zoomOut,
    setPan,
    setIsDragging,
    setDragStart,
    setZoomValue
  } = useMapControl()

  const [isAddingCity, setIsAddingCity] = useState(false)
  const [isAddingRegion, setIsAddingRegion] = useState(false)

  useEffect(() => {
    const updateDimensions = () => {
      if (mapContainerRef.current) {
        const { width, height } = mapContainerRef.current.getBoundingClientRect()
        setMapDimensions({ width, height })

        // Recenter the map if image is loaded
        if (imageLoaded && imageNaturalSize.width > 0 && imageNaturalSize.height > 0) {
          // Calculate the base scale to fit the image in the container
          const baseScale = Math.min(
            width / imageNaturalSize.width,
            height / imageNaturalSize.height
          )

          // Calculate the scaled dimensions of the image
          const scaledWidth = imageNaturalSize.width * baseScale
          const scaledHeight = imageNaturalSize.height * baseScale

          // Calculate the pan values to center the image
          const panX = (width - scaledWidth) / 2
          const panY = (height - scaledHeight) / 2

          setPan({ x: panX, y: panY })
        }
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [imageLoaded, imageNaturalSize])

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement
    setImageNaturalSize({
      width: img.naturalWidth,
      height: img.naturalHeight
    })
    setImageLoaded(true)

    // Calculate the base scale to fit the image in the container
    const baseScale = Math.min(
      mapDimensions.width / img.naturalWidth,
      mapDimensions.height / img.naturalHeight
    )

    // Calculate the scaled dimensions of the image
    const scaledWidth = img.naturalWidth * baseScale
    const scaledHeight = img.naturalHeight * baseScale

    // Calculate the pan values to center the image
    const panX = (mapDimensions.width - scaledWidth) / 2
    const panY = (mapDimensions.height - scaledHeight) / 2

    setPan({ x: panX, y: panY })
  }

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    
    const rect = mapContainerRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Calculate the base scale of the image to fit the container
    const baseScale = Math.min(
      mapDimensions.width / imageNaturalSize.width,
      mapDimensions.height / imageNaturalSize.height
    );

    // Calculate the scaled dimensions of the image
    const scaledWidth = imageNaturalSize.width * baseScale;
    const scaledHeight = imageNaturalSize.height * baseScale;

    // Calculate the padding to center the image
    const imageLeft = (mapDimensions.width - scaledWidth) / 2;
    const imageTop = (mapDimensions.height - scaledHeight) / 2;

    // Get click position relative to container
    const containerX = event.clientX - rect.left;
    const containerY = event.clientY - rect.top;

    // Calculate position relative to the image origin, accounting for pan and zoom
    const imageX = ((containerX - pan.x) / zoom - imageLeft) / baseScale;
    const imageY = ((containerY - pan.y) / zoom - imageTop) / baseScale;

    // Ensure coordinates are within image bounds
    const boundedX = Math.max(0, Math.min(imageNaturalSize.width, imageX));
    const boundedY = Math.max(0, Math.min(imageNaturalSize.height, imageY));

    // Check if click hit any location marker
    const clickedLocation = locations.find(location => {
      if (!location.coordinates || !visibleLocationTypes.has(location.type)) return false;
      
      const markerX = location.coordinates.x;
      const markerY = location.coordinates.y;
      const size = getLocationSize(location.type);
      
      // Calculate hit box (make it slightly larger than the marker for easier clicking)
      const hitBoxSize = Math.max(size.width, size.height) * 1.5;
      const halfHitBox = hitBoxSize / 2;
      
      // Check if click is within hit box
      const hitX = Math.abs(markerX - boundedX) <= halfHitBox;
      const hitY = Math.abs(markerY - boundedY) <= halfHitBox;
      
      if (hitX && hitY) {
        console.log('[Debug] Right-click hit location marker:', {
          locationName: location.name,
          locationType: location.type,
          clickCoords: { x: boundedX, y: boundedY },
          markerCoords: { x: markerX, y: markerY },
          hitBoxSize
        });
        return true;
      }
      return false;
    });

    // Don't show context menu if we're creating a road
    if (roadCreationState.isCreating) {
      return;
    }
    
    if (!isEditMode) return;

    // Set context menu position using screen coordinates
    setContextMenu({
      mouseX: event.clientX,
      mouseY: event.clientY,
      mapX: boundedX,
      mapY: boundedY
    });
  };

  const handleMarkerContextMenu = (event: React.MouseEvent, location: Location) => {
    event.preventDefault();
    event.stopPropagation();
    
    // If we're creating a road, complete it by connecting to this location
    if (roadCreationState.isCreating && roadCreationState.startLocation) {
      if (location.id !== roadCreationState.startLocation.id) {
        handleCompleteRoadCreation(location);
      }
      return;
    }
    
    if (!isEditMode) return;

    setContextMenu({
      mouseX: event.clientX,
      mouseY: event.clientY,
      mapX: location.coordinates?.x ?? 0,
      mapY: location.coordinates?.y ?? 0,
      locationToDelete: location
    });
  };

  const handleEditLocation = (location: Location) => {
    setEditingLocation({
      name: location.name,
      description: location.description,
      type: location.type,
      x: location.coordinates?.x ?? 0,
      y: location.coordinates?.y ?? 0,
      region: location.region,
      originalName: location.name
    });
    setEditLocationDialog(true);
    setContextMenu(null);
  };

  const handleEditLocationSave = () => {
    if (!editingLocation) return;

    // Delete the old location if name changed
    if (editingLocation.originalName !== editingLocation.name) {
      deleteLocation(editingLocation.originalName);
    }

    // Add/Update the location
    addLocation(
      editingLocation.name,
      editingLocation.description,
      editingLocation.type,
      editingLocation.x,
      editingLocation.y,
      editingLocation.region
    );

    // Ensure the new type is visible in the filter
    setVisibleLocationTypes(prev => new Set([...prev, editingLocation.type]));
    
    setEditLocationDialog(false);
    setEditingLocation(null);

    setNotification({
      open: true,
      message: 'Location updated successfully',
      severity: 'success'
    });
  };

  const handleDeleteLocation = () => {
    if (contextMenu?.locationToDelete) {
      // Instead of directly deleting, we'll mark it for deletion in the location management system
      const locationToDelete = contextMenu.locationToDelete;
      // Remove the location from the current state
      const updatedLocations = locations.filter(loc => loc.name !== locationToDelete.name);
      setLocations(updatedLocations);
      
      setNotification({
        open: true,
        message: 'Location marked for deletion. Click Save to confirm changes.',
        severity: 'success'
      });
    }
    setContextMenu(null);
  };

  const handleLocationTypeSelect = (type: LocationType) => {
    if (!contextMenu) return;

    // Create a temporary new location with exact coordinates from context menu
    const tempLocation = {
      name: '',
      description: '',
      type,
      x: contextMenu.mapX,
      y: contextMenu.mapY,
      region: selectedRegion?.id
    };

    setNewLocation(tempLocation);
    setContextMenu(null);
    setNewLocationDialog(true);
  };

  const handleNewLocationSave = () => {
    if (!newLocation.name || !newLocation.description) {
      return;
    }

    addLocation(
      newLocation.name,
      newLocation.description,
      newLocation.type,
      newLocation.x,
      newLocation.y,
      newLocation.region
    );

    // Ensure the new type is visible in the filter
    setVisibleLocationTypes(prev => new Set([...prev, newLocation.type]));
    
    setNewLocationDialog(false);
    setNewLocation({
      name: '',
      description: '',
      type: 'City',
      x: 0,
      y: 0,
      region: undefined
    });

    setNotification({
      open: true,
      message: 'Location added successfully',
      severity: 'success'
    });
  };

  const handleRegionCitySelect = (location: City | Location | null) => {
    if (!location) {
      onLocationSelect(null);
      return;
    }

    // For both cities and locations, just select them directly
    onLocationSelect(location);

    // If we have a selected region, navigate to the location within that region
    if (selectedRegion) {
      // Check if it's a city by looking for the coordinates property
      const isCity = 'coordinates' in location && Array.isArray(location.coordinates);
      const path = isCity ? 'city' : 'location';
      navigate(`/world/${selectedRegion.id}/${path}/${location.id}`);
    }
  };

  const handleRegionSelect = (region: Region | null) => {
    onRegionSelect(region);
  };

  const handleLocationSelect = (location: Location) => {
    console.log('[Debug] handleLocationSelect called with location:', location);

    // Search through all regions, cities, and locations
    let foundRegion: Region | null = null;
    let foundLocation: City | Location | null = null;

    // Search through regions
    for (const region of regions) {
      console.log('[Debug] Searching region:', region.name);
      
      // Search through cities in the region
      if (region.cities) {
        const matchingCity = region.cities.find(city => 
          city.id === location.id || 
          city.name.toLowerCase() === location.name.toLowerCase()
        );
        if (matchingCity) {
          console.log('[Debug] Found matching city:', matchingCity.name);
          foundRegion = region;
          foundLocation = matchingCity;
          break;
        }
      }

      // Search through locations in the region
      if (region.locations) {
        const matchingLocation = region.locations.find(loc => 
          loc.id === location.id || 
          loc.name.toLowerCase() === location.name.toLowerCase()
        );
        if (matchingLocation) {
          console.log('[Debug] Found matching location:', matchingLocation.name);
          foundRegion = region;
          foundLocation = matchingLocation;
          break;
        }
      }
    }

    if (foundRegion && foundLocation) {
      console.log('[Debug] Selecting region and location:', {
        region: foundRegion.name,
        location: foundLocation.name
      });
      
      // First select the region
      onRegionSelect(foundRegion);
      
      // Then select the location
      onLocationSelect(foundLocation);
      
      // Expand the region in the explorer view
      setExpandedRegions((prev) => {
        const newState = Object.keys(prev).reduce((acc, key) => ({
          ...acc,
          [key]: false
        }), {});
        return {
          ...newState,
          [foundRegion!.id]: true
        };
      });
    } else {
      console.log('[Debug] No matching location found in explorer view for:', location.name);
      // If no match is found, just select the location
      onLocationSelect(location);
    }
  };

  const handleLocationDelete = async (location: Location) => {
    try {
      await deleteLocation(location.id);
      setNotification({
        open: true,
        message: 'Location deleted successfully',
        severity: 'success'
      });
    } catch (error) {
      setNotification({
        open: true,
        message: 'Error deleting location',
        severity: 'error'
      });
    }
  };

  const handleResetLocations = async () => {
    if (!selectedWorld) return;
    
    try {
      // Fetch fresh locations from the database
      const freshLocations = await locationService.getLocations(selectedWorld.id);
      setLocations(freshLocations);
      setLocationHistory([]); // Clear the undo history
      
      setNotification({
        open: true,
        message: 'Locations reset successfully',
        severity: 'success'
      });
    } catch (error) {
      setNotification({
        open: true,
        message: 'Error resetting locations',
        severity: 'error'
      });
    }
  };

  const handleSaveLocations = async () => {
    try {
      // Save locations to database
      for (const location of locations) {
        await updateLocation(location);
      }
      setNotification({
        open: true,
        message: 'Locations saved successfully',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error saving locations:', error);
      setNotification({
        open: true,
        message: 'Error saving locations',
        severity: 'error'
      });
    }
  };

  const handleRestoreFromBackup = async () => {
    if (!selectedWorld) return;
    
    try {
      // Reload locations from service and update state through the hook
      const restoredLocations = await locationService.getLocations(selectedWorld.id);
      for (const loc of restoredLocations) {
        if (loc.coordinates) {
          await addLocation(loc.name, loc.description, loc.type, loc.coordinates.x, loc.coordinates.y);
        }
      }
      setNotification({
        open: true,
        message: 'Locations restored successfully',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error restoring locations:', error);
      setNotification({
        open: true,
        message: 'Error restoring locations',
        severity: 'error'
      });
    }
  };

  const handleMarkerMouseDown = (event: React.MouseEvent, location: Location) => {
    event.stopPropagation();
    if (!isEditMode) return;

    const rect = mapContainerRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Store the initial mouse position and location coordinates
    setDraggedLocation({
      name: location.name,
      initialX: location.coordinates?.x ?? 0,
      initialY: location.coordinates?.y ?? 0,
      startX: event.clientX,
      startY: event.clientY
    });
  };

  const handleMapMouseDown = useCallback((e: React.MouseEvent) => {
    // Check if the click originated from a location marker
    const target = e.target as HTMLElement;
    const isLocationMarker = target.closest('[role="button"]');
    
    // If clicking a location marker, don't handle the event
    if (isLocationMarker) {
      return;
    }

    // If left-clicking during road creation, handle waypoint removal or cancellation
    if (e.button === 0 && roadCreationState.isCreating) {
      e.preventDefault();
      
      if (roadCreationState.waypoints.length > 0) {
        setRoadCreationState(prev => ({
          ...prev,
          waypoints: prev.waypoints.slice(0, -1)
        }));
      } else {
        setRoadCreationState({
          isCreating: false,
          startLocation: null,
          currentPoint: null,
          type: 'Major',
          waypoints: [],
          isWaypointMode: false
        });

        setNotification({
          open: true,
          message: 'Road creation cancelled',
          severity: 'success'
        });
      }
      return;
    }

    // If right-clicking during road creation, prevent default to avoid context menu
    if (e.button === 2 && roadCreationState.isCreating) {
      e.preventDefault();
      return;
    }

    // Only start panning if we're not clicking on a location marker and not dragging
    if (!draggedLocation) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  }, [draggedLocation, setIsDragging, setDragStart, roadCreationState.isCreating, roadCreationState.waypoints.length]);

  const handleMapMouseMove = useCallback((e: React.MouseEvent) => {
    if (roadCreationState.isCreating && roadCreationState.startLocation) {
      const rect = mapContainerRef.current?.getBoundingClientRect();
      if (!rect) return;

      // Calculate the base scale of the image to fit the container
      const baseScale = Math.min(
        mapDimensions.width / imageNaturalSize.width,
        mapDimensions.height / imageNaturalSize.height
      );

      // Calculate the scaled dimensions of the image
      const scaledWidth = imageNaturalSize.width * baseScale;
      const scaledHeight = imageNaturalSize.height * baseScale;

      // Calculate the padding to center the image
      const imageLeft = (mapDimensions.width - scaledWidth) / 2;
      const imageTop = (mapDimensions.height - scaledHeight) / 2;

      // Calculate the mouse position relative to the image origin
      const mouseX = (e.clientX - rect.left - pan.x) / zoom;
      const mouseY = (e.clientY - rect.top - pan.y) / zoom;

      // Convert screen coordinates to image coordinates
      const imageX = (mouseX - imageLeft) / baseScale;
      const imageY = (mouseY - imageTop) / baseScale;

      // Ensure coordinates are within image bounds
      const newX = Math.max(0, Math.min(imageNaturalSize.width, imageX));
      const newY = Math.max(0, Math.min(imageNaturalSize.height, imageY));

      setRoadCreationState(prev => ({
        ...prev,
        currentPoint: { x: newX, y: newY }
      }));
    }

    if (draggedLocation) {
      e.stopPropagation();
      e.preventDefault();

      const rect = mapContainerRef.current?.getBoundingClientRect();
      if (!rect) return;

      // Calculate the base scale of the image to fit the container
      const baseScale = Math.min(
        mapDimensions.width / imageNaturalSize.width,
        mapDimensions.height / imageNaturalSize.height
      );

      // Calculate the scaled dimensions of the image
      const scaledWidth = imageNaturalSize.width * baseScale;
      const scaledHeight = imageNaturalSize.height * baseScale;

      // Calculate the padding to center the image
      const imageLeft = (mapDimensions.width - scaledWidth) / 2;
      const imageTop = (mapDimensions.height - scaledHeight) / 2;

      // Calculate the mouse position relative to the image origin
      const mouseX = (e.clientX - rect.left - pan.x) / zoom;
      const mouseY = (e.clientY - rect.top - pan.y) / zoom;

      // Convert screen coordinates to image coordinates
      const imageX = (mouseX - imageLeft) / baseScale;
      const imageY = (mouseY - imageTop) / baseScale;

      // Ensure coordinates are within image bounds
      const newX = Math.max(0, Math.min(imageNaturalSize.width, imageX));
      const newY = Math.max(0, Math.min(imageNaturalSize.height, imageY));

      // Update the location with new coordinates
      const location = locations.find(loc => loc.name === draggedLocation.name);
      if (location) {
        // Update the location in the current state without saving to storage
        setLocations(prev => prev.map(loc => 
          loc.name === location.name ? {
            ...location,
            coordinates: {
              x: newX,
              y: newY
            }
          } : loc
        ));
      }
    } else if (isDragging) {
      // Handle map panning
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      
      setPan(prevPan => ({
        x: prevPan.x + dx,
        y: prevPan.y + dy
      }));
      
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  }, [roadCreationState, draggedLocation, isDragging, dragStart, mapDimensions, imageNaturalSize, pan, zoom, locations, setLocations]);

  const handleMapMouseUp = useCallback((e: React.MouseEvent) => {
    if (roadCreationState.isCreating && roadCreationState.startLocation) {
      // If right-click on empty space, add a waypoint
      if (e.button === 2) {
        e.preventDefault();
        const rect = mapContainerRef.current?.getBoundingClientRect();
        if (!rect) return;

        // Calculate the base scale of the image to fit the container
        const baseScale = Math.min(
          mapDimensions.width / imageNaturalSize.width,
          mapDimensions.height / imageNaturalSize.height
        );

        // Calculate the scaled dimensions of the image
        const scaledWidth = imageNaturalSize.width * baseScale;
        const scaledHeight = imageNaturalSize.height * baseScale;

        // Calculate the padding to center the image
        const imageLeft = (mapDimensions.width - scaledWidth) / 2;
        const imageTop = (mapDimensions.height - scaledHeight) / 2;

        // Calculate the mouse position relative to the image origin
        const mouseX = (e.clientX - rect.left - pan.x) / zoom;
        const mouseY = (e.clientY - rect.top - pan.y) / zoom;

        // Convert screen coordinates to image coordinates
        const imageX = (mouseX - imageLeft) / baseScale;
        const imageY = (mouseY - imageTop) / baseScale;

        // Ensure coordinates are within image bounds
        const newX = Math.max(0, Math.min(imageNaturalSize.width, imageX));
        const newY = Math.max(0, Math.min(imageNaturalSize.height, imageY));

        // Add the waypoint
        setRoadCreationState(prev => ({
          ...prev,
          waypoints: [...prev.waypoints, { id: uuidv4(), x: newX, y: newY }]
        }));
        return;
      }
    }

    setIsDragging(false);
    setDraggedLocation(null);
  }, [roadCreationState, mapDimensions, imageNaturalSize, pan, zoom]);

  const handleDungeonSelect = (dungeon: Dungeon | null) => {
    if (onDungeonSelect) {
      onDungeonSelect(dungeon?.id ?? null);
    }
  };

  const handleAddDungeon = (cityId: string) => {
    // Handle adding a dungeon
  }

  const handleDungeonClose = () => {
    onLocationSelect(null);
    onRegionSelect(null);
  };

  const renderCharacterCard = (figure: any) => (
    <div key={figure.id} className="bg-white/5 rounded-lg p-4 flex flex-col items-center">
      {/* Placeholder image at the top */}
      <div className="w-24 h-24 rounded-lg bg-gray-800 flex items-center justify-center mb-4 border border-gray-300">
        {/* User icon as placeholder */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                              </div>
      <div className="flex flex-col items-center gap-3 w-full">
        <div>
          <h4 className="font-semibold text-lg text-center">{figure.name}</h4>
          <p className="text-sm text-gray-400 text-center">{figure.title}</p>
        </div>
        <p className="text-sm mb-2 text-center">{figure.significance}</p>
        <p className="text-xs text-gray-400 text-center">Era: {figure.era}</p>
      </div>
    </div>
  )

  const renderSeasonalInfo = (entity: Region | City) => (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-2">
        <h4 className="text-xl font-semibold">Seasonal Effects</h4>
      </div>
      <div className={`bg-gray-800/40 rounded-xl border ${borderColor.borderSecondary} p-6`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(entity.seasons || []).map((season: any, index) => {
            const name = (typeof season.name === 'string' ? season.name : season.season || '').toLowerCase();
            let gradient = 'bg-gradient-to-br from-gray-900 via-gray-800 to-black';
            let border = borderColor.borderSecondary;
            let emoji = '✨';
            let text = 'text-yellow-200';
            if (name.includes('winter')) {
              gradient = 'bg-gradient-to-br from-blue-900 via-blue-800 to-black';
              border = 'border-blue-400';
              emoji = '❄️';
              text = 'text-blue-200';
            } else if (name.includes('spring')) {
              gradient = 'bg-gradient-to-br from-green-900 via-green-700 to-black';
              border = 'border-green-400';
              emoji = '🌱';
              text = 'text-green-200';
            } else if (name.includes('summer')) {
              gradient = 'bg-gradient-to-br from-yellow-700 via-orange-800 to-black';
              border = 'border-yellow-400';
              emoji = '☀️';
              text = 'text-yellow-200';
            } else if (name.includes('autumn') || name.includes('fall')) {
              gradient = 'bg-gradient-to-br from-orange-900 via-orange-700 to-black';
              border = 'border-orange-400';
              emoji = '🍂';
              text = 'text-orange-200';
            }
            return (
              <div
                key={`${entity.id}-season-${name}-${index}`}
                className={`${gradient} border ${border} shadow-lg rounded-xl p-6 flex flex-col gap-3 relative`}
              >
                <h5 className={`text-lg font-bold flex items-center gap-2 mb-2 ${text}`}>
                  <span>{emoji}</span>
                  {'name' in season ? season.name : season.season}
                </h5>
                <p className="text-sm text-gray-200 mb-2">{season.description}</p>
                <div className="flex flex-col gap-2">
                  <div>
                    <h6 className="text-xs font-semibold text-blue-300 mb-1">Activities</h6>
                    <ul className="list-disc list-inside text-sm text-blue-100 ml-4">
                      {('activities' in season ? season.activities : []).map((activity: string, i: number) => (
                        <li key={`${entity.id}-activity-${i}-${activity}`}>{activity}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h6 className="text-xs font-semibold text-pink-300 mb-1">Hazards</h6>
                    <ul className="list-disc list-inside text-sm text-pink-100 ml-4">
                      {('hazards' in season ? season.hazards : []).map((hazard: string, i: number) => (
                        <li key={`${entity.id}-hazard-${i}-${hazard}`}>{hazard}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )

  const renderMagicalItems = (entity: Region | City) => (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-2">
        <h4 className="text-xl font-semibold">Magical Items</h4>
      </div>
      <div className={`bg-gray-800/40 rounded-xl border ${borderColor.borderSecondary} p-6`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(entity.magicalItems || []).map((item: any, index: number) => {
            let rarityBorder = 'border-gray-400';
            let rarityText = 'text-gray-400';
            let rarityBg = 'bg-gray-700';
            let rarityBadge = 'Common';
            switch ((item.rarity || '').toLowerCase()) {
              case 'common':
                rarityBorder = 'border-gray-500';
                rarityText = 'text-gray-500';
                rarityBg = 'bg-gray-800';
                rarityBadge = 'Common';
                break;
              case 'uncommon':
                rarityBorder = 'border-green-400';
                rarityText = 'text-green-400';
                rarityBg = 'bg-green-900';
                rarityBadge = 'Uncommon';
                break;
              case 'rare':
                rarityBorder = 'border-blue-400';
                rarityText = 'text-blue-400';
                rarityBg = 'bg-blue-900';
                rarityBadge = 'Rare';
                break;
              case 'very rare':
                rarityBorder = 'border-purple-400';
                rarityText = 'text-purple-400';
                rarityBg = 'bg-purple-900';
                rarityBadge = 'Very Rare';
                break;
              case 'legendary':
                rarityBorder = 'border-yellow-400';
                rarityText = 'text-yellow-400';
                rarityBg = 'bg-yellow-900';
                rarityBadge = 'Legendary';
                break;
              case 'artifact':
                rarityBorder = 'border-pink-400';
                rarityText = 'text-pink-400';
                rarityBg = 'bg-pink-900';
                rarityBadge = 'Artifact';
                break;
              default:
                rarityBorder = 'border-gray-400';
                rarityText = 'text-gray-400';
                rarityBg = 'bg-gray-700';
                rarityBadge = 'Common';
            }
            return (
              <div key={`${entity.id}-item-${item.name}-${index}`} className={`relative flex flex-col md:flex-row shadow-lg rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black ${rarityBorder}`}> 
                {/* Left accent bar */}
                <div className={`w-2 md:w-3 ${rarityBg} ${rarityBorder} rounded-l-xl md:rounded-l-xl md:rounded-tr-none md:rounded-br-none`} />
                {/* Main content */}
                <div className="flex-1 p-6 flex flex-col gap-2">
                  <div className="flex items-center gap-3 mb-2">
                    <SparklesIcon className={`w-7 h-7 ${rarityText}`} />
                    <h5 className={`text-2xl font-extrabold leading-tight flex items-center gap-2 ${rarityText}`}>{item.name}</h5>
                    <span className={`ml-auto px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${rarityBg} ${rarityText} border ${rarityBorder}`}>{rarityBadge}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-gray-400">{item.type}</span>
                    {'attunement' in item && item.attunement && (
                      <span className="text-xs text-pink-300 ml-2">Requires Attunement</span>
                    )}
                    {'charges' in item && item.charges && (
                      <span className="text-xs text-blue-300 ml-2">{item.charges} Charges</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-200 mb-2 italic">{item.description}</p>
                  <div className="flex flex-wrap gap-4 mb-2">
                    {'value' in item && <span className="text-sm"><span className="text-gray-400 font-semibold">Value:</span> {item.value}</span>}
                    {'source' in item && item.source && <span className="text-sm"><span className="text-gray-400 font-semibold">Source:</span> {item.source}</span>}
                    {'weight' in item && item.weight && <span className="text-sm"><span className="text-gray-400 font-semibold">Weight:</span> {item.weight}</span>}
                    {'duration' in item && item.duration && <span className="text-sm"><span className="text-gray-400 font-semibold">Duration:</span> {item.duration}</span>}
                    {'range' in item && item.range && <span className="text-sm"><span className="text-gray-400 font-semibold">Range:</span> {item.range}</span>}
                    {'activation' in item && item.activation && <span className="text-sm"><span className="text-gray-400 font-semibold">Activation:</span> {item.activation}</span>}
                    {'requirements' in item && item.requirements && <span className="text-sm"><span className="text-gray-400 font-semibold">Requirements:</span> {item.requirements}</span>}
                    {'cooldown' in item && item.cooldown && <span className="text-sm"><span className="text-gray-400 font-semibold">Cooldown:</span> {item.cooldown}</span>}
                    {'uses' in item && item.uses && <span className="text-sm"><span className="text-gray-400 font-semibold">Uses:</span> {item.uses}</span>}
                  </div>
                  {/* Additional properties */}
                  {'effects' in item && item.effects && (
                    <div className="mt-2">
                      <h6 className="text-xs font-bold text-gray-300 mb-1">Effects</h6>
                      <ul className="list-disc list-inside text-sm text-gray-200 ml-4">
                        {Array.isArray(item.effects) ? item.effects.map((effect: string, i: number) => (
                          <li key={`${entity.id}-effect-${i}-${effect}`}>{effect}</li>
                        )) : <li key={`${entity.id}-effect-${item.effects}`}>{item.effects}</li>}
                      </ul>
                    </div>
                  )}
                  {'properties' in item && item.properties && (
                    <div className="mt-2">
                      <h6 className="text-xs font-bold text-gray-300 mb-1">Properties</h6>
                      <ul className="list-disc list-inside text-sm text-gray-200 ml-4">
                        {Array.isArray(item.properties) ? item.properties.map((prop: string, i: number) => (
                          <li key={`${entity.id}-prop-${i}-${prop}`}>{prop}</li>
                        )) : <li key={`${entity.id}-prop-${item.properties}`}>{item.properties}</li>}
                      </ul>
                                </div>
                              )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )

  const toggleLocationType = (type: LocationType) => {
    setVisibleLocationTypes(prev => {
      const newSet = new Set(prev)
      if (newSet.has(type)) {
        newSet.delete(type)
      } else {
        newSet.add(type)
      }
      return newSet
    })
  }

  // Modal container refs for scroll reset
  const dungeonModalRef = useRef<HTMLDivElement>(null);
  const cityModalRef = useRef<HTMLDivElement>(null);
  const regionModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedDungeonProp) {
      // Reset scroll position when dungeon view is opened
      dungeonModalRef.current?.scrollTo({ top: 0, behavior: 'auto' });
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [selectedDungeonProp]);

  useEffect(() => {
    if (selectedLocation) {
      // Reset scroll position when city view is opened
      cityModalRef.current?.scrollTo({ top: 0, behavior: 'auto' });
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [selectedLocation]);

  useEffect(() => {
    if (selectedRegion) {
      // Reset scroll position when region view is opened
      regionModalRef.current?.scrollTo({ top: 0, behavior: 'auto' });
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [selectedRegion]);

  // Helper function to get coordinates
  const getCoordinates = (location: Location) => {
    if ('coordinates' in location && location.coordinates) {
      return [location.coordinates.x, location.coordinates.y];
    }
    return [0, 0];
  };

  const navigate = useNavigate();

  // Prevent scrolling on mount
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  // Helper functions
  function getLocationColor(type: LocationType): string {
    switch (type) {
      case 'Large City': return 'border-purple-500';
      case 'City': return 'border-red-500';
      case 'Village': return 'border-green-500';
      case 'Landmark': return 'border-yellow-500';
      case 'Ruins': return 'border-gray-500';
      case 'Stronghold': return 'border-red-900';
      case 'Fort': return 'border-orange-500';
      case 'Point of Interest': return 'border-blue-500';
      case 'Shop': return 'border-emerald-500';
      default: return 'border-gray-500';
    }
  }

  function getLocationSize(type: LocationType): { width: number; height: number } {
    // Base sizes for different location types in pixels
    const baseSizes = {
      'Large City': { width: 48, height: 48 },
      'City': { width: 40, height: 40 },
      'Village': { width: 24, height: 24 },
      'Landmark': { width: 32, height: 32 },
      'Ruins': { width: 32, height: 32 },
      'Stronghold': { width: 32, height: 32 },
      'Fort': { width: 32, height: 32 },
      'Point of Interest': { width: 32, height: 32 },
      'Shop': { width: 32, height: 32 },
      'Other': { width: 32, height: 32 }
    } as const;

    return baseSizes[type];
  }

  function getLocationIcon(type: LocationType): JSX.Element {
    const getIconSize = (type: LocationType): string => {
      // Base icon sizes for different location types
      const baseSizes = {
        'Large City': 'h-8 w-8',
        'City': 'h-6 w-6',
        'Village': 'h-4 w-4',
        'Landmark': 'h-5 w-5',
        'Ruins': 'h-5 w-5',
        'Stronghold': 'h-5 w-5',
        'Fort': 'h-5 w-5',
        'Point of Interest': 'h-5 w-5',
        'Shop': 'h-5 w-5',
        'Other': 'h-5 w-5'
      } as const;

      return baseSizes[type];
    };

    const iconSize = getIconSize(type);
    const className = `${iconSize} text-white`;

    switch (type) {
      case 'Large City': return <BuildingLibraryIcon className={className} />;
      case 'City': return <BuildingLibraryIcon className={className} />;
      case 'Village': return <HomeIcon className={className} />;
      case 'Landmark': return <SparklesIcon className={className} />;
      case 'Ruins': return <FlagIcon className={className} />;
      case 'Stronghold': return <ShieldExclamationIcon className={className} />;
      case 'Fort': return <ShieldExclamationIcon className={className} />;
      case 'Point of Interest': return <SparklesIcon className={className} />;
      case 'Shop': return <BuildingStorefrontIcon className={className} />;
      default: return <BuildingLibraryIcon className={className} />;
    }
  }

  // Add wheel event listener
  useEffect(() => {
    const mapContainer = mapContainerRef.current;
    if (!mapContainer) return;

    const handleWheelEvent = (e: WheelEvent) => {
      e.preventDefault();
      handleWheel(e as unknown as React.WheelEvent<HTMLDivElement>, mapDimensions.width, mapDimensions.height);
    };

    mapContainer.addEventListener('wheel', handleWheelEvent, { passive: false });
    return () => {
      mapContainer.removeEventListener('wheel', handleWheelEvent);
    };
  }, [handleWheel, mapDimensions]);

  const handleButtonZoom = (targetZoom: number) => {
    if (targetZoom === MIN_ZOOM) {
      zoomOut(mapDimensions.width, mapDimensions.height);
    } else if (targetZoom === MAX_ZOOM) {
      zoomIn(mapDimensions.width, mapDimensions.height);
    }
  };

  // Add road creation handlers
  const handleStartRoadCreation = (location: Location, type: 'Major' | 'Minor' | 'Path') => {
    setRoadCreationState({
      isCreating: true,
      startLocation: location,
      currentPoint: location.coordinates || null,
      type,
      waypoints: [],
      isWaypointMode: false
    });
    setContextMenu(null);
  };

  const handleCancelRoadCreation = () => {
    setRoadCreationState({
      isCreating: false,
      startLocation: null,
      currentPoint: null,
      type: 'Major',
      waypoints: [],
      isWaypointMode: false
    });
  };

  const handleCompleteRoadCreation = async (endLocation: Location) => {
    if (roadCreationState.startLocation && roadCreationState.type) {
      await handleRoadCreation(
        roadCreationState.startLocation,
        endLocation,
        roadCreationState.type
      );
      setRoadCreationState({
        active: false,
        startLocation: null,
        type: 'Major' as const,
        waypoints: []
      });
    }
  };

  const handleLocationDragEnd = async (location: Location, newX: number, newY: number) => {
    await handleLocationDrag(location, newX, newY);
  };

  const handleUpdateLocations = async (locations: Location[]) => {
    try {
      for (const location of locations) {
        await updateLocation(location);
      }
      setNotification({
        open: true,
        message: 'Locations updated successfully',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error updating locations:', error);
      setNotification({
        open: true,
        message: 'Error updating locations',
        severity: 'error'
      });
    }
  };

  // Add waypoint handlers
  const handleAddWaypoint = (e: React.MouseEvent) => {
    if (!roadCreationState.isCreating || !roadCreationState.startLocation) return;

    const rect = mapContainerRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Calculate the base scale of the image to fit the container
    const baseScale = Math.min(
      mapDimensions.width / imageNaturalSize.width,
      mapDimensions.height / imageNaturalSize.height
    );

    // Calculate the scaled dimensions of the image
    const scaledWidth = imageNaturalSize.width * baseScale;
    const scaledHeight = imageNaturalSize.height * baseScale;

    // Calculate the padding to center the image
    const imageLeft = (mapDimensions.width - scaledWidth) / 2;
    const imageTop = (mapDimensions.height - scaledHeight) / 2;

    // Calculate the mouse position relative to the image origin
    const mouseX = (e.clientX - rect.left - pan.x) / zoom;
    const mouseY = (e.clientY - rect.top - pan.y) / zoom;

    // Convert screen coordinates to image coordinates
    const imageX = (mouseX - imageLeft) / baseScale;
    const imageY = (mouseY - imageTop) / baseScale;

    // Ensure coordinates are within image bounds
    const newX = Math.max(0, Math.min(imageNaturalSize.width, imageX));
    const newY = Math.max(0, Math.min(imageNaturalSize.height, imageY));

    setRoadCreationState(prev => ({
      ...prev,
      waypoints: [...prev.waypoints, { id: uuidv4(), x: newX, y: newY }]
    }));
  };

  // Add this helper function near the top of the component
  const calculateRoadSegmentPoints = (points: Array<{ x: number; y: number }>, baseScale: number, imageLeft: number, imageTop: number) => {
    return points.map((point, index) => {
      if (index === points.length - 1) return null; // Skip last point as we'll use it for the next segment
      
      const start = {
        x: (point.x * baseScale) + imageLeft,
        y: (point.y * baseScale) + imageTop
      };
      const end = {
        x: (points[index + 1].x * baseScale) + imageLeft,
        y: (points[index + 1].y * baseScale) + imageTop
      };
      
      // Calculate the angle and length of the segment
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      
      return {
        start,
        end,
        length,
        angle,
        center: {
          x: (start.x + end.x) / 2,
          y: (start.y + end.y) / 2
        }
      };
    }).filter(Boolean);
  };

  // Modify the renderRoads function
  const renderRoads = () => {
    const baseScale = Math.min(
      mapDimensions.width / imageNaturalSize.width,
      mapDimensions.height / imageNaturalSize.height
    );
    const scaledWidth = imageNaturalSize.width * baseScale;
    const scaledHeight = imageNaturalSize.height * baseScale;
    const imageLeft = (mapDimensions.width - scaledWidth) / 2;
    const imageTop = (mapDimensions.height - scaledHeight) / 2;

    return (
      <svg
        className="absolute inset-0"
        style={{
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
      >
        {roads.map(road => {
          const points = road.points.map(point => {
            const screenX = (point.x * baseScale) + imageLeft;
            const screenY = (point.y * baseScale) + imageTop;
            return `${screenX},${screenY}`;
          }).join(' ');

          const strokeWidth = road.type === 'Major' ? 2.5 : road.type === 'Minor' ? 1.5 : 0.75;
          const strokeDasharray = road.type === 'Path' ? '3,3' : 'none';
          const strokeColor = road.type === 'Major' ? '#4a5568' : road.type === 'Minor' ? '#718096' : '#a0aec0';

          return (
            <g key={road.id}>
              <polyline
                points={points}
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeOpacity={0.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {road.waypoints.map(waypoint => {
                const screenX = (waypoint.x * baseScale) + imageLeft;
                const screenY = (waypoint.y * baseScale) + imageTop;
                return (
                  <circle
                    key={waypoint.id}
                    cx={screenX}
                    cy={screenY}
                    r={1.5}
                    fill={strokeColor}
                    stroke="white"
                    strokeWidth={0.5}
                  />
                );
              })}
            </g>
          );
        })}

        {/* Road preview rendering (keep existing code) */}
        {roadCreationState.isCreating && roadCreationState.startLocation && roadCreationState.currentPoint && (
          (() => {
            const baseScale = Math.min(
              mapDimensions.width / imageNaturalSize.width,
              mapDimensions.height / imageNaturalSize.height
            );
            const scaledWidth = imageNaturalSize.width * baseScale;
            const scaledHeight = imageNaturalSize.height * baseScale;
            const imageLeft = (mapDimensions.width - scaledWidth) / 2;
            const imageTop = (mapDimensions.height - scaledHeight) / 2;

            // Make preview lines thinner
            const strokeWidth = roadCreationState.type === 'Major' ? 2.5 : roadCreationState.type === 'Minor' ? 1.5 : 0.75;
            const strokeDasharray = roadCreationState.type === 'Path' ? '3,3' : 'none';
            const strokeColor = roadCreationState.type === 'Major' ? '#4a5568' : roadCreationState.type === 'Minor' ? '#718096' : '#a0aec0';

            return (
              <g>
                {/* Draw lines between points */}
                <polyline
                  points={[
                    // Start location
                    `${(roadCreationState.startLocation.coordinates!.x * baseScale) + imageLeft},${(roadCreationState.startLocation.coordinates!.y * baseScale) + imageTop}`,
                    // Waypoints
                    ...roadCreationState.waypoints.map(wp => 
                      `${(wp.x * baseScale) + imageLeft},${(wp.y * baseScale) + imageTop}`
                    ),
                    // Current point
                    `${(roadCreationState.currentPoint.x * baseScale) + imageLeft},${(roadCreationState.currentPoint.y * baseScale) + imageTop}`
                  ].join(' ')}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeOpacity={0.8}
                  strokeLinecap="round"
                />
                {/* Render waypoints with smaller circles */}
                {roadCreationState.waypoints.map(waypoint => {
                  const screenX = (waypoint.x * baseScale) + imageLeft;
                  const screenY = (waypoint.y * baseScale) + imageTop;
                  return (
                    <circle
                      key={waypoint.id}
                      cx={screenX}
                      cy={screenY}
                      r={1.5} // Reduced from 3 to 1.5
                      fill={strokeColor}
                      stroke="white"
                      strokeWidth={0.5} // Reduced from 1 to 0.5
                    />
                  );
                })}
              </g>
            );
          })()
        )}
      </svg>
    );
  };

  // Replace handleRoadClick with handleRoadHover
  const handleRoadHover = (e: React.MouseEvent, road: Road) => {
    if (isEditMode) return; // Don't show popup in edit mode
    
    console.log('[Debug] handleRoadHover called:', {
      roadName: road.name,
      clientX: e.clientX,
      clientY: e.clientY,
      isEditMode
    });
    
    // Use client coordinates for popup positioning
    setRoadPopup({
      road,
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleRoadLeave = () => {
    console.log('[Debug] handleRoadLeave called');
    setRoadPopup(null);
  };

  // Update the context menu to include road creation options
  const renderContextMenu = () => {
    if (!contextMenu) return null;

    return (
      <Menu
        open={true}
        onClose={() => setContextMenu(null)}
        anchorReference="anchorPosition"
        anchorPosition={{ top: contextMenu.mouseY, left: contextMenu.mouseX }}
        PaperProps={{
          style: {
            minWidth: 200,
            backgroundColor: '#1a1a1a',
            color: '#F5F5DC',
            border: '1px solid rgba(245, 245, 220, 0.2)'
          }
        }}
      >
        {contextMenu.locationToDelete ? (
          <>
            <MenuItem onClick={() => handleEditLocation(contextMenu.locationToDelete!)}>
              <PencilIcon className="w-4 h-4 mr-2" />
              Edit Location
            </MenuItem>
            <MenuItem 
              onClick={handleDeleteLocation}
              sx={{
                color: '#ef4444',
                '&:hover': {
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                }
              }}
            >
              <TrashIcon className="w-4 h-4 mr-2 text-red-500" />
              Delete Location
            </MenuItem>
            <Divider sx={{ my: 1, borderColor: 'rgba(245, 245, 220, 0.2)' }} />
            <MenuItem onClick={() => handleStartRoadCreation(contextMenu.locationToDelete!, 'Major')}>
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Add Major Road
              <Typography variant="caption" sx={{ ml: 1, color: 'rgba(245, 245, 220, 0.6)' }}>
                (Right-click to add waypoints)
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => handleStartRoadCreation(contextMenu.locationToDelete!, 'Minor')}>
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Add Minor Road
            </MenuItem>
            <MenuItem onClick={() => handleStartRoadCreation(contextMenu.locationToDelete!, 'Path')}>
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Add Path
            </MenuItem>
          </>
        ) : (
          ['City', 'Large City', 'Village', 'Landmark', 'Ruins', 'Stronghold', 'Fort', 'Point of Interest', 'Shop'].map((type) => (
            <MenuItem
              key={type}
              onClick={() => handleLocationTypeSelect(type as LocationType)}
              className="flex items-center gap-2"
            >
              <div className={`p-0.5 rounded ${getLocationColor(type as LocationType)} bg-black/60`}>
                {getLocationIcon(type as LocationType)}
              </div>
              <span className="capitalize">{type}</span>
            </MenuItem>
          ))
        )}
      </Menu>
    );
  };

  // Update the location marker click handler to be more explicit about handling clicks
  const handleLocationClick = (location: Location, e: React.MouseEvent) => {
    console.log('[Debug] Location click:', {
      locationName: location.name,
      isEditMode,
      isDragging: !!draggedLocation,
      isCreating: roadCreationState.isCreating
    });

    // Always prevent default and stop propagation for location marker clicks
    e.preventDefault();
    e.stopPropagation();

    // Handle road creation if active
    if (roadCreationState.isCreating && roadCreationState.startLocation) {
      if (location.id !== roadCreationState.startLocation.id) {
        handleCompleteRoadCreation(location);
      }
      return;
    }

    // In edit mode, don't navigate - only handle dragging
    if (isEditMode) {
      return;
    }

    // In non-edit mode, immediately handle the click for navigation
    // and prevent any map interaction
    handleLocationSelect(location);
  };

  const handleLocationContextMenu = (location: Location, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    console.log('[Debug] Location marker context menu:', {
      location: location,
      isCreating: roadCreationState.isCreating,
      startLocation: roadCreationState.startLocation?.name,
      isEditMode,
      roadCreationState,
    });

    // If we're creating a road, handle it first
    if (roadCreationState.isCreating && roadCreationState.startLocation) {
      // Only complete the road if clicking a different location
      if (location.name !== roadCreationState.startLocation.name) {
        console.log('[Debug] Completing road via right-click:', {
          from: roadCreationState.startLocation.name,
          to: location.name,
          waypoints: roadCreationState.waypoints.length
        });

        // Create an array of all points including waypoints
        const allPoints = [
          roadCreationState.startLocation.coordinates!,
          ...roadCreationState.waypoints.map(wp => ({ x: wp.x, y: wp.y })),
          location.coordinates!
        ];

        const newRoad: Road = {
          id: uuidv4(),
          name: `${roadCreationState.startLocation.name} to ${location.name}`,
          type: roadCreationState.type,
          points: allPoints,
          connectedLocations: [roadCreationState.startLocation.id, location.id],
          waypoints: roadCreationState.waypoints
        };

        console.log('[Debug] Creating new road:', newRoad);

        // Update roads state
        setRoads(prev => [...prev, newRoad]);
        
        // Update locations to reference the new road
        setLocations(prev => prev.map(loc => {
          if (loc.id === roadCreationState.startLocation!.id || loc.id === endLocation.id) {
            return {
              ...loc,
              roads: [...(loc.roads || []), newRoad.id]
            };
          }
          return loc;
        }));

        // Save the changes
        saveLocations();

        // Reset road creation state
        setRoadCreationState({
          isCreating: false,
          startLocation: null,
          currentPoint: null,
          type: 'Major',
          waypoints: [],
          isWaypointMode: false
        });

        console.log('[Debug] Road creation completed successfully:', {
          roadId: newRoad.id,
          roadName: newRoad.name,
          roadType: newRoad.type,
          startLocation: roadCreationState.startLocation.name,
          endLocation: location.name,
          waypointCount: roadCreationState.waypoints.length,
          totalPoints: allPoints.length,
          connectedLocations: newRoad.connectedLocations
        });

        setNotification({
          open: true,
          message: 'Road created successfully',
          severity: 'success'
        });

        return;
      }
    }

    // Normal context menu behavior for edit mode
    if (isEditMode) {
      handleMarkerContextMenu(e, location);
    }
  };

  // Add this helper function near the other helper functions
  const calculateRoadDistance = (points: Array<{ x: number; y: number }>): number => {
    let totalDistance = 0;
    for (let i = 0; i < points.length - 1; i++) {
      const dx = points[i + 1].x - points[i].x;
      const dy = points[i + 1].y - points[i].y;
      totalDistance += Math.sqrt(dx * dx + dy * dy);
    }
    // Convert pixels to miles (2.38 pixels = 1 mile)
    return totalDistance / 2.38;
  };

  // Add these helper functions near the other helper functions
  const TRAVEL_SPEEDS = {
    foot: 24, // miles per day (normal pace)
    horse: 48, // miles per day (normal pace)
    caravan: 16, // miles per day (normal pace)
  } as const;

  const formatTravelTime = (hours: number): string => {
    if (hours < 1) {
      return `${Math.round(hours * 60)} minutes`;
    }
    const days = Math.floor(hours / 24);
    const remainingHours = Math.round(hours % 24);
    if (days === 0) {
      return `${remainingHours} hours`;
    }
    return `${days} day${days > 1 ? 's' : ''}${remainingHours > 0 ? ` and ${remainingHours} hours` : ''}`;
  };

  const calculateTravelTimes = (distance: number) => {
    return {
      foot: formatTravelTime(distance / TRAVEL_SPEEDS.foot * 24),
      horse: formatTravelTime(distance / TRAVEL_SPEEDS.horse * 24),
      caravan: formatTravelTime(distance / TRAVEL_SPEEDS.caravan * 24)
    };
  };

  const handleRoadCreation = async (startLocation: Location, endLocation: Location, type: 'Major' | 'Minor' | 'Path') => {
    if (!roadCreationState.waypoints) return;

    const newRoad: Road = {
      id: `road-${Date.now()}`,
      name: `${startLocation.name} to ${endLocation.name} ${type} Road`,
      type,
      points: [
        { x: startLocation.coordinates!.x, y: startLocation.coordinates!.y },
        ...roadCreationState.waypoints,
        { x: endLocation.coordinates!.x, y: endLocation.coordinates!.y }
      ],
      connectedLocations: [startLocation.id, endLocation.id],
      waypoints: roadCreationState.waypoints.map((point, index) => ({
        id: `waypoint-${index}`,
        x: point.x,
        y: point.y
      }))
    };

    try {
      // Update both locations with the new road
      await updateLocation({
        ...startLocation,
        roads: [...(startLocation.roads || []), newRoad.id]
      });
      await updateLocation({
        ...endLocation,
        roads: [...(endLocation.roads || []), newRoad.id]
      });

      setNotification({
        open: true,
        message: 'Road created successfully',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error creating road:', error);
      setNotification({
        open: true,
        message: 'Error creating road',
        severity: 'error'
      });
    }
  };

  const handleLocationDrag = async (location: Location, newX: number, newY: number) => {
    try {
      await updateLocation({
        ...location,
        coordinates: { x: newX, y: newY }
      });
    } catch (error) {
      console.error('Error updating location position:', error);
      setNotification({
        open: true,
        message: 'Error updating location position',
        severity: 'error'
      });
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="h-screen flex flex-col overflow-hidden" style={{ overflow: 'hidden' }}>
        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden relative" style={{ overflow: 'hidden' }}>
          {/* Main Content */}
          <div className={`flex-1 relative ${isExplorerVisible ? 'pr-80' : ''} overflow-hidden`} style={{ overflow: 'hidden' }}>
            {/* Map and overlays always visible */}
            <div className="absolute inset-0 bg-gray-950" style={{ overflow: 'hidden' }}>
              <div className="absolute inset-0 flex items-start justify-center" style={{ overflow: 'hidden' }}>
                {/* Map Controls - only show when map is visible */}
                {!selectedRegion && !selectedLocation && (
                  <Box sx={{ 
                    position: 'absolute', 
                    left: 0,
                    right: isExplorerVisible ? '320px' : 0,
                    top: 0,
                    display: 'flex', 
                    justifyContent: 'flex-end',
                    alignItems: 'center', 
                    gap: 1, 
                    zIndex: 40,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    padding: '12px 24px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    transition: 'right 300ms ease-in-out' // Add smooth transition
                  }}>
                    {isEditMode && (
                      <>
                        <IconButton
                          onClick={handleResetLocations}
                          sx={{ 
                            color: '#F5F5DC',
                            backgroundColor: 'rgba(245, 245, 220, 0.1)',
                            '&:hover': { backgroundColor: 'rgba(245, 245, 220, 0.2)' },
                            '&.Mui-disabled': { color: 'rgba(245, 245, 220, 0.3)' }
                          }}
                          title="Undo changes"
                        >
                          <RestartAltIcon />
                        </IconButton>
                        <IconButton
                          onClick={handleSaveLocations}
                          sx={{ 
                            color: '#F5F5DC',
                            backgroundColor: 'rgba(245, 245, 220, 0.1)',
                            '&:hover': { backgroundColor: 'rgba(245, 245, 220, 0.2)' },
                            '&.Mui-disabled': { color: 'rgba(245, 245, 220, 0.3)' }
                          }}
                          title="Save changes"
                        >
                          <SaveIcon />
                        </IconButton>
                        <IconButton
                          onClick={handleRestoreFromBackup}
                          sx={{ 
                            color: '#F5F5DC',
                            backgroundColor: 'rgba(245, 245, 220, 0.1)',
                            '&:hover': { backgroundColor: 'rgba(245, 245, 220, 0.2)' },
                            '&.Mui-disabled': { color: 'rgba(245, 245, 220, 0.3)' }
                          }}
                          title="Restore from backup"
                        >
                          <UploadFileIcon />
                        </IconButton>
                      </>
                    )}
                    <FormControlLabel
                      control={
                        <Switch
                          checked={isEditMode}
                          onChange={(e) => setIsEditMode(e.target.checked)}
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                              color: '#F5F5DC',
                              '&:hover': {
                                backgroundColor: 'rgba(245, 245, 220, 0.1)',
                              },
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                              backgroundColor: '#F5F5DC',
                            },
                          }}
                        />
                      }
                      label="Edit Mode"
                      sx={{ 
                        mr: 2, 
                        color: 'white',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        msUserSelect: 'none',
                        MozUserSelect: 'none'
                      }}
                    />
                    <IconButton
                      onClick={() => handleButtonZoom(MIN_ZOOM)}
                      disabled={zoom <= MIN_ZOOM}
                      aria-label="zoom out"
                      sx={{ 
                        color: '#F5F5DC',
                        backgroundColor: 'rgba(245, 245, 220, 0.1)',
                        '&:hover': { backgroundColor: 'rgba(245, 245, 220, 0.2)' },
                        '&.Mui-disabled': { color: 'rgba(245, 245, 220, 0.3)' }
                      }}
                    >
                      <ZoomOutMapIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleButtonZoom(MAX_ZOOM)}
                      disabled={zoom >= MAX_ZOOM}
                      aria-label="zoom in"
                      sx={{ 
                        color: '#F5F5DC',
                        backgroundColor: 'rgba(245, 245, 220, 0.1)',
                        '&:hover': { backgroundColor: 'rgba(245, 245, 220, 0.2)' },
                        '&.Mui-disabled': { color: 'rgba(245, 245, 220, 0.3)' }
                      }}
                    >
                      <ZoomInMapIcon />
                    </IconButton>
                  </Box>
                )}

                {/* Legend - always show when no region or location is selected */}
                {!selectedRegion && !selectedLocation && (
                  <Box
                    sx={{
                      position: 'absolute',
                      left: '20px',
                      top: '100px',
                      zIndex: 40, // Higher than map layers
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      borderRadius: '4px',
                      padding: '12px',
                      minWidth: '200px',
                      transition: 'all 0.2s ease-in-out',
                    }}
                  >
                    <div 
                      className="flex items-center justify-between cursor-pointer select-none"
                      onClick={() => setIsLegendExpanded(!isLegendExpanded)}
                    >
                      <Typography sx={{ color: '#F5F5DC', fontWeight: 'bold' }}>
                        Location Types
                      </Typography>
                      <IconButton
                        size="small"
                        sx={{ 
                          color: '#F5F5DC',
                          padding: '4px',
                          transform: isLegendExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease-in-out'
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </IconButton>
                    </div>
                    <div 
                      className="space-y-2 overflow-hidden transition-all duration-200 ease-in-out"
                      style={{
                        maxHeight: isLegendExpanded ? '500px' : '0',
                        opacity: isLegendExpanded ? 1 : 0,
                        marginTop: isLegendExpanded ? '8px' : '0'
                      }}
                    >
                      {(['City', 'Large City', 'Village', 'Landmark', 'Ruins', 'Stronghold', 'Fort', 'Point of Interest', 'Shop'] as LocationType[]).map(type => (
                        <div key={type} className="flex items-center gap-2">
                          <Switch
                            checked={visibleLocationTypes.has(type)}
                            onChange={() => toggleLocationType(type)}
                            size="small"
                            sx={{
                              '& .MuiSwitch-switchBase.Mui-checked': {
                                color: '#F5F5DC',
                              },
                              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: '#F5F5DC',
                              },
                            }}
                          />
                          <div className="flex items-center gap-1.5">
                            <div className={`p-0.5 rounded ${getLocationColor(type)} bg-black/60`}>
                              {getLocationIcon(type)}
                            </div>
                            <span className="text-[#F5F5DC] capitalize">{type}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Box>
                )}

                {/* Map Container */}
                <div
                  ref={mapContainerRef}
                  data-testid="map-container"
                  onMouseDown={handleMapMouseDown}
                  onMouseMove={handleMapMouseMove}
                  onMouseUp={handleMapMouseUp}
                  onMouseLeave={handleMapMouseUp}
                  onContextMenu={handleContextMenu}
                  className="absolute inset-0 cursor-grab active:cursor-grabbing select-none bg-[#1a1a1a]"
                  style={{
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    msUserSelect: 'none',
                    MozUserSelect: 'none',
                    touchAction: 'none',
                    overflow: 'hidden',
                    maxHeight: '100vh',
                    zIndex: 10 // Lower z-index than location markers
                  }}
                >
                  {imageError ? (
                    <div className="absolute inset-0 flex items-center justify-center text-white text-center p-4">
                      <div>
                        <p className="text-xl mb-2">Map image not found</p>
                        <p className="text-sm text-gray-400">
                          Please ensure the map image is placed at:<br/>
                          public/art/worlds/{selectedWorld?.id}/Map.jpg
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Base Map Layer */}
                      <div className="absolute inset-0 z-0">
                        <img 
                          src={`/art/worlds/${selectedWorld?.id}/Map.jpg`}
                          alt={`${selectedWorld?.name} Map`}
                          onLoad={handleImageLoad}
                          onError={() => setImageError(true)}
                          className="w-full h-full object-contain pointer-events-none"
                          style={{
                            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                            transformOrigin: '0 0',
                            maxWidth: '100%',
                            maxHeight: '100%',
                            userSelect: 'none',
                            pointerEvents: 'none'
                          }}
                          draggable={false}
                        />
                      </div>

                      {/* Roads Layer */}
                      <div
                        className="absolute inset-0 z-10"
                        style={{
                          transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                          transformOrigin: '0 0',
                          willChange: 'transform',
                          pointerEvents: 'auto' // Make the container interactive
                        }}
                      >
                        <svg
                          className="absolute inset-0"
                          style={{
                            width: '100%',
                            height: '100%',
                            pointerEvents: 'auto' // Make SVG interactive
                          }}
                        >
                          {(() => {
                            const baseScale = Math.min(
                              mapDimensions.width / imageNaturalSize.width,
                              mapDimensions.height / imageNaturalSize.height
                            );
                            const scaledWidth = imageNaturalSize.width * baseScale;
                            const scaledHeight = imageNaturalSize.height * baseScale;
                            const imageLeft = (mapDimensions.width - scaledWidth) / 2;
                            const imageTop = (mapDimensions.height - scaledHeight) / 2;

                            return (
                              <>
                                {roads.map(road => {
                                  const points = road.points.map(point => {
                                    const screenX = (point.x * baseScale) + imageLeft;
                                    const screenY = (point.y * baseScale) + imageTop;
                                    return `${screenX},${screenY}`;
                                  }).join(' ');

                                  const strokeWidth = road.type === 'Major' ? 2.5 : road.type === 'Minor' ? 1.5 : 0.75;
                                  const strokeDasharray = road.type === 'Path' ? '3,3' : 'none';
                                  const strokeColor = road.type === 'Major' ? '#4a5568' : road.type === 'Minor' ? '#718096' : '#a0aec0';

                                  return (
                                    <g key={road.id}>
                                      <polyline
                                        points={points}
                                        fill="none"
                                        stroke={strokeColor}
                                        strokeWidth={strokeWidth}
                                        strokeDasharray={strokeDasharray}
                                        strokeOpacity={0.8}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{
                                          cursor: 'pointer',
                                          pointerEvents: 'auto' // Make road segments interactive
                                        }}
                                        onMouseEnter={(e) => handleRoadHover(e, road)}
                                        onMouseLeave={handleRoadLeave}
                                      />
                                      {road.waypoints.map(waypoint => {
                                        const screenX = (waypoint.x * baseScale) + imageLeft;
                                        const screenY = (waypoint.y * baseScale) + imageTop;
                                        return (
                                          <circle
                                            key={waypoint.id}
                                            cx={screenX}
                                            cy={screenY}
                                            r={1.5}
                                            fill={strokeColor}
                                            stroke="white"
                                            strokeWidth={0.5}
                                            style={{
                                              pointerEvents: 'none' // Keep waypoints non-interactive
                                            }}
                                          />
                                        );
                                      })}
                                    </g>
                                  );
                                })}

                                {/* Road preview rendering */}
                                {roadCreationState.isCreating && roadCreationState.startLocation && roadCreationState.currentPoint && (
                                  <g>
                                    {/* Draw lines between points */}
                                    <polyline
                                      points={[
                                        // Start location
                                        `${(roadCreationState.startLocation.coordinates!.x * baseScale) + imageLeft},${(roadCreationState.startLocation.coordinates!.y * baseScale) + imageTop}`,
                                        // Waypoints
                                        ...roadCreationState.waypoints.map(wp => 
                                          `${(wp.x * baseScale) + imageLeft},${(wp.y * baseScale) + imageTop}`
                                        ),
                                        // Current point
                                        `${(roadCreationState.currentPoint.x * baseScale) + imageLeft},${(roadCreationState.currentPoint.y * baseScale) + imageTop}`
                                      ].join(' ')}
                                      fill="none"
                                      stroke={roadCreationState.type === 'Major' ? '#4a5568' : roadCreationState.type === 'Minor' ? '#718096' : '#a0aec0'}
                                      strokeWidth={roadCreationState.type === 'Major' ? 2.5 : roadCreationState.type === 'Minor' ? 1.5 : 0.75}
                                      strokeDasharray={roadCreationState.type === 'Path' ? '3,3' : 'none'}
                                      strokeOpacity={0.8}
                                      strokeLinecap="round"
                                    />
                                    {/* Render waypoints with smaller circles */}
                                    {roadCreationState.waypoints.map(waypoint => {
                                      const screenX = (waypoint.x * baseScale) + imageLeft;
                                      const screenY = (waypoint.y * baseScale) + imageTop;
                                      return (
                                        <circle
                                          key={waypoint.id}
                                          cx={screenX}
                                          cy={screenY}
                                          r={1.5}
                                          fill={roadCreationState.type === 'Major' ? '#4a5568' : roadCreationState.type === 'Minor' ? '#718096' : '#a0aec0'}
                                          stroke="white"
                                          strokeWidth={0.5}
                                        />
                                      );
                                    })}
                                  </g>
                                )}
                              </>
                            );
                          })()}
                        </svg>
                      </div>

                      {/* Location Markers Layer */}
                      <div
                        className="absolute inset-0 z-20"
                        style={{
                          transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                          transformOrigin: '0 0',
                          willChange: 'transform',
                          pointerEvents: 'none' // Keep container non-interactive
                        }}
                      >
                        {imageLoaded && locations.map((location) => {
                          const baseScale = Math.min(
                            mapDimensions.width / imageNaturalSize.width,
                            mapDimensions.height / imageNaturalSize.height
                          );

                          const scaledWidth = imageNaturalSize.width * baseScale;
                          const scaledHeight = imageNaturalSize.height * baseScale;

                          const imageLeft = (mapDimensions.width - scaledWidth) / 2;
                          const imageTop = (mapDimensions.height - scaledHeight) / 2;

                          // Convert from image coordinates to screen coordinates
                          const screenX = ((location.coordinates?.x ?? 0) * baseScale) + imageLeft;
                          const screenY = ((location.coordinates?.y ?? 0) * baseScale) + imageTop;

                          const isVisible = visibleLocationTypes.has(location.type);
                          const isDragging = draggedLocation?.name === location.name;

                          // Calculate the inverse scale to maintain token size relative to zoom
                          const inverseScale = 1 / zoom;
                          const size = getLocationSize(location.type);

                          return (
                            <div
                              key={location.id}
                              aria-label={location.name}
                              role="button"
                              tabIndex={0}
                              className={`absolute -translate-x-1/2 -translate-y-1/2
                                ${location.name === hoveredLocation ? 'z-20' : 'z-10'}
                                ${getLocationColor(location.type)}
                                ${isEditMode ? 'cursor-move' : 'cursor-pointer'}
                                ${isDragging ? 'ring-2 ring-yellow-400' : ''}
                                ${roadCreationState.isCreating && location.id !== roadCreationState.startLocation?.id ? 'ring-2 ring-green-400 hover:ring-green-300' : ''}
                                bg-black/60 border rounded flex items-center justify-center
                                transition-all duration-75 ease-out
                                ${roadCreationState.isCreating ? 'hover:scale-110' : ''}`}
                              style={{
                                position: 'absolute',
                                left: `${screenX}px`,
                                top: `${screenY}px`,
                                transform: `translate(-50%, -50%) scale(${inverseScale})`,
                                opacity: isVisible ? 1 : 0.4,
                                pointerEvents: isVisible ? 'auto' : 'none',
                                width: `${size.width}px`,
                                height: `${size.height}px`,
                                willChange: isDragging ? 'transform, left, top' : 'auto',
                                touchAction: 'none',
                                zIndex: 50 // Higher z-index to ensure it's above the map
                              }}
                              onClick={(e) => {
                                // Stop the event from reaching the map
                                e.preventDefault();
                                e.stopPropagation();
                                
                                // Only handle clicks in non-edit mode
                                if (!isEditMode) {
                                  handleLocationSelect(location);
                                }
                              }}
                              onMouseDown={(e) => {
                                // Always stop propagation for mouse down
                                e.preventDefault();
                                e.stopPropagation();
                                
                                if (!isVisible) return;
                                if (isEditMode && !roadCreationState.isCreating) {
                                  handleMarkerMouseDown(e, location);
                                }
                              }}
                              onContextMenu={(e) => {
                                if (isVisible) {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleLocationContextMenu(location, e);
                                }
                              }}
                              onMouseEnter={() => {
                                if (isVisible) {
                                  setHovered(location.name);
                                }
                              }}
                              onMouseLeave={() => {
                                setHovered(null);
                              }}
                            >
                              {getLocationIcon(location.type)}
                              {location.name === hoveredLocation && (
                                <div 
                                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-black/90 text-white text-sm font-medium whitespace-nowrap rounded shadow-lg"
                                  style={{
                                    transform: 'translate(-50%, 0)',
                                    transformOrigin: 'top center',
                                    zIndex: 1000,
                                    minWidth: 'max-content'
                                  }}
                                >
                                  {location.name}
                                  {roadCreationState.isCreating && location.id !== roadCreationState.startLocation?.id && (
                                    <span className="block text-xs text-green-400">Click to complete road</span>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Road Popup - Add this new section */}
                      {roadPopup && !isEditMode && (
                        <div
                          className="fixed z-50 pointer-events-none"
                          style={{
                            left: roadPopup.x + 10,
                            top: roadPopup.y + 10,
                            transform: 'translate(0, 0)',
                            maxWidth: '300px',
                            backgroundColor: 'rgba(0, 0, 0, 0.85)',
                            border: '1px solid rgba(245, 245, 220, 0.2)',
                            borderRadius: '4px',
                            padding: '12px',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                          }}
                        >
                          <div className="text-[#F5F5DC]">
                            <h3 className="text-lg font-semibold mb-2">{roadPopup.road.name}</h3>
                            <div className="space-y-1 text-sm">
                              <p>Type: {roadPopup.road.type}</p>
                              <p className="font-medium">Distance: {calculateRoadDistance(roadPopup.road.points).toFixed(1)} miles</p>
                              <div className="mt-2 pt-2 border-t border-[#F5F5DC]/20">
                                <p className="text-[#F5F5DC]/80 mb-1">Travel Time:</p>
                                <div className="space-y-1 pl-2">
                                  <p>On Foot: {calculateTravelTimes(calculateRoadDistance(roadPopup.road.points)).foot}</p>
                                  <p>On Horseback: {calculateTravelTimes(calculateRoadDistance(roadPopup.road.points)).horse}</p>
                                  <p>By Caravan: {calculateTravelTimes(calculateRoadDistance(roadPopup.road.points)).caravan}</p>
                                </div>
                              </div>
                              <p className="mt-2 pt-2 border-t border-[#F5F5DC]/20">
                                Connected Locations: {roadPopup.road.connectedLocations.length}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Context Menu */}
                      {renderContextMenu()}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Explorer Panel - Fixed position with high z-index */}
          <div className={`fixed right-0 top-[64px] bottom-0 w-80 bg-[#181622] border-l border-[#B67C3C]/30 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isExplorerVisible ? 'translate-x-0' : 'translate-x-full'}`}>
            <ExplorerPanel
              regions={regions}
              selectedRegion={selectedRegion}
              selectedLocation={selectedLocation}
              onRegionSelect={handleRegionSelect}
              onLocationSelect={handleRegionCitySelect}
              onAddRegion={onAddRegion}
              onAddCity={onAddCity}
              onBack={onBack}
              onHome={onHome}
              expandedRegions={expandedRegions}
              onExpandedRegionsChange={setExpandedRegions}
              isVisible={isExplorerVisible}
              onToggleVisibility={() => setIsExplorerVisible(!isExplorerVisible)}
            />
          </div>

          {/* Toggle Button - Always visible */}
          <button
            onClick={() => setIsExplorerVisible(!isExplorerVisible)}
            className={`fixed mt-16 top-1/2 -translate-y-1/2 w-8 h-16 bg-[#181622] border border-[#B67C3C]/30 rounded-l-lg flex items-center justify-center hover:bg-[#1E1B2B] transition-all duration-300 group z-50 ${isExplorerVisible ? 'right-80' : 'right-0'}`}
            aria-label={isExplorerVisible ? 'Collapse explorer' : 'Expand explorer'}
          >
            <div className="w-4 h-4 relative">
              <div className={`absolute inset-0 transition-transform duration-300 ${isExplorerVisible ? '' : 'rotate-180'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#B67C3C] group-hover:text-[#fcedbe] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>

          {/* Modal Overlays */}
          {selectedDungeonProp && (
            <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-md overflow-hidden">
              <div ref={dungeonModalRef} className="relative bg-gray-900/95 shadow-2xl w-full max-w-5xl mx-auto pt-0 pb-8 px-8 overflow-y-auto h-[80vh] modern-scrollbar rounded-b-xl">
                <DungeonView
                  dungeon={selectedDungeonProp}
                  onBack={() => onDungeonSelect?.(null)}
                  onClose={handleDungeonClose}
                />
              </div>
            </div>
          )}
          {selectedLocation && !selectedDungeonProp && (
            <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-md overflow-hidden">
              <div ref={cityModalRef} className="relative bg-gray-900/95 rounded-xl shadow-2xl w-full max-w-5xl mx-auto pt-0 pb-8 px-8 overflow-y-auto h-[80vh] modern-scrollbar">
                {('coordinates' in selectedLocation && Array.isArray(selectedLocation.coordinates)) ? (
                  <CityView
                    city={selectedLocation as City}
                    onDungeonSelect={handleDungeonSelect}
                    onAddDungeon={() => onAddCity(selectedRegion?.id ?? '', '', '')}
                    onAddCity={() => selectedRegion && onAddCity(selectedRegion.id, '', '')}
                    onAddRestArea={() => {}}
                    onAddPointOfInterest={() => {}}
                    onClose={onHome}
                    onBack={onBack}
                    renderCharacterCard={renderCharacterCard}
                    renderSeasonalInfo={renderSeasonalInfo}
                    renderMagicalItems={renderMagicalItems}
                    borderColor={borderColor}
                  />
                ) : (
                  <LocationView
                    location={selectedLocation as Location}
                    onClose={onHome}
                    onBack={onBack}
                  />
                )}
              </div>
            </div>
          )}
          {selectedRegion && !selectedLocation && !selectedDungeonProp && (
            <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm overflow-hidden">
              <div ref={regionModalRef} className="relative bg-gray-900/95 shadow-2xl w-full max-w-5xl mx-auto pt-0 pb-8 px-8 overflow-y-auto h-[80vh] modern-scrollbar rounded-b-xl">
                <RegionView
                  region={selectedRegion}
                  onCitySelect={handleRegionCitySelect}
                  onAddCity={() => selectedRegion && onAddCity(selectedRegion.id, '', '')}
                  onAddRegion={() => onAddRegion('', '')}
                  onClose={onHome}
                  onBack={onBack}
                  renderCharacterCard={renderCharacterCard}
                  renderSeasonalInfo={renderSeasonalInfo}
                  renderMagicalItems={renderMagicalItems}
                />
              </div>
            </div>
          )}

          {/* Edit Location Dialog */}
          <Dialog 
            open={editLocationDialog} 
            onClose={() => setEditLocationDialog(false)}
            PaperProps={{
              style: {
                backgroundColor: '#1a1a1a',
                color: '#F5F5DC',
                border: '1px solid rgba(245, 245, 220, 0.2)',
                minWidth: '400px'
              }
            }}
          >
            {/* ... existing edit location dialog content ... */}
          </Dialog>

          {/* New Location Dialog */}
          <Dialog 
            open={newLocationDialog} 
            onClose={() => setNewLocationDialog(false)}
            PaperProps={{
              style: {
                backgroundColor: '#1a1a1a',
                color: '#F5F5DC',
                border: '1px solid rgba(245, 245, 220, 0.2)',
                minWidth: '400px'
              }
            }}
          >
            {/* ... existing new location dialog content ... */}
          </Dialog>
        </div>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={!!notification.open}
        autoHideDuration={3000}
        onClose={() => setNotification(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
          mb: 4 // Add some margin from the bottom
        }}
      >
        <Alert
          onClose={() => setNotification(prev => ({ ...prev, open: false }))}
          severity={notification.severity}
          sx={{
            backgroundColor: notification.severity === 'success' ? '#1C4532' : '#991B1B',
            color: '#F5F5DC',
            '& .MuiAlert-icon': {
              color: '#F5F5DC'
            },
            minWidth: '300px', // Make the alert a bit wider
            justifyContent: 'center' // Center the text
          }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  )
} 