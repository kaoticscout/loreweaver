import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Encounter, Monster, Treasure, EncounterArea, DevelopmentOption } from '../types/campaign';

interface EditEncounterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (encounter: Encounter) => void;
  encounter: Encounter;
}

export function EditEncounterModal({ isOpen, onClose, onSave, encounter }: EditEncounterModalProps) {
  const [editedEncounter, setEditedEncounter] = useState<Encounter>(encounter);

  const handleChange = (field: keyof Encounter, value: Encounter[keyof Encounter]) => {
    setEditedEncounter(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedChange = (parent: keyof Encounter, child: string, value: any) => {
    setEditedEncounter(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: value
      }
    }));
  };

  const handleMonsterChange = (index: number, field: keyof Monster, value: Monster[keyof Monster]) => {
    setEditedEncounter(prev => {
      const newMonsters = [...prev.monsters];
      newMonsters[index] = { ...newMonsters[index], [field]: value };
      return { ...prev, monsters: newMonsters };
    });
  };

  const handleAddMonster = () => {
    setEditedEncounter(prev => ({
      ...prev,
      monsters: [
        ...prev.monsters,
        {
          name: '',
          quantity: 1,
          hp: 0,
          ac: 10,
          initiative: 0,
          description: '',
          tactics: '',
          xp: 0
        }
      ]
    }));
  };

  const handleRemoveMonster = (index: number) => {
    setEditedEncounter(prev => ({
      ...prev,
      monsters: prev.monsters.filter((_, i) => i !== index)
    }));
  };

  const handleTreasureChange = (index: number, field: keyof Treasure, value: Treasure[keyof Treasure]) => {
    setEditedEncounter(prev => {
      const newTreasure = [...prev.treasure];
      newTreasure[index] = { ...newTreasure[index], [field]: value };
      return { ...prev, treasure: newTreasure };
    });
  };

  const handleAddTreasure = () => {
    setEditedEncounter(prev => ({
      ...prev,
      treasure: [
        ...prev.treasure,
        {
          type: 'gold',
          name: '',
          value: '',
          description: ''
        }
      ]
    }));
  };

  const handleRemoveTreasure = (index: number) => {
    setEditedEncounter(prev => ({
      ...prev,
      treasure: prev.treasure.filter((_, i) => i !== index)
    }));
  };

  const handleAreaChange = (index: number, field: keyof EncounterArea, value: EncounterArea[keyof EncounterArea]) => {
    setEditedEncounter(prev => {
      const newAreas = [...prev.areas];
      newAreas[index] = { ...newAreas[index], [field]: value };
      return { ...prev, areas: newAreas };
    });
  };

  const handleAddArea = () => {
    setEditedEncounter(prev => ({
      ...prev,
      areas: [
        ...prev.areas,
        {
          id: Date.now().toString(),
          name: '',
          description: '',
          lighting: '',
          terrain: [],
          features: []
        }
      ]
    }));
  };

  const handleRemoveArea = (index: number) => {
    setEditedEncounter(prev => ({
      ...prev,
      areas: prev.areas.filter((_, i) => i !== index)
    }));
  };

  const handleDevelopmentChange = (index: number, field: keyof DevelopmentOption, value: DevelopmentOption[keyof DevelopmentOption]) => {
    setEditedEncounter(prev => {
      const newDevelopments = [...prev.developments];
      newDevelopments[index] = { ...newDevelopments[index], [field]: value };
      return { ...prev, developments: newDevelopments };
    });
  };

  const handleAddDevelopment = () => {
    setEditedEncounter(prev => ({
      ...prev,
      developments: [
        ...prev.developments,
        {
          trigger: '',
          outcome: '',
          consequences: []
        }
      ]
    }));
  };

  const handleRemoveDevelopment = (index: number) => {
    setEditedEncounter(prev => ({
      ...prev,
      developments: prev.developments.filter((_, i) => i !== index)
    }));
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-gray-800 text-gray-400 hover:text-gray-300"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-white">Edit Encounter</h3>
                    <p className="mt-1 text-sm text-gray-400">Edit the details of this encounter.</p>
                  </div>

                  <div className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white">Title</label>
                        <input
                          type="text"
                          value={editedEncounter.title}
                          onChange={(e) => handleChange('title', e.target.value as Encounter['title'])}
                          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white">Type</label>
                        <select
                          value={editedEncounter.type}
                          onChange={(e) => handleChange('type', e.target.value as Encounter['type'])}
                          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        >
                          <option value="combat">Combat</option>
                          <option value="social">Social</option>
                          <option value="exploration">Exploration</option>
                          <option value="puzzle">Puzzle</option>
                          <option value="trap">Trap</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white">Difficulty</label>
                        <select
                          value={editedEncounter.difficulty}
                          onChange={(e) => handleChange('difficulty', e.target.value as Encounter['difficulty'])}
                          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        >
                          <option value="easy">Easy</option>
                          <option value="medium">Medium</option>
                          <option value="hard">Hard</option>
                          <option value="deadly">Deadly</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white">XP Total</label>
                        <input
                          type="number"
                          value={editedEncounter.xpTotal}
                          onChange={(e) => handleChange('xpTotal', parseInt(e.target.value) as Encounter['xpTotal'])}
                          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                    </div>

                    {/* Description and Setup */}
                    <div>
                      <label className="block text-sm font-medium text-white">Description</label>
                      <textarea
                        rows={3}
                        value={editedEncounter.description}
                        onChange={(e) => handleChange('description', e.target.value as Encounter['description'])}
                        className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white">Setup</label>
                      <textarea
                        rows={3}
                        value={editedEncounter.setup}
                        onChange={(e) => handleChange('setup', e.target.value as Encounter['setup'])}
                        className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>

                    {/* Monsters */}
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <label className="block text-sm font-medium text-white">Monsters</label>
                        <button
                          type="button"
                          onClick={handleAddMonster}
                          className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300"
                        >
                          <PlusIcon className="h-4 w-4" />
                          Add Monster
                        </button>
                      </div>
                      <div className="space-y-4">
                        {editedEncounter.monsters.map((monster, index) => (
                          <div key={index} className="bg-gray-700 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex-1 mr-4">
                                <input
                                  type="text"
                                  value={monster.name}
                                  onChange={(e) => handleMonsterChange(index, 'name', e.target.value as Monster['name'])}
                                  placeholder="Monster Name"
                                  className="block w-full rounded-md bg-gray-600 border-gray-500 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveMonster(index)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <XMarkIcon className="h-5 w-5" />
                              </button>
                            </div>
                            <div className="grid grid-cols-4 gap-4 mb-4">
                              <div>
                                <label className="block text-xs font-medium text-gray-300">Quantity</label>
                                <input
                                  type="number"
                                  value={monster.quantity}
                                  onChange={(e) => handleMonsterChange(index, 'quantity', parseInt(e.target.value) as Monster['quantity'])}
                                  className="mt-1 block w-full rounded-md bg-gray-600 border-gray-500 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-300">HP</label>
                                <input
                                  type="number"
                                  value={monster.hp}
                                  onChange={(e) => handleMonsterChange(index, 'hp', parseInt(e.target.value) as Monster['hp'])}
                                  className="mt-1 block w-full rounded-md bg-gray-600 border-gray-500 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-300">AC</label>
                                <input
                                  type="number"
                                  value={monster.ac}
                                  onChange={(e) => handleMonsterChange(index, 'ac', parseInt(e.target.value) as Monster['ac'])}
                                  className="mt-1 block w-full rounded-md bg-gray-600 border-gray-500 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-300">Initiative</label>
                                <input
                                  type="number"
                                  value={monster.initiative}
                                  onChange={(e) => handleMonsterChange(index, 'initiative', parseInt(e.target.value) as Monster['initiative'])}
                                  className="mt-1 block w-full rounded-md bg-gray-600 border-gray-500 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                />
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-xs font-medium text-gray-300">Description</label>
                                <textarea
                                  rows={2}
                                  value={monster.description}
                                  onChange={(e) => handleMonsterChange(index, 'description', e.target.value as Monster['description'])}
                                  className="mt-1 block w-full rounded-md bg-gray-600 border-gray-500 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-300">Tactics</label>
                                <textarea
                                  rows={2}
                                  value={monster.tactics}
                                  onChange={(e) => handleMonsterChange(index, 'tactics', e.target.value as Monster['tactics'])}
                                  className="mt-1 block w-full rounded-md bg-gray-600 border-gray-500 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-300">XP</label>
                                <input
                                  type="number"
                                  value={monster.xp}
                                  onChange={(e) => handleMonsterChange(index, 'xp', parseInt(e.target.value) as Monster['xp'])}
                                  className="mt-1 block w-full rounded-md bg-gray-600 border-gray-500 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Save/Cancel Buttons */}
                    <div className="mt-6 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md bg-gray-700 px-4 py-2 text-sm text-white hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => onSave(editedEncounter)}
                        className="rounded-md bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-700"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
} 