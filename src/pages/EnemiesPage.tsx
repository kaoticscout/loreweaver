import { useState, useEffect, useMemo } from 'react';
import { useWorld } from '../contexts/WorldContext';
import { DungeonEncounter } from '../types/dungeon-encounter';
import { MagnifyingGlassIcon, FunnelIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

interface Enemy {
  name: string;
  type: string;
  count: number;
  cr?: number;
  abilities: string[];
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

interface DBEnemy {
  name: string;
  type: string;
  count: number;
  cr?: number;
  abilities?: string[];
  alignment?: string;
}

interface LevelEncountersModule {
  levelEncounters: Record<number, DungeonEncounter[]>;
}

type SortField = 'name' | 'type' | 'cr' | 'alignment' | 'environment';
type SortOrder = 'asc' | 'desc';

export default function EnemiesPage() {
  const { selectedWorld } = useWorld();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [crFilter, setCrFilter] = useState<number | ''>('');
  const [alignmentFilter, setAlignmentFilter] = useState<string>('');
  const [environmentFilter, setEnvironmentFilter] = useState<string>('');
  const [hasLegendaryActions, setHasLegendaryActions] = useState<boolean | null>(null);
  const [hasResistances, setHasResistances] = useState<boolean | null>(null);
  const [hasImmunities, setHasImmunities] = useState<boolean | null>(null);
  const [minCR, setMinCR] = useState<number | ''>('');
  const [maxCR, setMaxCR] = useState<number | ''>('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  useEffect(() => {
    const loadEnemies = async () => {
      if (!selectedWorld) return;

      try {
        setLoading(true);
        
        const response = await fetch(`http://localhost:3001/api/worlds/${selectedWorld.id}/enemies`);
        if (!response.ok) {
          throw new Error('Failed to fetch enemies');
        }
        
        const enemies = await response.json();
        setEnemies(enemies);
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
      const matchesAlignment = alignmentFilter === '' || enemy.alignment === alignmentFilter;
      const matchesEnvironment = environmentFilter === '' || enemy.source.location.environment === environmentFilter;

      return matchesSearch && matchesType && matchesCR && matchesAlignment && matchesEnvironment;
    }).sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'type':
          comparison = a.type.localeCompare(b.type);
          break;
        case 'cr':
          comparison = ((a.cr ?? 0) - (b.cr ?? 0));
          break;
        case 'alignment':
          comparison = (a.alignment ?? '').localeCompare(b.alignment ?? '');
          break;
        case 'environment':
          comparison = (a.source.location.environment ?? '').localeCompare(b.source.location.environment ?? '');
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [
    enemies, 
    searchQuery, 
    typeFilter, 
    crFilter, 
    alignmentFilter, 
    environmentFilter,
    sortField,
    sortOrder
  ]);

  const uniqueTypes = useMemo(() => 
    Array.from(new Set(enemies.map(enemy => enemy.type))).sort(),
    [enemies]
  );

  const uniqueCRs = useMemo(() => 
    Array.from(new Set(enemies.map(enemy => enemy.cr).filter(Boolean))).sort((a, b) => (a || 0) - (b || 0)),
    [enemies]
  );

  const uniqueAlignments = useMemo(() =>
    Array.from(new Set(enemies.map(enemy => enemy.alignment).filter(Boolean))).sort(),
    [enemies]
  );

  const uniqueEnvironments = useMemo(() =>
    Array.from(new Set(enemies.map(enemy => enemy.source.location.environment).filter(Boolean))).sort(),
    [enemies]
  );

  if (!selectedWorld) {
    return (
      <div className="min-h-screen bg-[#1B0A20] text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">No World Selected</h1>
          <p>Please select a world to view its enemies.</p>
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
          <h1 className="text-3xl font-bold">Enemies of {selectedWorld.name}</h1>
          <span className="text-gray-400">{filteredEnemies.length} enemies found</span>
        </div>

        {/* Filters */}
        <div className="bg-white/5 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Filters</h2>
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5" />
              {showAdvancedFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, type, or abilities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Basic Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-white/5 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">All Types</option>
              {uniqueTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select
              value={crFilter}
              onChange={(e) => setCrFilter(e.target.value ? Number(e.target.value) : '')}
              className="bg-white/5 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">All CRs</option>
              {uniqueCRs.map(cr => (
                <option key={cr} value={cr}>CR {cr}</option>
              ))}
            </select>

            <select
              value={alignmentFilter}
              onChange={(e) => setAlignmentFilter(e.target.value)}
              className="bg-white/5 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">All Alignments</option>
              {uniqueAlignments.map(alignment => (
                <option key={alignment} value={alignment}>{alignment}</option>
              ))}
            </select>
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={environmentFilter}
                onChange={(e) => setEnvironmentFilter(e.target.value)}
                className="bg-white/5 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">All Environments</option>
                {uniqueEnvironments.map(env => (
                  <option key={env} value={env}>{env}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Enemy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEnemies.map((enemy, index) => (
            <div
              key={`${enemy.name}-${index}`}
              className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-purple-300">{enemy.name}</h3>
                <div className="flex flex-col items-end">
                  <span className="text-sm text-gray-400">{enemy.type}</span>
                  {enemy.cr !== undefined && (
                    <span className="text-sm text-yellow-400">CR {enemy.cr}</span>
                  )}
                </div>
              </div>

              {/* Abilities */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Abilities</h4>
                <ul className="text-sm text-gray-400 space-y-1">
                  {enemy.abilities.map((ability, i) => (
                    <li key={i} className="list-disc ml-4">{ability}</li>
                  ))}
                </ul>
              </div>

              {/* Location */}
              <div className="text-sm text-gray-400">
                <p>Found in: {enemy.source.location.area} ({enemy.source.location.dungeon})</p>
                {enemy.source.location.environment && (
                  <p>Environment: {enemy.source.location.environment}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 