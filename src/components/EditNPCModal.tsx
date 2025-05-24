import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { EditableNPC } from '../types/campaign';

interface EditNPCModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (npc: EditableNPC) => void;
  npc: EditableNPC;
}

export function EditNPCModal({ isOpen, onClose, onSave, npc }: EditNPCModalProps) {
  const [editedNPC, setEditedNPC] = useState<EditableNPC>(npc);

  const handleChange = (field: keyof EditableNPC, value: EditableNPC[keyof EditableNPC]) => {
    setEditedNPC(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field: 'secrets', index: number, value: string) => {
    setEditedNPC(prev => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  const handleAddArrayItem = (field: 'secrets') => {
    setEditedNPC(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const handleRemoveArrayItem = (field: 'secrets', index: number) => {
    setEditedNPC(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
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
                    <h3 className="text-lg font-medium leading-6 text-white">Edit NPC</h3>
                    <p className="mt-1 text-sm text-gray-400">Edit the details of this NPC.</p>
                  </div>

                  <div className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white">Name</label>
                        <input
                          type="text"
                          value={editedNPC.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white">Role</label>
                        <input
                          type="text"
                          value={editedNPC.role}
                          onChange={(e) => handleChange('role', e.target.value)}
                          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                    </div>

                    {/* Appearance and Personality */}
                    <div>
                      <label className="block text-sm font-medium text-white">Appearance</label>
                      <textarea
                        rows={3}
                        value={editedNPC.appearance}
                        onChange={(e) => handleChange('appearance', e.target.value)}
                        className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white">Personality</label>
                      <textarea
                        rows={3}
                        value={editedNPC.personality}
                        onChange={(e) => handleChange('personality', e.target.value)}
                        className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>

                    {/* Motivation */}
                    <div>
                      <label className="block text-sm font-medium text-white">Motivation</label>
                      <textarea
                        rows={3}
                        value={editedNPC.motivation}
                        onChange={(e) => handleChange('motivation', e.target.value)}
                        className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>

                    {/* Secrets */}
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <label className="block text-sm font-medium text-white">Secrets</label>
                        <button
                          type="button"
                          onClick={() => handleAddArrayItem('secrets')}
                          className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300"
                        >
                          <PlusIcon className="h-4 w-4" />
                          Add Secret
                        </button>
                      </div>
                      <div className="space-y-2">
                        {editedNPC.secrets.map((secret, index) => (
                          <div key={index} className="flex gap-2">
                            <input
                              type="text"
                              value={secret}
                              onChange={(e) => handleArrayChange('secrets', index, e.target.value)}
                              className="block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveArrayItem('secrets', index)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <XMarkIcon className="h-5 w-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-sm font-medium text-white">Notes</label>
                      <textarea
                        rows={4}
                        value={editedNPC.notes}
                        onChange={(e) => handleChange('notes', e.target.value)}
                        className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      />
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
                        onClick={() => onSave(editedNPC)}
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