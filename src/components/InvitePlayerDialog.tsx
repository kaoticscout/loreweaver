import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { UserPlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface InvitePlayerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (email: string, role: 'viewer' | 'editor') => void;
}

export function InvitePlayerDialog({ isOpen, onClose, onInvite }: InvitePlayerDialogProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'viewer' | 'editor'>('viewer');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    onInvite(email, role);
    setEmail('');
    setRole('viewer');
    setError(null);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
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
          <div className="fixed inset-0 bg-black/80" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#2A1B3D] p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <Dialog.Title className="text-lg font-medium text-[#fcedbe] flex items-center gap-2">
                    <UserPlusIcon className="w-5 h-5" />
                    Invite Player
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-[#B67C3C] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-white/5 border border-[#B67C3C]/20 rounded-lg text-[#fcedbe] placeholder-[#B67C3C]/50 focus:outline-none focus:ring-2 focus:ring-[#B67C3C] focus:border-transparent"
                      placeholder="Enter their email address"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-[#B67C3C] mb-2">
                      Access Level
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setRole('viewer')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          role === 'viewer'
                            ? 'bg-gradient-to-r from-[#B67C3C] to-[#fcedbe] text-[#2A1B3D]'
                            : 'text-[#fcedbe] bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        Viewer
                      </button>
                      <button
                        type="button"
                        onClick={() => setRole('editor')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          role === 'editor'
                            ? 'bg-gradient-to-r from-[#B67C3C] to-[#fcedbe] text-[#2A1B3D]'
                            : 'text-[#fcedbe] bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        Editor
                      </button>
                    </div>
                    <p className="mt-2 text-sm text-[#B67C3C]/70">
                      {role === 'viewer' 
                        ? 'Can view and interact with the world'
                        : 'Can edit and modify the world'}
                    </p>
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm mb-4">{error}</p>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-[#B67C3C] to-[#fcedbe] text-[#2A1B3D] px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      Send Invite
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 