import { useState } from 'react';
import { WrenchScrewdriverIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Deity {
  id: string;
  name: string;
  title: string;
  domain: string;
  description: string;
  symbols: string[];
  alignment: string;
}

interface Belief {
  id: string;
  name: string;
  description: string;
  importance: 'core' | 'major' | 'minor';
  consequences: string;
}

interface Ritual {
  id: string;
  name: string;
  frequency: string;
  description: string;
  requirements: string[];
  significance: string;
}

interface HolySite {
  id: string;
  name: string;
  location: string;
  type: string;
  description: string;
  significance: string;
  guardians: string;
}

export function ReligionGeneratorPage() {
  const [deities, setDeities] = useState<Deity[]>([]);
  const [beliefs, setBeliefs] = useState<Belief[]>([]);
  const [rituals, setRituals] = useState<Ritual[]>([]);
  const [holySites, setHolySites] = useState<HolySite[]>([]);
  const [newDeity, setNewDeity] = useState<Partial<Deity>>({});
  const [newBelief, setNewBelief] = useState<Partial<Belief>>({});
  const [newRitual, setNewRitual] = useState<Partial<Ritual>>({});
  const [newHolySite, setNewHolySite] = useState<Partial<HolySite>>({});

  const domains = [
    'War', 'Peace', 'Nature', 'Magic', 'Death', 'Life', 'Knowledge', 'Trickery',
    'Light', 'Darkness', 'Storm', 'Ocean', 'Fire', 'Earth', 'Air', 'Time',
    'Fate', 'Love', 'Justice', 'Commerce', 'Art', 'Music', 'Travel', 'Other'
  ];

  const alignments = [
    'Lawful Good', 'Neutral Good', 'Chaotic Good',
    'Lawful Neutral', 'True Neutral', 'Chaotic Neutral',
    'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'
  ];

  const siteTypes = [
    'Temple', 'Shrine', 'Cathedral', 'Monastery', 'Sacred Grove',
    'Holy Mountain', 'Ancient Ruins', 'Sacred Spring', 'Other'
  ];

  const handleAddDeity = () => {
    if (newDeity.name && newDeity.domain) {
      setDeities([...deities, {
        id: Date.now().toString(),
        name: newDeity.name,
        title: newDeity.title || '',
        domain: newDeity.domain,
        description: newDeity.description || '',
        symbols: newDeity.symbols || [],
        alignment: newDeity.alignment || 'True Neutral'
      }]);
      setNewDeity({});
    }
  };

  const handleAddBelief = () => {
    if (newBelief.name && newBelief.description && newBelief.importance) {
      setBeliefs([...beliefs, {
        id: Date.now().toString(),
        name: newBelief.name,
        description: newBelief.description,
        importance: newBelief.importance as 'core' | 'major' | 'minor',
        consequences: newBelief.consequences || ''
      }]);
      setNewBelief({});
    }
  };

  const handleAddRitual = () => {
    if (newRitual.name && newRitual.description) {
      setRituals([...rituals, {
        id: Date.now().toString(),
        name: newRitual.name,
        frequency: newRitual.frequency || '',
        description: newRitual.description,
        requirements: newRitual.requirements || [],
        significance: newRitual.significance || ''
      }]);
      setNewRitual({});
    }
  };

  const handleAddHolySite = () => {
    if (newHolySite.name && newHolySite.location && newHolySite.type) {
      setHolySites([...holySites, {
        id: Date.now().toString(),
        name: newHolySite.name,
        location: newHolySite.location,
        type: newHolySite.type,
        description: newHolySite.description || '',
        significance: newHolySite.significance || '',
        guardians: newHolySite.guardians || ''
      }]);
      setNewHolySite({});
    }
  };

  const handleDeleteDeity = (id: string) => {
    setDeities(deities.filter(d => d.id !== id));
  };

  const handleDeleteBelief = (id: string) => {
    setBeliefs(beliefs.filter(b => b.id !== id));
  };

  const handleDeleteRitual = (id: string) => {
    setRituals(rituals.filter(r => r.id !== id));
  };

  const handleDeleteHolySite = (id: string) => {
    setHolySites(holySites.filter(s => s.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <WrenchScrewdriverIcon className="h-8 w-8 text-purple-400" />
          <h1 className="text-3xl font-bold text-white">Religion Generator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Deities Section */}
          <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Deities</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Deity Name"
                  className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                  value={newDeity.name || ''}
                  onChange={(e) => setNewDeity({ ...newDeity, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Title"
                  className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                  value={newDeity.title || ''}
                  onChange={(e) => setNewDeity({ ...newDeity, title: e.target.value })}
                />
                <select
                  className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                  value={newDeity.domain || ''}
                  onChange={(e) => setNewDeity({ ...newDeity, domain: e.target.value })}
                >
                  <option value="">Select Domain</option>
                  {domains.map(domain => (
                    <option key={domain} value={domain}>{domain}</option>
                  ))}
                </select>
                <select
                  className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                  value={newDeity.alignment || ''}
                  onChange={(e) => setNewDeity({ ...newDeity, alignment: e.target.value })}
                >
                  <option value="">Select Alignment</option>
                  {alignments.map(alignment => (
                    <option key={alignment} value={alignment}>{alignment}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Description"
                  className="bg-[#1B0A20] text-white rounded-lg px-4 py-2 col-span-2"
                  value={newDeity.description || ''}
                  onChange={(e) => setNewDeity({ ...newDeity, description: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Symbols (comma-separated)"
                  className="bg-[#1B0A20] text-white rounded-lg px-4 py-2 col-span-2"
                  value={newDeity.symbols?.join(', ') || ''}
                  onChange={(e) => setNewDeity({ ...newDeity, symbols: e.target.value.split(',').map(s => s.trim()) })}
                />
              </div>
              <button
                onClick={handleAddDeity}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <PlusIcon className="h-5 w-5" />
                Add Deity
              </button>
            </div>

            <div className="mt-4 space-y-2">
              {deities.map(deity => (
                <div key={deity.id} className="bg-[#1B0A20] rounded-lg p-4 flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-white">{deity.name}</h3>
                      {deity.title && (
                        <span className="text-gray-400">"{deity.title}"</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{deity.domain} • {deity.alignment}</p>
                    {deity.description && (
                      <p className="text-sm text-gray-400 mt-1">{deity.description}</p>
                    )}
                    {deity.symbols.length > 0 && (
                      <p className="text-sm text-purple-400 mt-1">
                        Symbols: {deity.symbols.join(', ')}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteDeity(deity.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {/* Beliefs Section */}
            <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-4">Core Beliefs</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Belief Name"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newBelief.name || ''}
                    onChange={(e) => setNewBelief({ ...newBelief, name: e.target.value })}
                  />
                  <select
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newBelief.importance || ''}
                    onChange={(e) => setNewBelief({ ...newBelief, importance: e.target.value as 'core' | 'major' | 'minor' })}
                  >
                    <option value="">Select Importance</option>
                    <option value="core">Core Belief</option>
                    <option value="major">Major Belief</option>
                    <option value="minor">Minor Belief</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Description"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2 col-span-2"
                    value={newBelief.description || ''}
                    onChange={(e) => setNewBelief({ ...newBelief, description: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Consequences"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2 col-span-2"
                    value={newBelief.consequences || ''}
                    onChange={(e) => setNewBelief({ ...newBelief, consequences: e.target.value })}
                  />
                </div>
                <button
                  onClick={handleAddBelief}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <PlusIcon className="h-5 w-5" />
                  Add Belief
                </button>
              </div>

              <div className="mt-4 space-y-2">
                {beliefs.map(belief => (
                  <div key={belief.id} className="bg-[#1B0A20] rounded-lg p-4 flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white">{belief.name}</h3>
                        <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs">
                          {belief.importance}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{belief.description}</p>
                      {belief.consequences && (
                        <p className="text-sm text-purple-400 mt-1">
                          Consequences: {belief.consequences}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteBelief(belief.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Rituals Section */}
            <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-4">Rituals</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Ritual Name"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newRitual.name || ''}
                    onChange={(e) => setNewRitual({ ...newRitual, name: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Frequency"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newRitual.frequency || ''}
                    onChange={(e) => setNewRitual({ ...newRitual, frequency: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2 col-span-2"
                    value={newRitual.description || ''}
                    onChange={(e) => setNewRitual({ ...newRitual, description: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Requirements (comma-separated)"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newRitual.requirements?.join(', ') || ''}
                    onChange={(e) => setNewRitual({ ...newRitual, requirements: e.target.value.split(',').map(r => r.trim()) })}
                  />
                  <input
                    type="text"
                    placeholder="Significance"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newRitual.significance || ''}
                    onChange={(e) => setNewRitual({ ...newRitual, significance: e.target.value })}
                  />
                </div>
                <button
                  onClick={handleAddRitual}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <PlusIcon className="h-5 w-5" />
                  Add Ritual
                </button>
              </div>

              <div className="mt-4 space-y-2">
                {rituals.map(ritual => (
                  <div key={ritual.id} className="bg-[#1B0A20] rounded-lg p-4 flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white">{ritual.name}</h3>
                        <span className="text-gray-400">{ritual.frequency}</span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{ritual.description}</p>
                      {ritual.requirements.length > 0 && (
                        <p className="text-sm text-purple-400 mt-1">
                          Requirements: {ritual.requirements.join(', ')}
                        </p>
                      )}
                      {ritual.significance && (
                        <p className="text-sm text-gray-400 mt-1">
                          Significance: {ritual.significance}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteRitual(ritual.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Holy Sites Section */}
            <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-4">Holy Sites</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Site Name"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newHolySite.name || ''}
                    onChange={(e) => setNewHolySite({ ...newHolySite, name: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newHolySite.location || ''}
                    onChange={(e) => setNewHolySite({ ...newHolySite, location: e.target.value })}
                  />
                  <select
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newHolySite.type || ''}
                    onChange={(e) => setNewHolySite({ ...newHolySite, type: e.target.value })}
                  >
                    <option value="">Select Type</option>
                    {siteTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Description"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newHolySite.description || ''}
                    onChange={(e) => setNewHolySite({ ...newHolySite, description: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Significance"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newHolySite.significance || ''}
                    onChange={(e) => setNewHolySite({ ...newHolySite, significance: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Guardians"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newHolySite.guardians || ''}
                    onChange={(e) => setNewHolySite({ ...newHolySite, guardians: e.target.value })}
                  />
                </div>
                <button
                  onClick={handleAddHolySite}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <PlusIcon className="h-5 w-5" />
                  Add Holy Site
                </button>
              </div>

              <div className="mt-4 space-y-2">
                {holySites.map(site => (
                  <div key={site.id} className="bg-[#1B0A20] rounded-lg p-4 flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white">{site.name}</h3>
                        <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs">
                          {site.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">Location: {site.location}</p>
                      {site.description && (
                        <p className="text-sm text-gray-400 mt-1">{site.description}</p>
                      )}
                      {site.significance && (
                        <p className="text-sm text-purple-400 mt-1">
                          Significance: {site.significance}
                        </p>
                      )}
                      {site.guardians && (
                        <p className="text-sm text-gray-400 mt-1">
                          Guardians: {site.guardians}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteHolySite(site.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 