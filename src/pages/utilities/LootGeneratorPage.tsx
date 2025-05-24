import { useState } from 'react';
import { WrenchScrewdriverIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface LootTable {
  name: string;
  items: {
    name: string;
    rarity: string;
    type: string;
    value: string;
    weight: number;
  }[];
}

interface GeneratedLoot {
  items: {
    name: string;
    rarity: string;
    type: string;
    value: string;
  }[];
  totalValue: string;
  timestamp: number;
}

export function LootGeneratorPage() {
  const [selectedTable, setSelectedTable] = useState<string>('low');
  const [generatedLoots, setGeneratedLoots] = useState<GeneratedLoot[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Predefined loot tables
  const lootTables: Record<string, LootTable> = {
    low: {
      name: 'Low-Level Treasure (CR 0-4)',
      items: [
        { name: 'Potion of Healing', rarity: 'Common', type: 'Potion', value: '50 gp', weight: 10 },
        { name: 'Silver Ring', rarity: 'Common', type: 'Jewelry', value: '25 gp', weight: 15 },
        { name: 'Scroll of Magic Missile', rarity: 'Common', type: 'Scroll', value: '75 gp', weight: 8 },
        { name: 'Copper Coins', rarity: 'Common', type: 'Currency', value: '2d6x10 cp', weight: 20 },
        { name: 'Silver Coins', rarity: 'Common', type: 'Currency', value: '2d6x5 sp', weight: 15 },
        { name: 'Gold Coins', rarity: 'Common', type: 'Currency', value: '1d6 gp', weight: 10 },
      ]
    },
    medium: {
      name: 'Mid-Level Treasure (CR 5-10)',
      items: [
        { name: 'Potion of Greater Healing', rarity: 'Uncommon', type: 'Potion', value: '250 gp', weight: 10 },
        { name: 'Ring of Protection', rarity: 'Rare', type: 'Ring', value: '3500 gp', weight: 5 },
        { name: 'Flame Tongue Sword', rarity: 'Rare', type: 'Weapon', value: '5000 gp', weight: 3 },
        { name: 'Gold Coins', rarity: 'Common', type: 'Currency', value: '3d6x10 gp', weight: 15 },
        { name: 'Platinum Coins', rarity: 'Common', type: 'Currency', value: '1d6 pp', weight: 8 },
        { name: 'Jeweled Necklace', rarity: 'Uncommon', type: 'Jewelry', value: '750 gp', weight: 10 },
      ]
    },
    high: {
      name: 'High-Level Treasure (CR 11+)',
      items: [
        { name: 'Staff of Power', rarity: 'Very Rare', type: 'Staff', value: '35000 gp', weight: 3 },
        { name: 'Ring of Spell Storing', rarity: 'Rare', type: 'Ring', value: '24000 gp', weight: 5 },
        { name: 'Manual of Bodily Health', rarity: 'Very Rare', type: 'Book', value: '50000 gp', weight: 2 },
        { name: 'Gold Coins', rarity: 'Common', type: 'Currency', value: '5d6x100 gp', weight: 15 },
        { name: 'Platinum Coins', rarity: 'Common', type: 'Currency', value: '3d6x10 pp', weight: 10 },
        { name: 'Gem-Encrusted Crown', rarity: 'Rare', type: 'Jewelry', value: '7500 gp', weight: 8 },
      ]
    }
  };

  const generateLoot = () => {
    setIsGenerating(true);
    
    // Select 2-4 items based on weights
    const table = lootTables[selectedTable];
    const numItems = Math.floor(Math.random() * 3) + 2; // 2-4 items
    const selectedItems = [];
    let totalValue = 0;

    for (let i = 0; i < numItems; i++) {
      // Calculate total weight
      const totalWeight = table.items.reduce((sum, item) => sum + item.weight, 0);
      let random = Math.random() * totalWeight;
      
      // Select item based on weight
      for (const item of table.items) {
        random -= item.weight;
        if (random <= 0) {
          // Calculate value if it's dice-based
          let value = item.value;
          if (value.includes('d')) {
            const [diceCount, rest] = value.split('d');
            const [diceSides, multiplier] = rest.split('x').map(n => parseInt(n));
            let total = 0;
            for (let j = 0; j < parseInt(diceCount); j++) {
              total += Math.floor(Math.random() * diceSides) + 1;
            }
            total *= multiplier || 1;
            value = `${total} ${value.slice(-2)}`; // Add currency type (gp, sp, cp, pp)
          }
          
          selectedItems.push({
            name: item.name,
            rarity: item.rarity,
            type: item.type,
            value: value
          });
          
          // Add to total value (convert to gold pieces)
          const numericValue = parseInt(value.split(' ')[0]);
          switch(value.slice(-2)) {
            case 'pp': totalValue += numericValue * 10; break;
            case 'gp': totalValue += numericValue; break;
            case 'sp': totalValue += numericValue / 10; break;
            case 'cp': totalValue += numericValue / 100; break;
          }
          break;
        }
      }
    }

    const newLoot: GeneratedLoot = {
      items: selectedItems,
      totalValue: `${totalValue.toFixed(2)} gp`,
      timestamp: Date.now()
    };

    setGeneratedLoots([newLoot, ...generatedLoots].slice(0, 10)); // Keep last 10 rolls
    setIsGenerating(false);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'common': return 'text-gray-300';
      case 'uncommon': return 'text-green-400';
      case 'rare': return 'text-blue-400';
      case 'very rare': return 'text-purple-400';
      case 'legendary': return 'text-orange-400';
      default: return 'text-gray-300';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <WrenchScrewdriverIcon className="h-8 w-8 text-purple-400" />
          <h1 className="text-3xl font-bold text-white">Loot Generator</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Controls */}
          <div>
            <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">Generate Treasure</h2>
              
              <div className="space-y-4">
                {Object.entries(lootTables).map(([key, table]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedTable(key)}
                    className={`w-full p-4 rounded-lg border transition-all ${
                      selectedTable === key
                        ? 'bg-purple-500/20 border-purple-500 text-white'
                        : 'bg-[#1B0A20] border-purple-500/30 text-gray-300 hover:bg-purple-500/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{table.name}</span>
                      {selectedTable === key && (
                        <SparklesIcon className="h-5 w-5 text-purple-400" />
                      )}
                    </div>
                  </button>
                ))}

                <button
                  onClick={generateLoot}
                  disabled={isGenerating}
                  className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Generate Loot
                </button>
              </div>
            </div>
          </div>

          {/* Generated Loot History */}
          <div>
            <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-4">Generated Treasure</h2>
              
              <div className="space-y-6">
                {generatedLoots.map((loot, index) => (
                  <div
                    key={loot.timestamp + index}
                    className="bg-[#1B0A20] rounded-lg p-4 space-y-3"
                  >
                    <div className="space-y-2">
                      {loot.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <span className={`font-medium ${getRarityColor(item.rarity)}`}>
                              {item.name}
                            </span>
                            <span className="text-sm text-gray-500 ml-2">
                              ({item.type})
                            </span>
                          </div>
                          <span className="text-yellow-400 font-medium">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2 border-t border-gray-700">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Total Value:</span>
                        <span className="text-lg font-bold text-yellow-400">
                          {loot.totalValue}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {generatedLoots.length === 0 && (
                  <p className="text-gray-400 text-center py-4">
                    No loot generated yet
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 