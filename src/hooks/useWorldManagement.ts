import { useState } from 'react'
import { Region } from '../types/region'
import { City } from '../types/city'
import { dungeonBanners } from '../../public/art/banners'

export function useWorldManagement(initialRegions: Region[]) {
  const [regions, setRegions] = useState<Region[]>(initialRegions)
  const [isAddingRegion, setIsAddingRegion] = useState(false)
  const [isAddingCity, setIsAddingCity] = useState(false)
  const [newRegionData, setNewRegionData] = useState<Partial<Region>>({})
  const [newCityData, setNewCityData] = useState<Partial<City>>({})
  const [lastAddedId, setLastAddedId] = useState<string | null>(null)

  const handleAddRegion = (name: string, description: string) => {
    // Select a random existing region as template
    const randomRegion = regions.find((r: Region) => true)
    
    // Generate a new unique ID
    const newId = `region-${Date.now()}`
    
    // Get a random banner
    const bannerKeys = Object.keys(dungeonBanners)
    const randomBanner = dungeonBanners[bannerKeys[Math.floor(Math.random() * bannerKeys.length)] as keyof typeof dungeonBanners]
    
    const newRegion: Region = {
      id: newId,
      name,
      description,
      biography: randomRegion?.biography || '',
      color: randomRegion?.color || '',
      banner: randomBanner,
      notableFeatures: [...(randomRegion?.notableFeatures || [])],
      history: {
        founding: randomRegion?.history.founding || '',
        majorEvents: [...(randomRegion?.history.majorEvents || [])],
        currentEra: randomRegion?.history.currentEra || ''
      },
      keyFigures: randomRegion?.keyFigures.map((figure: any) => ({
        ...figure,
        id: `${newId}-figure-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      })) || [],
      economy: {
        primaryIndustry: randomRegion?.economy.primaryIndustry || '',
        gdp: randomRegion?.economy.gdp || '',
        currency: randomRegion?.economy.currency || '',
        tradeGoods: randomRegion?.economy.tradeGoods.map((good: any) => ({
          ...good,
          name: `${good.name} (Copy)`
        })) || [],
        tradePartners: randomRegion?.economy.tradePartners.map((partner: any) => ({
          ...partner,
          name: `${partner.name} (Copy)`,
          primaryGoods: [...partner.primaryGoods]
        })) || [],
        transportationRoutes: randomRegion?.economy.transportationRoutes.map((route: any) => ({
          ...route,
          name: `${route.name} (Copy)`
        })) || [],
        economicPolicies: [...(randomRegion?.economy.economicPolicies || [])],
        marketRegulations: [...(randomRegion?.economy.marketRegulations || [])]
      },
      seasons: (randomRegion?.seasons.filter((s: any) => 'season' in s).map((season: any) => ({
        ...season,
        season: `${season.season} (Copy)`
      })) || []),
      magicalItems: (randomRegion?.magicalItems.filter((m: any) => !('history' in m)).map((item: any) => ({
        ...item,
        id: `${newId}-item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: `${item.name} (Copy)`,
        requirements: item.requirements || []
      })) || []),
      cities: randomRegion?.cities.map((city: City) => ({
        ...city,
        id: `${newId}-city-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: `${city.name} (Copy)`,
        description: `${city.description} (Copy)`,
        keyFigures: city.keyFigures.map((figure: any) => ({
          ...figure,
          id: `${newId}-city-${Date.now()}-figure-${Math.random().toString(36).substr(2, 9)}`,
          name: `${figure.name} (Copy)`
        })) || [],
        magicalItems: city.magicalItems.map((item: any) => ({
          ...item,
          id: `${newId}-city-${Date.now()}-item-${Math.random().toString(36).substr(2, 9)}`,
          name: `${item.name} (Copy)`,
          effects: [...(item.effects || [])],
          requirements: [...(item.requirements || [])]
        })) || []
      })) || []
    }

    // Add the new region directly to the regions array
    setRegions(prev => [...prev, newRegion])
    setLastAddedId(newRegion.id)
  }

  const handleAddCity = (regionId: string, name: string, description: string) => {
    // Find the current region
    const currentRegion = regions.find((r: Region) => r.id === regionId)
    if (!currentRegion) return

    // Select a random existing city as template
    const randomCity = currentRegion.cities.find((c: City) => true)
    
    // Generate a new unique ID
    const newId = `city-${Date.now()}`
    
    // Get a random banner
    const bannerKeys = Object.keys(dungeonBanners)
    const randomBanner = dungeonBanners[bannerKeys[Math.floor(Math.random() * bannerKeys.length)] as keyof typeof dungeonBanners]
    
    const newCity: City = {
      id: newId,
      name,
      description,
      coordinates: randomCity?.coordinates || [0, 0],
      image: randomCity?.image || '🏰',
      banner: randomBanner,
      history: {
        founding: `${randomCity?.history.founding} (Copy)`,
        majorEvents: randomCity?.history.majorEvents.map((event: string) => `${event} (Copy)`) || [],
        currentEra: `${randomCity?.history.currentEra} (Copy)`
      },
      notableFeatures: randomCity?.notableFeatures.map((feature: string) => `${feature} (Copy)`) || [],
      keyFigures: randomCity?.keyFigures.map((figure: any) => ({
        ...figure,
        id: `${newId}-figure-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: `${figure.name} (Copy)`,
        title: `${figure.title} (Copy)`
      })) || [],
      economy: {
        primaryIndustry: `${randomCity?.economy.primaryIndustry} (Copy)`,
        gdp: randomCity?.economy.gdp || '',
        currency: randomCity?.economy.currency || '',
        tradeGoods: randomCity?.economy.tradeGoods.map((good: any) => ({
          ...good,
          name: `${good.name} (Copy)`
        })) || [],
        tradePartners: randomCity?.economy.tradePartners.map((partner: any) => ({
          ...partner,
          name: `${partner.name} (Copy)`,
          primaryGoods: [...partner.primaryGoods]
        })) || [],
        transportationRoutes: randomCity?.economy.transportationRoutes.map((route: any) => ({
          ...route,
          name: `${route.name} (Copy)`
        })) || [],
        marketRegulations: randomCity?.economy.marketRegulations.map((reg: string) => `${reg} (Copy)`) || [],
        economicPolicies: randomCity?.economy.economicPolicies.map((policy: string) => `${policy} (Copy)`) || []
      },
      seasons: (randomCity?.seasons.filter((s: any) => 'name' in s).map((season: any) => ({
        ...season,
        name: `${season.name} (Copy)`
      })) || []),
      magicalItems: randomCity?.magicalItems.map((item: any) => ({
        ...item,
        id: `${newId}-item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: `${item.name} (Copy)`,
        effects: [...(item.effects || [])],
        requirements: [...(item.requirements || [])]
      })) || [],
      dungeons: [],
      pointsOfInterest: [],
      restAreas: [],
      shops: [],
      basicInformation: {
        population: randomCity?.basicInformation.population || '0',
        primaryRaces: randomCity?.basicInformation.primaryRaces || [],
        wealthClass: randomCity?.basicInformation.wealthClass || 'Unknown',
        politicalStructure: randomCity?.basicInformation.politicalStructure || 'Unknown',
        deities: randomCity?.basicInformation.deities.map((deity: any) => ({
          ...deity,
          name: `${deity.name} (Copy)`
        })) || []
      }
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
        coordinates: newCityData.coordinates || [0, 0],
        image: newCityData.image || '🏰',
        banner: newCityData.banner || '',
        history: newCityData.history || {
          founding: '',
          majorEvents: [],
          currentEra: ''
        },
        notableFeatures: newCityData.notableFeatures || [],
        keyFigures: newCityData.keyFigures || [],
        economy: newCityData.economy || {
          primaryIndustry: '',
          gdp: '',
          currency: '',
          tradeGoods: [],
          tradePartners: [],
          transportationRoutes: [],
          economicPolicies: [],
          marketRegulations: []
        },
        seasons: newCityData.seasons || [],
        magicalItems: newCityData.magicalItems || [],
        dungeons: [],
        pointsOfInterest: [],
        restAreas: [],
        shops: [],
        basicInformation: {
          population: newCityData.basicInformation?.population || '0',
          primaryRaces: newCityData.basicInformation?.primaryRaces || [],
          wealthClass: newCityData.basicInformation?.wealthClass || 'Unknown',
          politicalStructure: newCityData.basicInformation?.politicalStructure || 'Unknown',
          deities: newCityData.basicInformation?.deities || []
        }
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
    lastAddedId,
    handleAddRegion,
    handleAddCity,
    handleSaveRegion,
    handleSaveCity,
    setRegions,
    setLastAddedId,
    setIsAddingRegion,
    setIsAddingCity
  }
} 