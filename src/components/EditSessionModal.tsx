import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { CampaignSession } from '../types/campaign';

interface EditSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (session: CampaignSession) => void;
  session: CampaignSession;
}

export function EditSessionModal({ isOpen, onClose, onSave, session }: EditSessionModalProps) {
  const [editedSession, setEditedSession] = useState<CampaignSession>({ ...session });

  const handleChange = (field: string, value: any) => {
    setEditedSession((prev: CampaignSession) => {
      const newSession = { ...prev };
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        newSession[parent as keyof CampaignSession] = {
          ...newSession[parent as keyof CampaignSession],
          [child]: value
        };
      } else {
        newSession[field as keyof CampaignSession] = value;
      }
      return newSession;
    });
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    setEditedSession((prev: CampaignSession) => {
      const newSession = { ...prev };
      const [parent, child] = field.split('.');
      const array = [...(newSession[parent as keyof CampaignSession][child as keyof typeof newSession[keyof CampaignSession]] as string[])];
      array[index] = value;
      newSession[parent as keyof CampaignSession] = {
        ...newSession[parent as keyof CampaignSession],
        [child]: array
      };
      return newSession;
    });
  };

  const handleAddArrayItem = (field: string) => {
    setEditedSession((prev: CampaignSession) => {
      const newSession = { ...prev };
      const [parent, child] = field.split('.');
      const array = [...(newSession[parent as keyof CampaignSession][child as keyof typeof newSession[keyof CampaignSession]] as string[])];
      array.push('');
      newSession[parent as keyof CampaignSession] = {
        ...newSession[parent as keyof CampaignSession],
        [child]: array
      };
      return newSession;
    });
  };

  const handleRemoveArrayItem = (field: string, index: number) => {
    setEditedSession((prev: CampaignSession) => {
      const newSession = { ...prev };
      const [parent, child] = field.split('.');
      const array = [...(newSession[parent as keyof CampaignSession][child as keyof typeof newSession[keyof CampaignSession]] as string[])];
      array.splice(index, 1);
      newSession[parent as keyof CampaignSession] = {
        ...newSession[parent as keyof CampaignSession],
        [child]: array
      };
      return newSession;
    });
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">
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
                    <h3 className="text-lg font-medium leading-6 text-white">Edit Chapter</h3>
                    <p className="mt-1 text-sm text-gray-400">Edit the details of this chapter.</p>
                  </div>

                  <div className="space-y-8">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-white mb-1.5">Title</label>
                        <input
                          type="text"
                          value={editedSession.title}
                          onChange={(e) => handleChange('title', e.target.value)}
                          className="mt-1 block w-full rounded-md bg-gray-700 border-0 border-gray-600 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 sm:text-sm sm:leading-6 px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-1.5">Level Range</label>
                        <input
                          type="text"
                          value={editedSession.level}
                          onChange={(e) => handleChange('level', e.target.value)}
                          className="mt-1 block w-full rounded-md bg-gray-700 border-0 border-gray-600 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 sm:text-sm sm:leading-6 px-3 py-2"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-white mb-1.5">Description</label>
                      <textarea
                        rows={3}
                        value={editedSession.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        className="mt-1 block w-full rounded-md bg-gray-700 border-0 border-gray-600 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 sm:text-sm sm:leading-6 px-3 py-2"
                      />
                    </div>

                    {/* Background */}
                    <div>
                      <label className="block text-sm font-medium text-white mb-1.5">Background</label>
                      <textarea
                        rows={3}
                        value={editedSession.overview.background}
                        onChange={(e) => handleChange('overview.background', e.target.value)}
                        className="mt-1 block w-full rounded-md bg-gray-700 border-0 border-gray-600 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 sm:text-sm sm:leading-6 px-3 py-2"
                      />
                    </div>

                    {/* Hooks */}
                    <div>
                      <label className="block text-sm font-medium text-white mb-3">Adventure Hooks</label>
                      <div className="space-y-3">
                        {editedSession.overview.hooks.map((hook: string, index: number) => (
                          <div key={index} className="flex gap-2">
                            <input
                              type="text"
                              value={hook}
                              onChange={(e) => handleArrayChange('overview.hooks', index, e.target.value)}
                              className="block w-full rounded-md bg-gray-700 border-0 border-gray-600 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 sm:text-sm sm:leading-6 px-3 py-2"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveArrayItem('overview.hooks', index)}
                              className="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-red-400/10 transition-colors"
                            >
                              <XMarkIcon className="h-5 w-5" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => handleAddArrayItem('overview.hooks')}
                          className="mt-2 rounded-md bg-gray-700/50 px-3 py-2 text-sm text-purple-400 hover:text-purple-300 hover:bg-purple-400/10 transition-colors flex items-center gap-1.5"
                        >
                          <XMarkIcon className="h-5 w-5 rotate-45" />
                          Add Hook
                        </button>
                      </div>
                    </div>

                    {/* Goals */}
                    <div>
                      <label className="block text-sm font-medium text-white mb-3">Chapter Goals</label>
                      <div className="space-y-3">
                        {editedSession.overview.goals.map((goal: string, index: number) => (
                          <div key={index} className="flex gap-2">
                            <input
                              type="text"
                              value={goal}
                              onChange={(e) => handleArrayChange('overview.goals', index, e.target.value)}
                              className="block w-full rounded-md bg-gray-700 border-0 border-gray-600 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 sm:text-sm sm:leading-6 px-3 py-2"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveArrayItem('overview.goals', index)}
                              className="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-red-400/10 transition-colors"
                            >
                              <XMarkIcon className="h-5 w-5" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => handleAddArrayItem('overview.goals')}
                          className="mt-2 rounded-md bg-gray-700/50 px-3 py-2 text-sm text-purple-400 hover:text-purple-300 hover:bg-purple-400/10 transition-colors flex items-center gap-1.5"
                        >
                          <XMarkIcon className="h-5 w-5 rotate-45" />
                          Add Goal
                        </button>
                      </div>
                    </div>

                    {/* Objectives */}
                    <div className="grid grid-cols-2 gap-6">
                      {/* Main Objectives */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-3">Main Objectives</label>
                        <div className="space-y-3">
                          {editedSession.objectives.main.map((objective: string, index: number) => (
                            <div key={index} className="flex gap-2">
                              <input
                                type="text"
                                value={objective}
                                onChange={(e) => handleArrayChange('objectives.main', index, e.target.value)}
                                className="block w-full rounded-md bg-gray-700 border-0 border-gray-600 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 sm:text-sm sm:leading-6 px-3 py-2"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveArrayItem('objectives.main', index)}
                                className="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-red-400/10 transition-colors"
                              >
                                <XMarkIcon className="h-5 w-5" />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => handleAddArrayItem('objectives.main')}
                            className="mt-2 rounded-md bg-gray-700/50 px-3 py-2 text-sm text-purple-400 hover:text-purple-300 hover:bg-purple-400/10 transition-colors flex items-center gap-1.5"
                          >
                            <XMarkIcon className="h-5 w-5 rotate-45" />
                            Add Main Objective
                          </button>
                        </div>
                      </div>

                      {/* Optional Objectives */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-3">Optional Objectives</label>
                        <div className="space-y-3">
                          {editedSession.objectives.optional.map((objective: string, index: number) => (
                            <div key={index} className="flex gap-2">
                              <input
                                type="text"
                                value={objective}
                                onChange={(e) => handleArrayChange('objectives.optional', index, e.target.value)}
                                className="block w-full rounded-md bg-gray-700 border-0 border-gray-600 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 sm:text-sm sm:leading-6 px-3 py-2"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveArrayItem('objectives.optional', index)}
                                className="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-red-400/10 transition-colors"
                              >
                                <XMarkIcon className="h-5 w-5" />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => handleAddArrayItem('objectives.optional')}
                            className="mt-2 rounded-md bg-gray-700/50 px-3 py-2 text-sm text-purple-400 hover:text-purple-300 hover:bg-purple-400/10 transition-colors flex items-center gap-1.5"
                          >
                            <XMarkIcon className="h-5 w-5 rotate-45" />
                            Add Optional Objective
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Timing */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-white mb-1.5">Estimated Duration</label>
                          <input
                            type="text"
                            value={editedSession.timing.estimatedDuration}
                            onChange={(e) => handleChange('timing.estimatedDuration', e.target.value)}
                            className="mt-1 block w-full rounded-md bg-gray-700 border-0 border-gray-600 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 sm:text-sm sm:leading-6 px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-white mb-1.5">Time of Day</label>
                          <input
                            type="text"
                            value={editedSession.timing.timeOfDay}
                            onChange={(e) => handleChange('timing.timeOfDay', e.target.value)}
                            className="mt-1 block w-full rounded-md bg-gray-700 border-0 border-gray-600 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 sm:text-sm sm:leading-6 px-3 py-2"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white mb-3">Pacing Notes</label>
                        <div className="space-y-3">
                          {editedSession.timing.pacing.map((note: string, index: number) => (
                            <div key={index} className="flex gap-2">
                              <input
                                type="text"
                                value={note}
                                onChange={(e) => handleArrayChange('timing.pacing', index, e.target.value)}
                                className="block w-full rounded-md bg-gray-700 border-0 border-gray-600 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 sm:text-sm sm:leading-6 px-3 py-2"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveArrayItem('timing.pacing', index)}
                                className="text-red-400 hover:text-red-300 p-2 rounded-md hover:bg-red-400/10 transition-colors"
                              >
                                <XMarkIcon className="h-5 w-5" />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => handleAddArrayItem('timing.pacing')}
                            className="mt-2 rounded-md bg-gray-700/50 px-3 py-2 text-sm text-purple-400 hover:text-purple-300 hover:bg-purple-400/10 transition-colors flex items-center gap-1.5"
                          >
                            <XMarkIcon className="h-5 w-5 rotate-45" />
                            Add Pacing Note
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-700">
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-md bg-gray-700 px-4 py-2 text-sm text-white hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => onSave(editedSession)}
                      className="rounded-md bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-700 transition-colors"
                    >
                      Save Changes
                    </button>
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