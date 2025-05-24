import { Location } from '../types/location'
import { InformationCircleIcon, BookOpenIcon, BanknotesIcon, SparklesIcon, MapPinIcon, UserGroupIcon, BuildingStorefrontIcon, HomeIcon, XMarkIcon, ArrowLeftIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline'
import { useState, useEffect, useRef } from 'react'
import { useBorderColor } from '../hooks/useBorderColor'
import { 
  LocationSection, 
  BasicInformationSection, 
  BiographySection,
  SpotlightCarousel
} from './shared/LocationComponents'

interface LocationViewProps {
  location: Location
  onClose: () => void
  onBack: () => void
  borderColor?: {
    name: string;
    borderPrimary: string;
    borderSecondary: string;
    bgEdge: string;
    accent: string;
    borderImage: string;
  }
}

export function LocationView({
  location,
  onClose,
  onBack,
  borderColor: borderColorProp
}: LocationViewProps) {
  const defaultColor = useBorderColor();
  const borderColor = borderColorProp || defaultColor;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'auto' });
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location]);

  // Get location type badge color
  const getTypeBadgeColor = (type: Location['type']) => {
    switch (type) {
      case 'Village':
        return 'bg-blue-500/80';
      case 'Landmark':
        return 'bg-purple-500/80';
      case 'Ruins':
        return 'bg-red-500/80';
      case 'Stronghold':
        return 'bg-yellow-500/80';
      case 'Fort':
        return 'bg-orange-500/80';
      case 'Point of Interest':
        return 'bg-green-500/80';
      case 'Shop':
        return 'bg-emerald-500/80';
      case 'City':
        return 'bg-indigo-500/80';
      case 'Large City':
        return 'bg-violet-500/80';
      default:
        return 'bg-gray-500/80';
    }
  };

  return (
    <div ref={containerRef} className="space-y-6">
      <div className="sticky top-0 z-30 bg-gray-900/95 shadow-lg rounded-t-xl px-8 py-5 flex items-center gap-4 -mt-8" style={{ minHeight: '72px' }}>
        <button
          onClick={onBack}
          className="p-1 hover:bg-gray-700/50 rounded-lg transition-colors"
          aria-label="Back"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h2 className="text-4xl font-bold text-white">{location.name}</h2>
        <span className={`px-2 py-0.5 ${getTypeBadgeColor(location.type)} rounded text-sm font-medium`}>
          {location.type}
        </span>
        <button
          onClick={onClose}
          className="ml-auto p-1 hover:bg-gray-700/50 rounded-lg transition-colors"
          aria-label="Close"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="px-8 pt-8">
        <SpotlightCarousel 
          images={location.images || [
            '/art/environments/Saltmarsh_1920x1080_WallpaperTemplate.png',
            '/art/environments/dnd_idrfm_wall1_1920.png',
            '/art/environments/1920x1080-terrain-wa.png',
          ]}
          borderColor={borderColor} 
        />

        <div className="space-y-6 mt-6">
          <LocationSection
            name={location.name}
            description={location.description}
            coordinates={location.coordinates ? [location.coordinates.x, location.coordinates.y] : [0, 0]}
            notableFeatures={location.notableFeatures || []}
            borderColor={borderColor}
          />

          {/* Type-specific sections */}
          {(location.type === 'Village' || location.type === 'City' || location.type === 'Large City') && (
            <div className={`bg-gray-800/40 rounded-xl border ${borderColor.borderSecondary} p-6`}>
              <div className="flex items-center gap-2 mb-4">
                <HomeIcon className="w-6 h-6 text-blue-400" />
                <h3 className="text-2xl font-semibold">Settlement Details</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium text-blue-300 mb-2">Population</h4>
                  <p className="text-gray-300">{location.population?.toLocaleString()}</p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-blue-300 mb-2">Primary Races</h4>
                  <ul className="list-disc list-inside text-gray-300">
                    {location.primaryRaces?.map((race, index) => (
                      <li key={index}>{race}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-blue-300 mb-2">Local Government</h4>
                  <p className="text-gray-300">{location.localGovernment}</p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-blue-300 mb-2">Services</h4>
                  <ul className="list-disc list-inside text-gray-300">
                    {location.services?.map((service, index) => (
                      <li key={index}>{service}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {location.type === 'Landmark' && (
            <div className={`bg-gray-800/40 rounded-xl border ${borderColor.borderSecondary} p-6`}>
              <div className="flex items-center gap-2 mb-4">
                <SparklesIcon className="w-6 h-6 text-purple-400" />
                <h3 className="text-2xl font-semibold">Landmark Details</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium text-purple-300 mb-2">Significance</h4>
                  <p className="text-gray-300">{location.significance}</p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-purple-300 mb-2">History</h4>
                  <p className="text-gray-300">{location.history}</p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-purple-300 mb-2">Notable Features</h4>
                  <ul className="list-disc list-inside text-gray-300">
                    {location.notableFeatures?.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                {location.visitingHours && (
                  <div>
                    <h4 className="text-lg font-medium text-purple-300 mb-2">Visiting Hours</h4>
                    <p className="text-gray-300">{location.visitingHours}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {location.type === 'Ruins' && (
            <div className={`bg-gray-800/40 rounded-xl border ${borderColor.borderSecondary} p-6`}>
              <div className="flex items-center gap-2 mb-4">
                <SparklesIcon className="w-6 h-6 text-red-400" />
                <h3 className="text-2xl font-semibold">Ruins Details</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium text-red-300 mb-2">Age</h4>
                  <p className="text-gray-300">{location.age}</p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-red-300 mb-2">Original Purpose</h4>
                  <p className="text-gray-300">{location.originalPurpose}</p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-red-300 mb-2">Current State</h4>
                  <p className="text-gray-300">{location.currentState}</p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-red-300 mb-2">Dangers</h4>
                  <ul className="list-disc list-inside text-gray-300">
                    {location.dangers?.map((danger, index) => (
                      <li key={index}>{danger}</li>
                    ))}
                  </ul>
                </div>
                {location.treasures && location.treasures.length > 0 && (
                  <div>
                    <h4 className="text-lg font-medium text-red-300 mb-2">Treasures</h4>
                    <ul className="list-disc list-inside text-gray-300">
                      {location.treasures.map((treasure, index) => (
                        <li key={index}>{treasure}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {location.type === 'Stronghold' && (
            <div className={`bg-gray-800/40 rounded-xl border ${borderColor.borderSecondary} p-6`}>
              <div className="flex items-center gap-2 mb-4">
                <ShieldExclamationIcon className="w-6 h-6 text-yellow-400" />
                <h3 className="text-2xl font-semibold">Stronghold Details</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium text-yellow-300 mb-2">Owner</h4>
                  <p className="text-gray-300">{location.owner}</p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-yellow-300 mb-2">Garrison</h4>
                  <p className="text-gray-300">{location.garrison} troops</p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-yellow-300 mb-2">Defenses</h4>
                  <ul className="list-disc list-inside text-gray-300">
                    {location.defenses?.map((defense, index) => (
                      <li key={index}>{defense}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-yellow-300 mb-2">Notable Features</h4>
                  <ul className="list-disc list-inside text-gray-300">
                    {location.notableFeatures?.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-yellow-300 mb-2">Access</h4>
                  <p className="text-gray-300">{location.access}</p>
                </div>
              </div>
            </div>
          )}

          {location.type === 'Fort' && (
            <div className={`bg-gray-800/40 rounded-xl border ${borderColor.borderSecondary} p-6`}>
              <div className="flex items-center gap-2 mb-4">
                <ShieldExclamationIcon className="w-6 h-6 text-orange-400" />
                <h3 className="text-2xl font-semibold">Fort Details</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium text-orange-300 mb-2">Commander</h4>
                  <p className="text-gray-300">{location.commander}</p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-orange-300 mb-2">Garrison</h4>
                  <p className="text-gray-300">{location.garrison} troops</p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-orange-300 mb-2">Purpose</h4>
                  <p className="text-gray-300">{location.purpose}</p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-orange-300 mb-2">Defenses</h4>
                  <ul className="list-disc list-inside text-gray-300">
                    {location.defenses?.map((defense, index) => (
                      <li key={index}>{defense}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-orange-300 mb-2">Access</h4>
                  <p className="text-gray-300">{location.access}</p>
                </div>
              </div>
            </div>
          )}

          {location.type === 'Point of Interest' && (
            <div className={`bg-gray-800/40 rounded-xl border ${borderColor.borderSecondary} p-6`}>
              <div className="flex items-center gap-2 mb-4">
                <SparklesIcon className="w-6 h-6 text-green-400" />
                <h3 className="text-2xl font-semibold">Point of Interest Details</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium text-green-300 mb-2">Significance</h4>
                  <p className="text-gray-300">{location.significance}</p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-green-300 mb-2">Features</h4>
                  <ul className="list-disc list-inside text-gray-300">
                    {location.features?.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                {location.visitingHours && (
                  <div>
                    <h4 className="text-lg font-medium text-green-300 mb-2">Visiting Hours</h4>
                    <p className="text-gray-300">{location.visitingHours}</p>
                  </div>
                )}
                {location.restrictions && location.restrictions.length > 0 && (
                  <div>
                    <h4 className="text-lg font-medium text-green-300 mb-2">Restrictions</h4>
                    <ul className="list-disc list-inside text-gray-300">
                      {location.restrictions.map((restriction, index) => (
                        <li key={index}>{restriction}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {location.type === 'Shop' && (
            <div className={`bg-gray-800/40 rounded-xl border ${borderColor.borderSecondary} p-6`}>
              <div className="flex items-center gap-2 mb-4">
                <BuildingStorefrontIcon className="w-6 h-6 text-emerald-400" />
                <h3 className="text-2xl font-semibold">Shop Details</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium text-emerald-300 mb-2">Owner</h4>
                  <p className="text-gray-300">{location.owner}</p>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-emerald-300 mb-2">Specialties</h4>
                  <ul className="list-disc list-inside text-gray-300">
                    {location.specialties?.map((specialty, index) => (
                      <li key={index}>{specialty}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-emerald-300 mb-2">Inventory</h4>
                  <ul className="list-disc list-inside text-gray-300">
                    {location.inventory?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-emerald-300 mb-2">Services</h4>
                  <ul className="list-disc list-inside text-gray-300">
                    {location.services?.map((service, index) => (
                      <li key={index}>{service}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-emerald-300 mb-2">Hours</h4>
                  <p className="text-gray-300">{location.hours}</p>
                </div>
                {location.additionalInfo && (
                  <div className="space-y-4">
                    {location.additionalInfo.history && (
                      <div>
                        <h4 className="text-lg font-medium text-emerald-300 mb-2">History</h4>
                        <p className="text-gray-300">{location.additionalInfo.history}</p>
                      </div>
                    )}
                    {location.additionalInfo.notableFeatures && (
                      <div>
                        <h4 className="text-lg font-medium text-emerald-300 mb-2">Notable Features</h4>
                        <ul className="list-disc list-inside text-gray-300">
                          {location.additionalInfo.notableFeatures.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {location.additionalInfo.specialEvents && (
                      <div>
                        <h4 className="text-lg font-medium text-emerald-300 mb-2">Special Events</h4>
                        <ul className="list-disc list-inside text-gray-300">
                          {location.additionalInfo.specialEvents.map((event, index) => (
                            <li key={index}>{event}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {location.additionalInfo.restrictions && (
                      <div>
                        <h4 className="text-lg font-medium text-emerald-300 mb-2">Restrictions</h4>
                        <ul className="list-disc list-inside text-gray-300">
                          {location.additionalInfo.restrictions.map((restriction, index) => (
                            <li key={index}>{restriction}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {location.additionalInfo.prices && (
                      <div>
                        <h4 className="text-lg font-medium text-emerald-300 mb-2">Prices</h4>
                        <div className="space-y-2">
                          <p className="text-gray-300"><span className="text-emerald-300">Common:</span> {location.additionalInfo.prices.common}</p>
                          <p className="text-gray-300"><span className="text-emerald-300">Rare:</span> {location.additionalInfo.prices.rare}</p>
                          <p className="text-gray-300"><span className="text-emerald-300">Legendary:</span> {location.additionalInfo.prices.legendary}</p>
                        </div>
                      </div>
                    )}
                    {location.additionalInfo.payment && (
                      <div>
                        <h4 className="text-lg font-medium text-emerald-300 mb-2">Payment</h4>
                        <div className="space-y-2">
                          <p className="text-gray-300"><span className="text-emerald-300">Accepted:</span> {location.additionalInfo.payment.accepted.join(', ')}</p>
                          <p className="text-gray-300"><span className="text-emerald-300">Preferred:</span> {location.additionalInfo.payment.preferred}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {location.type === 'Other' && (
            <div className={`bg-gray-800/40 rounded-xl border ${borderColor.borderSecondary} p-6`}>
              <div className="flex items-center gap-2 mb-4">
                <InformationCircleIcon className="w-6 h-6 text-gray-400" />
                <h3 className="text-2xl font-semibold">Custom Details</h3>
              </div>
              <div className="space-y-4">
                {Object.entries(location.customFields).map(([key, value]) => (
                  <div key={key}>
                    <h4 className="text-lg font-medium text-gray-300 mb-2">{key}</h4>
                    <p className="text-gray-300">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 