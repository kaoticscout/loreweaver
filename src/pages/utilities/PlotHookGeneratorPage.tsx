import { useState } from 'react';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

interface PlotHook {
  title: string;
  hook: string;
  type: string;
  difficulty: string;
  location: string;
  reward: string;
  complications: string[];
  npcs: {
    name: string;
    role: string;
    description: string;
  }[];
}

interface GeneratedPlotHook extends PlotHook {
  timestamp: number;
}

type HookType = 'quest' | 'mystery' | 'intrigue' | 'combat' | 'exploration';

const hookTypes: Record<HookType, string> = {
  quest: 'Quest',
  mystery: 'Mystery',
  intrigue: 'Political Intrigue',
  combat: 'Combat Encounter',
  exploration: 'Exploration'
};

export function PlotHookGeneratorPage() {
  const [selectedTypes, setSelectedTypes] = useState<HookType[]>(['quest']);
  const [generatedHooks, setGeneratedHooks] = useState<GeneratedPlotHook[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const locations = [
    'Ancient Temple',
    'Bustling Market',
    'Dark Forest',
    'Noble\'s Manor',
    'Underground Tunnels',
    'Wizard\'s Tower',
    'Mountain Pass',
    'Coastal Village',
    'Royal Palace',
    'Thieves\' Guild',
    'Haunted Ruins',
    'Desert Oasis'
  ];

  const rewards = [
    'A magical artifact',
    'A substantial sum of gold',
    'A noble title',
    'A rare spell scroll',
    'A valuable trade route',
    'A powerful alliance',
    'Ancient knowledge',
    'A legendary weapon',
    'A mystical blessing',
    'Political influence'
  ];

  const complications = [
    'A rival group seeks the same goal',
    'Time is running out',
    'A traitor within the group',
    'The target is not what it seems',
    'Natural disasters threaten the area',
    'A powerful entity interferes',
    'Local politics complicate matters',
    'The reward is cursed',
    'Innocent lives are at stake',
    'The true villain remains hidden',
    'Multiple factions are involved',
    'Ancient magic causes chaos'
  ];

  const npcRoles = [
    'Quest Giver',
    'Ally',
    'Rival',
    'Informant',
    'Merchant',
    'Guard',
    'Noble',
    'Sage',
    'Villain',
    'Innocent Bystander'
  ];

  const npcDescriptions = [
    'A mysterious figure with hidden motives',
    'A cheerful individual hiding dark secrets',
    'A gruff but reliable veteran',
    'An eccentric scholar with valuable knowledge',
    'A charming noble with questionable ethics',
    'A skilled professional seeking redemption',
    'A humble servant with surprising connections',
    'A powerful individual in disguise',
    'A suspicious character with a good heart',
    'A respected leader with a hidden agenda'
  ];

  const plotHooks: Record<HookType, string[]> = {
    quest: [
      'A valuable artifact has been stolen from the local temple',
      'A merchant caravan has gone missing on a well-traveled road',
      'Strange lights in the sky herald an ancient prophecy',
      'A noble\'s child has been kidnapped by mysterious forces',
      'A powerful magical item needs to be destroyed',
      'A remote village is plagued by supernatural occurrences',
      'An ancient evil is awakening and must be stopped',
      'A diplomatic mission requires skilled protection'
    ],
    mystery: [
      'Residents are disappearing without a trace',
      'Strange symbols appear throughout the city overnight',
      'An important figure has been murdered in a locked room',
      'Ancient ruins reveal a disturbing prophecy',
      'A powerful artifact is revealed to be a forgery',
      'Unusual weather patterns suggest magical interference',
      'A respected leader is acting strangely',
      'Multiple identical items appear across the region'
    ],
    intrigue: [
      'Two noble houses are on the brink of war',
      'A conspiracy threatens the current regime',
      'Secret messages need to be intercepted',
      'A spy network has been compromised',
      'Political alliances are shifting mysteriously',
      'A peace treaty contains hidden clauses',
      'Multiple factions vie for a vacant throne',
      'Trade negotiations hide sinister motives'
    ],
    combat: [
      'Bandits are raiding merchant caravans',
      'A monster is terrorizing the countryside',
      'Pirates have blockaded the harbor',
      'An army of undead is approaching',
      'A dragon has claimed territory nearby',
      'Mercenaries have taken control of a strategic location',
      'A powerful beast has escaped captivity',
      'Raiders threaten a peaceful settlement'
    ],
    exploration: [
      'A new island has appeared off the coast',
      'Ancient ruins have been uncovered in the desert',
      'A mysterious portal leads to an unknown realm',
      'A lost city has been discovered',
      'Strange caves appear after an earthquake',
      'An uncharted forest holds valuable resources',
      'A magical anomaly warps the landscape',
      'A forgotten dungeon promises ancient treasures'
    ]
  };

  const generateNPC = () => {
    const role = npcRoles[Math.floor(Math.random() * npcRoles.length)];
    const description = npcDescriptions[Math.floor(Math.random() * npcDescriptions.length)];
    const names = [
      'Aldrich', 'Beatrice', 'Cedric', 'Diana', 'Eldred',
      'Freya', 'Gareth', 'Helena', 'Igor', 'Jasmine'
    ];
    const name = names[Math.floor(Math.random() * names.length)];

    return {
      name,
      role,
      description
    };
  };

  const generatePlotHook = () => {
    setIsGenerating(true);

    // Randomly select a hook type from the selected types
    const hookType = selectedTypes[Math.floor(Math.random() * selectedTypes.length)] as HookType;
    const hooks = plotHooks[hookType];
    
    const newHook: GeneratedPlotHook = {
      title: `The ${
        ['Mysterious', 'Dangerous', 'Intriguing', 'Urgent', 'Secret'][Math.floor(Math.random() * 5)]
      } ${
        ['Quest', 'Mission', 'Task', 'Adventure', 'Journey'][Math.floor(Math.random() * 5)]
      }`,
      hook: hooks[Math.floor(Math.random() * hooks.length)],
      type: hookTypes[hookType],
      difficulty: ['Easy', 'Medium', 'Hard', 'Very Hard'][Math.floor(Math.random() * 4)],
      location: locations[Math.floor(Math.random() * locations.length)],
      reward: rewards[Math.floor(Math.random() * rewards.length)],
      complications: Array(2)
        .fill(null)
        .map(() => complications[Math.floor(Math.random() * complications.length)]),
      npcs: Array(2).fill(null).map(() => generateNPC()),
      timestamp: Date.now()
    };

    setGeneratedHooks([newHook, ...generatedHooks].slice(0, 5));
    setIsGenerating(false);
  };

  const toggleHookType = (type: HookType) => {
    setSelectedTypes(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <WrenchScrewdriverIcon className="h-8 w-8 text-purple-400" />
          <h1 className="text-3xl font-bold text-white">Plot Hook Generator</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Controls */}
          <div>
            <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-4">Generate Plot Hook</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Hook Types (select at least one)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(hookTypes) as HookType[]).map(type => (
                    <button
                      key={type}
                      onClick={() => toggleHookType(type)}
                      className={`p-3 rounded-lg border transition-all ${
                        selectedTypes.includes(type)
                          ? 'bg-purple-500/20 border-purple-500 text-white'
                          : 'bg-[#1B0A20] border-purple-500/30 text-gray-300 hover:bg-purple-500/10'
                      }`}
                    >
                      {hookTypes[type]}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={generatePlotHook}
                disabled={isGenerating || selectedTypes.length === 0}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate Plot Hook
              </button>
            </div>
          </div>

          {/* Generated Hooks */}
          <div className="space-y-8">
            {generatedHooks.map((hook, index) => (
              <div
                key={hook.timestamp + index}
                className="bg-[#2D1B36] rounded-xl p-6 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-white mb-2">{hook.title}</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-300">
                    {hook.type}
                  </span>
                  <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-300">
                    {hook.difficulty}
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Main Hook */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">The Hook</h3>
                    <p className="text-gray-300">{hook.hook}</p>
                  </div>

                  {/* Location & Reward */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-md font-semibold text-purple-400">Location</h3>
                      <p className="text-gray-300">{hook.location}</p>
                    </div>
                    <div>
                      <h3 className="text-md font-semibold text-yellow-400">Reward</h3>
                      <p className="text-gray-300">{hook.reward}</p>
                    </div>
                  </div>

                  {/* Complications */}
                  <div>
                    <h3 className="text-md font-semibold text-red-400">Complications</h3>
                    <ul className="list-disc list-inside text-gray-300">
                      {hook.complications.map((complication, i) => (
                        <li key={i}>{complication}</li>
                      ))}
                    </ul>
                  </div>

                  {/* NPCs */}
                  <div>
                    <h3 className="text-md font-semibold text-green-400">Key NPCs</h3>
                    <div className="grid grid-cols-1 gap-3 mt-2">
                      {hook.npcs.map((npc, i) => (
                        <div key={i} className="bg-[#1B0A20] rounded-lg p-3">
                          <div className="flex justify-between items-start">
                            <span className="font-medium text-white">{npc.name}</span>
                            <span className="text-sm text-purple-300">{npc.role}</span>
                          </div>
                          <p className="text-gray-400 text-sm mt-1">{npc.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {generatedHooks.length === 0 && (
              <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg">
                <p className="text-gray-400 text-center">
                  No plot hooks generated yet
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 