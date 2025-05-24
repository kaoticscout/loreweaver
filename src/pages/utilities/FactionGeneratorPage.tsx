import { useState } from 'react';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

interface Leader {
  name: string;
  title: string;
  description: string;
  traits: string[];
}

interface Resource {
  name: string;
  type: string;
  description: string;
  value: string;
}

interface Faction {
  name: string;
  type: string;
  description: string;
  alignment: string;
  size: string;
  influence: string;
  territory: string;
  goals: string[];
  allies: string[];
  rivals: string[];
  leader: Leader;
  resources: Resource[];
  specialFeatures: string[];
}

interface GeneratedFaction extends Faction {
  timestamp: number;
}

type FactionType = 'noble' | 'merchant' | 'religious' | 'military' | 'criminal' | 'arcane';

const factionTypes: Record<FactionType, string> = {
  noble: 'Noble House',
  merchant: 'Merchant Guild',
  religious: 'Religious Order',
  military: 'Military Order',
  criminal: 'Criminal Syndicate',
  arcane: 'Arcane Society'
};

export function FactionGeneratorPage() {
  const [selectedTypes, setSelectedTypes] = useState<FactionType[]>(['noble']);
  const [generatedFactions, setGeneratedFactions] = useState<GeneratedFaction[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const nameTemplates: Record<FactionType, string[]> = {
    noble: [
      'House {name}',
      'The {name} Dynasty',
      'The {name} Family',
      'The Noble House of {name}'
    ],
    merchant: [
      'The {name} Trading Company',
      'The {name} Merchant League',
      'The {name} Exchange',
      'The {name} Consortium'
    ],
    religious: [
      'Order of the {name}',
      'The {name} Faith',
      'Brotherhood of the {name}',
      'Disciples of the {name}'
    ],
    military: [
      'The {name} Legion',
      'The {name} Brigade',
      'The {name} Guard',
      'The {name} Knights'
    ],
    criminal: [
      'The {name} Syndicate',
      'The {name} Gang',
      'The {name} Network',
      'The {name} Ring'
    ],
    arcane: [
      'The {name} Circle',
      'The {name} Academy',
      'The {name} Conclave',
      'The {name} Order'
    ]
  };

  const nameElements = {
    noble: [
      'Golden', 'Silver', 'Crimson', 'Azure',
      'Black', 'White', 'Shadow', 'Sun',
      'Moon', 'Star', 'Dragon', 'Phoenix'
    ],
    merchant: [
      'Golden', 'Silver', 'Iron', 'Silk',
      'Spice', 'Pearl', 'Diamond', 'Crystal',
      'Trade', 'Maritime', 'Merchant', 'Commerce'
    ],
    religious: [
      'Divine', 'Sacred', 'Holy', 'Blessed',
      'Radiant', 'Eternal', 'Celestial', 'Pure',
      'Truth', 'Light', 'Dawn', 'Dusk'
    ],
    military: [
      'Iron', 'Steel', 'Bronze', 'Crimson',
      'Black', 'Storm', 'Thunder', 'Lightning',
      'Shield', 'Sword', 'Spear', 'Arrow'
    ],
    criminal: [
      'Shadow', 'Night', 'Dark', 'Silent',
      'Hidden', 'Secret', 'Black', 'Red',
      'Dagger', 'Viper', 'Raven', 'Wolf'
    ],
    arcane: [
      'Mystic', 'Arcane', 'Ethereal', 'Astral',
      'Crystal', 'Star', 'Moon', 'Void',
      'Spell', 'Rune', 'Sigil', 'Scroll'
    ]
  };

  const alignments = [
    'Lawful Good', 'Neutral Good', 'Chaotic Good',
    'Lawful Neutral', 'True Neutral', 'Chaotic Neutral',
    'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'
  ];

  const sizes = [
    'Small (Local)',
    'Medium (Regional)',
    'Large (Kingdom-wide)',
    'Huge (Multi-kingdom)',
    'Massive (Continental)'
  ];

  const influences = [
    'Minor local influence',
    'Significant regional power',
    'Major political force',
    'Dominant in their sphere',
    'World-shaping influence'
  ];

  const territories: Record<FactionType, string[]> = {
    noble: [
      'Ancestral castle and surrounding lands',
      'Multiple estates across the kingdom',
      'City district and rural holdings',
      'Strategic border fortress',
      'Coastal port and trading routes'
    ],
    merchant: [
      'Trading post network',
      'Port city headquarters',
      'Marketplace district',
      'Warehouse district',
      'Trade route control'
    ],
    religious: [
      'Grand temple complex',
      'Network of shrines',
      'Sacred site',
      'Monastery grounds',
      'Pilgrimage routes'
    ],
    military: [
      'Fortified stronghold',
      'Training grounds',
      'Border outposts',
      'Strategic fortress',
      'Military academy'
    ],
    criminal: [
      'Underground network',
      'Hidden safe houses',
      'Black market territory',
      'Smuggling routes',
      'Shadow district'
    ],
    arcane: [
      'Ancient tower',
      'Magical academy',
      'Nexus of ley lines',
      'Hidden sanctum',
      'Enchanted grounds'
    ]
  };

  const goals: Record<FactionType, string[]> = {
    noble: [
      'Expand their influence',
      'Secure political alliances',
      'Protect family legacy',
      'Increase wealth and power',
      'Maintain noble traditions'
    ],
    merchant: [
      'Control trade routes',
      'Monopolize resources',
      'Expand market influence',
      'Accumulate wealth',
      'Establish new markets'
    ],
    religious: [
      'Spread their faith',
      'Convert non-believers',
      'Build grand temples',
      'Acquire holy relics',
      'Fulfill prophecies'
    ],
    military: [
      'Defend the realm',
      'Train elite forces',
      'Acquire powerful weapons',
      'Maintain order',
      'Expand territory'
    ],
    criminal: [
      'Control underground trade',
      'Expand territory',
      'Infiltrate legitimate business',
      'Accumulate wealth and power',
      'Eliminate rivals'
    ],
    arcane: [
      'Research ancient magic',
      'Collect magical artifacts',
      'Unlock powerful spells',
      'Preserve magical knowledge',
      'Control magical resources'
    ]
  };

  const leaderTraits: Record<FactionType, string[]> = {
    noble: [
      'Charismatic', 'Diplomatic', 'Proud',
      'Traditional', 'Ambitious', 'Honorable'
    ],
    merchant: [
      'Shrewd', 'Calculating', 'Persuasive',
      'Wealthy', 'Connected', 'Opportunistic'
    ],
    religious: [
      'Devout', 'Wise', 'Inspiring',
      'Zealous', 'Mysterious', 'Charismatic'
    ],
    military: [
      'Disciplined', 'Strategic', 'Brave',
      'Loyal', 'Commanding', 'Honorable'
    ],
    criminal: [
      'Cunning', 'Ruthless', 'Secretive',
      'Charismatic', 'Paranoid', 'Ambitious'
    ],
    arcane: [
      'Intelligent', 'Mysterious', 'Powerful',
      'Eccentric', 'Knowledgeable', 'Ambitious'
    ]
  };

  const resourceTypes: Record<FactionType, string[]> = {
    noble: [
      'Land holdings', 'Family heirlooms', 'Political connections',
      'Ancient artifacts', 'Loyal retainers', 'Treasury'
    ],
    merchant: [
      'Trade routes', 'Warehouses', 'Ships',
      'Exotic goods', 'Market connections', 'Gold reserves'
    ],
    religious: [
      'Holy relics', 'Sacred texts', 'Temple wealth',
      'Faithful followers', 'Divine blessing', 'Ancient knowledge'
    ],
    military: [
      'Weapons', 'Fortifications', 'Trained soldiers',
      'Strategic locations', 'War machines', 'Military intelligence'
    ],
    criminal: [
      'Secret networks', 'Hidden treasures', 'Blackmail material',
      'Smuggling routes', 'Corrupt officials', 'Safe houses'
    ],
    arcane: [
      'Magical artifacts', 'Spell books', 'Rare components',
      'Enchanted items', 'Arcane knowledge', 'Magical creatures'
    ]
  };

  const specialFeatures: Record<FactionType, string[]> = {
    noble: [
      'Ancient bloodline',
      'Prophetic destiny',
      'Magical heritage',
      'Strategic marriages',
      'Royal favor'
    ],
    merchant: [
      'Exclusive trade rights',
      'Secret trade routes',
      'Unique products',
      'Market monopoly',
      'International connections'
    ],
    religious: [
      'Divine blessing',
      'Miraculous powers',
      'Sacred rituals',
      'Holy artifacts',
      'Prophecy keepers'
    ],
    military: [
      'Elite training',
      'Special tactics',
      'Legendary weapons',
      'Unbreakable code',
      'Battle magic'
    ],
    criminal: [
      'Secret codes',
      'Hidden network',
      'Infiltrators everywhere',
      'Mysterious benefactor',
      'Underground influence'
    ],
    arcane: [
      'Unique magic',
      'Ancient secrets',
      'Powerful artifacts',
      'Magical creatures',
      'Arcane experiments'
    ]
  };

  const generateName = (type: FactionType) => {
    const template = nameTemplates[type][Math.floor(Math.random() * nameTemplates[type].length)];
    const element = nameElements[type][Math.floor(Math.random() * nameElements[type].length)];
    return template.replace('{name}', element);
  };

  const generateLeader = (type: FactionType) => {
    const titles: Record<FactionType, string[]> = {
      noble: ['Lord', 'Lady', 'Baron', 'Baroness', 'Count', 'Countess'],
      merchant: ['Guildmaster', 'Trade Prince', 'Merchant Lord', 'Commerce Baron'],
      religious: ['High Priest', 'Oracle', 'Prophet', 'Divine Speaker'],
      military: ['Commander', 'Captain', 'General', 'Marshal'],
      criminal: ['Boss', 'Shadow Lord', 'Master', 'Kingpin'],
      arcane: ['Archmage', 'Grand Wizard', 'Master of Arts', 'Elder Sage']
    };

    const names = [
      'Aldrich', 'Beatrice', 'Cedric', 'Diana',
      'Eldred', 'Freya', 'Gareth', 'Helena',
      'Igor', 'Jasmine', 'Kestrel', 'Lyra'
    ];

    const title = titles[type][Math.floor(Math.random() * titles[type].length)];
    const name = names[Math.floor(Math.random() * names.length)];
    const traits = Array(2)
      .fill(null)
      .map(() => leaderTraits[type][Math.floor(Math.random() * leaderTraits[type].length)]);

    return {
      name,
      title,
      description: `A ${traits[0].toLowerCase()} leader known for being ${traits[1].toLowerCase()}`,
      traits
    };
  };

  const generateResources = (type: FactionType) => {
    return Array(2)
      .fill(null)
      .map(() => {
        const resourceType = resourceTypes[type][Math.floor(Math.random() * resourceTypes[type].length)];
        return {
          name: resourceType,
          type: 'Primary',
          description: `Essential ${type} resource`,
          value: ['Common', 'Uncommon', 'Rare', 'Very Rare'][Math.floor(Math.random() * 4)]
        };
      });
  };

  const generateFaction = () => {
    setIsGenerating(true);

    const type = selectedTypes[Math.floor(Math.random() * selectedTypes.length)] as FactionType;
    
    const newFaction: GeneratedFaction = {
      name: generateName(type),
      type: factionTypes[type],
      description: `A powerful ${type} faction with significant influence`,
      alignment: alignments[Math.floor(Math.random() * alignments.length)],
      size: sizes[Math.floor(Math.random() * sizes.length)],
      influence: influences[Math.floor(Math.random() * influences.length)],
      territory: territories[type][Math.floor(Math.random() * territories[type].length)],
      goals: Array(2)
        .fill(null)
        .map(() => goals[type][Math.floor(Math.random() * goals[type].length)]),
      allies: Array(2)
        .fill(null)
        .map(() => generateName(selectedTypes[Math.floor(Math.random() * selectedTypes.length)] as FactionType)),
      rivals: Array(2)
        .fill(null)
        .map(() => generateName(selectedTypes[Math.floor(Math.random() * selectedTypes.length)] as FactionType)),
      leader: generateLeader(type),
      resources: generateResources(type),
      specialFeatures: Array(2)
        .fill(null)
        .map(() => specialFeatures[type][Math.floor(Math.random() * specialFeatures[type].length)]),
      timestamp: Date.now()
    };

    setGeneratedFactions([newFaction, ...generatedFactions].slice(0, 5));
    setIsGenerating(false);
  };

  const toggleFactionType = (type: FactionType) => {
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
          <h1 className="text-3xl font-bold text-white">Faction Generator</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Controls */}
          <div>
            <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-4">Generate Faction</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Faction Types (select at least one)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(factionTypes) as FactionType[]).map(type => (
                    <button
                      key={type}
                      onClick={() => toggleFactionType(type)}
                      className={`p-3 rounded-lg border transition-all ${
                        selectedTypes.includes(type)
                          ? 'bg-purple-500/20 border-purple-500 text-white'
                          : 'bg-[#1B0A20] border-purple-500/30 text-gray-300 hover:bg-purple-500/10'
                      }`}
                    >
                      {factionTypes[type]}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={generateFaction}
                disabled={isGenerating || selectedTypes.length === 0}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate Faction
              </button>
            </div>
          </div>

          {/* Generated Factions */}
          <div className="space-y-8">
            {generatedFactions.map((faction, index) => (
              <div
                key={faction.timestamp + index}
                className="bg-[#2D1B36] rounded-xl p-6 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-white mb-2">{faction.name}</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-300">
                    {faction.type}
                  </span>
                  <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-300">
                    {faction.alignment}
                  </span>
                  <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-300">
                    {faction.size}
                  </span>
                </div>

                <div className="space-y-6">
                  {/* Basic Info */}
                  <div>
                    <p className="text-gray-300">{faction.description}</p>
                    <div className="mt-2">
                      <span className="text-purple-400">Influence:</span>
                      <span className="text-gray-300 ml-2">{faction.influence}</span>
                    </div>
                    <div className="mt-1">
                      <span className="text-purple-400">Territory:</span>
                      <span className="text-gray-300 ml-2">{faction.territory}</span>
                    </div>
                  </div>

                  {/* Goals */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Goals</h3>
                    <ul className="list-disc list-inside text-gray-300">
                      {faction.goals.map((goal, i) => (
                        <li key={i}>{goal}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Leader */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Leader</h3>
                    <div className="bg-[#1B0A20] rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-white">{faction.leader.name}</span>
                        <span className="text-purple-300">{faction.leader.title}</span>
                      </div>
                      <p className="text-gray-400 text-sm">{faction.leader.description}</p>
                      <div className="flex gap-2 mt-2">
                        {faction.leader.traits.map((trait, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 rounded-full bg-purple-500/10 text-purple-300 text-sm"
                          >
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Resources */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Resources</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {faction.resources.map((resource, i) => (
                        <div key={i} className="bg-[#1B0A20] rounded-lg p-3">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-white">{resource.name}</span>
                            <span className="text-yellow-400 text-sm">{resource.value}</span>
                          </div>
                          <p className="text-gray-400 text-sm mt-1">{resource.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Special Features */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Special Features</h3>
                    <ul className="list-disc list-inside text-gray-300">
                      {faction.specialFeatures.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Relations */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-md font-semibold text-green-400 mb-2">Allies</h3>
                      <ul className="list-disc list-inside text-gray-300">
                        {faction.allies.map((ally, i) => (
                          <li key={i}>{ally}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-md font-semibold text-red-400 mb-2">Rivals</h3>
                      <ul className="list-disc list-inside text-gray-300">
                        {faction.rivals.map((rival, i) => (
                          <li key={i}>{rival}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {generatedFactions.length === 0 && (
              <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg">
                <p className="text-gray-400 text-center">
                  No factions generated yet
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 