import { useState } from 'react';
import { UserIcon, TrashIcon, PencilIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { WorldsAPI } from '../api/worlds';
import { useAuth } from '../contexts/AuthContext';
import { InvitePlayerDialog } from './InvitePlayerDialog';

interface WorldAccessUser {
  id: string;
  email: string;
  username: string;
  displayName: string | null;
  avatar: string | null;
}

interface WorldAccess {
  id: string;
  role: 'viewer' | 'editor';
  user: WorldAccessUser;
}

interface WorldAccessManagerProps {
  worldId: string;
  creatorId: string;
  sharedWith: WorldAccess[];
  onAccessUpdated: () => void;
}

export function WorldAccessManager({ worldId, creatorId, sharedWith, onAccessUpdated }: WorldAccessManagerProps) {
  const { user } = useAuth();
  const [isEditingRole, setIsEditingRole] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<'viewer' | 'editor'>('viewer');
  const [showInviteDialog, setShowInviteDialog] = useState(false);

  const handleRoleChange = async (userId: string, newRole: 'viewer' | 'editor') => {
    try {
      await WorldsAPI.updatePlayerAccess(worldId, userId, newRole);
      setIsEditingRole(null);
      onAccessUpdated();
    } catch (error) {
      console.error('Failed to update role:', error);
    }
  };

  const handleRemoveAccess = async (userId: string) => {
    try {
      await WorldsAPI.removePlayerAccess(worldId, userId);
      onAccessUpdated();
    } catch (error) {
      console.error('Failed to remove access:', error);
    }
  };

  const handleInvitePlayer = async (email: string, role: 'viewer' | 'editor') => {
    try {
      await WorldsAPI.invitePlayer(worldId, email, role);
      onAccessUpdated();
    } catch (error) {
      console.error('Failed to invite player:', error);
    }
  };

  return (
    <div className="bg-white/5 rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <UserIcon className="w-6 h-6 text-purple-400" />
        World Access
      </h2>
      
      <div className="space-y-4">
        {sharedWith.map((access) => (
          <div 
            key={access.id} 
            className="flex items-center justify-between bg-white/5 rounded-lg p-4"
          >
            <div className="flex items-center gap-3">
              {access.user.avatar ? (
                <img 
                  src={access.user.avatar} 
                  alt={access.user.displayName || access.user.username} 
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <UserIcon className="w-6 h-6 text-purple-300" />
                </div>
              )}
              <div>
                <div className="font-medium">
                  {access.user.displayName || access.user.username}
                </div>
                <div className="text-sm text-gray-400">{access.user.email}</div>
              </div>
            </div>

            {/* Only show controls if current user is creator and not for their own access */}
            {user?.id === creatorId && access.user.id !== creatorId && (
              <div className="flex items-center gap-2">
                {isEditingRole === access.id ? (
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value as 'viewer' | 'editor')}
                      className="bg-white/10 text-white border border-white/20 rounded px-2 py-1"
                    >
                      <option value="viewer">Viewer</option>
                      <option value="editor">Editor</option>
                    </select>
                    <button
                      onClick={() => handleRoleChange(access.user.id, selectedRole)}
                      className="text-green-400 hover:text-green-300 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditingRole(null)}
                      className="text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <span className={`px-2 py-1 rounded text-sm ${
                      access.role === 'editor' 
                        ? 'bg-blue-500/20 text-blue-300' 
                        : 'bg-green-500/20 text-green-300'
                    }`}>
                      {access.role}
                    </span>
                    <button
                      onClick={() => {
                        setIsEditingRole(access.id);
                        setSelectedRole(access.role);
                      }}
                      className="p-1 hover:bg-white/10 rounded transition-colors"
                      title="Edit role"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleRemoveAccess(access.user.id)}
                      className="p-1 hover:bg-white/10 rounded transition-colors text-red-400 hover:text-red-300"
                      title="Remove access"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            )}

            {/* If user is viewing their own access */}
            {access.user.id === user?.id && (
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-sm ${
                  access.role === 'editor' 
                    ? 'bg-blue-500/20 text-blue-300' 
                    : 'bg-green-500/20 text-green-300'
                }`}>
                  {access.role}
                </span>
              </div>
            )}
          </div>
        ))}
        <button 
          onClick={() => setShowInviteDialog(true)}
          className="flex place-self-end mt-4 items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <UserPlusIcon className="w-5 h-5" />
          Invite
        </button>
      </div>

      {/* Invite Dialog */}
      <InvitePlayerDialog
        isOpen={showInviteDialog}
        onClose={() => setShowInviteDialog(false)}
        onInvite={handleInvitePlayer}
      />
    </div>
  );
} 