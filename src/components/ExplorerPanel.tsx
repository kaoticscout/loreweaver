import { Region } from '../types/region'
import { City } from '../types/city'
import { Location } from '../types/location'
import { useState } from 'react'
import React from 'react'
import { getLocationIcon } from '../utils/locationIcons'

interface ExplorerPanelProps {
  regions: Region[]
  selectedRegion: Region | null
  selectedLocation: City | Location | null
  onRegionSelect: (region: Region | null) => void
  onLocationSelect: (location: City | Location | null) => void
  onAddRegion: (name: string, description: string) => void
  onAddCity: (regionId: string, name: string, description: string) => void
  onBack: () => void
  onHome: () => void
  expandedRegions: Record<string, boolean>
  onExpandedRegionsChange: (expandedRegions: Record<string, boolean>) => void
  isVisible: boolean
  onToggleVisibility: () => void
}

interface AddModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (name: string, description: string) => void
  title: string
}

function AddModal({ isOpen, onClose, onSubmit, title }: AddModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(name, description)
    setName('')
    setDescription('')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export function ExplorerPanel({
  regions,
  selectedRegion,
  selectedLocation,
  onRegionSelect,
  onLocationSelect,
  onAddRegion,
  onAddCity,
  onBack,
  onHome,
  expandedRegions,
  onExpandedRegionsChange,
  isVisible,
  onToggleVisibility
}: ExplorerPanelProps) {
  const [isAddRegionModalOpen, setIsAddRegionModalOpen] = useState(false)
  const [isAddCityModalOpen, setIsAddCityModalOpen] = useState(false)

  const handleAddRegionSubmit = (name: string, description: string) => {
    onAddRegion(name, description)
    setIsAddRegionModalOpen(false)
  }

  const handleAddCitySubmit = (name: string, description: string) => {
    if (selectedRegion) {
      onAddCity(selectedRegion.id, name, description)
      setIsAddCityModalOpen(false)
    }
  }

  return (
    <>
      {/* Explorer Panel */}
      <div className="h-full bg-[#181622]/90 border-l border-[#B67C3C]/30 backdrop-blur-lg flex flex-col p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-[#B67C3C]/30 scrollbar-track-transparent font-sans explorer-scrollbar">
        <div className="mb-6">
          <h1 className="text-2xl font-bold" style={{ fontFamily: '"Cinzel Decorative", serif', color: '#fcedbe', letterSpacing: '0.04em' }}>World Explorer</h1>
        </div>

        {/* Full Hierarchy */}
        <div>
          <h2 className="text-xs font-semibold text-[#B67C3C] mb-3 tracking-widest uppercase font-medium">Regions</h2>
          <div className="space-y-2">
            {regions.map((region) => {
              const isExpanded = expandedRegions[region.id] || false
              const isSelected = selectedRegion?.id === region.id
              const hasSelectedLocation = selectedLocation && (
                (region.cities || []).some(city => city.id === selectedLocation.id) ||
                (region.locations || []).some(loc => loc.id === selectedLocation.id)
              )
              
              return (
                <div key={region.id} className="space-y-1">
                  <div className="flex items-center gap-1">
                    {((region.cities || []).length > 0 || (region.locations || []).length > 0) && (
                      <button
                        onClick={() => onExpandedRegionsChange({ ...expandedRegions, [region.id]: !isExpanded })}
                        className="focus:outline-none"
                        aria-label={isExpanded ? 'Collapse region' : 'Expand region'}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </button>
                    )}
                    <button
                      onClick={() => {
                        onRegionSelect(region);
                        console.log(`[Debug] Selected region in ExplorerPanel:`, region);
                        onExpandedRegionsChange({
                          ...Object.keys(expandedRegions).reduce((acc, key) => ({
                            ...acc,
                            [key]: false
                          }), {}),
                          [region.id]: true
                        });
                      }}
                      className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium shadow-none border border-transparent focus:border-[#B67C3C] outline-none focus:outline-none text-base text-left
                        ${isSelected ? 'bg-[#B67C3C]/80 text-[#181622] font-bold' : 'text-[#fcedbe] hover:bg-[#B67C3C]/10 hover:text-[#B67C3C]'}
                      `}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#fcedbe] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {region.name}
                    </button>
                  </div>
                  
                  {isExpanded && (
                    <div className="ml-4 pl-3 border-l-2 border-[#B67C3C]/40 relative">
                      {/* Cities */}
                      {(region.cities || []).map((city) => (
                        <button
                          key={city.id}
                          onClick={() => {
                            console.log(`[Debug] Clicking city in ExplorerPanel:`, city);
                            onLocationSelect(city);
                          }}
                          className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium shadow-none border border-transparent focus:border-[#B67C3C] outline-none focus:outline-none text-base text-left
                            ${selectedLocation?.id === city.id ? 'bg-[#B67C3C]/80 text-[#181622] font-bold' : 'text-[#fcedbe] hover:bg-[#B67C3C]/10 hover:text-[#B67C3C]'}
                            ${isSelected && selectedLocation?.id === city.id ? 'ring-2 ring-[#B67C3C]' : ''}
                          `}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#fcedbe] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /></svg>
                          {city.name}
                        </button>
                      ))}

                      {/* Locations */}
                      {(region.locations || []).map((location) => (
                        <button
                          key={location.id}
                          onClick={() => {
                            console.log(`[Debug] Clicking location in ExplorerPanel:`, location);
                            onLocationSelect(location);
                          }}
                          className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium shadow-none border border-transparent focus:border-[#B67C3C] outline-none focus:outline-none text-base text-left
                            ${selectedLocation?.id === location.id ? 'bg-[#B67C3C]/80 text-[#181622] font-bold' : 'text-[#fcedbe] hover:bg-[#B67C3C]/10 hover:text-[#B67C3C]'}
                            ${isSelected && selectedLocation?.id === location.id ? 'ring-2 ring-[#B67C3C]' : ''}
                          `}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#fcedbe] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {location.name}
                        </button>
                      ))}

                      {/* Add City button for selected region */}
                      {isSelected && (
                        <button
                          onClick={() => setIsAddCityModalOpen(true)}
                          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#181622] text-[#fcedbe] font-bold rounded-lg shadow hover:bg-[#1E1B2B] border border-[#B67C3C]/30 transition-all focus:outline-none focus:ring-2 focus:ring-[#B67C3C] focus:ring-offset-2 text-base mt-1"
                        >
                          <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' /></svg>
                          Add City
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
            <button
              onClick={() => setIsAddRegionModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#181622] text-[#fcedbe] font-bold rounded-lg shadow hover:bg-[#1E1B2B] border border-[#B67C3C]/30 transition-all focus:outline-none focus:ring-2 focus:ring-[#B67C3C] focus:ring-offset-2 text-base mt-2"
            >
              <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' /></svg>
              Add Region
            </button>
          </div>
        </div>
      </div>

      <AddModal
        isOpen={isAddRegionModalOpen}
        onClose={() => setIsAddRegionModalOpen(false)}
        onSubmit={handleAddRegionSubmit}
        title="Add New Region"
      />

      <AddModal
        isOpen={isAddCityModalOpen}
        onClose={() => setIsAddCityModalOpen(false)}
        onSubmit={handleAddCitySubmit}
        title="Add New City"
      />
    </>
  )
} 