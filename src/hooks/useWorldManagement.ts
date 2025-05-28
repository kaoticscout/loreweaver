import { useState, useEffect } from 'react'
import { Region } from '../types/region'
import { City } from '../types/city'
import { dungeonBanners } from '../../public/art/banners'
import { RegionsAPI } from '../api/regions'
import { useWorld } from '../contexts/WorldContext'

export function useWorldManagement() {
  const [regions, setRegions] = useState<Region[]>([])
  const [isAddingRegion, setIsAddingRegion] = useState(false)
  const [isAddingCity, setIsAddingCity] = useState(false)
  const [newRegionData, setNewRegionData] = useState<Partial<Region>>({})
  const [newCityData, setNewCityData] = useState<Partial<City>>({})
  const [lastAddedId, setLastAddedId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { selectedWorld } = useWorld()

  useEffect(() => {
    const loadRegions = async () => {
      if (!selectedWorld) {
        setRegions([])
        return
      }

      try {
        setIsLoading(true)
        setError(null)
        const loadedRegions = await RegionsAPI.getRegionsByWorldId(selectedWorld.id)
        setRegions(loadedRegions)
      } catch (err) {
        console.error('Failed to load regions:', err)
        setError('Failed to load regions')
        setRegions([])
      } finally {
        setIsLoading(false)
      }
    }

    loadRegions()
  }, [selectedWorld])

  const handleAddRegion = (name: string, description: string) => {
    // Generate a new unique ID
    const newId = `region-${Date.now()}`
    
    // Get a random banner
    const bannerKeys = Object.keys(dungeonBanners)
    const randomBanner = dungeonBanners[bannerKeys[Math.floor(Math.random() * bannerKeys.length)] as keyof typeof dungeonBanners]
    
    const newRegion: Region = {
      id: newId,
      worldId: selectedWorld?.id || '',
      name,
      description,
      biography: '',
      color: '',
      banner: randomBanner,
      notableFeatures: [],
      history: {
        founding: '',
        majorEvents: [],
        currentEra: ''
      },
      keyFigures: [],
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
      seasons: [],
      magicalItems: [],
      cities: [],
      locations: [],
      climate: '',
      terrain: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Add the new region directly to the regions array
    setRegions(prev => [...prev, newRegion])
    setLastAddedId(newRegion.id)
  }

  const handleAddCity = (regionId: string, name: string, description: string) => {
    // Generate a new unique ID
    const newId = `city-${Date.now()}`
    
    // Get a random banner
    const bannerKeys = Object.keys(dungeonBanners)
    const randomBanner = dungeonBanners[bannerKeys[Math.floor(Math.random() * bannerKeys.length)] as keyof typeof dungeonBanners]
    
    const newCity: City = {
      id: newId,
      name,
      description,
      population: '0',
      government: 'Unknown',
      economy: 'Developing',
      culture: 'Mixed',
      history: '',
      notableLocations: [],
      threats: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      seasons: [],
      magicalItems: [],
      dungeons: [],
      pointsOfInterest: [],
      restAreas: [],
      shops: [],
      transportationRoutes: []
    }

    // Add the new city to the region
    setRegions(prev => prev.map((region: Region) => {
      if (region.id === regionId) {
        return {
          ...region,
          cities: [...region.cities, newCity]
        }
      }
      return region
    }))
    
    setLastAddedId(newCity.id)
  }

  const handleSaveRegion = () => {
    if (newRegionData.name) {
      const newRegion: Region = {
        ...newRegionData as Region,
        id: `region-${Date.now()}`,
        name: newRegionData.name,
        description: newRegionData.description || '',
        cities: newRegionData.cities || []
      }

      setRegions(prev => [...prev, newRegion])
      setIsAddingRegion(false)
      setNewRegionData({})
      setLastAddedId(newRegion.id)
    }
  }

  const handleSaveCity = (regionId: string) => {
    if (newCityData.name) {
      const newCity: City = {
        ...newCityData as City,
        id: `city-${Date.now()}`,
        name: newCityData.name,
        description: newCityData.description || '',
        dungeons: [],
        pointsOfInterest: [],
        restAreas: [],
        shops: []
      }

      setRegions(prev => prev.map((region: Region) => {
        if (region.id === regionId) {
          return {
            ...region,
            cities: [...region.cities, newCity]
          }
        }
        return region
      }))
      setIsAddingCity(false)
      setNewCityData({})
      setLastAddedId(newCity.id)
    }
  }

  return {
    regions,
    isAddingRegion,
    isAddingCity,
    newRegionData,
    newCityData,
    handleAddRegion,
    handleAddCity,
    handleSaveRegion,
    handleSaveCity,
    setIsAddingRegion,
    setIsAddingCity,
    setNewRegionData,
    setNewCityData,
    lastAddedId,
    isLoading,
    error
  }
} 