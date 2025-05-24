import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { EditableLocation } from '../types/campaign';

interface EditLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (location: EditableLocation) => void;
  location: EditableLocation;
}

export function EditLocationModal({ isOpen, onClose, onSave, location }: EditLocationModalProps) {
  const [editedLocation, setEditedLocation] = useState<EditableLocation>(location);

  const handleChange = (field: keyof EditableLocation, value: EditableLocation[keyof EditableLocation]) => {
    setEditedLocation(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field: 'keyFeatures' | 'secrets', index: number, value: string) => {
    setEditedLocation(prev => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  const handleAddArrayItem = (field: 'keyFeatures' | 'secrets') => {
    setEditedLocation(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const handleRemoveArrayItem = (field: 'keyFeatures' | 'secrets', index: number) => {
    setEditedLocation(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleConnectionChange = (index: number, field: 'locationId' | 'description', value: string) => {
    setEditedLocation(prev => {
      const newConnections = [...prev.connections];
      newConnections[index] = { ...newConnections[index], [field]: value };
      return {
        ...prev,
        connections: newConnections
      };
    });
  };

  const handleAddConnection = () => {
    setEditedLocation(prev => ({
      ...prev,
      connections: [...prev.connections, { locationId: '', description: '' }]
    }));
  };

  const handleRemoveConnection = (index: number) => {
    setEditedLocation(prev => ({
      ...prev,
      connections: prev.connections.filter((_, i) => i !== index)
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

                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-white">Edit Location</h3>
                    <p className="mt-1 text-sm text-gray-400">Edit the details of this location.</p>
                  </div>

                  <div className="space-y-8">
                    {/* Basic Info */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-1.5">Name</label>
                        <input
                          type="text"
                          value={editedLocation.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          className="mt-1 block w-full rounded-md bg-gray-700 border-0 border-gray-600 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 sm:text-sm sm:leading-6 px-3 py-2"
                        />
                      </div>

                      {/* Description and Atmosphere */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-1.5">Description</label>
                        <textarea
                          rows={3}
                          value={editedLocation.description}
                          onChange={(e) => handleChange('description', e.target.value)}
                          className="mt-1 block w-full rounded-md bg-gray-700 border-0 border-gray-600 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 sm:text-sm sm:leading-6 px-3 py-2"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white mb-1.5">Atmosphere</label>
                        <textarea
                          rows={3}
                          value={editedLocation.atmosphere}
                          onChange={(e) => handleChange('atmosphere', e.target.value)}
                          className="mt-1 block w-full rounded-md bg-gray-700 border-0 border-gray-600 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 sm:text-sm sm:leading-6 px-3 py-2"
                        />
                      </div>
                    </div>

                    {/* Key Features */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="block text-sm font-medium text-white">Key Features</label>
                        <button
                          type="button"
                          onClick={() => handleAddArrayItem('keyFeatures')}
                          className="flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300 px-2 py-1 rounded-md hover:bg-purple-400/10 transition-colors"
                        >
                          <PlusIcon className="h-4 w-4" />
                          Add Feature
                        </button>
                      </div>
                      <div className="space-y-3">
                        {editedLocation.keyFeatures.map((feature, index) => (
                          <div key={index} className="flex gap-2">
                            <input
                              type="text"
                              value={feature}
                              onChange={(e) => handleArrayChange('keyFeatures', index, e.target.value)}
                              className="block w-full rounded-md bg-gray-700 border-0 border-gray-600 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 sm:text-sm sm:leading-6 px-3 py-2"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveArrayItem('keyFeatures', index)}
                              className="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-red-400/10 transition-colors"
                            >
                              <XMarkIcon className="h-5 w-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Secrets */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="block text-sm font-medium text-white">Secrets</label>
                        <button
                          type="button"
                          onClick={() => handleAddArrayItem('secrets')}
                          className="flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300 px-2 py-1 rounded-md hover:bg-purple-400/10 transition-colors"
                        >
                          <PlusIcon className="h-4 w-4" />
                          Add Secret
                        </button>
                      </div>
                      <div className="space-y-3">
                        {editedLocation.secrets.map((secret, index) => (
                          <div key={index} className="flex gap-2">
                            <input
                              type="text"
                              value={secret}
                              onChange={(e) => handleArrayChange('secrets', index, e.target.value)}
                              className="block w-full rounded-md bg-gray-700 border-0 border-gray-600 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 sm:text-sm sm:leading-6 px-3 py-2"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveArrayItem('secrets', index)}
                              className="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-red-400/10 transition-colors"
                            >
                              <XMarkIcon className="h-5 w-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Connections */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="block text-sm font-medium text-white">Connections</label>
                        <button
                          type="button"
                          onClick={handleAddConnection}
                          className="flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300 px-2 py-1 rounded-md hover:bg-purple-400/10 transition-colors"
                        >
                          <PlusIcon className="h-4 w-4" />
                          Add Connection
                        </button>
                      </div>
                      <div className="space-y-4">
                        {editedLocation.connections.map((connection, index) => (
                          <div key={index} className="bg-gray-700/50 rounded-lg p-4 space-y-3">
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={connection.locationId}
                                onChange={(e) => handleConnectionChange(index, 'locationId', e.target.value)}
                                placeholder="Connected Location ID"
                                className="block w-full rounded-md bg-gray-700 border-0 border-gray-600 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 sm:text-sm sm:leading-6 px-3 py-2"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveConnection(index)}
                                className="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-red-400/10 transition-colors"
                              >
                                <XMarkIcon className="h-5 w-5" />
                              </button>
                            </div>
                            <textarea
                              rows={2}
                              value={connection.description}
                              onChange={(e) => handleConnectionChange(index, 'description', e.target.value)}
                              placeholder="Connection Description"
                              className="block w-full rounded-md bg-gray-700 border-0 border-gray-600 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 sm:text-sm sm:leading-6 px-3 py-2"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Save/Cancel Buttons */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
                      <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md bg-gray-700 px-4 py-2 text-sm text-white hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => onSave(editedLocation)}
                        className="rounded-md bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-700 transition-colors"
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