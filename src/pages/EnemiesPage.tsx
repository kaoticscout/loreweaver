import { useState, useEffect, useMemo } from 'react';
import { useWorld } from '../contexts/WorldContext';
import { DungeonEncounter } from '../types/dungeon-encounter';
import { MagnifyingGlassIcon, FunnelIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

interface Enemy {
  name: string;
  type: string;
  cr?: number;
  abilities: string[];
  traits?: string[];
  alignment?: string;
  resistances?: string[];
  immunities?: string[];
  legendaryActions?: {
    name: string;
    description: string;
    cost?: number;
  }[];
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
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEnemies = async () => {
      if (!selectedWorld) return;

      try {
        setLoading(true);
        const encountersModule = await import(`../data/worlds/${selectedWorld.id}/dungeon-encounters/level-encounters.ts`) as Promise<LevelEncountersModule>;
        const { levelEncounters } = await encountersModule;
        const encounters: DungeonEncounter[] = Object.values(levelEncounters).flat();

        const allEnemies = encounters.flatMap(encounter => 
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
      // Basic text search
      const matchesSearch = searchQuery === '' || 
        enemy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        enemy.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        enemy.abilities.some(ability => ability.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (enemy.traits?.some(trait => trait.toLowerCase().includes(searchQuery.toLowerCase())) ?? false);

      // Type filter
      const matchesType = typeFilter === '' || enemy.type === typeFilter;

      // CR range filter
      const matchesCR = (crFilter === '' || enemy.cr === crFilter) &&
        (minCR === '' || (enemy.cr ?? 0) >= minCR) &&
        (maxCR === '' || (enemy.cr ?? 0) <= maxCR);

      // Alignment filter
      const matchesAlignment = alignmentFilter === '' || enemy.alignment?.includes(alignmentFilter);

      // Environment filter
      const matchesEnvironment = environmentFilter === '' || enemy.source.location.environment?.includes(environmentFilter);

      // Special properties filters
      const matchesLegendaryActions = hasLegendaryActions === null || 
        (hasLegendaryActions ? (enemy.legendaryActions?.length ?? 0) > 0 : !enemy.legendaryActions);
      
      const matchesResistances = hasResistances === null ||
        (hasResistances ? (enemy.resistances?.length ?? 0) > 0 : !(enemy.resistances?.length));

      const matchesImmunities = hasImmunities === null ||
        (hasImmunities ? (enemy.immunities?.length ?? 0) > 0 : !(enemy.immunities?.length));

      return matchesSearch && matchesType && matchesCR && matchesAlignment && 
             matchesEnvironment && matchesLegendaryActions && matchesResistances && 
             matchesImmunities;
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
    hasLegendaryActions,
    hasResistances,
    hasImmunities,
    minCR,
    maxCR,
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

          <div className="flex flex-wrap gap-4">
            {/* Search */}
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search enemies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Basic Filters */}
            <div className="w-48">
              <label className="block text-sm font-medium text-gray-300 mb-1">Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white border border-gray-600"
              >
                <option value="">All Types</option>
                {uniqueTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="w-48">
              <label className="block text-sm font-medium text-gray-300 mb-1">Alignment</label>
              <select
                value={alignmentFilter}
                onChange={(e) => setAlignmentFilter(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white border border-gray-600"
              >
                <option value="">All Alignments</option>
                {uniqueAlignments.map(alignment => (
                  <option key={alignment} value={alignment}>{alignment}</option>
                ))}
              </select>
            </div>

            <div className="w-48">
              <label className="block text-sm font-medium text-gray-300 mb-1">Environment</label>
              <select
                value={environmentFilter}
                onChange={(e) => setEnvironmentFilter(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white border border-gray-600"
              >
                <option value="">All Environments</option>
                {uniqueEnvironments.map(env => (
                  <option key={env} value={env}>{env}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-3">Challenge Rating Range</h3>
                    <div className="flex items-center gap-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Min CR</label>
                        <input
                          type="number"
                          placeholder="0"
                          value={minCR}
                          onChange={(e) => setMinCR(e.target.value === '' ? '' : Number(e.target.value))}
                          className="w-24 px-2 py-1 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-white border border-gray-600"
                        />
                      </div>
                      <div className="text-gray-400 mt-5">to</div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">Max CR</label>
                        <input
                          type="number"
                          placeholder="30"
                          value={maxCR}
                          onChange={(e) => setMaxCR(e.target.value === '' ? '' : Number(e.target.value))}
                          className="w-24 px-2 py-1 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-white border border-gray-600"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-3">Special Properties</h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={hasLegendaryActions === true}
                          onChange={(e) => setHasLegendaryActions(e.target.checked ? true : null)}
                          className="rounded bg-gray-700 border-gray-600 text-purple-500 focus:ring-purple-500 focus:ring-offset-gray-800"
                        />
                        <span className="text-sm text-gray-300">Has Legendary Actions</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={hasResistances === true}
                          onChange={(e) => setHasResistances(e.target.checked ? true : null)}
                          className="rounded bg-gray-700 border-gray-600 text-purple-500 focus:ring-purple-500 focus:ring-offset-gray-800"
                        />
                        <span className="text-sm text-gray-300">Has Resistances</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={hasImmunities === true}
                          onChange={(e) => setHasImmunities(e.target.checked ? true : null)}
                          className="rounded bg-gray-700 border-gray-600 text-purple-500 focus:ring-purple-500 focus:ring-offset-gray-800"
                        />
                        <span className="text-sm text-gray-300">Has Immunities</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Sort Options</h3>
                  <div className="flex items-center gap-3">
                    <select
                      value={sortField}
                      onChange={(e) => setSortField(e.target.value as SortField)}
                      className="px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white border border-gray-600"
                    >
                      <option value="name">Name</option>
                      <option value="type">Type</option>
                      <option value="cr">Challenge Rating</option>
                      <option value="alignment">Alignment</option>
                      <option value="environment">Environment</option>
                    </select>
                    <button
                      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      className="px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 hover:bg-gray-600 transition-colors"
                      title={sortOrder === 'asc' ? 'Sort Ascending' : 'Sort Descending'}
                    >
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </button>
                  </div>
                </div>
              </div>
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

              {/* Traits */}
              {enemy.traits && enemy.traits.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">Traits</h4>
                  <div className="flex flex-wrap gap-2">
                    {enemy.traits.map((trait, i) => (
                      <span key={i} className="text-xs bg-white/10 rounded-full px-2 py-1 text-gray-300">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Resistances & Immunities */}
              <div className="flex gap-4 mb-4">
                {enemy.resistances && enemy.resistances.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">Resistances</h4>
                    <div className="flex flex-wrap gap-2">
                      {enemy.resistances.map((resistance, i) => (
                        <span key={i} className="text-xs bg-red-900/30 text-red-300 rounded-full px-2 py-1">
                          {resistance}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {enemy.immunities && enemy.immunities.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">Immunities</h4>
                    <div className="flex flex-wrap gap-2">
                      {enemy.immunities.map((immunity, i) => (
                        <span key={i} className="text-xs bg-purple-900/30 text-purple-300 rounded-full px-2 py-1">
                          {immunity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Legendary Actions */}
              {enemy.legendaryActions && enemy.legendaryActions.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">Legendary Actions</h4>
                  <div className="space-y-2">
                    {enemy.legendaryActions.map((action, i) => (
                      <div key={i} className="text-sm">
                        <span className="text-purple-300">{action.name}</span>
                        <p className="text-gray-400">{action.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Source Information */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="text-sm text-gray-400">
                  <p>Found in: {enemy.source.encounter}</p>
                  <p>Location: {enemy.source.location.dungeon} - {enemy.source.location.area}</p>
                  {enemy.source.location.environment && (
                    <p>Environment: {enemy.source.location.environment}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 