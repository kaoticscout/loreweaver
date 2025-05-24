import React, { useState, useEffect } from 'react';
import type { NPC } from '../types/npc';
import { NPCStatus, RelationshipStatus } from '../types/npc';
import { UserGroupIcon, MapPinIcon, ClockIcon, ChatBubbleLeftIcon, ChevronDownIcon, ChevronUpIcon, ScaleIcon, CurrencyDollarIcon, HeartIcon, UserIcon, PencilIcon, CheckIcon, XMarkIcon, DocumentTextIcon, PlusIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useWorld } from '../contexts/WorldContext';

const NPCsPage: React.FC = () => {
    const { selectedWorld } = useWorld();
    const [selectedStatus, setSelectedStatus] = useState<NPCStatus | 'all'>('all');
    const [selectedLocation, setSelectedLocation] = useState<string>('all');
    const [selectedRelationship, setSelectedRelationship] = useState<RelationshipStatus | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedNPCs, setExpandedNPCs] = useState<Set<string>>(new Set());
    const [editingNPC, setEditingNPC] = useState<string | null>(null);
    const [editedNPC, setEditedNPC] = useState<NPC | null>(null);
    const [npcs, setNPCs] = useState<NPC[]>([]);
    const [newNote, setNewNote] = useState<string>('');
    const [deleteConfirmation, setDeleteConfirmation] = useState<{
        show: boolean;
        npcId: string;
        noteId: string;
    } | null>(null);

    // Load NPCs when world changes
    useEffect(() => {
        if (selectedWorld) {
            // Dynamically import NPCs based on selected world
            import(`../data/worlds/${selectedWorld.id}/npcs/index`).then(module => {
                setNPCs(module.npcs || []);
            }).catch(error => {
                console.error(`Failed to load NPCs for world ${selectedWorld.id}:`, error);
                setNPCs([]);
            });
        } else {
            setNPCs([]);
        }
    }, [selectedWorld]);

    const toggleNPCExpansion = (npcId: string) => {
        setExpandedNPCs(prev => {
            const newSet = new Set(prev);
            if (newSet.has(npcId)) {
                newSet.delete(npcId);
            } else {
                newSet.add(npcId);
            }
            return newSet;
        });
    };

    // Get unique locations from NPCs
    const locations = React.useMemo(() => {
        const uniqueLocations = new Set(npcs.map(npc => npc.location));
        return ['all', ...Array.from(uniqueLocations)].sort();
    }, [npcs]);

    const handleEdit = (npc: NPC) => {
        setEditingNPC(npc.id);
        setEditedNPC({ ...npc });
    };

    const handleSave = () => {
        if (editedNPC) {
            setNPCs(npcs.map(npc => 
                npc.id === editedNPC.id ? editedNPC : npc
            ));
            setEditingNPC(null);
            setEditedNPC(null);
        }
    };

    const handleCancel = () => {
        setEditingNPC(null);
        setEditedNPC(null);
    };

    const handleChange = (field: keyof NPC, value: any) => {
        if (editedNPC) {
            setEditedNPC({ ...editedNPC, [field]: value });
        }
    };

    const handleAddNote = (npcId: string) => {
        if (!newNote.trim()) return;
        
        setNPCs(npcs.map(npc => {
            if (npc.id === npcId) {
                const newNoteObj = {
                    id: Date.now().toString(),
                    text: newNote.trim(),
                    timestamp: new Date().toISOString()
                };
                return {
                    ...npc,
                    notes: [...(npc.notes || []), newNoteObj]
                };
            }
            return npc;
        }));
        setNewNote('');
    };

    const handleDeleteNote = (npcId: string, noteId: string) => {
        setDeleteConfirmation({
            show: true,
            npcId,
            noteId
        });
    };

    const confirmDeleteNote = () => {
        if (deleteConfirmation) {
            if (editingNPC === deleteConfirmation.npcId) {
                // If we're in edit mode, update the editedNPC state
                const updatedNotes = editedNPC?.notes?.filter(note => note.id !== deleteConfirmation.noteId) || [];
                handleChange('notes', updatedNotes);
            } else {
                // If we're in view mode, update the npcs state directly
                setNPCs(npcs.map(npc => {
                    if (npc.id === deleteConfirmation.npcId) {
                        return {
                            ...npc,
                            notes: npc.notes?.filter(note => note.id !== deleteConfirmation.noteId) || []
                        };
                    }
                    return npc;
                }));
            }
            setDeleteConfirmation(null);
        }
    };

    const cancelDeleteNote = () => {
        setDeleteConfirmation(null);
    };

    const filteredNPCs = npcs.filter(npc => {
        const matchesStatus = selectedStatus === 'all' || npc.status === selectedStatus;
        const matchesLocation = selectedLocation === 'all' || npc.location === selectedLocation;
        const matchesRelationship = selectedRelationship === 'all' || npc.relationshipStatus === selectedRelationship;
        const matchesSearch = npc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            npc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            npc.role.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesLocation && matchesRelationship && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1B0A20] to-[#2D1B36] text-white pt-20 px-4 sm:px-6 lg:px-8 pb-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-2 mb-8">
                    <UserGroupIcon className="w-8 h-8 text-purple-400" />
                    <h1 className="text-3xl font-bold">People</h1>
                </div>
                
                {/* Filters */}
                <div className="mb-8 flex flex-wrap gap-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search people..."
                            className="w-full px-4 py-2 bg-gray-800/40 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    
                    <select
                        className="px-4 py-2 bg-gray-800/40 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none cursor-pointer hover:bg-gray-800/60 transition-colors duration-200"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value as NPCStatus | 'all')}
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a855f7'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 0.75rem center',
                            backgroundSize: '1.25rem',
                            paddingRight: '2.5rem'
                        }}
                    >
                        <option value="all" className="bg-gray-800 text-white">All Status</option>
                        {Object.values(NPCStatus).map(status => (
                            <option key={status} value={status} className="bg-gray-800 text-white">
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                        ))}
                    </select>

                    <select
                        className="px-4 py-2 bg-gray-800/40 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none cursor-pointer hover:bg-gray-800/60 transition-colors duration-200"
                        value={selectedRelationship}
                        onChange={(e) => setSelectedRelationship(e.target.value as RelationshipStatus | 'all')}
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a855f7'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 0.75rem center',
                            backgroundSize: '1.25rem',
                            paddingRight: '2.5rem'
                        }}
                    >
                        <option value="all" className="bg-gray-800 text-white">All Relationships</option>
                        {Object.values(RelationshipStatus).map(status => (
                            <option key={status} value={status} className="bg-gray-800 text-white">
                                {status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </option>
                        ))}
                    </select>

                    <select
                        className="px-4 py-2 bg-gray-800/40 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none cursor-pointer hover:bg-gray-800/60 transition-colors duration-200"
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a855f7'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 0.75rem center',
                            backgroundSize: '1.25rem',
                            paddingRight: '2.5rem'
                        }}
                    >
                        <option value="all" className="bg-gray-800 text-white">All Locations</option>
                        {locations.filter(loc => loc !== 'all').map(location => (
                            <option key={location} value={location} className="bg-gray-800 text-white">
                                {location}
                            </option>
                        ))}
                    </select>
                </div>

                {/* NPC List */}
                <div className="grid gap-6">
                    {filteredNPCs.map(npc => (
                        <div
                            key={npc.id}
                            className="bg-gray-800/40 rounded-xl border border-gray-700/50 p-6 hover:shadow-lg transition-all duration-200 hover:border-purple-500/50"
                        >
                            {/* Basic NPC Info */}
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    {editingNPC === npc.id ? (
                                        <div className="space-y-4">
                                            <input
                                                type="text"
                                                value={editedNPC?.name || ''}
                                                onChange={(e) => handleChange('name', e.target.value)}
                                                className="w-full px-3 py-2 bg-gray-900/40 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            />
                                            <input
                                                type="text"
                                                value={editedNPC?.role || ''}
                                                onChange={(e) => handleChange('role', e.target.value)}
                                                className="w-full px-3 py-2 bg-gray-900/40 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            />
                                        </div>
                                    ) : (
                                        <>
                                            <h2 className="text-xl font-semibold text-white">{npc.name}</h2>
                                            <p className="text-gray-400">{npc.role}</p>
                                        </>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    {editingNPC === npc.id ? (
                                        <>
                                            <button
                                                onClick={handleSave}
                                                className="p-1 rounded-lg bg-green-900/40 text-green-300 border border-green-700/50 hover:bg-green-900/60 transition-colors duration-200"
                                            >
                                                <CheckIcon className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                className="p-1 rounded-lg bg-red-900/40 text-red-300 border border-red-700/50 hover:bg-red-900/60 transition-colors duration-200"
                                            >
                                                <XMarkIcon className="w-5 h-5" />
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => handleEdit(npc)}
                                            className="p-1 rounded-lg bg-gray-900/40 text-gray-400 border border-gray-700/50 hover:bg-gray-900/60 transition-colors duration-200"
                                        >
                                            <PencilIcon className="w-5 h-5" />
                                        </button>
                                    )}
                                    <span className={`px-3 py-1 rounded-full text-sm ${
                                        npc.status === NPCStatus.ALIVE ? 'bg-green-900/40 text-green-300 border border-green-700/50' :
                                        npc.status === NPCStatus.DEAD ? 'bg-red-900/40 text-red-300 border border-red-700/50' :
                                        npc.status === NPCStatus.MISSING ? 'bg-yellow-900/40 text-yellow-300 border border-yellow-700/50' :
                                        'bg-gray-900/40 text-gray-300 border border-gray-700/50'
                                    }`}>
                                        {editingNPC === npc.id ? (
                                            <select
                                                value={editedNPC?.status || NPCStatus.ALIVE}
                                                onChange={(e) => handleChange('status', e.target.value)}
                                                className="bg-transparent border-none focus:outline-none focus:ring-0"
                                            >
                                                {Object.values(NPCStatus).map(status => (
                                                    <option key={status} value={status}>
                                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            npc.status.charAt(0).toUpperCase() + npc.status.slice(1)
                                        )}
                                    </span>
                                    {npc.level && (
                                        <span className="px-3 py-1 rounded-full text-sm bg-blue-900/40 text-blue-300 border border-blue-700/50">
                                            {editingNPC === npc.id ? (
                                                <input
                                                    type="number"
                                                    value={editedNPC?.level || 0}
                                                    onChange={(e) => handleChange('level', parseInt(e.target.value))}
                                                    className="w-16 bg-transparent border-none focus:outline-none focus:ring-0"
                                                />
                                            ) : (
                                                `Level ${npc.level}`
                                            )}
                                        </span>
                                    )}
                                    <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                                        npc.relationshipStatus === RelationshipStatus.UNMET ? 'bg-gray-900/40 text-gray-400 border border-gray-700/50' :
                                        npc.relationshipStatus === RelationshipStatus.MET ? 'bg-blue-900/40 text-blue-300 border border-blue-700/50' :
                                        npc.relationshipStatus === RelationshipStatus.FRIENDLY ? 'bg-green-900/40 text-green-300 border border-green-700/50' :
                                        npc.relationshipStatus === RelationshipStatus.CLOSE_FRIENDS ? 'bg-purple-900/40 text-purple-300 border border-purple-700/50' :
                                        npc.relationshipStatus === RelationshipStatus.ALLY ? 'bg-indigo-900/40 text-indigo-300 border border-indigo-700/50' :
                                        npc.relationshipStatus === RelationshipStatus.RIVAL ? 'bg-yellow-900/40 text-yellow-300 border border-yellow-700/50' :
                                        'bg-red-900/40 text-red-300 border border-red-700/50'
                                    }`}>
                                        <UserIcon className="w-4 h-4" />
                                        {editingNPC === npc.id ? (
                                            <select
                                                value={editedNPC?.relationshipStatus || RelationshipStatus.UNMET}
                                                onChange={(e) => handleChange('relationshipStatus', e.target.value)}
                                                className="bg-transparent border-none focus:outline-none focus:ring-0"
                                            >
                                                {Object.values(RelationshipStatus).map(status => (
                                                    <option key={status} value={status}>
                                                        {status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            npc.relationshipStatus.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                                        )}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mb-6 bg-gray-900/40 rounded-lg p-3 border border-gray-700/50">
                                <MapPinIcon className="w-5 h-5 text-purple-400" />
                                <div className="flex-1">
                                    <h3 className="font-semibold mb-2 text-purple-300">Location</h3>
                                    {editingNPC === npc.id ? (
                                        <input
                                            type="text"
                                            value={editedNPC?.location || ''}
                                            onChange={(e) => handleChange('location', e.target.value)}
                                            className="w-full px-3 py-2 bg-gray-900/40 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                    ) : (
                                        <>
                                            <p className="text-white font-medium">{npc.location}</p>
                                            <p className="text-sm text-gray-400 mt-1">Sword Coast</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            {editingNPC === npc.id ? (
                                <textarea
                                    value={editedNPC?.description || ''}
                                    onChange={(e) => handleChange('description', e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-900/40 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-6"
                                    rows={4}
                                />
                            ) : (
                                <p className="text-gray-300 mb-6">{npc.description}</p>
                            )}

                            {/* Basic Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-900/40 rounded-lg p-4 border border-gray-700/50">
                                    <h3 className="font-semibold mb-4 text-purple-300">Details</h3>
                                    <div className="space-y-3">
                                        {npc.faction && (
                                            <div className="flex items-center gap-2 text-gray-300">
                                                <UserGroupIcon className="w-5 h-5 text-purple-400" />
                                                <span>{npc.faction}</span>
                                            </div>
                                        )}
                                        {npc.questGiver && (
                                            <div className="flex items-center gap-2 text-gray-300">
                                                <ChatBubbleLeftIcon className="w-5 h-5 text-purple-400" />
                                                <span>Quest Giver</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {npc.schedule && (
                                    <div className="bg-gray-900/40 rounded-lg p-4 border border-gray-700/50">
                                        <h3 className="font-semibold mb-4 text-purple-300">Schedule</h3>
                                        <ul className="space-y-3">
                                            {npc.schedule.map((schedule, index) => (
                                                <li key={index} className="flex items-center gap-2 text-gray-300">
                                                    <ClockIcon className="w-5 h-5 text-purple-400" />
                                                    <span>{schedule.time}: {schedule.activity} at {schedule.location}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Notes Section */}
                            <div className="mt-6 bg-gray-900/40 rounded-lg p-4 border border-gray-700/50">
                                <h3 className="font-semibold mb-4 text-purple-300 flex items-center gap-2">
                                    <DocumentTextIcon className="w-5 h-5" />
                                    Notes
                                </h3>
                                <div className="space-y-4">
                                    {editingNPC === npc.id ? (
                                        <div className="space-y-4">
                                            {editedNPC?.notes?.map(note => (
                                                <div key={note.id} className="flex items-start gap-2 bg-gray-800/40 rounded-lg p-3 border border-gray-700/50">
                                                    <div className="flex-1">
                                                        <textarea
                                                            value={note.text}
                                                            onChange={(e) => {
                                                                const updatedNotes = editedNPC.notes?.map(n => 
                                                                    n.id === note.id ? { ...n, text: e.target.value } : n
                                                                );
                                                                handleChange('notes', updatedNotes);
                                                            }}
                                                            className="w-full px-3 py-2 bg-gray-900/40 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                            rows={2}
                                                        />
                                                        <p className="text-sm text-gray-400 mt-1">
                                                            {new Date(note.timestamp).toLocaleString()}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() => handleDeleteNote(npc.id, note.id)}
                                                        className="p-1 rounded-lg bg-red-900/40 text-red-300 border border-red-700/50 hover:bg-red-900/60 transition-colors duration-200"
                                                        title="Delete note"
                                                    >
                                                        <XMarkIcon className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                onClick={() => {
                                                    const newNoteObj = {
                                                        id: Date.now().toString(),
                                                        text: '',
                                                        timestamp: new Date().toISOString()
                                                    };
                                                    handleChange('notes', [...(editedNPC?.notes || []), newNoteObj]);
                                                }}
                                                className="flex items-center gap-2 px-3 py-2 bg-purple-900/40 text-purple-300 border border-purple-700/50 rounded-lg hover:bg-purple-900/60 transition-colors duration-200"
                                            >
                                                <PlusIcon className="w-4 h-4" />
                                                Add Note
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="space-y-4">
                                                {npc.notes?.map(note => (
                                                    <div key={note.id} className="bg-gray-800/40 rounded-lg p-3 border border-gray-700/50">
                                                        <p className="text-gray-300 whitespace-pre-wrap">{note.text}</p>
                                                        <p className="text-sm text-gray-400 mt-2">
                                                            {new Date(note.timestamp).toLocaleString()}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex gap-2">
                                                <textarea
                                                    value={newNote}
                                                    onChange={(e) => setNewNote(e.target.value)}
                                                    placeholder="Add a new note..."
                                                    className="flex-1 px-3 py-2 bg-gray-900/40 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                    rows={2}
                                                />
                                                <button
                                                    onClick={() => handleAddNote(npc.id)}
                                                    className="px-4 py-2 bg-purple-900/40 text-purple-300 border border-purple-700/50 rounded-lg hover:bg-purple-900/60 transition-colors duration-200"
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Expand/Collapse Button */}
                            <button
                                onClick={() => toggleNPCExpansion(npc.id)}
                                className="w-full mt-6 flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
                            >
                                {expandedNPCs.has(npc.id) ? (
                                    <>
                                        <ChevronUpIcon className="w-5 h-5" />
                                        <span>Show Less</span>
                                    </>
                                ) : (
                                    <>
                                        <ChevronDownIcon className="w-5 h-5" />
                                        <span>Show More</span>
                                    </>
                                )}
                            </button>

                            {/* Expanded Details */}
                            {expandedNPCs.has(npc.id) && (
                                <div className="mt-6 pt-6 border-t border-gray-700/50">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Skills and Inventory */}
                                        <div className="space-y-6">
                                            {npc.skills && npc.skills.length > 0 && (
                                                <div className="bg-gray-900/40 rounded-lg p-4 border border-gray-700/50">
                                                    <h3 className="font-semibold mb-4 text-purple-300 flex items-center gap-2">
                                                        <ScaleIcon className="w-5 h-5" />
                                                        Skills
                                                    </h3>
                                                    <ul className="space-y-3">
                                                        {npc.skills.map((skill, index) => (
                                                            <li key={index} className="text-gray-300">
                                                                <span className="text-purple-300">{skill.name}</span>
                                                                <span className="text-gray-400"> (Level {skill.level})</span>
                                                                <p className="text-sm text-gray-400 mt-1">{skill.description}</p>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {npc.inventory && npc.inventory.length > 0 && (
                                                <div className="bg-gray-900/40 rounded-lg p-4 border border-gray-700/50">
                                                    <h3 className="font-semibold mb-4 text-purple-300 flex items-center gap-2">
                                                        <CurrencyDollarIcon className="w-5 h-5" />
                                                        Inventory
                                                    </h3>
                                                    <ul className="space-y-3">
                                                        {npc.inventory.map((item, index) => (
                                                            <li key={index} className="text-gray-300">
                                                                <span className="text-purple-300">{item.name}</span>
                                                                {item.rarity && (
                                                                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                                                                        item.rarity === 'LEGENDARY' ? 'bg-yellow-900/40 text-yellow-300' :
                                                                        item.rarity === 'VERY_RARE' ? 'bg-purple-900/40 text-purple-300' :
                                                                        item.rarity === 'RARE' ? 'bg-blue-900/40 text-blue-300' :
                                                                        item.rarity === 'UNCOMMON' ? 'bg-green-900/40 text-green-300' :
                                                                        'bg-gray-900/40 text-gray-300'
                                                                    }`}>
                                                                        {item.rarity}
                                                                    </span>
                                                                )}
                                                                <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>

                                        {/* Relationships and Dialogue */}
                                        <div className="space-y-6">
                                            {npc.relationships && npc.relationships.length > 0 && (
                                                <div className="bg-gray-900/40 rounded-lg p-4 border border-gray-700/50">
                                                    <h3 className="font-semibold mb-4 text-purple-300 flex items-center gap-2">
                                                        <HeartIcon className="w-5 h-5" />
                                                        Relationships
                                                    </h3>
                                                    <ul className="space-y-3">
                                                        {npc.relationships.map((relationship, index) => (
                                                            <li key={index} className="text-gray-300">
                                                                <span className="text-purple-300">{relationship.type}</span>
                                                                <p className="text-sm text-gray-400 mt-1">{relationship.description}</p>
                                                                <div className="mt-1">
                                                                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                                                                        relationship.reputation >= 75 ? 'bg-green-900/40 text-green-300' :
                                                                        relationship.reputation >= 50 ? 'bg-blue-900/40 text-blue-300' :
                                                                        relationship.reputation >= 25 ? 'bg-yellow-900/40 text-yellow-300' :
                                                                        'bg-red-900/40 text-red-300'
                                                                    }`}>
                                                                        Reputation: {relationship.reputation}
                                                                    </span>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {npc.dialogue && npc.dialogue.length > 0 && (
                                                <div className="bg-gray-900/40 rounded-lg p-4 border border-gray-700/50">
                                                    <h3 className="font-semibold mb-4 text-purple-300 flex items-center gap-2">
                                                        <ChatBubbleLeftIcon className="w-5 h-5" />
                                                        Dialogue
                                                    </h3>
                                                    <ul className="space-y-4">
                                                        {npc.dialogue.map((dialogue, index) => (
                                                            <li key={index} className="text-gray-300">
                                                                <p className="italic">"{dialogue.text}"</p>
                                                                {dialogue.options && (
                                                                    <ul className="mt-2 space-y-2">
                                                                        {dialogue.options.map((option, optIndex) => (
                                                                            <li key={optIndex} className="text-sm text-purple-300">
                                                                                • {option.text}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                )}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Delete Confirmation Modal */}
                {deleteConfirmation && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 border border-gray-700/50">
                            <div className="flex items-center gap-3 mb-4">
                                <ExclamationTriangleIcon className="w-6 h-6 text-yellow-500" />
                                <h3 className="text-lg font-semibold text-white">Delete Note</h3>
                            </div>
                            <p className="text-gray-300 mb-6">
                                Are you sure you want to delete this note? This action cannot be undone.
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={cancelDeleteNote}
                                    className="px-4 py-2 bg-gray-700/50 text-gray-300 border border-gray-600/50 rounded-lg hover:bg-gray-700/70 transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDeleteNote}
                                    className="px-4 py-2 bg-red-900/40 text-red-300 border border-red-700/50 rounded-lg hover:bg-red-900/60 transition-colors duration-200"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NPCsPage; 