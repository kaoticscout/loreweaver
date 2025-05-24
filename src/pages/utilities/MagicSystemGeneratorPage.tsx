import { useState } from 'react';
import { WrenchScrewdriverIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface School {
  id: string;
  name: string;
  description: string;
  primaryEffects: string[];
  opposingSchool?: string;
  practitioners: string;
  limitations: string[];
}

interface SpellComponent {
  id: string;
  name: string;
  type: 'verbal' | 'somatic' | 'material' | 'focus' | 'other';
  description: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  substitutes?: string[];
}

interface MagicalLaw {
  id: string;
  name: string;
  description: string;
  consequences: string;
  exceptions: string[];
  relatedLaws: string[];
}

interface Tradition {
  id: string;
  name: string;
  origin: string;
  practices: string[];
  requirements: string;
  beliefs: string[];
}

export function MagicSystemGeneratorPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [components, setComponents] = useState<SpellComponent[]>([]);
  const [laws, setLaws] = useState<MagicalLaw[]>([]);
  const [traditions, setTraditions] = useState<Tradition[]>([]);
  const [newSchool, setNewSchool] = useState<Partial<School>>({});
  const [newComponent, setNewComponent] = useState<Partial<SpellComponent>>({});
  const [newLaw, setNewLaw] = useState<Partial<MagicalLaw>>({});
  const [newTradition, setNewTradition] = useState<Partial<Tradition>>({});

  const componentTypes = ['verbal', 'somatic', 'material', 'focus', 'other'];
  const rarityLevels = ['common', 'uncommon', 'rare', 'legendary'];

  const handleAddSchool = () => {
    if (newSchool.name && newSchool.description) {
      setSchools([...schools, {
        id: Date.now().toString(),
        name: newSchool.name,
        description: newSchool.description,
        primaryEffects: newSchool.primaryEffects || [],
        opposingSchool: newSchool.opposingSchool,
        practitioners: newSchool.practitioners || '',
        limitations: newSchool.limitations || []
      }]);
      setNewSchool({});
    }
  };

  const handleAddComponent = () => {
    if (newComponent.name && newComponent.type && newComponent.description && newComponent.rarity) {
      setComponents([...components, {
        id: Date.now().toString(),
        name: newComponent.name,
        type: newComponent.type as SpellComponent['type'],
        description: newComponent.description,
        rarity: newComponent.rarity as SpellComponent['rarity'],
        substitutes: newComponent.substitutes || []
      }]);
      setNewComponent({});
    }
  };

  const handleAddLaw = () => {
    if (newLaw.name && newLaw.description && newLaw.consequences) {
      setLaws([...laws, {
        id: Date.now().toString(),
        name: newLaw.name,
        description: newLaw.description,
        consequences: newLaw.consequences,
        exceptions: newLaw.exceptions || [],
        relatedLaws: newLaw.relatedLaws || []
      }]);
      setNewLaw({});
    }
  };

  const handleAddTradition = () => {
    if (newTradition.name && newTradition.origin) {
      setTraditions([...traditions, {
        id: Date.now().toString(),
        name: newTradition.name,
        origin: newTradition.origin,
        practices: newTradition.practices || [],
        requirements: newTradition.requirements || '',
        beliefs: newTradition.beliefs || []
      }]);
      setNewTradition({});
    }
  };

  const handleDeleteSchool = (id: string) => {
    setSchools(schools.filter(s => s.id !== id));
  };

  const handleDeleteComponent = (id: string) => {
    setComponents(components.filter(c => c.id !== id));
  };

  const handleDeleteLaw = (id: string) => {
    setLaws(laws.filter(l => l.id !== id));
  };

  const handleDeleteTradition = (id: string) => {
    setTraditions(traditions.filter(t => t.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <WrenchScrewdriverIcon className="h-8 w-8 text-purple-400" />
          <h1 className="text-3xl font-bold text-white">Magic System Generator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Schools of Magic Section */}
          <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Schools of Magic</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="School Name"
                  className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                  value={newSchool.name || ''}
                  onChange={(e) => setNewSchool({ ...newSchool, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Opposing School"
                  className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                  value={newSchool.opposingSchool || ''}
                  onChange={(e) => setNewSchool({ ...newSchool, opposingSchool: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Description"
                  className="bg-[#1B0A20] text-white rounded-lg px-4 py-2 col-span-2"
                  value={newSchool.description || ''}
                  onChange={(e) => setNewSchool({ ...newSchool, description: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Primary Effects (comma-separated)"
                  className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                  value={newSchool.primaryEffects?.join(', ') || ''}
                  onChange={(e) => setNewSchool({ ...newSchool, primaryEffects: e.target.value.split(',').map(e => e.trim()) })}
                />
                <input
                  type="text"
                  placeholder="Practitioners"
                  className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                  value={newSchool.practitioners || ''}
                  onChange={(e) => setNewSchool({ ...newSchool, practitioners: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Limitations (comma-separated)"
                  className="bg-[#1B0A20] text-white rounded-lg px-4 py-2 col-span-2"
                  value={newSchool.limitations?.join(', ') || ''}
                  onChange={(e) => setNewSchool({ ...newSchool, limitations: e.target.value.split(',').map(l => l.trim()) })}
                />
              </div>
              <button
                onClick={handleAddSchool}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <PlusIcon className="h-5 w-5" />
                Add School of Magic
              </button>
            </div>

            <div className="mt-4 space-y-2">
              {schools.map(school => (
                <div key={school.id} className="bg-[#1B0A20] rounded-lg p-4 flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-white">{school.name}</h3>
                      {school.opposingSchool && (
                        <span className="text-red-400 text-sm">
                          Opposes: {school.opposingSchool}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{school.description}</p>
                    {school.primaryEffects.length > 0 && (
                      <p className="text-sm text-purple-400 mt-1">
                        Effects: {school.primaryEffects.join(', ')}
                      </p>
                    )}
                    {school.practitioners && (
                      <p className="text-sm text-gray-400 mt-1">
                        Practitioners: {school.practitioners}
                      </p>
                    )}
                    {school.limitations.length > 0 && (
                      <p className="text-sm text-red-400 mt-1">
                        Limitations: {school.limitations.join(', ')}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteSchool(school.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {/* Spell Components */}
            <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-4">Spell Components</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Component Name"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newComponent.name || ''}
                    onChange={(e) => setNewComponent({ ...newComponent, name: e.target.value })}
                  />
                  <select
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newComponent.type || ''}
                    onChange={(e) => setNewComponent({ ...newComponent, type: e.target.value as SpellComponent['type'] })}
                  >
                    <option value="">Select Type</option>
                    {componentTypes.map(type => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                  <select
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newComponent.rarity || ''}
                    onChange={(e) => setNewComponent({ ...newComponent, rarity: e.target.value as SpellComponent['rarity'] })}
                  >
                    <option value="">Select Rarity</option>
                    {rarityLevels.map(rarity => (
                      <option key={rarity} value={rarity}>
                        {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Description"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newComponent.description || ''}
                    onChange={(e) => setNewComponent({ ...newComponent, description: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Substitutes (comma-separated)"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2 col-span-2"
                    value={newComponent.substitutes?.join(', ') || ''}
                    onChange={(e) => setNewComponent({ ...newComponent, substitutes: e.target.value.split(',').map(s => s.trim()) })}
                  />
                </div>
                <button
                  onClick={handleAddComponent}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <PlusIcon className="h-5 w-5" />
                  Add Component
                </button>
              </div>

              <div className="mt-4 space-y-2">
                {components.map(component => (
                  <div key={component.id} className="bg-[#1B0A20] rounded-lg p-4 flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white">{component.name}</h3>
                        <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs">
                          {component.type}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs">
                          {component.rarity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{component.description}</p>
                      {component.substitutes && component.substitutes.length > 0 && (
                        <p className="text-sm text-purple-400 mt-1">
                          Substitutes: {component.substitutes.join(', ')}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteComponent(component.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Magical Laws */}
            <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-4">Magical Laws</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Law Name"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newLaw.name || ''}
                    onChange={(e) => setNewLaw({ ...newLaw, name: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newLaw.description || ''}
                    onChange={(e) => setNewLaw({ ...newLaw, description: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Consequences"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newLaw.consequences || ''}
                    onChange={(e) => setNewLaw({ ...newLaw, consequences: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Exceptions (comma-separated)"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newLaw.exceptions?.join(', ') || ''}
                    onChange={(e) => setNewLaw({ ...newLaw, exceptions: e.target.value.split(',').map(ex => ex.trim()) })}
                  />
                  <input
                    type="text"
                    placeholder="Related Laws (comma-separated)"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2 col-span-2"
                    value={newLaw.relatedLaws?.join(', ') || ''}
                    onChange={(e) => setNewLaw({ ...newLaw, relatedLaws: e.target.value.split(',').map(l => l.trim()) })}
                  />
                </div>
                <button
                  onClick={handleAddLaw}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <PlusIcon className="h-5 w-5" />
                  Add Magical Law
                </button>
              </div>

              <div className="mt-4 space-y-2">
                {laws.map(law => (
                  <div key={law.id} className="bg-[#1B0A20] rounded-lg p-4 flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-white">{law.name}</h3>
                      <p className="text-sm text-gray-400 mt-1">{law.description}</p>
                      <p className="text-sm text-red-400 mt-1">
                        Consequences: {law.consequences}
                      </p>
                      {law.exceptions.length > 0 && (
                        <p className="text-sm text-purple-400 mt-1">
                          Exceptions: {law.exceptions.join(', ')}
                        </p>
                      )}
                      {law.relatedLaws.length > 0 && (
                        <p className="text-sm text-gray-400 mt-1">
                          Related Laws: {law.relatedLaws.join(', ')}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteLaw(law.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Magical Traditions */}
            <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-4">Magical Traditions</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Tradition Name"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newTradition.name || ''}
                    onChange={(e) => setNewTradition({ ...newTradition, name: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Origin"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newTradition.origin || ''}
                    onChange={(e) => setNewTradition({ ...newTradition, origin: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Practices (comma-separated)"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newTradition.practices?.join(', ') || ''}
                    onChange={(e) => setNewTradition({ ...newTradition, practices: e.target.value.split(',').map(p => p.trim()) })}
                  />
                  <input
                    type="text"
                    placeholder="Requirements"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newTradition.requirements || ''}
                    onChange={(e) => setNewTradition({ ...newTradition, requirements: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Beliefs (comma-separated)"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2 col-span-2"
                    value={newTradition.beliefs?.join(', ') || ''}
                    onChange={(e) => setNewTradition({ ...newTradition, beliefs: e.target.value.split(',').map(b => b.trim()) })}
                  />
                </div>
                <button
                  onClick={handleAddTradition}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <PlusIcon className="h-5 w-5" />
                  Add Tradition
                </button>
              </div>

              <div className="mt-4 space-y-2">
                {traditions.map(tradition => (
                  <div key={tradition.id} className="bg-[#1B0A20] rounded-lg p-4 flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white">{tradition.name}</h3>
                        <span className="text-gray-400">({tradition.origin})</span>
                      </div>
                      {tradition.practices.length > 0 && (
                        <p className="text-sm text-purple-400 mt-1">
                          Practices: {tradition.practices.join(', ')}
                        </p>
                      )}
                      {tradition.requirements && (
                        <p className="text-sm text-red-400 mt-1">
                          Requirements: {tradition.requirements}
                        </p>
                      )}
                      {tradition.beliefs.length > 0 && (
                        <p className="text-sm text-gray-400 mt-1">
                          Beliefs: {tradition.beliefs.join(', ')}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteTradition(tradition.id)}
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