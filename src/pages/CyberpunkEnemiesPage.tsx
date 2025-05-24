import { useState, useEffect, useMemo } from 'react';
import { useWorld } from '../contexts/WorldContext';
import { DungeonEncounter } from '../types/dungeon-encounter';
import { MagnifyingGlassIcon, CircleStackIcon, ShieldExclamationIcon, CommandLineIcon } from '@heroicons/react/24/outline';

interface Enemy {
  name: string;
  type: string;
  cr?: number;
  abilities: string[];
  traits?: string[];
  alignment?: string;
  source: {
    encounter: string;
    location: {
      dungeon: string;
      area: string;
      environment?: string;
    };
  };
}

interface LevelEncountersModule {
  levelEncounters: Record<number, DungeonEncounter[]>;
}

const TYPE_COLORS = {
  'Elite': 'text-yellow-400',
  'Leader': 'text-purple-400',
  'Regular': 'text-blue-400',
  'Heavy': 'text-red-400',
  'Hacker': 'text-green-400',
  'Program': 'text-cyan-400',
  'Merchant': 'text-amber-400',
  'Guard': 'text-gray-400',
  'Stationary': 'text-indigo-400',
  'Mobile': 'text-violet-400',
  'Boss': 'text-rose-400'
};

const TYPE_ICONS = {
  'Elite': CircleStackIcon,
  'Leader': CommandLineIcon,
  'Regular': ShieldExclamationIcon,
  'Heavy': ShieldExclamationIcon,
  'Hacker': CommandLineIcon,
  'Program': CircleStackIcon,
  'Merchant': CircleStackIcon,
  'Guard': ShieldExclamationIcon,
  'Stationary': ShieldExclamationIcon,
  'Mobile': CircleStackIcon,
  'Boss': CommandLineIcon
};

export default function CyberpunkEnemiesPage() {
  const { selectedWorld } = useWorld();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [crFilter, setCrFilter] = useState<number | ''>('');
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEnemies = async () => {
      if (!selectedWorld || selectedWorld.id !== 'cyberpunk2077') return;

      try {
        setLoading(true);
        // Import all dungeon encounters from different areas
        const dungeonModules = await Promise.all([
          import('../data/worlds/cyberpunk2077/dungeons/industrial-complex'),
          import('../data/worlds/cyberpunk2077/dungeons/japantown-plaza'),
          import('../data/worlds/cyberpunk2077/dungeons/kabuki-market'),
          import('../data/worlds/cyberpunk2077/dungeons/voodoo-territory'),
          import('../data/worlds/cyberpunk2077/dungeons/nomad-territory'),
          import('../data/worlds/cyberpunk2077/dungeon-encounters/grand-imperial-mall'),
          import('../data/worlds/cyberpunk2077/dungeons/valentinos-territory')
        ]);

        // Combine all encounters
        const allEncounters = dungeonModules.flatMap(module => 
          module.dungeonEncounters || []
        );

        // Transform encounters into a flat list of enemies with source information
        const allEnemies = allEncounters.flatMap(encounter => 
          encounter.enemies.map(enemy => ({
            ...enemy,
            source: {
              encounter: encounter.name,
              location: encounter.location
            }
          }))
        );

        setEnemies(allEnemies);
        setError(null);
      } catch (err) {
        console.error('Error loading enemies:', err);
        setError('Failed to load enemies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadEnemies();
  }, [selectedWorld]);

  const filteredEnemies = useMemo(() => {
    return enemies.filter(enemy => {
      const matchesSearch = searchQuery === '' || 
        enemy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        enemy.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        enemy.abilities.some(ability => ability.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesType = typeFilter === '' || enemy.type === typeFilter;
      const matchesCR = crFilter === '' || enemy.cr === crFilter;

      return matchesSearch && matchesType && matchesCR;
    });
  }, [enemies, searchQuery, typeFilter, crFilter]);

  const uniqueTypes = useMemo(() => 
    Array.from(new Set(enemies.map(enemy => enemy.type))).sort(),
    [enemies]
  );

  const uniqueCRs = useMemo(() => 
    Array.from(new Set(enemies.map(enemy => enemy.cr).filter(Boolean))).sort((a, b) => (a || 0) - (b || 0)),
    [enemies]
  );

  if (!selectedWorld || selectedWorld.id !== 'cyberpunk2077') {
    return (
      <div className="min-h-screen bg-[#1B0A20] text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Wrong World Selected</h1>
          <p>Please select Cyberpunk 2077 world to view its enemies.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1B0A20] text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Loading Enemies...</h1>
          <div className="animate-pulse">
            <div className="h-8 bg-white/10 rounded w-1/4 mb-4"></div>
            <div className="h-32 bg-white/10 rounded mb-4"></div>
            <div className="h-32 bg-white/10 rounded mb-4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#1B0A20] text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Error</h1>
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1B0A20] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-cyan-400">Threats of Night City</h1>
          <span className="text-cyan-400">{filteredEnemies.length} threats detected</span>
        </div>

        {/* Filters */}
        <div className="bg-black/30 rounded-lg p-6 mb-8 border border-cyan-900/50">
          <div className="flex flex-wrap gap-4">
            {/* Search */}
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cyan-400" />
                <input
                  type="text"
                  placeholder="Search threats..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-black/50 rounded-lg border border-cyan-900/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-cyan-400 placeholder-cyan-700"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div className="w-48">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-3 py-2 bg-black/50 rounded-lg border border-cyan-900/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-cyan-400"
              >
                <option value="">All Types</option>
                {uniqueTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* CR Filter */}
            <div className="w-48">
              <select
                value={crFilter}
                onChange={(e) => setCrFilter(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-black/50 rounded-lg border border-cyan-900/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-cyan-400"
              >
                <option value="">All Threat Levels</option>
                {uniqueCRs.map(cr => (
                  <option key={cr} value={cr}>Level {cr}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Enemy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEnemies.map((enemy, index) => {
            const TypeIcon = TYPE_ICONS[enemy.type as keyof typeof TYPE_ICONS] || CircleStackIcon;
            return (
              <div
                key={`${enemy.name}-${index}`}
                className="bg-black/30 rounded-lg p-6 hover:bg-black/40 transition-colors border border-cyan-900/50"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-cyan-400">{enemy.name}</h3>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2">
                      <TypeIcon className={`h-5 w-5 ${TYPE_COLORS[enemy.type as keyof typeof TYPE_COLORS] || 'text-gray-400'}`} />
                      <span className={`text-sm ${TYPE_COLORS[enemy.type as keyof typeof TYPE_COLORS] || 'text-gray-400'}`}>
                        {enemy.type}
                      </span>
                    </div>
                    {enemy.cr !== undefined && (
                      <span className="text-sm text-cyan-400">Threat Level {enemy.cr}</span>
                    )}
                  </div>
                </div>

                {/* Abilities */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-cyan-300 mb-2">Capabilities</h4>
                  <ul className="text-sm text-cyan-500 space-y-1">
                    {enemy.abilities.map((ability, i) => (
                      <li key={i} className="list-disc ml-4">{ability}</li>
                    ))}
                  </ul>
                </div>

                {/* Traits */}
                {enemy.traits && enemy.traits.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-cyan-300 mb-2">Traits</h4>
                    <div className="flex flex-wrap gap-2">
                      {enemy.traits.map((trait, i) => (
                        <span key={i} className="text-xs bg-cyan-900/30 rounded-full px-2 py-1 text-cyan-400 border border-cyan-900/50">
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Source Information */}
                <div className="mt-4 pt-4 border-t border-cyan-900/50">
                  <div className="text-sm text-cyan-600">
                    <p>Operation: {enemy.source.encounter}</p>
                    <p>Location: {enemy.source.location.dungeon} - {enemy.source.location.area}</p>
                    {enemy.source.location.environment && (
                      <p>Environment: {enemy.source.location.environment}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 