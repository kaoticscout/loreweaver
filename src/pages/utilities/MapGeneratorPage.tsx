import { useState } from 'react';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

interface MapFeature {
  id: string;
  name: string;
  type: string;
  description: string;
  location: string;
}

interface Region {
  id: string;
  name: string;
  type: string;
  description: string;
  features: MapFeature[];
}

interface GeneratedMap {
  name: string;
  description: string;
  climate: string;
  size: string;
  regions: Region[];
  landmarks: MapFeature[];
  timestamp: number;
}

type MapSize = 'small' | 'medium' | 'large';
type Climate = 'temperate' | 'tropical' | 'arctic' | 'desert';

export function MapGeneratorPage() {
  const [selectedSize, setSelectedSize] = useState<MapSize>('medium');
  const [selectedClimate, setSelectedClimate] = useState<Climate>('temperate');
  const [generatedMaps, setGeneratedMaps] = useState<GeneratedMap[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const sizes = [
    { id: 'small', name: 'Small', description: 'Local area (20x20 miles)' },
    { id: 'medium', name: 'Medium', description: 'Regional (50x50 miles)' },
    { id: 'large', name: 'Large', description: 'Kingdom (100x100 miles)' }
  ];

  const climates = [
    { id: 'temperate', name: 'Temperate', description: 'Moderate seasons with varied terrain' },
    { id: 'tropical', name: 'Tropical', description: 'Warm and humid with dense vegetation' },
    { id: 'arctic', name: 'Arctic', description: 'Cold climate with snow and ice' },
    { id: 'desert', name: 'Desert', description: 'Hot and arid with sparse vegetation' }
  ];

  const regionTypes: Record<Climate, string[]> = {
    temperate: [
      'Rolling Hills', 'Dense Forest', 'Open Plains',
      'River Valley', 'Coastal Region', 'Highland'
    ],
    tropical: [
      'Rainforest', 'Coastal Jungle', 'River Delta',
      'Volcanic Islands', 'Mangrove Swamp', 'Tropical Savanna'
    ],
    arctic: [
      'Frozen Tundra', 'Ice Fields', 'Snow-capped Mountains',
      'Frozen Forest', 'Glacial Valley', 'Arctic Coast'
    ],
    desert: [
      'Sand Dunes', 'Rocky Wasteland', 'Salt Flats',
      'Desert Mountains', 'Oasis Region', 'Canyon Lands'
    ]
  };

  const landmarkTypes: Record<Climate, string[]> = {
    temperate: [
      'Ancient Ruins', 'Sacred Grove', 'Hidden Valley',
      'Mountain Peak', 'Crystal Cave', 'Mystical Spring'
    ],
    tropical: [
      'Temple Ruins', 'Volcanic Peak', 'Hidden Waterfall',
      'Ancient Tree', 'Coral Reef', 'Sacred Lagoon'
    ],
    arctic: [
      'Ice Castle', 'Frozen Lake', 'Crystal Cave',
      'Ancient Glacier', 'Hot Springs', 'Aurora Peak'
    ],
    desert: [
      'Ancient Pyramid', 'Hidden Oasis', 'Rock Formation',
      'Lost City', 'Sacred Well', 'Desert Temple'
    ]
  };

  const generateName = (climate: Climate) => {
    const prefixes = {
      temperate: ['Green', 'Misty', 'Silver', 'Golden', 'Crystal'],
      tropical: ['Emerald', 'Jade', 'Azure', 'Verdant', 'Paradise'],
      arctic: ['Frost', 'Ice', 'Snow', 'Frozen', 'Crystal'],
      desert: ['Sun', 'Sand', 'Golden', 'Burning', 'Ancient']
    };

    const suffixes = {
      temperate: ['Vale', 'Realm', 'Kingdom', 'Land', 'Domain'],
      tropical: ['Isle', 'Coast', 'Paradise', 'Haven', 'Sanctuary'],
      arctic: ['Reach', 'Expanse', 'Frontier', 'Realm', 'Waste'],
      desert: ['Waste', 'Empire', 'Domain', 'Realm', 'Kingdom']
    };

    const prefix = prefixes[climate][Math.floor(Math.random() * prefixes[climate].length)];
    const suffix = suffixes[climate][Math.floor(Math.random() * suffixes[climate].length)];
    return `The ${prefix} ${suffix}`;
  };

  const generateFeature = (type: string, climate: Climate): MapFeature => {
    const descriptions: Record<Climate, string[]> = {
      temperate: [
        'A peaceful area with abundant resources',
        'A mysterious location with ancient secrets',
        'A strategic point with natural defenses',
        'A beautiful spot with unique flora'
      ],
      tropical: [
        'A lush area teeming with life',
        'A dangerous region with hidden treasures',
        'A sacred place of ancient power',
        'A natural wonder of incredible beauty'
      ],
      arctic: [
        'A harsh area of extreme cold',
        'A pristine expanse of ice and snow',
        'A treacherous region of hidden crevasses',
        'A magical place of frozen beauty'
      ],
      desert: [
        'A harsh landscape of endless sand',
        'A mysterious area with ancient secrets',
        'A dangerous region of extreme heat',
        'A rare oasis of life in the wasteland'
      ]
    };

    return {
      id: `feature-${Date.now()}-${Math.random()}`,
      name: `${['Ancient', 'Mystical', 'Sacred', 'Hidden', 'Lost'][Math.floor(Math.random() * 5)]} ${type}`,
      type,
      description: descriptions[climate][Math.floor(Math.random() * descriptions[climate].length)],
      location: `${['Northern', 'Southern', 'Eastern', 'Western', 'Central'][Math.floor(Math.random() * 5)]} region`
    };
  };

  const generateRegion = (climate: Climate): Region => {
    const types = regionTypes[climate];
    const type = types[Math.floor(Math.random() * types.length)];
    
    return {
      id: `region-${Date.now()}-${Math.random()}`,
      name: `${['Northern', 'Southern', 'Eastern', 'Western', 'Central'][Math.floor(Math.random() * 5)]} ${type}`,
      type,
      description: `A ${climate} region characterized by its ${type.toLowerCase()}`,
      features: Array(2).fill(null).map(() => 
        generateFeature(landmarkTypes[climate][Math.floor(Math.random() * landmarkTypes[climate].length)], climate)
      )
    };
  };

  const generateMap = () => {
    setIsGenerating(true);

    // Determine number of regions based on size
    let numRegions;
    switch (selectedSize) {
      case 'small': numRegions = 2; break;
      case 'large': numRegions = 6; break;
      default: numRegions = 4;
    }

    const newMap: GeneratedMap = {
      name: generateName(selectedClimate),
      description: `A ${selectedSize} ${selectedClimate} region with diverse terrain and interesting features`,
      climate: selectedClimate,
      size: selectedSize,
      regions: Array(numRegions).fill(null).map(() => generateRegion(selectedClimate)),
      landmarks: Array(3).fill(null).map(() => 
        generateFeature(landmarkTypes[selectedClimate][Math.floor(Math.random() * landmarkTypes[selectedClimate].length)], selectedClimate)
      ),
      timestamp: Date.now()
    };

    setGeneratedMaps([newMap, ...generatedMaps].slice(0, 3));
    setIsGenerating(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <WrenchScrewdriverIcon className="h-8 w-8 text-purple-400" />
          <h1 className="text-3xl font-bold text-white">Map Generator</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Controls */}
          <div>
            <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4">Generate Map</h2>
              
              {/* Size Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Map Size</label>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map(size => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.id as MapSize)}
                      className={`p-3 rounded-lg border transition-all ${
                        selectedSize === size.id
                          ? 'bg-purple-500/20 border-purple-500 text-white'
                          : 'bg-[#1B0A20] border-purple-500/30 text-gray-300 hover:bg-purple-500/10'
                      }`}
                    >
                      <div className="text-center">
                        <div className="font-medium">{size.name}</div>
                        <div className="text-xs text-gray-400">{size.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Climate Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Climate</label>
                <div className="grid grid-cols-2 gap-2">
                  {climates.map(climate => (
                    <button
                      key={climate.id}
                      onClick={() => setSelectedClimate(climate.id as Climate)}
                      className={`p-4 rounded-lg border transition-all ${
                        selectedClimate === climate.id
                          ? 'bg-purple-500/20 border-purple-500 text-white'
                          : 'bg-[#1B0A20] border-purple-500/30 text-gray-300 hover:bg-purple-500/10'
                      }`}
                    >
                      <div className="text-center">
                        <div className="font-medium">{climate.name}</div>
                        <div className="text-sm text-gray-400">{climate.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={generateMap}
                disabled={isGenerating}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate Map
              </button>
            </div>
          </div>

          {/* Generated Maps */}
          <div className="space-y-8">
            {generatedMaps.map((map, index) => (
              <div
                key={map.timestamp + index}
                className="bg-[#2D1B36] rounded-xl p-6 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-white mb-2">{map.name}</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-300">
                    {map.climate.charAt(0).toUpperCase() + map.climate.slice(1)}
                  </span>
                  <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-300">
                    {map.size.charAt(0).toUpperCase() + map.size.slice(1)}
                  </span>
                </div>
                <p className="text-gray-300 mb-6">{map.description}</p>

                {/* Regions */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Regions</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {map.regions.map(region => (
                        <div
                          key={region.id}
                          className="bg-[#1B0A20] rounded-lg p-4"
                        >
                          <h4 className="font-medium text-white mb-2">{region.name}</h4>
                          <p className="text-gray-400 text-sm mb-3">{region.description}</p>
                          
                          {/* Region Features */}
                          <div className="space-y-2">
                            {region.features.map(feature => (
                              <div
                                key={feature.id}
                                className="bg-black/20 rounded p-2"
                              >
                                <div className="flex justify-between items-start">
                                  <span className="text-purple-300">{feature.name}</span>
                                  <span className="text-xs text-gray-400">{feature.location}</span>
                                </div>
                                <p className="text-gray-400 text-sm mt-1">{feature.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Major Landmarks */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Major Landmarks</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {map.landmarks.map(landmark => (
                        <div
                          key={landmark.id}
                          className="bg-[#1B0A20] rounded-lg p-3"
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-medium text-white">{landmark.name}</span>
                            <span className="text-sm text-purple-300">{landmark.type}</span>
                          </div>
                          <p className="text-gray-400 text-sm">{landmark.description}</p>
                          <p className="text-gray-500 text-sm mt-1">{landmark.location}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {generatedMaps.length === 0 && (
              <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg">
                <p className="text-gray-400 text-center">
                  No maps generated yet
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 