import React, { useState, useEffect } from 'react';
import { Quest, QuestType, QuestStatus, RewardType, RequirementType, ObjectiveType } from '../types/quest';
import { SparklesIcon, UserGroupIcon, MapPinIcon, ArrowPathIcon, ChevronDownIcon, ChevronUpIcon, ClockIcon, UserIcon, ScaleIcon, BookOpenIcon, ExclamationTriangleIcon, StarIcon } from '@heroicons/react/24/outline';
import { useWorld } from '../contexts/WorldContext';

const QuestsPage: React.FC = () => {
    const { selectedWorld } = useWorld();
    const [selectedType, setSelectedType] = useState<QuestType | 'all'>('all');
    const [selectedStatus, setSelectedStatus] = useState<QuestStatus | 'all'>('all');
    const [selectedLocation, setSelectedLocation] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedQuests, setExpandedQuests] = useState<Set<string>>(new Set());
    const [questRatings, setQuestRatings] = useState<{[key: string]: {rating: number, count: number}}>({});
    const [questCompletionRates, setQuestCompletionRates] = useState<{[key: string]: {completed: number, total: number}}>({});
    const [hoveredRating, setHoveredRating] = useState<{[key: string]: number}>({});
    const [quests, setQuests] = useState<Quest[]>([]);

    // Load quests when world changes
    useEffect(() => {
        if (selectedWorld) {
            const loadQuests = async () => {
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/worlds/${selectedWorld.id}/quests`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch quests');
                    }
                    const quests = await response.json();
                    setQuests(quests);
                } catch (error) {
                    console.error(`Failed to load quests for world ${selectedWorld.id}:`, error);
                    setQuests([]);
                }
            };
            
            loadQuests();
        } else {
            setQuests([]);
        }
    }, [selectedWorld]);

    // Get unique locations from quests
    const locations = React.useMemo(() => {
        const uniqueLocations = new Set(quests.map(quest => quest.location));
        return ['all', ...Array.from(uniqueLocations)].sort();
    }, [quests]);

    // Update quest status
    const updateQuestStatus = async (questId: string, newStatus: QuestStatus) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/quests/${questId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                throw new Error('Failed to update quest status');
            }

            const updatedQuest = await response.json();
            setQuests(currentQuests => 
                currentQuests.map(quest => 
                    quest.id === questId ? updatedQuest : quest
                )
            );
        } catch (error) {
            console.error('Failed to update quest status:', error);
            // You might want to show an error message to the user here
        }
    };

    const toggleQuestExpansion = (questId: string) => {
        setExpandedQuests(prev => {
            const newSet = new Set(prev);
            if (newSet.has(questId)) {
                newSet.delete(questId);
            } else {
                newSet.add(questId);
            }
            return newSet;
        });
    };

    const handleRateQuest = (questId: string, rating: number) => {
        setQuestRatings(prev => ({
            ...prev,
            [questId]: {
                rating: ((prev[questId]?.rating || 0) * (prev[questId]?.count || 0) + rating) / ((prev[questId]?.count || 0) + 1),
                count: (prev[questId]?.count || 0) + 1
            }
        }));
    };

    const handleStarHover = (questId: string, rating: number) => {
        setHoveredRating(prev => ({
            ...prev,
            [questId]: rating
        }));
    };

    const handleStarLeave = (questId: string) => {
        setHoveredRating(prev => {
            const newState = { ...prev };
            delete newState[questId];
            return newState;
        });
    };

    const getStarColor = (questId: string, starNumber: number) => {
        const currentRating = hoveredRating[questId] || questRatings[questId]?.rating || 0;
        return starNumber <= currentRating ? 'text-yellow-400' : 'text-gray-400';
    };

    const filteredQuests = quests.filter(quest => {
        const matchesType = selectedType === 'all' || quest.type === selectedType;
        const matchesStatus = selectedStatus === 'all' || quest.status === selectedStatus;
        const matchesLocation = selectedLocation === 'all' || quest.location === selectedLocation;
        const matchesSearch = quest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            quest.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesStatus && matchesLocation && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1B0A20] to-[#2D1B36] text-white pt-20 px-4 sm:px-6 lg:px-8 pb-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-2 mb-8">
                    <SparklesIcon className="w-8 h-8 text-purple-400" />
                    <h1 className="text-3xl font-bold">Quests</h1>
                </div>
                
                {/* Filters */}
                <div className="mb-8 flex flex-wrap gap-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search quests..."
                            className="w-full px-4 py-2 bg-gray-800/40 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    
                    <select
                        className="px-4 py-2 bg-gray-800/40 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none cursor-pointer hover:bg-gray-800/60 transition-colors duration-200"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value as QuestType | 'all')}
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a855f7'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 0.75rem center',
                            backgroundSize: '1.25rem',
                            paddingRight: '2.5rem'
                        }}
                    >
                        <option value="all" className="bg-gray-800 text-white">All Types</option>
                        {Object.values(QuestType).map(type => (
                            <option key={type} value={type} className="bg-gray-800 text-white">
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </option>
                        ))}
                    </select>
                    
                    <select
                        className="px-4 py-2 bg-gray-800/40 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none cursor-pointer hover:bg-gray-800/60 transition-colors duration-200"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value as QuestStatus | 'all')}
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a855f7'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 0.75rem center',
                            backgroundSize: '1.25rem',
                            paddingRight: '2.5rem'
                        }}
                    >
                        <option value="all" className="bg-gray-800 text-white">All Status</option>
                        {Object.values(QuestStatus).map(status => (
                            <option key={status} value={status} className="bg-gray-800 text-white">
                                {status.split('_').map(word => 
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                ).join(' ')}
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

                {/* Quest List */}
                <div className="grid gap-6">
                    {filteredQuests.map(quest => (
                        <div
                            key={quest.id}
                            className="bg-gray-800/40 rounded-xl border border-gray-700/50 p-6 hover:shadow-lg transition-all duration-200 hover:border-purple-500/50"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-white">{quest.title}</h2>
                                    <p className="text-gray-400">Level {quest.level}</p>
                                </div>
                                <div className="flex gap-2">
                                    {/* Quest Rating Display */}
                                    <div className="flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-gray-900/40 text-yellow-300 border border-yellow-700/50">
                                        <StarIcon className="w-4 h-4" />
                                        <span>{questRatings[quest.id] ? questRatings[quest.id].rating.toFixed(1) : '0.0'}</span>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm ${
                                        quest.type === QuestType.MAIN ? 'bg-blue-900/40 text-blue-300 border border-blue-700/50' :
                                        quest.type === QuestType.SIDE ? 'bg-green-900/40 text-green-300 border border-green-700/50' :
                                        'bg-gray-900/40 text-gray-300 border border-gray-700/50'
                                    }`}>
                                        {quest.type.charAt(0).toUpperCase() + quest.type.slice(1)}
                                    </span>
                                    <div className="relative">
                                        <select
                                            value={quest.status}
                                            onChange={(e) => updateQuestStatus(quest.id, e.target.value as QuestStatus)}
                                            className={`px-3 py-1 rounded-full text-sm appearance-none cursor-pointer hover:bg-opacity-80 transition-colors duration-200 ${
                                                quest.status === QuestStatus.AVAILABLE ? 'bg-yellow-900/40 text-yellow-300 border border-yellow-700/50' :
                                                quest.status === QuestStatus.IN_PROGRESS ? 'bg-blue-900/40 text-blue-300 border border-blue-700/50' :
                                                quest.status === QuestStatus.COMPLETED ? 'bg-green-900/40 text-green-300 border border-green-700/50' :
                                                'bg-red-900/40 text-red-300 border border-red-700/50'
                                            }`}
                                            style={{
                                                paddingRight: '2rem',
                                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ffffff'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'right 0.5rem center',
                                                backgroundSize: '1rem'
                                            }}
                                        >
                                            {Object.values(QuestStatus).map(status => (
                                                <option 
                                                    key={status} 
                                                    value={status}
                                                    className="bg-gray-800 text-white"
                                                >
                                                    {status.split('_').map(word => 
                                                        word.charAt(0).toUpperCase() + word.slice(1)
                                                    ).join(' ')}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-300 mb-6">{quest.description}</p>

                            {/* Quest Rating and Completion Rate */}
                            <div className="mb-6 flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400">Rate this quest:</span>
                                    <div 
                                        className="flex gap-1"
                                        onMouseLeave={() => handleStarLeave(quest.id)}
                                    >
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                onClick={() => handleRateQuest(quest.id, star)}
                                                onMouseEnter={() => handleStarHover(quest.id, star)}
                                                className={`${getStarColor(quest.id, star)} hover:text-yellow-400 transition-colors duration-200`}
                                                title={`${star} star${star !== 1 ? 's' : ''}`}
                                            >
                                                <StarIcon className="w-5 h-5" />
                                            </button>
                                        ))}
                                    </div>
                                    <span className="text-gray-400">
                                        ({questRatings[quest.id]?.count || 0} ratings)
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400">Completion Rate:</span>
                                    <span className="text-green-400">
                                        {questCompletionRates[quest.id] 
                                            ? `${Math.round((questCompletionRates[quest.id].completed / questCompletionRates[quest.id].total) * 100)}%`
                                            : '0%'}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-900/40 rounded-lg p-4 border border-gray-700/50">
                                    <h3 className="font-semibold mb-4 text-purple-300">Objectives</h3>
                                    <ul className="space-y-3">
                                        {quest.objectives.map(objective => (
                                            <li key={objective.id} className="flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    checked={objective.completed}
                                                    onChange={() => {}}
                                                    className="rounded border-gray-600 bg-gray-800 text-purple-500 focus:ring-purple-500"
                                                />
                                                <span className="text-gray-300">{objective.description}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-gray-900/40 rounded-lg p-4 border border-gray-700/50">
                                    <h3 className="font-semibold mb-4 text-purple-300">Rewards</h3>
                                    <ul className="space-y-3">
                                        {quest.rewards.map((reward, index) => (
                                            <li key={index} className="flex items-center gap-3 text-gray-300">
                                                {reward.type === RewardType.GOLD && '💰'}
                                                {reward.type === RewardType.EXPERIENCE && '⭐'}
                                                {reward.type === RewardType.ITEM && '🎁'}
                                                {reward.type === RewardType.REPUTATION && '👥'}
                                                <span>
                                                    {reward.type === RewardType.GOLD && `${reward.amount} Gold`}
                                                    {reward.type === RewardType.EXPERIENCE && `${reward.amount} XP`}
                                                    {reward.type === RewardType.ITEM && reward.item}
                                                    {reward.type === RewardType.REPUTATION && 
                                                        `${reward.reputation?.amount} ${reward.reputation?.faction} Reputation`}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Expand/Collapse Button */}
                            <button
                                onClick={() => toggleQuestExpansion(quest.id)}
                                className="w-full mt-6 flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
                            >
                                {expandedQuests.has(quest.id) ? (
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
                            {expandedQuests.has(quest.id) && (
                                <div className="mt-6 pt-6 border-t border-gray-700/50">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Quest Details */}
                                        <div className="space-y-6">
                                            {quest.difficulty && (
                                                <div className="flex items-center gap-2">
                                                    <ScaleIcon className="w-5 h-5 text-purple-400" />
                                                    <span className="text-gray-300">Difficulty: {quest.difficulty}</span>
                                                </div>
                                            )}
                                            {quest.timeEstimate && (
                                                <div className="flex items-center gap-2">
                                                    <ClockIcon className="w-5 h-5 text-purple-400" />
                                                    <span className="text-gray-300">Estimated Time: {quest.timeEstimate} minutes</span>
                                                </div>
                                            )}
                                            {quest.recommendedPartySize && (
                                                <div className="flex items-center gap-2">
                                                    <UserIcon className="w-5 h-5 text-purple-400" />
                                                    <span className="text-gray-300">
                                                        Party Size: {quest.minPartySize}-{quest.maxPartySize} (Recommended: {quest.recommendedPartySize})
                                                    </span>
                                                </div>
                                            )}
                                            {quest.recommendedClasses && (
                                                <div className="flex items-center gap-2">
                                                    <UserGroupIcon className="w-5 h-5 text-purple-400" />
                                                    <span className="text-gray-300">
                                                        Recommended Classes: {quest.recommendedClasses.join(', ')}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Special Conditions */}
                                        {quest.specialConditions && (
                                            <div className="bg-gray-900/40 rounded-lg p-4 border border-gray-700/50">
                                                <h3 className="font-semibold mb-4 text-purple-300">Special Conditions</h3>
                                                <ul className="space-y-2">
                                                    {quest.specialConditions.timeOfDay && (
                                                        <li className="text-gray-300">
                                                            Time of Day: {quest.specialConditions.timeOfDay.join(', ')}
                                                        </li>
                                                    )}
                                                    {quest.specialConditions.weather && (
                                                        <li className="text-gray-300">
                                                            Weather: {quest.specialConditions.weather.join(', ')}
                                                        </li>
                                                    )}
                                                    {quest.specialConditions.season && (
                                                        <li className="text-gray-300">
                                                            Season: {quest.specialConditions.season.join(', ')}
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    {/* Lore and Consequences */}
                                    {quest.lore && (
                                        <div className="mt-6 bg-gray-900/40 rounded-lg p-4 border border-gray-700/50">
                                            <h3 className="font-semibold mb-4 text-purple-300">Lore</h3>
                                            <div className="space-y-4">
                                                <p className="text-gray-300">{quest.lore.background}</p>
                                                {quest.lore.historicalSignificance && (
                                                    <p className="text-gray-300">
                                                        <span className="text-purple-300">Historical Significance:</span> {quest.lore.historicalSignificance}
                                                    </p>
                                                )}
                                                {quest.lore.rumors && quest.lore.rumors.length > 0 && (
                                                    <div>
                                                        <h4 className="text-purple-300 mb-2">Rumors</h4>
                                                        <ul className="list-disc list-inside space-y-1">
                                                            {quest.lore.rumors.map((rumor, index) => (
                                                                <li key={index} className="text-gray-300">{rumor}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Hazards and Skill Checks */}
                                    {(quest.environmentalHazards || quest.skillChecks) && (
                                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {quest.environmentalHazards && quest.environmentalHazards.length > 0 && (
                                                <div className="bg-gray-900/40 rounded-lg p-4 border border-gray-700/50">
                                                    <h3 className="font-semibold mb-4 text-purple-300 flex items-center gap-2">
                                                        <ExclamationTriangleIcon className="w-5 h-5" />
                                                        Environmental Hazards
                                                    </h3>
                                                    <ul className="space-y-3">
                                                        {quest.environmentalHazards.map((hazard, index) => (
                                                            <li key={index} className="text-gray-300">
                                                                <span className="text-purple-300">{hazard.type}:</span> {hazard.description}
                                                                {hazard.damage && <span className="text-red-400"> (Damage: {hazard.damage})</span>}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {quest.skillChecks && quest.skillChecks.length > 0 && (
                                                <div className="bg-gray-900/40 rounded-lg p-4 border border-gray-700/50">
                                                    <h3 className="font-semibold mb-4 text-purple-300 flex items-center gap-2">
                                                        <BookOpenIcon className="w-5 h-5" />
                                                        Skill Checks
                                                    </h3>
                                                    <ul className="space-y-3">
                                                        {quest.skillChecks.map((check, index) => (
                                                            <li key={index} className="text-gray-300">
                                                                <span className="text-purple-300">{check.skill} (DC {check.difficulty}):</span>
                                                                <div className="ml-4 mt-1">
                                                                    <p className="text-green-400">Success: {check.success}</p>
                                                                    <p className="text-red-400">Failure: {check.failure}</p>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="mt-6 pt-4 border-t border-gray-700/50">
                                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <MapPinIcon className="w-4 h-4" />
                                        <span>{quest.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <UserGroupIcon className="w-4 h-4" />
                                        <span>{quest.npcs.join(', ')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Add Quest Button */}
                    <button
                        className="bg-gray-800/40 hover:bg-gray-800/60 border border-gray-700/50 rounded-xl p-4 text-white flex items-center justify-center gap-2 transition-all duration-200 hover:border-purple-500/50 group"
                        onClick={() => {/* TODO: Implement add quest functionality */}}
                    >
                        <SparklesIcon className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform duration-200" />
                        <span className="font-medium">Add Quest</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuestsPage; 