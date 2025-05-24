import { useState } from 'react';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

interface Room {
  id: number;
  name: string;
  description: string;
  features: string[];
  encounters?: {
    type: string;
    description: string;
    difficulty: string;
  };
  treasures?: {
    type: string;
    description: string;
    value: string;
  }[];
  traps?: {
    type: string;
    description: string;
    difficulty: string;
    damage: string;
  };
}

interface Dungeon {
  name: string;
  theme: string;
  description: string;
  difficulty: string;
  size: string;
  rooms: Room[];
  specialFeatures: string[];
  finalRoom: Room;
}

interface GeneratedDungeon extends Dungeon {
  timestamp: number;
}

type ThemeId = 'ancient_ruins' | 'dark_caverns' | 'magical_laboratory' | 'cursed_crypt';

interface ThemeData {
  id: ThemeId;
  name: string;
  description: string;
}

interface Encounter {
  type: string;
  difficulty: string;
}

interface Trap {
  type: string;
  difficulty: string;
  damage: string;
}

interface TreasureType {
  type: string;
  value: string;
}

const roomTypes: Record<ThemeId, string[]> = {
  ancient_ruins: [
    'Grand Hall', 'Collapsed Chamber', 'Treasury', 'Throne Room',
    'Armory', 'Library', 'Guard Post', 'Secret Vault',
    'Prayer Room', 'Storage Room', 'Training Ground', 'Living Quarters'
  ],
  dark_caverns: [
    'Crystal Cave', 'Underground Lake', 'Stalactite Chamber', 'Mushroom Grove',
    'Mineral Deposit', 'Lava Flow', 'Echo Chamber', 'Bat Colony',
    'Rock Bridge', 'Water Fall', 'Gas Vent', 'Spider Den'
  ],
  magical_laboratory: [
    'Summoning Circle', 'Alchemy Lab', 'Library', 'Artifact Storage',
    'Testing Chamber', 'Containment Room', 'Study', 'Portal Room',
    'Workshop', 'Observatory', 'Enchanting Room', 'Specimen Storage'
  ],
  cursed_crypt: [
    'Burial Chamber', 'Embalming Room', 'Ossuary', 'Sacrificial Chamber',
    'Treasure Vault', 'Ritual Room', 'Mausoleum', 'Statue Gallery',
    'Sarcophagus Room', 'Spirit Well', 'Cursed Treasury', 'Death Knight\'s Tomb'
  ]
};

const roomFeatures: Record<ThemeId, string[]> = {
  ancient_ruins: [
    'Crumbling pillars', 'Ancient inscriptions', 'Broken statues',
    'Faded murals', 'Collapsed ceiling', 'Hidden passages',
    'Weathered tapestries', 'Rusted weapons racks'
  ],
  dark_caverns: [
    'Glowing crystals', 'Underground stream', 'Stalagmites',
    'Phosphorescent fungi', 'Natural bridges', 'Steam vents',
    'Mineral deposits', 'Echo chambers'
  ],
  magical_laboratory: [
    'Floating orbs', 'Arcane circles', 'Bubbling cauldrons',
    'Magical barriers', 'Living books', 'Strange apparatus',
    'Enchanted items', 'Experimental results'
  ],
  cursed_crypt: [
    'Eerie statues', 'Ghostly whispers', 'Ancient coffins',
    'Cursed artifacts', 'Bone piles', 'Dark altars',
    'Spirit manifestations', 'Unholy symbols'
  ]
};

const encounters: Record<ThemeId, Encounter[]> = {
  ancient_ruins: [
    { type: 'Guardian Construct', difficulty: 'medium' },
    { type: 'Treasure Hunters', difficulty: 'easy' },
    { type: 'Ancient Curse', difficulty: 'hard' },
    { type: 'Living Statue', difficulty: 'medium' }
  ],
  dark_caverns: [
    { type: 'Cave Beast', difficulty: 'medium' },
    { type: 'Underground Tribe', difficulty: 'hard' },
    { type: 'Natural Hazard', difficulty: 'easy' },
    { type: 'Mineral Elemental', difficulty: 'medium' }
  ],
  magical_laboratory: [
    { type: 'Failed Experiment', difficulty: 'hard' },
    { type: 'Summoned Creature', difficulty: 'medium' },
    { type: 'Magical Anomaly', difficulty: 'deadly' },
    { type: 'Animated Object', difficulty: 'easy' }
  ],
  cursed_crypt: [
    { type: 'Undead Horror', difficulty: 'hard' },
    { type: 'Cursed Guardian', difficulty: 'medium' },
    { type: 'Restless Spirit', difficulty: 'easy' },
    { type: 'Death Knight', difficulty: 'deadly' }
  ]
};

const traps: Record<ThemeId, Trap[]> = {
  ancient_ruins: [
    { type: 'Falling Pillars', difficulty: 'medium', damage: '4d6 bludgeoning' },
    { type: 'Arrow Trap', difficulty: 'easy', damage: '2d6 piercing' },
    { type: 'Crushing Walls', difficulty: 'hard', damage: '6d6 bludgeoning' }
  ],
  dark_caverns: [
    { type: 'Pit Trap', difficulty: 'medium', damage: '3d6 falling' },
    { type: 'Poison Gas', difficulty: 'hard', damage: '4d6 poison' },
    { type: 'Rock Fall', difficulty: 'easy', damage: '2d6 bludgeoning' }
  ],
  magical_laboratory: [
    { type: 'Arcane Blast', difficulty: 'hard', damage: '5d6 force' },
    { type: 'Teleport Trap', difficulty: 'medium', damage: 'none' },
    { type: 'Polymorphing Ray', difficulty: 'deadly', damage: 'special' }
  ],
  cursed_crypt: [
    { type: 'Soul Drain', difficulty: 'deadly', damage: '4d6 necrotic' },
    { type: 'Curse Trap', difficulty: 'hard', damage: 'special' },
    { type: 'Bone Spikes', difficulty: 'medium', damage: '3d6 piercing' }
  ]
};

const treasures: Record<ThemeId, TreasureType[]> = {
  ancient_ruins: [
    { type: 'Ancient Artifact', value: 'very rare' },
    { type: 'Historical Relic', value: 'rare' },
    { type: 'Old Coins', value: 'common' }
  ],
  dark_caverns: [
    { type: 'Precious Gems', value: 'rare' },
    { type: 'Mineral Deposit', value: 'uncommon' },
    { type: 'Crystal Formation', value: 'common' }
  ],
  magical_laboratory: [
    { type: 'Magical Item', value: 'very rare' },
    { type: 'Spell Scroll', value: 'rare' },
    { type: 'Arcane Component', value: 'uncommon' }
  ],
  cursed_crypt: [
    { type: 'Cursed Treasure', value: 'very rare' },
    { type: 'Ancient Jewelry', value: 'rare' },
    { type: 'Burial Goods', value: 'uncommon' }
  ]
};

export function DungeonGeneratorPage() {
  const [selectedSize, setSelectedSize] = useState<string>('medium');
  const [selectedTheme, setSelectedTheme] = useState<ThemeId>('ancient_ruins');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('medium');
  const [generatedDungeons, setGeneratedDungeons] = useState<GeneratedDungeon[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const sizes = [
    { id: 'small', name: 'Small', rooms: '3-5 rooms' },
    { id: 'medium', name: 'Medium', rooms: '6-8 rooms' },
    { id: 'large', name: 'Large', rooms: '9-12 rooms' }
  ];

  const themes = [
    { 
      id: 'ancient_ruins',
      name: 'Ancient Ruins',
      description: 'Crumbling stone walls and forgotten artifacts'
    },
    { 
      id: 'dark_caverns',
      name: 'Dark Caverns',
      description: 'Natural cave systems with underground features'
    },
    { 
      id: 'magical_laboratory',
      name: 'Magical Laboratory',
      description: 'Arcane experiments and magical anomalies'
    },
    { 
      id: 'cursed_crypt',
      name: 'Cursed Crypt',
      description: 'Undead-infested tombs and burial chambers'
    }
  ];

  const difficulties = [
    { id: 'easy', name: 'Easy', level: 'Levels 1-4' },
    { id: 'medium', name: 'Medium', level: 'Levels 5-10' },
    { id: 'hard', name: 'Hard', level: 'Levels 11-16' },
    { id: 'deadly', name: 'Deadly', level: 'Levels 17+' }
  ];

  const generateRoom = (
    id: number,
    theme: ThemeId,
    isFinal: boolean = false
  ): Room => {
    const roomName = roomTypes[theme][Math.floor(Math.random() * roomTypes[theme].length)];
    const features = Array(2).fill(null).map(() => 
      roomFeatures[theme][Math.floor(Math.random() * roomFeatures[theme].length)]
    );

    const room: Room = {
      id,
      name: roomName,
      description: `A ${isFinal ? 'large' : 'typical'} ${theme.replace('_', ' ')} chamber`,
      features
    };

    // Add encounters (50% chance, always for final room)
    if (isFinal || Math.random() > 0.5) {
      const encounter = encounters[theme][Math.floor(Math.random() * encounters[theme].length)];
      room.encounters = {
        type: encounter.type,
        description: `A challenging encounter with ${encounter.type.toLowerCase()}`,
        difficulty: encounter.difficulty
      };
    }

    // Add traps (30% chance)
    if (Math.random() < 0.3) {
      const trap = traps[theme][Math.floor(Math.random() * traps[theme].length)];
      room.traps = {
        type: trap.type,
        description: `A hidden ${trap.type.toLowerCase()}`,
        difficulty: trap.difficulty,
        damage: trap.damage
      };
    }

    // Add treasures (40% chance, always for final room)
    if (isFinal || Math.random() < 0.4) {
      const numTreasures = isFinal ? 2 : 1;
      room.treasures = Array(numTreasures).fill(null).map(() => {
        const treasure = treasures[theme][Math.floor(Math.random() * treasures[theme].length)];
        return {
          type: treasure.type,
          description: `A ${treasure.value} ${treasure.type.toLowerCase()}`,
          value: treasure.value
        };
      });
    }

    return room;
  };

  const generateDungeon = () => {
    setIsGenerating(true);

    const theme = selectedTheme;
    const themeName = themes.find(t => t.id === theme)?.name || '';
    
    // Determine number of rooms based on size
    let numRooms;
    switch (selectedSize) {
      case 'small': numRooms = Math.floor(Math.random() * 3) + 3; break; // 3-5
      case 'large': numRooms = Math.floor(Math.random() * 4) + 9; break; // 9-12
      default: numRooms = Math.floor(Math.random() * 3) + 6; // 6-8
    }

    // Generate regular rooms
    const rooms = Array(numRooms - 1).fill(null).map((_, index) => 
      generateRoom(index + 1, theme)
    );

    // Generate final room
    const finalRoom = generateRoom(numRooms, theme, true);

    const newDungeon: GeneratedDungeon = {
      name: `The ${
        ['Forgotten', 'Ancient', 'Hidden', 'Mysterious', 'Dark'][Math.floor(Math.random() * 5)]
      } ${
        ['Depths', 'Halls', 'Chambers', 'Passages', 'Sanctum'][Math.floor(Math.random() * 5)]
      }`,
      theme: themeName,
      description: themes.find(t => t.id === theme)?.description || '',
      difficulty: selectedDifficulty,
      size: selectedSize,
      rooms,
      specialFeatures: [
        `Unique ${themeName} architecture`,
        `${themeName}-themed puzzles and challenges`,
        `${themeName}-specific environmental effects`
      ],
      finalRoom,
      timestamp: Date.now()
    };

    setGeneratedDungeons([newDungeon, ...generatedDungeons].slice(0, 3));
    setIsGenerating(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-orange-400';
      case 'deadly': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <WrenchScrewdriverIcon className="h-8 w-8 text-purple-400" />
          <h1 className="text-3xl font-bold text-white">Dungeon Generator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="lg:col-span-1">
            <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4">Generate Dungeon</h2>
              
              {/* Size Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Size</label>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map(size => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.id)}
                      className={`p-3 rounded-lg border transition-all ${
                        selectedSize === size.id
                          ? 'bg-purple-500/20 border-purple-500 text-white'
                          : 'bg-[#1B0A20] border-purple-500/30 text-gray-300 hover:bg-purple-500/10'
                      }`}
                    >
                      <div className="text-center">
                        <div className="font-medium">{size.name}</div>
                        <div className="text-xs text-gray-400">{size.rooms}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Theme</label>
                <div className="grid grid-cols-1 gap-2">
                  {themes.map(theme => (
                    <button
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme.id as ThemeId)}
                      className={`p-4 rounded-lg border transition-all ${
                        selectedTheme === theme.id
                          ? 'bg-purple-500/20 border-purple-500 text-white'
                          : 'bg-[#1B0A20] border-purple-500/30 text-gray-300 hover:bg-purple-500/10'
                      }`}
                    >
                      <div className="text-left">
                        <div className="font-medium">{theme.name}</div>
                        <div className="text-sm text-gray-400">{theme.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty</label>
                <div className="grid grid-cols-2 gap-2">
                  {difficulties.map(diff => (
                    <button
                      key={diff.id}
                      onClick={() => setSelectedDifficulty(diff.id)}
                      className={`p-3 rounded-lg border transition-all ${
                        selectedDifficulty === diff.id
                          ? 'bg-purple-500/20 border-purple-500 text-white'
                          : 'bg-[#1B0A20] border-purple-500/30 text-gray-300 hover:bg-purple-500/10'
                      }`}
                    >
                      <div className="text-center">
                        <div className="font-medium">{diff.name}</div>
                        <div className="text-xs text-gray-400">{diff.level}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={generateDungeon}
                disabled={isGenerating}
                className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate Dungeon
              </button>
            </div>
          </div>

          {/* Generated Dungeons */}
          <div className="lg:col-span-2 space-y-8">
            {generatedDungeons.map((dungeon, index) => (
              <div
                key={dungeon.timestamp + index}
                className="bg-[#2D1B36] rounded-xl p-6 shadow-lg"
              >
                <div className="border-b border-gray-700 pb-4 mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">{dungeon.name}</h2>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-300">
                      {dungeon.theme}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-300">
                      {dungeon.size.charAt(0).toUpperCase() + dungeon.size.slice(1)}
                    </span>
                    <span className={`px-2 py-1 rounded-full bg-${dungeon.difficulty}-500/20 ${getDifficultyColor(dungeon.difficulty)}`}>
                      {dungeon.difficulty.charAt(0).toUpperCase() + dungeon.difficulty.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-300 mt-2">{dungeon.description}</p>
                </div>

                {/* Special Features */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Special Features</h3>
                  <ul className="list-disc list-inside text-gray-300">
                    {dungeon.specialFeatures.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>

                {/* Rooms */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Rooms</h3>
                  
                  {/* Regular Rooms */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dungeon.rooms.map(room => (
                      <div
                        key={room.id}
                        className="bg-[#1B0A20] rounded-lg p-4 space-y-2"
                      >
                        <h4 className="font-medium text-white">{room.name}</h4>
                        <p className="text-gray-400 text-sm">{room.description}</p>
                        
                        {/* Features */}
                        <div className="space-y-1">
                          <span className="text-sm text-purple-400">Features:</span>
                          <ul className="list-disc list-inside text-gray-300 text-sm">
                            {room.features.map((feature, i) => (
                              <li key={i}>{feature}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Encounters */}
                        {room.encounters && (
                          <div className="space-y-1">
                            <span className="text-sm text-red-400">Encounter:</span>
                            <p className="text-gray-300 text-sm">
                              {room.encounters.type}
                              <span className={`ml-2 ${getDifficultyColor(room.encounters.difficulty)}`}>
                                ({room.encounters.difficulty})
                              </span>
                            </p>
                          </div>
                        )}

                        {/* Traps */}
                        {room.traps && (
                          <div className="space-y-1">
                            <span className="text-sm text-orange-400">Trap:</span>
                            <p className="text-gray-300 text-sm">
                              {room.traps.type}
                              <span className="text-gray-400 text-sm ml-2">
                                ({room.traps.damage})
                              </span>
                            </p>
                          </div>
                        )}

                        {/* Treasures */}
                        {room.treasures && room.treasures.length > 0 && (
                          <div className="space-y-1">
                            <span className="text-sm text-yellow-400">Treasure:</span>
                            <ul className="list-disc list-inside text-gray-300 text-sm">
                              {room.treasures.map((treasure, i) => (
                                <li key={i}>
                                  {treasure.type}
                                  <span className="text-gray-400 ml-2">
                                    ({treasure.value})
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Final Room */}
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-white mb-2">Final Chamber</h3>
                    <div className="bg-[#1B0A20] rounded-lg p-4 space-y-3 border border-purple-500/30">
                      <h4 className="font-medium text-white">{dungeon.finalRoom.name}</h4>
                      <p className="text-gray-400">{dungeon.finalRoom.description}</p>
                      
                      {/* Features */}
                      <div className="space-y-1">
                        <span className="text-sm text-purple-400">Features:</span>
                        <ul className="list-disc list-inside text-gray-300">
                          {dungeon.finalRoom.features.map((feature, i) => (
                            <li key={i}>{feature}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Encounters */}
                      {dungeon.finalRoom.encounters && (
                        <div className="space-y-1">
                          <span className="text-sm text-red-400">Boss Encounter:</span>
                          <p className="text-gray-300">
                            {dungeon.finalRoom.encounters.type}
                            <span className={`ml-2 ${getDifficultyColor(dungeon.finalRoom.encounters.difficulty)}`}>
                              ({dungeon.finalRoom.encounters.difficulty})
                            </span>
                          </p>
                        </div>
                      )}

                      {/* Treasures */}
                      {dungeon.finalRoom.treasures && (
                        <div className="space-y-1">
                          <span className="text-sm text-yellow-400">Rewards:</span>
                          <ul className="list-disc list-inside text-gray-300">
                            {dungeon.finalRoom.treasures.map((treasure, i) => (
                              <li key={i}>
                                {treasure.type}
                                <span className="text-gray-400 ml-2">
                                  ({treasure.value})
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {generatedDungeons.length === 0 && (
              <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg">
                <p className="text-gray-400 text-center">
                  No dungeons generated yet
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 