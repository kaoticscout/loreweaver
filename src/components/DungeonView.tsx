import { City } from '../types/location'
import { DungeonEncounter } from '../types/dungeonEncounter'
import { InformationCircleIcon, BookOpenIcon, SparklesIcon, MapPinIcon, ShieldExclamationIcon, UserGroupIcon, CurrencyDollarIcon, PuzzlePieceIcon, ChatBubbleLeftRightIcon, BoltIcon, XMarkIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useRef, useEffect, useState } from 'react'
import { useBorderColor } from '../hooks/useBorderColor'
import { DatabaseService } from '../services/database'
import { useWorld } from '../contexts/WorldContext'
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
  dungeon: City['dungeons'][0]
  onBack: () => void
  onClose: () => void
}

export function DungeonView({ dungeon, onBack, onClose }: DungeonViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const defaultColor = useBorderColor()
  const { selectedWorld } = useWorld()
  const [loading, setLoading] = useState(false)

  // Environment images for carousel
  const spotlightImages = [
    ...(dungeon.images || []),
    '/art/environments/Saltmarsh_1920x1080_WallpaperTemplate.png',
    '/art/environments/dnd_idrfm_wall1_1920.png',
    '/art/environments/1920x1080-terrain-wa.png',
  ]

  useEffect(() => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'auto' })
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [dungeon])

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
          coordinates={undefined} // Dungeons don't have coordinates
          notableFeatures={[]} // Dungeons don't have notable features
          borderColor={defaultColor}
        />

        {/* Basic Information */}
        <BasicInformationSection
          entity={{
            basicInformation: {
              population: `Difficulty: ${dungeon.difficulty}`,
              primaryRaces: [dungeon.environment]
            }
          }}
          borderColor={defaultColor}
        />

        {/* Hazards */}
        {dungeon.hazards?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldExclamationIcon className="w-5 h-5" />
              <h4 className="text-xl font-semibold">Hazards</h4>
            </div>
            <div className={`bg-gray-800/40 rounded-lg p-4 border ${defaultColor.borderSecondary}`}>
              <ul className="list-disc list-inside space-y-2">
                {dungeon.hazards.map((hazard, index) => (
                  <li key={index} className="text-gray-300">{hazard}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Rewards */}
        {dungeon.rewards?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CurrencyDollarIcon className="w-5 h-5" />
              <h4 className="text-xl font-semibold">Rewards</h4>
            </div>
            <div className={`bg-gray-800/40 rounded-lg p-4 border ${defaultColor.borderSecondary}`}>
              <ul className="list-disc list-inside space-y-2">
                {dungeon.rewards.map((reward, index) => (
                  <li key={index} className="text-gray-300">{reward}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Encounters */}
        <EncountersSection
          encounters={dungeon.encounters}
          borderColor={defaultColor}
          loading={loading}
        />
      </div>
    </div>
  )
} 