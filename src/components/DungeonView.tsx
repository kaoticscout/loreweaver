import { Dungeon } from '../types/city'
import { DungeonEncounter } from '../types/dungeon-encounter'
import { InformationCircleIcon, BookOpenIcon, SparklesIcon, MapPinIcon, ShieldExclamationIcon, UserGroupIcon, CurrencyDollarIcon, PuzzlePieceIcon, ChatBubbleLeftRightIcon, BoltIcon, XMarkIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { levelEncounters } from '../data/worlds/sword-coast/dungeon-encounters/level-encounters'
import { useRef, useEffect } from 'react'
import { useBorderColor } from '../hooks/useBorderColor'
import { 
  LocationSection, 
  BasicInformationSection, 
  BiographySection,
  EncountersSection,
  TreasureSection,
  HeaderSection,
  SpotlightCarousel
} from './shared/LocationComponents'

interface DungeonViewProps {
  dungeon: Dungeon
  onBack: () => void
  onClose: () => void
}

export function DungeonView({ dungeon, onBack, onClose }: DungeonViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const defaultColor = useBorderColor()

  // Environment images for carousel
  const spotlightImages = dungeon.images && dungeon.images.length > 0
    ? dungeon.images
    : [
      '/art/environments/Saltmarsh_1920x1080_WallpaperTemplate.png',
      '/art/environments/dnd_idrfm_wall1_1920.png',
      '/art/environments/1920x1080-terrain-wa.png',
    ]

  useEffect(() => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'auto' })
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [dungeon])

  // Get full encounter data for each encounter ID
  const encounters = dungeon.encounters?.map(encounterId => {
    // Find the encounter in levelEncounters by searching through all levels
    for (const encountersList of Object.values(levelEncounters)) {
      const foundEncounter = encountersList.find((e: DungeonEncounter) => e.id === encounterId)
      if (foundEncounter) return foundEncounter
    }
    return null
  }).filter((encounter): encounter is DungeonEncounter => encounter !== null) || []

  return (
    <div ref={containerRef} className="space-y-6">
      <HeaderSection
        title={dungeon.name}
        type="Dungeon"
        onBack={onBack}
        onClose={onClose}
        containerRef={containerRef}
      />

      <div className="space-y-6 p-6">
        {/* Spotlight Images Carousel */}
        <SpotlightCarousel 
          images={spotlightImages}
          borderColor={defaultColor}
        />

        {/* Location Section */}
        <LocationSection
          name={dungeon.name}
          description={dungeon.description}
          coordinates={[0, 0]} // Dungeons don't have coordinates in the current type
          notableFeatures={[]} // Dungeons don't have notable features in the current type
          borderColor={defaultColor}
        />

        {/* Basic Information */}
        <BasicInformationSection
          entity={{
            basicInformation: {
              population: `Level ${dungeon.level}`,
              primaryRaces: [dungeon.location.environment]
            }
          }}
          borderColor={defaultColor}
        />

        {/* History */}
        <BiographySection
          biography={dungeon.history}
          borderColor={defaultColor}
        />

        {/* Inhabitants */}
        {dungeon.inhabitants?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <UserGroupIcon className="w-5 h-5" />
              <h4 className="text-xl font-semibold">Inhabitants</h4>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <ul className="list-disc list-inside space-y-2">
                {dungeon.inhabitants.map((inhabitant, index) => (
                  <li key={index} className="text-gray-300">{inhabitant}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Hazards */}
        {dungeon.hazards?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldExclamationIcon className="w-5 h-5" />
              <h4 className="text-xl font-semibold">Hazards</h4>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <ul className="list-disc list-inside space-y-2">
                {dungeon.hazards.map((hazard, index) => (
                  <li key={index} className="text-gray-300">{hazard}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Treasure */}
        {dungeon.treasure && (
          <TreasureSection
            treasure={dungeon.treasure}
            borderColor={defaultColor}
          />
        )}

        {/* Encounters */}
        <EncountersSection
          encounters={encounters}
          borderColor={defaultColor}
        />
      </div>
    </div>
  )
} 