import { useState } from 'react';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { DungeonMap } from '../../components/DungeonMap';

type DungeonSize = 'small' | 'medium' | 'large';
type DungeonTheme = 'ruins' | 'temple' | 'dungeon' | 'cave';

export function BattleMapGeneratorPage() {
  const [selectedSize, setSelectedSize] = useState<DungeonSize>('medium');
  const [selectedTheme, setSelectedTheme] = useState<DungeonTheme>('dungeon');
  const [seed, setSeed] = useState<number>(() => Math.floor(Math.random() * 1000000));

  const sizes = [
    { id: 'small', name: 'Small', description: '5-6 rooms' },
    { id: 'medium', name: 'Medium', description: '8-10 rooms' },
    { id: 'large', name: 'Large', description: '12-15 rooms' }
  ];

  const themes = [
    { id: 'ruins', name: 'Ancient Ruins', description: 'Crumbling structures and forgotten architecture' },
    { id: 'temple', name: 'Temple', description: 'Sacred spaces and religious architecture' },
    { id: 'dungeon', name: 'Dungeon', description: 'Prison cells and torture chambers' },
    { id: 'cave', name: 'Cave System', description: 'Natural caverns and underground formations' }
  ];

  const regenerateMap = () => {
    setSeed(Math.floor(Math.random() * 1000000));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <WrenchScrewdriverIcon className="h-6 w-6 text-purple-500" />
          <h1 className="text-2xl font-bold">Battle Map Generator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Controls Panel */}
          <div className="lg:col-span-1 bg-gray-800 rounded-lg p-4 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-3">Map Size</h2>
              <div className="space-y-2">
                {sizes.map(size => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size.id as DungeonSize)}
                    className={`w-full text-left px-4 py-2 rounded ${
                      selectedSize === size.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    <div className="font-medium">{size.name}</div>
                    <div className="text-sm text-gray-300">{size.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3">Theme</h2>
              <div className="space-y-2">
                {themes.map(theme => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id as DungeonTheme)}
                    className={`w-full text-left px-4 py-2 rounded ${
                      selectedTheme === theme.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    <div className="font-medium">{theme.name}</div>
                    <div className="text-sm text-gray-300">{theme.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={regenerateMap}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Generate New Map
            </button>
          </div>

          {/* Map Display */}
          <div className="lg:col-span-3 bg-gray-800 rounded-lg p-4">
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <DungeonMap
                width={800}
                height={600}
                dungeonSize={selectedSize}
                theme={selectedTheme}
                key={seed} // Force re-render on regenerate
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 