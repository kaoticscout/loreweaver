import { useState } from 'react';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  type: string;
  impact: string;
  keyFigures: string[];
}

interface GeneratedTimeline {
  name: string;
  description: string;
  startYear: number;
  endYear: number;
  events: TimelineEvent[];
  timestamp: number;
}

type EventType = 'political' | 'military' | 'cultural' | 'magical' | 'natural';

const eventTypes: Record<EventType, string> = {
  political: 'Political',
  military: 'Military',
  cultural: 'Cultural',
  magical: 'Magical',
  natural: 'Natural'
};

export function TimelineGeneratorPage() {
  const [selectedTypes, setSelectedTypes] = useState<EventType[]>(['political', 'military']);
  const [timeSpan, setTimeSpan] = useState<number>(100);
  const [generatedTimelines, setGeneratedTimelines] = useState<GeneratedTimeline[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const eventTemplates: Record<EventType, string[]> = {
    political: [
      'The rise of {ruler} to power',
      'The formation of the {faction} alliance',
      'A new law changes {aspect} forever',
      'The {treaty} is signed',
      'A succession crisis divides the {region}',
      'The {council} is established',
      'Diplomatic relations with {faction} break down',
      'A new system of governance is implemented'
    ],
    military: [
      'The Battle of {location}',
      'The siege of {city} begins',
      'A decisive victory against {enemy}',
      'The {war} comes to an end',
      'A new military technology changes warfare',
      'The formation of the {unit} military order',
      'A strategic alliance is forged',
      'The fall of {fortress}'
    ],
    cultural: [
      'The founding of {institution}',
      'A golden age of {art} begins',
      'The discovery of {artifact}',
      'A religious reformation occurs',
      'A new philosophical movement emerges',
      'The {festival} tradition begins',
      'A cultural renaissance transforms society',
      'The great migration of {people}'
    ],
    magical: [
      'A magical catastrophe affects {region}',
      'The discovery of {spell}',
      'A powerful artifact is created',
      'Magic suddenly {changes} throughout the land',
      'The founding of {school} of magic',
      'A magical barrier is created',
      'The {ritual} is performed',
      'A convergence of magical energies'
    ],
    natural: [
      'A great earthquake reshapes {region}',
      'The {disaster} changes the landscape',
      'A mysterious plague spreads',
      'Unusual astronomical events occur',
      'The climate begins to change',
      'A new species is discovered',
      'Natural resources are depleted',
      'The {phenomenon} affects daily life'
    ]
  };

  const impactLevels = [
    'Minor local changes',
    'Significant regional effects',
    'Major kingdom-wide impact',
    'World-changing consequences',
    'Effects felt for generations'
  ];

  const nameTemplates = [
    'The Age of {aspect}',
    'The {element} Era',
    'The Time of {event}',
    'The {quality} Period',
    'The {condition} Dynasty'
  ];

  const aspects = [
    'Prosperity', 'Conflict', 'Discovery', 'Change', 'Darkness',
    'Light', 'Magic', 'Heroes', 'Legends', 'Wisdom'
  ];

  const elements = [
    'Golden', 'Silver', 'Bronze', 'Iron', 'Crystal',
    'Shadow', 'Storm', 'Fire', 'Frost', 'Star'
  ];

  const qualities = [
    'Ancient', 'Lost', 'Forgotten', 'Eternal', 'Rising',
    'Fading', 'Glorious', 'Turbulent', 'Peaceful', 'Mystical'
  ];

  const generateName = () => {
    const template = nameTemplates[Math.floor(Math.random() * nameTemplates.length)];
    return template
      .replace('{aspect}', aspects[Math.floor(Math.random() * aspects.length)])
      .replace('{element}', elements[Math.floor(Math.random() * elements.length)])
      .replace('{quality}', qualities[Math.floor(Math.random() * qualities.length)])
      .replace('{event}', aspects[Math.floor(Math.random() * aspects.length)])
      .replace('{condition}', qualities[Math.floor(Math.random() * qualities.length)]);
  };

  const generateEvent = (year: number, type: EventType): TimelineEvent => {
    const templates = eventTemplates[type];
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    // Generate event details
    const eventDetails = template
      .replace('{ruler}', ['King Aldrich', 'Queen Elara', 'Emperor Theron', 'Lord Darius'][Math.floor(Math.random() * 4)])
      .replace('{faction}', ['Northern', 'Southern', 'Eastern', 'Western'][Math.floor(Math.random() * 4)])
      .replace('{aspect}', ['trade', 'warfare', 'magic', 'society'][Math.floor(Math.random() * 4)])
      .replace('{treaty}', ['Peace', 'Alliance', 'Trade', 'Magic'][Math.floor(Math.random() * 4)] + ' Treaty')
      .replace('{region}', ['Kingdom', 'Empire', 'Realm', 'Domain'][Math.floor(Math.random() * 4)])
      .replace('{council}', ['High', 'Royal', 'Mage', 'Elder'][Math.floor(Math.random() * 4)] + ' Council')
      .replace('{city}', ['Ironhold', 'Stormgate', 'Mysthaven', 'Sunspire'][Math.floor(Math.random() * 4)])
      .replace('{enemy}', ['Dark Forces', 'Rival Kingdom', 'Monster Horde', 'Rebel Alliance'][Math.floor(Math.random() * 4)])
      .replace('{war}', ['Great', 'Long', 'Dark', 'Holy'][Math.floor(Math.random() * 4)] + ' War')
      .replace('{unit}', ['Dragon', 'Phoenix', 'Griffin', 'Lion'][Math.floor(Math.random() * 4)])
      .replace('{fortress}', ['Blackspire', 'Stormkeep', 'Dragonhold', 'Shadowgate'][Math.floor(Math.random() * 4)])
      .replace('{institution}', ['Academy', 'Guild', 'Order', 'Society'][Math.floor(Math.random() * 4)])
      .replace('{art}', ['Music', 'Literature', 'Architecture', 'Magic'][Math.floor(Math.random() * 4)])
      .replace('{artifact}', ['Ancient Scroll', 'Magical Gem', 'Lost Relic', 'Sacred Text'][Math.floor(Math.random() * 4)])
      .replace('{festival}', ['Summer', 'Winter', 'Harvest', 'Magic'][Math.floor(Math.random() * 4)])
      .replace('{people}', ['Northern Tribes', 'Desert Nomads', 'Forest Folk', 'Island Peoples'][Math.floor(Math.random() * 4)])
      .replace('{spell}', ['Arcane', 'Divine', 'Nature', 'Blood'][Math.floor(Math.random() * 4)] + ' Magic')
      .replace('{changes}', ['weakens', 'strengthens', 'transforms', 'vanishes'][Math.floor(Math.random() * 4)])
      .replace('{school}', ['Elemental', 'Divine', 'Shadow', 'Nature'][Math.floor(Math.random() * 4)])
      .replace('{ritual}', ['Ancient', 'Forbidden', 'Sacred', 'Secret'][Math.floor(Math.random() * 4)])
      .replace('{disaster}', ['Great Flood', 'Volcanic Eruption', 'Meteor Strike', 'Storm'][Math.floor(Math.random() * 4)])
      .replace('{phenomenon}', ['Aurora', 'Eclipse', 'Comet', 'Storm'][Math.floor(Math.random() * 4)]);

    const keyFigures = Array(Math.floor(Math.random() * 2) + 1)
      .fill(null)
      .map(() => {
        const titles = ['King', 'Queen', 'Lord', 'Lady', 'General', 'Mage', 'Prophet', 'Hero'];
        const names = ['Aldrich', 'Elara', 'Theron', 'Lyra', 'Magnus', 'Selene', 'Darius', 'Aria'];
        return `${titles[Math.floor(Math.random() * titles.length)]} ${names[Math.floor(Math.random() * names.length)]}`;
      });

    return {
      year,
      title: eventDetails,
      description: `This event marks ${eventDetails.toLowerCase()} and its effects ripple through history.`,
      type: eventTypes[type],
      impact: impactLevels[Math.floor(Math.random() * impactLevels.length)],
      keyFigures
    };
  };

  const generateTimeline = () => {
    setIsGenerating(true);

    const startYear = Math.floor(Math.random() * 1000);
    const endYear = startYear + timeSpan;
    const numEvents = Math.floor(timeSpan / 20) + Math.floor(Math.random() * 3);

    // Generate years for events
    const years = Array(numEvents)
      .fill(null)
      .map(() => Math.floor(Math.random() * (endYear - startYear)) + startYear)
      .sort((a, b) => a - b);

    // Generate events
    const events = years.map(year => {
      const type = selectedTypes[Math.floor(Math.random() * selectedTypes.length)] as EventType;
      return generateEvent(year, type);
    });

    const newTimeline: GeneratedTimeline = {
      name: generateName(),
      description: `A pivotal period in history spanning ${timeSpan} years, marked by ${
        selectedTypes.map(type => eventTypes[type].toLowerCase()).join(', ')
      } events that shaped the world.`,
      startYear,
      endYear,
      events,
      timestamp: Date.now()
    };

    setGeneratedTimelines([newTimeline, ...generatedTimelines].slice(0, 3));
    setIsGenerating(false);
  };

  const toggleEventType = (type: EventType) => {
    setSelectedTypes(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <WrenchScrewdriverIcon className="h-8 w-8 text-purple-400" />
          <h1 className="text-3xl font-bold text-white">Timeline Generator</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Controls */}
          <div>
            <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg space-y-6">
              <h2 className="text-xl font-semibold text-white mb-4">Generate Timeline</h2>
              
              {/* Event Types */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Event Types (select at least one)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(eventTypes) as EventType[]).map(type => (
                    <button
                      key={type}
                      onClick={() => toggleEventType(type)}
                      className={`p-3 rounded-lg border transition-all ${
                        selectedTypes.includes(type)
                          ? 'bg-purple-500/20 border-purple-500 text-white'
                          : 'bg-[#1B0A20] border-purple-500/30 text-gray-300 hover:bg-purple-500/10'
                      }`}
                    >
                      {eventTypes[type]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Span */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Time Span (years)
                </label>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="50"
                  value={timeSpan}
                  onChange={(e) => setTimeSpan(parseInt(e.target.value))}
                  className="w-full h-2 bg-[#1B0A20] rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-400 mt-1">
                  <span>50 years</span>
                  <span>{timeSpan} years</span>
                  <span>500 years</span>
                </div>
              </div>

              <button
                onClick={generateTimeline}
                disabled={isGenerating || selectedTypes.length === 0}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate Timeline
              </button>
            </div>
          </div>

          {/* Generated Timelines */}
          <div className="space-y-8">
            {generatedTimelines.map((timeline, index) => (
              <div
                key={timeline.timestamp + index}
                className="bg-[#2D1B36] rounded-xl p-6 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-white mb-2">{timeline.name}</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-300">
                    {timeline.startYear} - {timeline.endYear}
                  </span>
                  <span className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-300">
                    {timeline.events.length} Events
                  </span>
                </div>
                <p className="text-gray-300 mb-6">{timeline.description}</p>

                {/* Timeline Events */}
                <div className="space-y-4">
                  {timeline.events.map((event, i) => (
                    <div
                      key={i}
                      className="relative pl-8 pb-8 last:pb-0"
                    >
                      {/* Timeline Line */}
                      <div className="absolute left-0 top-0 bottom-0 w-px bg-purple-500/30" />
                      
                      {/* Timeline Dot */}
                      <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-purple-500" />

                      <div className="bg-[#1B0A20] rounded-lg p-4">
                        <div className="flex flex-wrap items-start gap-2 mb-2">
                          <span className="text-lg font-semibold text-white">Year {event.year}</span>
                          <span className="px-2 py-0.5 text-sm rounded-full bg-purple-500/20 text-purple-300">
                            {event.type}
                          </span>
                        </div>
                        <h3 className="text-lg text-white mb-2">{event.title}</h3>
                        <p className="text-gray-400 text-sm mb-3">{event.description}</p>
                        
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div>
                            <span className="text-yellow-400">Impact:</span>
                            <span className="text-gray-300 ml-2">{event.impact}</span>
                          </div>
                          {event.keyFigures.length > 0 && (
                            <div>
                              <span className="text-green-400">Key Figures:</span>
                              <span className="text-gray-300 ml-2">
                                {event.keyFigures.join(', ')}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {generatedTimelines.length === 0 && (
              <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg">
                <p className="text-gray-400 text-center">
                  No timelines generated yet
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 