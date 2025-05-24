import { useState } from 'react';
import { 
  BookOpenIcon, 
  PlusIcon, 
  ChevronDownIcon, 
  ChevronUpIcon, 
  MapIcon, 
  UserGroupIcon, 
  ClockIcon, 
  SparklesIcon, 
  ExclamationTriangleIcon,
  ShieldExclamationIcon,
  HeartIcon,
  CurrencyDollarIcon,
  StarIcon,
  AcademicCapIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { EditSessionModal } from '../components/EditSessionModal';
import { EditEncounterModal } from '../components/EditEncounterModal';
import { EditNPCModal } from '../components/EditNPCModal';
import { EditLocationModal } from '../components/EditLocationModal';
import { format } from 'date-fns';

interface Monster {
  name: string;
  quantity: number;
  hp: number;
  ac: number;
  initiative: number;
  description: string;
  tactics: string;
  xp: number;
}

interface Treasure {
  type: 'gold' | 'item' | 'magical-item';
  name: string;
  value: string;
  description: string;
  rarity?: 'common' | 'uncommon' | 'rare' | 'very-rare' | 'legendary';
}

interface EncounterArea {
  id: string;
  name: string;
  description: string;
  lighting: string;
  terrain: string[];
  features: {
    name: string;
    description: string;
    mechanics?: string;
  }[];
  doors?: {
    type: string;
    location: string;
    properties: string[];
  }[];
}

interface DevelopmentOption {
  trigger: string;
  outcome: string;
  consequences: string[];
}

interface Encounter {
  id: string;
  title: string;
  type: 'combat' | 'social' | 'exploration' | 'puzzle' | 'trap';
  difficulty: 'easy' | 'medium' | 'hard' | 'deadly';
  description: string;
  setup: string;
  areas: EncounterArea[];
  monsters: Monster[];
  npcs: {
    id: string;
    name: string;
    role: string;
    motivation: string;
    personality: string;
    tactics: string;
    notes: string;
  }[];
  developments: DevelopmentOption[];
  treasure: Treasure[];
  xpTotal: number;
  adjustments: {
    easier: string[];
    harder: string[];
  };
}

interface CampaignSession {
  id: string;
  title: string;
  level: string;
  description: string;
  overview: {
    background: string;
    hooks: string[];
    goals: string[];
  };
  objectives: {
    main: string[];
    optional: string[];
  };
  encounters: Encounter[];
  npcs: {
    id: string;
    name: string;
    role: string;
    appearance: string;
    personality: string;
    motivation: string;
    secrets: string[];
    notes: string;
  }[];
  locations: {
    id: string;
    name: string;
    description: string;
    atmosphere: string;
    keyFeatures: string[];
    secrets: string[];
    connections: {
      locationId: string;
      description: string;
    }[];
  }[];
  handouts: {
    id: string;
    type: 'image' | 'text' | 'map';
    title: string;
    description: string;
    content: string;
  }[];
  timing: {
    estimatedDuration: string;
    pacing: string[];
    timeOfDay: string;
    sessionNotes?: {
      id: string;
      date: string;
      content: string;
    }[];
  };
}

interface AreaFeature {
  name: string;
  description: string;
  mechanics?: string;
}

interface EditableArea extends EncounterArea {
  id: string;
  name: string;
  description: string;
  lighting: string;
  terrain: string[];
  features: AreaFeature[];
  doors?: {
    type: string;
    location: string;
    properties: string[];
  }[];
}

interface EditableNPC {
  id: string;
  name: string;
  role: string;
  appearance: string;
  personality: string;
  motivation: string;
  secrets: string[];
  notes: string;
}

interface EditableLocation {
  id: string;
  name: string;
  description: string;
  atmosphere: string;
  keyFeatures: string[];
  secrets: string[];
  connections: {
    locationId: string;
    description: string;
  }[];
}

interface EditableHandout {
  id: string;
  type: 'image' | 'text' | 'map';
  title: string;
  description: string;
  content: string;
}

type EditableData = {
  session?: CampaignSession;
  encounter?: Encounter;
  npc?: EditableNPC;
  location?: EditableLocation;
  handout?: EditableHandout;
};

export function CampaignPage() {
  const [expandedSessions, setExpandedSessions] = useState<Set<string>>(new Set());
  const [sessions, setSessions] = useState<CampaignSession[]>([
    {
      id: '1',
      title: 'Episode 1: Greenest in Flames',
      level: '1-2',
      description: 'The characters arrive at Greenest to find it under attack by a dragon and its kobold and cultist allies. The characters must help defend the town and its inhabitants throughout the night.',
      overview: {
        background: 'The Cult of the Dragon has been amassing followers and treasure for a mysterious purpose. Their raids have brought them to the town of Greenest, where they seek to plunder its wealth and possibly find specific items of interest.',
        hooks: [
          'Characters arrive at Greenest seeing it under attack',
          'Smoke rising from multiple buildings',
          'Screams and sounds of battle in the distance',
          'A blue dragon circles overhead'
        ],
        goals: [
          'Save as many townspeople as possible',
          'Protect the keep from being overrun',
          'Gather intelligence about the attackers',
          'Survive until dawn'
        ]
      },
      objectives: {
        main: [
          'Help Governor Nighthill defend the keep',
          'Rescue trapped citizens',
          'Prevent the raiders from burning the entire town'
        ],
        optional: [
          'Save the mill from destruction',
          'Protect the church of Chauntea',
          'Capture a cultist for questioning'
        ]
      },
      encounters: [
        {
          id: 'e1',
          title: 'Sanctuary',
          type: 'combat',
          difficulty: 'hard',
          description: 'The characters must escort a group of villagers to the safety of the keep while avoiding or confronting raiders.',
          setup: 'The villagers are hiding in the temple of Chauntea, about 200 yards from the keep. Raiders patrol the streets between.',
          areas: [
            {
              id: 'a1',
              name: 'Temple Approach',
              description: 'The street leading to the temple is partially obscured by smoke. Burning buildings line both sides.',
              lighting: 'Dim light from fires',
              terrain: [
                'Difficult terrain from debris',
                'Smoke provides light obscurement',
                '1d4 burning buildings per side'
              ],
              features: [
                {
                  name: 'Burning Building',
                  description: 'Buildings are actively burning and may collapse.',
                  mechanics: 'DC 13 DEX save to avoid 2d6 fire damage when adjacent building collapses'
                }
              ]
            }
          ],
          monsters: [
            {
              name: 'Kobold',
              quantity: 8,
              hp: 5,
              ac: 12,
              initiative: 2,
              description: 'Small draconic humanoids wielding spears',
              tactics: 'Attack in groups of 2-3, use Pack Tactics when possible',
              xp: 25
            },
            {
              name: 'Cultist',
              quantity: 4,
              hp: 9,
              ac: 12,
              initiative: 1,
              description: 'Fanatics in dragon-themed robes',
              tactics: 'Focus attacks on isolated targets, retreat if badly wounded',
              xp: 25
            }
          ],
          npcs: [
            {
              id: 'en1',
              name: 'Priest of Chauntea',
              role: 'Temple Guardian',
              motivation: 'Protect the villagers and sacred relics',
              personality: 'Brave but cautious',
              tactics: 'Will use healing spells to support the party and protect villagers',
              notes: 'Knows a secret passage through the temple gardens'
            }
          ],
          developments: [
            {
              trigger: 'Half the raiders are defeated',
              outcome: 'Remaining raiders attempt to set more buildings on fire rather than fight',
              consequences: [
                'More difficult terrain',
                'Risk of villagers taking fire damage',
                'Time pressure increases'
              ]
            },
            {
              trigger: 'A villager dies',
              outcome: 'Other villagers panic and may scatter',
              consequences: [
                'Must succeed on DC 13 Charisma (Persuasion) check to keep group together',
                'Scattered villagers may attract more raiders'
              ]
            }
          ],
          treasure: [
            {
              type: 'gold',
              name: 'Cult Donations',
              value: '2d6 × 10 gp',
              description: 'Gold and silver pieces in dragon-embossed pouches'
            },
            {
              type: 'item',
              name: 'Cult Documents',
              value: '50 gp',
              description: 'Papers revealing partial details of the cult\'s activities'
            }
          ],
          xpTotal: 300,
          adjustments: {
            easier: [
              'Reduce number of kobolds to 6',
              'Add a friendly NPC guard to help',
              'Provide more cover along the route'
            ],
            harder: [
              'Add a cultist fanatic (CR 2)',
              'Include more areas with fire',
              'Add pressure from the dragon above'
            ]
          }
        }
      ],
      npcs: [
        {
          id: 'n1',
          name: 'Governor Nighthill',
          role: 'Town Leader',
          appearance: 'Elderly man with bandaged head wound, wearing fine but sooted clothes',
          personality: 'Determined, protective of his people, willing to take risks to save them',
          motivation: 'Protect the town and its people at all costs',
          secrets: [
            'Knows of a secret tunnel under the keep',
            'Has information about valuable items the cult might be seeking'
          ],
          notes: 'Can provide information about town layout and resources. Will reward brave defenders.'
        }
      ],
      locations: [
        {
          id: 'l1',
          name: 'Greenest Keep',
          description: 'Stone keep on a small hill, the strongest building in town',
          atmosphere: 'Tense, crowded with refugees, smoke drifting in from arrow slits',
          keyFeatures: [
            'Thick stone walls with arrow slits',
            'Central courtyard with well',
            'Bell tower with good visibility',
            'Cramped quarters filled with townspeople',
            'Underground storage rooms'
          ],
          secrets: [
            'Secret escape tunnel in the cellars',
            'Hidden armory behind the kitchen'
          ],
          connections: [
            {
              locationId: 'l2',
              description: 'Clear view of the town square from the battlements'
            }
          ]
        }
      ],
      handouts: [
        {
          id: 'h1',
          type: 'map',
          title: 'Greenest Town Map',
          description: 'Map showing key locations and potential routes through town',
          content: 'Map image URL here'
        }
      ],
      timing: {
        estimatedDuration: '4-5 hours',
        pacing: [
          'Start with immediate action',
          'Alternate between combat and rescue missions',
          'Build tension throughout the night',
          'Climactic confrontation before dawn'
        ],
        timeOfDay: 'Night, from dusk till dawn'
      }
    }
  ]);
  
  // Add new state for editing
  const [editingSession, setEditingSession] = useState<string | null>(null);
  const [editingEncounter, setEditingEncounter] = useState<string | null>(null);
  const [editingNPC, setEditingNPC] = useState<string | null>(null);
  const [editingLocation, setEditingLocation] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<EditableData | null>(null);
  const [newNote, setNewNote] = useState<string>('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<string>('');

  const handleStartEdit = (type: 'session' | 'encounter' | 'npc' | 'location', id: string) => {
    let session;
    switch (type) {
      case 'session':
        session = sessions.find(s => s.id === id);
        break;
      case 'encounter':
        session = sessions.find(s => s.encounters.some(e => e.id === id));
        break;
      case 'npc':
        session = sessions.find(s => s.npcs.some(n => n.id === id));
        break;
      case 'location':
        session = sessions.find(s => s.locations.some(l => l.id === id));
        break;
    }
    
    if (!session) return;

    let data: EditableData = {};
    switch (type) {
      case 'session':
        data.session = { ...session };
        setEditingSession(id);
        break;
      case 'encounter':
        data.encounter = { ...session.encounters.find(e => e.id === id)! };
        setEditingEncounter(id);
        break;
      case 'npc':
        data.npc = { ...session.npcs.find(n => n.id === id)! } as EditableNPC;
        setEditingNPC(id);
        break;
      case 'location':
        data.location = { ...session.locations.find(l => l.id === id)! } as EditableLocation;
        setEditingLocation(id);
        break;
    }
    setEditedData(data);
  };

  const handleSaveSession = (updatedSession: CampaignSession) => {
    setSessions(prevSessions => 
      prevSessions.map(session => 
        session.id === updatedSession.id ? updatedSession : session
      )
    );
    setEditingSession(null);
  };

  const handleSaveEncounter = (updatedEncounter: Encounter) => {
    setSessions(prevSessions => 
      prevSessions.map(session => ({
        ...session,
        encounters: session.encounters.map(encounter => 
          encounter.id === updatedEncounter.id ? updatedEncounter : encounter
        )
      }))
    );
    setEditingEncounter(null);
  };

  const handleSaveNPC = (updatedNPC: EditableNPC) => {
    setSessions(prevSessions => 
      prevSessions.map(session => ({
        ...session,
        npcs: session.npcs.map(npc => 
          npc.id === updatedNPC.id ? updatedNPC : npc
        )
      }))
    );
    setEditingNPC(null);
  };

  const handleSaveLocation = (updatedLocation: EditableLocation) => {
    setSessions(prevSessions => 
      prevSessions.map(session => ({
        ...session,
        locations: session.locations.map(location => 
          location.id === updatedLocation.id ? updatedLocation : location
        )
      }))
    );
    setEditingLocation(null);
  };

  const handleCancelEdit = () => {
    setEditingSession(null);
    setEditingEncounter(null);
    setEditingNPC(null);
    setEditingLocation(null);
    setEditedData(null);
    setNewNote('');
    setEditingNoteId(null);
    setEditedContent('');
  };

  const handleChange = (field: string, value: any) => {
    if (!editedData) return;
    
    // Handle nested object updates
    if (field.includes('.')) {
      const [parent, ...path] = field.split('.');
      const newData = { ...editedData };
      let current = newData[parent as keyof EditableData];
      
      path.forEach((key, index) => {
        if (index === path.length - 1) {
          (current as any)[key] = value;
        } else {
          (current as any)[key] = (current as any)[key] || {};
          current = (current as any)[key];
        }
      });
      
      setEditedData(newData);
    } else {
      setEditedData({ ...editedData, [field]: value });
    }
  };

  const handleAddSession = () => {
    const newSession: CampaignSession = {
      id: Date.now().toString(),
      title: 'New Session',
      level: '1',
      description: 'New session description',
      overview: {
        background: '',
        hooks: [],
        goals: []
      },
      objectives: {
        main: [],
        optional: []
      },
      encounters: [],
      npcs: [],
      locations: [],
      handouts: [],
      timing: {
        estimatedDuration: '',
        pacing: [],
        timeOfDay: ''
      }
    };
    setSessions([...sessions, newSession]);
    setEditingSession(newSession.id);
    setEditedData({ session: newSession });
  };

  const handleAddEncounter = (sessionId: string) => {
    const newEncounter: Encounter = {
      id: Date.now().toString(),
      title: 'New Encounter',
      type: 'combat',
      difficulty: 'medium',
      description: 'New encounter description',
      setup: '',
      areas: [],
      monsters: [],
      npcs: [],
      developments: [],
      treasure: [],
      xpTotal: 0,
      adjustments: {
        easier: [],
        harder: []
      }
    };

    setSessions(prevSessions => prevSessions.map(session => {
      if (session.id === sessionId) {
        return {
          ...session,
          encounters: [...session.encounters, newEncounter]
        };
      }
      return session;
    }));

    setEditingEncounter(newEncounter.id);
    setEditedData({ encounter: newEncounter });
  };

  const handleAddNPC = (sessionId: string) => {
    const newNPC: EditableNPC = {
      id: Date.now().toString(),
      name: 'New NPC',
      role: '',
      appearance: '',
      personality: '',
      motivation: '',
      secrets: [],
      notes: ''
    };

    setSessions(prevSessions => prevSessions.map(session => {
      if (session.id === sessionId) {
        return {
          ...session,
          npcs: [...session.npcs, newNPC]
        };
      }
      return session;
    }));

    setEditingNPC(newNPC.id);
    setEditedData({ npc: newNPC });
  };

  const handleAddLocation = (sessionId: string) => {
    const newLocation = {
      id: Date.now().toString(),
      name: 'New Location',
      description: '',
      atmosphere: '',
      keyFeatures: [],
      secrets: [],
      connections: []
    };

    setSessions(prevSessions => prevSessions.map(session => {
      if (session.id === sessionId) {
        return {
          ...session,
          locations: [...session.locations, newLocation]
        };
      }
      return session;
    }));

    setEditingLocation(newLocation.id);
    setEditedData({ location: newLocation });
  };

  const handleAddArea = (encounterId: string) => {
    const newArea: EditableArea = {
      id: Date.now().toString(),
      name: 'New Area',
      description: '',
      lighting: '',
      terrain: [],
      features: [],
      doors: []
    };

    setSessions(prevSessions => prevSessions.map(session => {
      return {
        ...session,
        encounters: session.encounters.map(encounter => {
          if (encounter.id === encounterId) {
            return {
              ...encounter,
              areas: [...encounter.areas, newArea]
            };
          }
          return encounter;
        })
      };
    }));
  };

  const handleDeleteItem = (type: 'encounter' | 'npc' | 'location' | 'area', sessionId: string, itemId: string) => {
    setSessions(prevSessions => prevSessions.map(session => {
      if (session.id === sessionId) {
        switch (type) {
          case 'encounter':
            return {
              ...session,
              encounters: session.encounters.filter(e => e.id !== itemId)
            };
          case 'npc':
            return {
              ...session,
              npcs: session.npcs.filter(n => n.id !== itemId)
            };
          case 'location':
            return {
              ...session,
              locations: session.locations.filter(l => l.id !== itemId)
            };
          case 'area':
            return {
              ...session,
              encounters: session.encounters.map(encounter => ({
                ...encounter,
                areas: encounter.areas.filter(area => area.id !== itemId)
              }))
            };
          default:
            return session;
        }
      }
      return session;
    }));

    // Clear editing state if the deleted item was being edited
    switch (type) {
      case 'encounter':
        if (editingEncounter === itemId) handleCancelEdit();
        break;
      case 'npc':
        if (editingNPC === itemId) handleCancelEdit();
        break;
      case 'location':
        if (editingLocation === itemId) handleCancelEdit();
        break;
    }
  };

  const toggleSession = (sessionId: string) => {
    setExpandedSessions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sessionId)) {
        newSet.delete(sessionId);
      } else {
        newSet.add(sessionId);
      }
      return newSet;
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-orange-400';
      case 'deadly': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getEncounterIcon = (type: string) => {
    switch (type) {
      case 'combat': return <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />;
      case 'social': return <UserGroupIcon className="h-5 w-5 text-blue-400" />;
      case 'exploration': return <MapIcon className="h-5 w-5 text-green-400" />;
      case 'puzzle': return <SparklesIcon className="h-5 w-5 text-purple-400" />;
      default: return null;
    }
  };

  const getNPCNotes = (npc: EditableNPC) => {
    return editedData?.npc?.id === npc.id ? editedData.npc.notes : npc.notes;
  };

  const getLocationDescription = (location: EditableLocation) => {
    return editedData?.location?.id === location.id ? editedData.location.description : location.description;
  };

  const getLocationKeyFeatures = (location: EditableLocation) => {
    return editedData?.location?.id === location.id ? editedData.location.keyFeatures.join('\n') : location.keyFeatures.join('\n');
  };

  const getLocationSecrets = (location: EditableLocation) => {
    return editedData?.location?.id === location.id ? editedData.location.secrets.join('\n') : location.secrets.join('\n');
  };

  const getLocationConnections = (location: EditableLocation) => {
    return editedData?.location?.id === location.id 
      ? editedData.location.connections.map(conn => conn.description).join('\n')
      : location.connections.map(conn => conn.description).join('\n');
  };

  const getHandoutDescription = (handout: EditableHandout) => {
    return editedData?.handout?.id === handout.id ? editedData.handout.description : handout.description;
  };

  const handleAddSessionNote = (sessionId: string) => {
    if (!newNote.trim()) return;
    
    setSessions(prevSessions => prevSessions.map(session => {
      if (session.id === sessionId) {
        return {
          ...session,
          timing: {
            ...session.timing,
            sessionNotes: [
              ...(session.timing.sessionNotes || []),
              {
                id: Date.now().toString(),
                date: format(new Date(), 'yyyy-MM-dd HH:mm'),
                content: newNote
              }
            ]
          }
        };
      }
      return session;
    }));
    setNewNote('');
  };

  const handleStartEditNote = (note: { id: string; content: string }) => {
    setEditingNoteId(note.id);
    setEditedContent(note.content);
  };

  const handleUpdateSessionNote = (sessionId: string, noteId: string, content: string) => {
    setSessions(prevSessions => prevSessions.map(session => {
      if (session.id === sessionId) {
        const currentNotes = session.timing.sessionNotes || [];
        return {
          ...session,
          timing: {
            ...session.timing,
            sessionNotes: currentNotes.map(note => 
              note.id === noteId ? { ...note, content } : note
            )
          }
        };
      }
      return session;
    }));
    setEditingNoteId(null);
    setEditedContent('');
  };

  const handleDeleteSessionNote = (sessionId: string, noteId: string) => {
    setSessions(prevSessions => prevSessions.map(session => {
      if (session.id === sessionId) {
        const currentNotes = session.timing.sessionNotes || [];
        return {
          ...session,
          timing: {
            ...session.timing,
            sessionNotes: currentNotes.filter(note => note.id !== noteId)
          }
        };
      }
      return session;
    }));
  };

  const renderEncounter = (encounter: Encounter, session: CampaignSession) => (
    <div className="bg-gray-900/50 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {getEncounterIcon(encounter.type)}
          {editingEncounter === encounter.id ? (
            <input
              type="text"
              value={editedData?.encounter?.title || encounter.title}
              onChange={(e) => handleChange('encounter.title', e.target.value)}
              className="text-xl font-medium bg-gray-700 text-white rounded px-2 py-1"
            />
          ) : (
            <h4 className="font-medium text-white">{encounter.title}</h4>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${getDifficultyColor(encounter.difficulty)}`}>
            {encounter.difficulty.charAt(0).toUpperCase() + encounter.difficulty.slice(1)}
          </span>
          {editingEncounter === encounter.id ? (
            <>
              <button
                onClick={() => handleSaveEncounter(encounter)}
                className="p-1 text-green-400 hover:text-green-300"
              >
                <CheckIcon className="h-5 w-5" />
              </button>
              <button
                onClick={handleCancelEdit}
                className="p-1 text-red-400 hover:text-red-300"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleStartEdit('encounter', encounter.id)}
                className="p-1 text-gray-400 hover:text-gray-300"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleDeleteItem('encounter', session.id, encounter.id)}
                className="p-1 text-red-400 hover:text-red-300"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        {editingEncounter === encounter.id ? (
          <>
            <textarea
              value={editedData?.encounter?.description || encounter.description}
              onChange={(e) => handleChange('encounter.description', e.target.value)}
              className="w-full bg-gray-700 text-white rounded p-2"
              rows={4}
            />
            <div className="bg-gray-800/50 rounded p-3 mt-2">
              <h5 className="font-medium text-purple-400 mb-2">Setup</h5>
              <textarea
                value={editedData?.encounter?.setup || encounter.setup}
                onChange={(e) => handleChange('encounter.setup', e.target.value)}
                className="w-full bg-gray-700 text-white rounded p-2"
                rows={3}
              />
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-300">{encounter.description}</p>
            <div className="bg-gray-800/50 rounded p-3 mt-2">
              <h5 className="font-medium text-purple-400 mb-2">Setup</h5>
              <p className="text-gray-300">{encounter.setup}</p>
            </div>
          </>
        )}
      </div>

      {/* Areas */}
      <div>
        <h5 className="text-sm font-medium text-purple-400 mb-2">Areas</h5>
        <div className="space-y-3">
          {encounter.areas.map(area => (
            <div key={area.id} className="bg-gray-800/50 rounded p-3">
              <h6 className="font-medium text-white mb-1">{area.name}</h6>
              <p className="text-sm text-gray-300 mb-2">{area.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-purple-400">Lighting:</span>
                  <p className="text-sm text-gray-300">{area.lighting}</p>
                </div>
                <div>
                  <span className="text-sm text-purple-400">Terrain:</span>
                  <ul className="list-disc list-inside text-sm text-gray-300">
                    {area.terrain.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
              {area.features.length > 0 && (
                <div className="mt-2">
                  <span className="text-sm text-purple-400">Features:</span>
                  <div className="space-y-2 mt-1">
                    {area.features.map((f, i) => (
                      <div key={i} className="text-sm">
                        <span className="text-white font-medium">{f.name}:</span>
                        <p className="text-gray-300">{f.description}</p>
                        {f.mechanics && (
                          <p className="text-yellow-400 mt-1">{f.mechanics}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Monsters */}
      <div>
        <h5 className="text-sm font-medium text-purple-400 mb-2">Monsters</h5>
        <div className="space-y-3">
          {encounter.monsters.map((monster, index) => (
            <div key={index} className="bg-gray-800/50 rounded p-3">
              <div className="flex items-center justify-between mb-2">
                <h6 className="font-medium text-white">
                  {monster.name} ({monster.quantity})
                </h6>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-red-400">HP: {monster.hp}</span>
                  <span className="text-blue-400">AC: {monster.ac}</span>
                  <span className="text-green-400">Init: +{monster.initiative}</span>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-2">{monster.description}</p>
              <div className="text-sm">
                <span className="text-purple-400">Tactics:</span>
                <p className="text-gray-300 mt-1">{monster.tactics}</p>
              </div>
              <div className="mt-2 text-sm">
                <span className="text-yellow-400">XP: {monster.xp} each ({monster.xp * monster.quantity} total)</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Developments */}
      <div>
        <h5 className="text-sm font-medium text-purple-400 mb-2">Possible Developments</h5>
        <div className="space-y-3">
          {encounter.developments.map((dev, index) => (
            <div key={index} className="bg-gray-800/50 rounded p-3">
              <h6 className="font-medium text-white mb-1">When: {dev.trigger}</h6>
              <p className="text-sm text-gray-300 mb-2">{dev.outcome}</p>
              <div>
                <span className="text-sm text-purple-400">Consequences:</span>
                <ul className="list-disc list-inside text-sm text-gray-300 mt-1">
                  {dev.consequences.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Treasure */}
      <div>
        <h5 className="text-sm font-medium text-purple-400 mb-2">Treasure</h5>
        <div className="space-y-2">
          {encounter.treasure.map((item, index) => (
            <div key={index} className="bg-gray-800/50 rounded p-3">
              <div className="flex items-center gap-2">
                {item.type === 'gold' && <CurrencyDollarIcon className="h-5 w-5 text-yellow-400" />}
                {item.type === 'item' && <SparklesIcon className="h-5 w-5 text-blue-400" />}
                {item.type === 'magical-item' && <StarIcon className="h-5 w-5 text-purple-400" />}
                <h6 className="font-medium text-white">{item.name}</h6>
              </div>
              <p className="text-sm text-gray-300 mt-1">{item.description}</p>
              <p className="text-sm text-yellow-400 mt-1">Value: {item.value}</p>
              {item.rarity && (
                <p className="text-sm text-purple-400 mt-1">Rarity: {item.rarity}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Adjustments */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h5 className="text-sm font-medium text-green-400 mb-2">Making it Easier</h5>
          <ul className="list-disc list-inside text-sm text-gray-300">
            {encounter.adjustments.easier.map((adj, index) => (
              <li key={index}>{adj}</li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="text-sm font-medium text-red-400 mb-2">Making it Harder</h5>
          <ul className="list-disc list-inside text-sm text-gray-300">
            {encounter.adjustments.harder.map((adj, index) => (
              <li key={index}>{adj}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex justify-between items-center">
          <span className="text-yellow-400">Total XP: {encounter.xpTotal}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <BookOpenIcon className="h-8 w-8 text-purple-500" />
            <h1 className="text-3xl font-bold text-white">Campaign</h1>
          </div>
          <button 
            onClick={handleAddSession}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-white transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            Add Chapter
          </button>
        </div>

        <div className="space-y-6">
          {sessions.map(session => (
            <div key={session.id} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              {/* Session Header */}
              <div className="flex items-center justify-between p-6 hover:bg-gray-700/50 transition-colors">
                <button
                  className="flex-1 flex items-center justify-between"
                  onClick={() => toggleSession(session.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-start">
                      {editingSession === session.id ? (
                        <input
                          type="text"
                          value={editedData?.session?.title || ''}
                          onChange={(e) => handleChange('session.title', e.target.value)}
                          className="text-xl font-semibold bg-gray-700 text-white rounded px-2 py-1"
                        />
                      ) : (
                        <h2 className="text-xl font-semibold text-white">{session.title}</h2>
                      )}
                      {editingSession === session.id ? (
                        <input
                          type="text"
                          value={editedData?.session?.level || ''}
                          onChange={(e) => handleChange('session.level', e.target.value)}
                          className="text-sm bg-gray-700 text-purple-400 rounded px-2 py-1 mt-1"
                        />
                      ) : (
                        <span className="text-sm text-purple-400">Level {session.level}</span>
                      )}
                    </div>
                  </div>
                  {expandedSessions.has(session.id) ? (
                    <ChevronUpIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                <div className="flex items-center gap-2 ml-4">
                  {editingSession === session.id ? (
                    <>
                      <button
                        onClick={() => handleSaveSession(session)}
                        className="p-1 text-green-400 hover:text-green-300"
                      >
                        <CheckIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="p-1 text-red-400 hover:text-red-300"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleStartEdit('session', session.id)}
                      className="p-1 text-gray-400 hover:text-gray-300"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Session Details */}
              {expandedSessions.has(session.id) && (
                <div className="px-6 pb-6 space-y-6">
                  {/* Overview */}
                  <div className="prose prose-invert max-w-none">
                    {editingSession === session.id ? (
                      <textarea
                        value={editedData?.session?.description || ''}
                        onChange={(e) => handleChange('session.description', e.target.value)}
                        className="w-full bg-gray-700 text-white rounded p-2"
                        rows={4}
                      />
                    ) : (
                      <p className="text-gray-300">{session.description}</p>
                    )}
                    
                    <div className="bg-gray-900/50 rounded-lg p-4 mt-4">
                      <h3 className="text-lg font-semibold text-white mb-3">Background</h3>
                      <p className="text-gray-300">{session.overview.background}</p>
                      
                      <div className="mt-4">
                        <h4 className="font-medium text-purple-400 mb-2">Adventure Hooks</h4>
                        <ul className="list-disc list-inside text-gray-300">
                          {session.overview.hooks.map((hook, index) => (
                            <li key={index}>{hook}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-4">
                        <h4 className="font-medium text-purple-400 mb-2">Chapter Goals</h4>
                        <ul className="list-disc list-inside text-gray-300">
                          {session.overview.goals.map((goal, index) => (
                            <li key={index}>{goal}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Objectives */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Main Objectives</h3>
                      <ul className="space-y-2">
                        {session.objectives.main.map((objective, index) => (
                          <li key={index} className="flex items-center gap-2 text-gray-300">
                            <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                            {objective}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Optional Objectives</h3>
                      <ul className="space-y-2">
                        {session.objectives.optional.map((objective, index) => (
                          <li key={index} className="flex items-center gap-2 text-gray-300">
                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                            {objective}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Encounters */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-semibold text-white">Encounters</h3>
                      <button
                        onClick={() => handleAddEncounter(session.id)}
                        className="flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300 px-2 py-1 rounded-md hover:bg-purple-400/10 transition-colors"
                      >
                        <PlusIcon className="h-4 w-4" />
                        Add Encounter
                      </button>
                    </div>
                    <div className="space-y-4">
                      {session.encounters.map(encounter => (
                        <div key={encounter.id}>
                          {renderEncounter(encounter, session)}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* NPCs and Locations */}
                  <div className="grid grid-cols-2 gap-6">
                    {/* NPCs */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-semibold text-white">Key NPCs</h3>
                        <button
                          onClick={() => handleAddNPC(session.id)}
                          className="flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300 px-2 py-1 rounded-md hover:bg-purple-400/10 transition-colors"
                        >
                          <PlusIcon className="h-4 w-4" />
                          Add NPC
                        </button>
                      </div>
                      <div className="space-y-3">
                        {session.npcs.map(npc => (
                          <div key={npc.id} className="bg-gray-900/50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-white">{npc.name}</h4>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleStartEdit('npc', npc.id)}
                                  className="p-1 text-gray-400 hover:text-gray-300"
                                >
                                  <PencilIcon className="h-5 w-5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteItem('npc', session.id, npc.id)}
                                  className="text-red-400 hover:text-red-300 p-1 rounded-md hover:bg-red-400/10 transition-colors"
                                >
                                  <XMarkIcon className="h-5 w-5" />
                                </button>
                              </div>
                            </div>
                            {editingNPC === npc.id ? (
                              <div className="space-y-3">
                                <textarea
                                  value={getNPCNotes(npc)}
                                  onChange={(e) => handleChange(`npcs.${npc.id}.notes`, e.target.value)}
                                  className="w-full bg-gray-700 text-white rounded p-2"
                                  rows={3}
                                />
                                <div className="flex justify-end gap-2">
                                  <button
                                    onClick={handleCancelEdit}
                                    className="px-3 py-1 text-sm text-gray-400 hover:text-gray-300"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => handleSaveNPC(npc)}
                                    className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <p className="text-gray-300">{npc.notes}</p>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Locations */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-lg font-semibold text-white">Locations</h3>
                          <button
                            onClick={() => handleAddLocation(session.id)}
                            className="flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300 px-2 py-1 rounded-md hover:bg-purple-400/10 transition-colors"
                          >
                            <PlusIcon className="h-4 w-4" />
                            Add Location
                          </button>
                        </div>
                        <div className="space-y-3">
                          {session.locations.map(location => (
                            <div key={location.id} className="bg-gray-900/50 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-white">{location.name}</h4>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleStartEdit('location', location.id)}
                                    className="p-1 text-gray-400 hover:text-gray-300"
                                  >
                                    <PencilIcon className="h-5 w-5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteItem('location', session.id, location.id)}
                                    className="text-red-400 hover:text-red-300 p-1 rounded-md hover:bg-red-400/10 transition-colors"
                                  >
                                    <XMarkIcon className="h-5 w-5" />
                                  </button>
                                </div>
                              </div>
                              {editingLocation === location.id ? (
                                <div className="space-y-3">
                                  <textarea
                                    value={getLocationDescription(location)}
                                    onChange={(e) => handleChange(`locations.${location.id}.description`, e.target.value)}
                                    className="w-full bg-gray-700 text-white rounded p-2"
                                    rows={3}
                                  />
                                  <p className="text-sm text-purple-400 italic mb-2">{location.atmosphere}</p>
                                  
                                  <div>
                                    <h5 className="text-sm font-medium text-purple-400 mb-1">Key Features</h5>
                                    <textarea
                                      value={getLocationKeyFeatures(location)}
                                      onChange={(e) => handleChange(`locations.${location.id}.keyFeatures`, e.target.value.split('\n'))}
                                      className="w-full bg-gray-700 text-white rounded p-2"
                                      rows={3}
                                    />
                                  </div>

                                  {location.secrets.length > 0 && (
                                    <div className="mt-3">
                                      <h5 className="text-sm font-medium text-purple-400 mb-1">Secrets</h5>
                                      <textarea
                                        value={getLocationSecrets(location)}
                                        onChange={(e) => handleChange(`locations.${location.id}.secrets`, e.target.value.split('\n'))}
                                        className="w-full bg-gray-700 text-white rounded p-2"
                                        rows={3}
                                      />
                                    </div>
                                  )}

                                  {location.connections.length > 0 && (
                                    <div className="mt-3">
                                      <h5 className="text-sm font-medium text-purple-400 mb-1">Connections</h5>
                                      <textarea
                                        value={getLocationConnections(location)}
                                        onChange={(e) => handleChange(
                                          `locations.${location.id}.connections`,
                                          e.target.value.split('\n').map(d => ({ description: d }))
                                        )}
                                        className="w-full bg-gray-700 text-white rounded p-2"
                                        rows={3}
                                      />
                                    </div>
                                  )}
                                  <div className="flex justify-end gap-2">
                                    <button
                                      onClick={handleCancelEdit}
                                      className="px-3 py-1 text-sm text-gray-400 hover:text-gray-300"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={() => handleSaveLocation(location)}
                                      className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="space-y-3">
                                  <p className="text-gray-300">{location.description}</p>
                                  <p className="text-sm text-purple-400 italic">{location.atmosphere}</p>
                                  
                                  {location.keyFeatures.length > 0 && (
                                    <div>
                                      <h5 className="text-sm font-medium text-purple-400 mb-1">Key Features</h5>
                                      <ul className="list-disc list-inside text-gray-300">
                                        {location.keyFeatures.map((feature, index) => (
                                          <li key={index}>{feature}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {location.secrets.length > 0 && (
                                    <div>
                                      <h5 className="text-sm font-medium text-purple-400 mb-1">Secrets</h5>
                                      <ul className="list-disc list-inside text-gray-300">
                                        {location.secrets.map((secret, index) => (
                                          <li key={index}>{secret}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {location.connections.length > 0 && (
                                    <div>
                                      <h5 className="text-sm font-medium text-purple-400 mb-1">Connections</h5>
                                      <ul className="list-disc list-inside text-gray-300">
                                        {location.connections.map((conn, index) => (
                                          <li key={index}>{conn.description}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Handouts */}
                  {session.handouts.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Handouts</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {session.handouts.map(handout => (
                          <div key={handout.id} className="bg-gray-900/50 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              {handout.type === 'map' && <MapIcon className="h-5 w-5 text-purple-400" />}
                              {handout.type === 'text' && <BookOpenIcon className="h-5 w-5 text-purple-400" />}
                              <h4 className="font-medium text-white">{handout.title}</h4>
                            </div>
                            <textarea
                              value={getHandoutDescription(handout)}
                              onChange={(e) => handleChange(`handouts.${handout.id}.description`, e.target.value)}
                              className="w-full bg-gray-700 text-white rounded p-2"
                              rows={2}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Session Information */}
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-semibold text-white">Session Notes</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-300">
                            <span className="text-purple-400">Estimated Duration:</span> {session.timing.estimatedDuration}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-300">
                            <span className="text-purple-400">Time of Day:</span> {session.timing.timeOfDay}
                          </p>
                        </div>
                      </div>
                      
                      {/* New Note Form */}
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="space-y-3">
                          <textarea
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            placeholder="Write a new session note..."
                            className="w-full bg-gray-700 text-white rounded p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            rows={3}
                          />
                          <div className="flex justify-end">
                            <button
                              onClick={() => handleAddSessionNote(session.id)}
                              disabled={!newNote.trim()}
                              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Add Note
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Existing Notes */}
                      <div className="space-y-4">
                        {(session.timing.sessionNotes || []).map((note) => (
                          <div key={note.id} className="bg-gray-800/50 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-purple-400">{note.date}</span>
                              <div className="flex items-center gap-2">
                                {editingNoteId !== note.id && (
                                  <button
                                    onClick={() => handleStartEditNote(note)}
                                    className="text-gray-400 hover:text-gray-300 p-1 rounded-md hover:bg-gray-400/10 transition-colors"
                                  >
                                    <PencilIcon className="h-5 w-5" />
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDeleteSessionNote(session.id, note.id)}
                                  className="text-red-400 hover:text-red-300 p-1 rounded-md hover:bg-red-400/10 transition-colors"
                                >
                                  <XMarkIcon className="h-5 w-5" />
                                </button>
                              </div>
                            </div>
                            {editingNoteId === note.id ? (
                              <div className="space-y-3">
                                <textarea
                                  value={editedContent}
                                  onChange={(e) => setEditedContent(e.target.value)}
                                  className="w-full bg-gray-700 text-white rounded p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                  rows={4}
                                />
                                <div className="flex justify-end gap-2">
                                  <button
                                    onClick={handleCancelEdit}
                                    className="px-3 py-1 text-sm text-gray-400 hover:text-gray-300"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => handleUpdateSessionNote(session.id, note.id, editedContent)}
                                    disabled={!editedContent.trim()}
                                    className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    Save Changes
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="prose prose-invert max-w-none">
                                <p className="text-gray-300 whitespace-pre-wrap">{note.content}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-purple-400 mb-2">Pacing Notes</label>
                        <div className="text-sm text-gray-300">
                          <ul className="list-disc list-inside space-y-1">
                            {session.timing.pacing.map((note, index) => (
                              <li key={index}>{note}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Edit Session Modal */}
        {editingSession && (
          <EditSessionModal
            isOpen={!!editingSession}
            onClose={handleCancelEdit}
            onSave={handleSaveSession}
            session={sessions.find(s => s.id === editingSession)!}
          />
        )}

        {/* Edit Encounter Modal */}
        {editingEncounter && (
          <EditEncounterModal
            isOpen={!!editingEncounter}
            onClose={handleCancelEdit}
            onSave={handleSaveEncounter}
            encounter={sessions.flatMap(s => s.encounters).find(e => e.id === editingEncounter)!}
          />
        )}

        {/* Edit NPC Modal */}
        {editingNPC && (
          <EditNPCModal
            isOpen={!!editingNPC}
            onClose={handleCancelEdit}
            onSave={handleSaveNPC}
            npc={sessions.flatMap(s => s.npcs).find(n => n.id === editingNPC)!}
          />
        )}

        {/* Edit Location Modal */}
        {editingLocation && (
          <EditLocationModal
            isOpen={!!editingLocation}
            onClose={handleCancelEdit}
            onSave={handleSaveLocation}
            location={sessions.flatMap(s => s.locations).find(l => l.id === editingLocation)!}
          />
        )}
      </div>
    </div>
  );
} 