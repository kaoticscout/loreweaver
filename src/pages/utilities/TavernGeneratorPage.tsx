import { useState } from 'react';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

interface Tavern {
  name: string;
  description: string;
  atmosphere: string;
  specialFeature: string;
  innkeeper: {
    name: string;
    description: string;
    quirk: string;
  };
  menu: {
    food: string[];
    drinks: string[];
    specialties: string[];
  };
  rumors: string[];
  currentEvents: string[];
  rooms: {
    type: string;
    price: string;
    description: string;
  }[];
}

interface GeneratedTavern extends Tavern {
  timestamp: number;
}

export function TavernGeneratorPage() {
  const [generatedTaverns, setGeneratedTaverns] = useState<GeneratedTavern[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Data for generation
  const tavernNameParts = {
    adjectives: ['Rusty', 'Golden', 'Silver', 'Prancing', 'Dancing', 'Laughing', 'Sleeping', 'Drunken', 'Wandering', 'Mystic'],
    nouns: ['Dragon', 'Unicorn', 'Goblin', 'Barrel', 'Tankard', 'Sword', 'Shield', 'Crown', 'Wizard', 'Knight'],
    types: ['Inn', 'Tavern', 'Alehouse', 'Lodge', 'Rest', 'Haven', 'Respite', 'Retreat', 'House', 'Pub']
  };

  const atmospheres = [
    'Warm and cozy with a crackling fireplace',
    'Rowdy and boisterous with live music',
    'Dark and mysterious with hushed conversations',
    'Bright and cheerful with friendly patrons',
    'Smoky and crowded with various travelers',
    'Quiet and relaxed with a scholarly atmosphere',
    'Lively and energetic with dancing',
    'Rustic and homely with local charm'
  ];

  const specialFeatures = [
    'A magical self-playing instrument',
    'A wall covered in adventurer\'s trophies',
    'A mysterious portal in the cellar',
    'A resident ghost who serves drinks',
    'An enchanted fountain that never runs dry',
    'A collection of exotic maps and artifacts',
    'A secret meeting room for conspirators',
    'A magical fireplace that changes colors'
  ];

  const innkeeperQuirks = [
    'Speaks in rhymes',
    'Collects unusual trinkets',
    'Never forgets a face or name',
    'Has a pet pseudodragon',
    'Always wears mismatched socks',
    'Tells outlandish stories',
    'Can predict the weather perfectly',
    'Brews mysterious potions as a hobby'
  ];

  const foods = [
    'Roasted venison with herbs',
    'Freshly baked bread',
    'Hearty beef stew',
    'Grilled fish with lemon',
    'Mushroom soup',
    'Meat pie',
    'Roasted chicken',
    'Vegetable pasties'
  ];

  const drinks = [
    'Local ale',
    'Imported wine',
    'Spiced mead',
    'Dwarven stout',
    'Elven wine',
    'Moonshine',
    'Herbal tea',
    'Mulled cider'
  ];

  const specialties = [
    'Secret family recipe stew',
    'Magical color-changing ale',
    'Dragon-pepper hot wings',
    'Ethereal elfwine',
    'Giant\'s strength porter',
    'Pixie-dusted pastries',
    'Wizard\'s warming whiskey',
    'Healing herb tea blend'
  ];

  const rumors = [
    'A dragon was spotted in the nearby mountains',
    'The old castle is haunted by restless spirits',
    'A merchant buried treasure in the forest',
    'The king\'s advisor is actually a shapeshifter',
    'A portal to the Feywild opens on full moons',
    'The local guild master is recruiting adventurers',
    'Strange lights have been seen in the marsh',
    'A powerful artifact was discovered in the mines'
  ];

  const events = [
    'A bard competition is happening tonight',
    'A mysterious stranger is buying drinks for everyone',
    'Local guards are searching for a thief',
    'A wedding celebration is in full swing',
    'Merchants are gathering for a secret auction',
    'A fortune teller is offering free readings',
    'Adventurers are recruiting for a quest',
    'A noble is traveling incognito'
  ];

  const roomTypes = [
    {
      type: 'Common Room',
      price: '5 sp',
      description: 'Shared sleeping space with basic amenities'
    },
    {
      type: 'Private Room',
      price: '2 gp',
      description: 'Single room with a bed and wash basin'
    },
    {
      type: 'Luxury Suite',
      price: '5 gp',
      description: 'Spacious room with premium furnishings and private bath'
    },
    {
      type: 'Family Room',
      price: '4 gp',
      description: 'Large room with multiple beds and sitting area'
    }
  ];

  const generateName = () => {
    const adj = tavernNameParts.adjectives[Math.floor(Math.random() * tavernNameParts.adjectives.length)];
    const noun = tavernNameParts.nouns[Math.floor(Math.random() * tavernNameParts.nouns.length)];
    const type = tavernNameParts.types[Math.floor(Math.random() * tavernNameParts.types.length)];
    return `The ${adj} ${noun} ${type}`;
  };

  const getRandomItems = <T extends unknown>(array: T[], count: number): T[] => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const generateTavern = () => {
    setIsGenerating(true);

    const newTavern: GeneratedTavern = {
      name: generateName(),
      description: `A ${['well-known', 'cozy', 'famous', 'humble', 'prestigious'][Math.floor(Math.random() * 5)]} establishment in the ${['heart of the city', 'outskirts of town', 'trade district', 'old quarter', 'marketplace'][Math.floor(Math.random() * 5)]}`,
      atmosphere: atmospheres[Math.floor(Math.random() * atmospheres.length)],
      specialFeature: specialFeatures[Math.floor(Math.random() * specialFeatures.length)],
      innkeeper: {
        name: 'Placeholder Name', // You could add a name generator here
        description: `A ${['friendly', 'stern', 'mysterious', 'jolly', 'shrewd'][Math.floor(Math.random() * 5)]} ${['human', 'dwarf', 'elf', 'halfling', 'gnome'][Math.floor(Math.random() * 5)]} with ${['graying hair', 'a thick beard', 'bright eyes', 'calloused hands', 'a warm smile'][Math.floor(Math.random() * 5)]}`,
        quirk: innkeeperQuirks[Math.floor(Math.random() * innkeeperQuirks.length)]
      },
      menu: {
        food: getRandomItems(foods, 3),
        drinks: getRandomItems(drinks, 3),
        specialties: getRandomItems(specialties, 2)
      },
      rumors: getRandomItems(rumors, 2),
      currentEvents: getRandomItems(events, 2),
      rooms: getRandomItems(roomTypes, 3),
      timestamp: Date.now()
    };

    setGeneratedTaverns([newTavern, ...generatedTaverns].slice(0, 5));
    setIsGenerating(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <WrenchScrewdriverIcon className="h-8 w-8 text-purple-400" />
          <h1 className="text-3xl font-bold text-white">Tavern Generator</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Controls */}
          <div>
            <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-4">Generate Tavern</h2>
              
              <button
                onClick={generateTavern}
                disabled={isGenerating}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate New Tavern
              </button>
            </div>
          </div>

          {/* Generated Taverns */}
          <div className="space-y-8">
            {generatedTaverns.map((tavern, index) => (
              <div
                key={tavern.timestamp + index}
                className="bg-[#2D1B36] rounded-xl p-6 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-white mb-2">{tavern.name}</h2>
                <p className="text-gray-300 mb-4">{tavern.description}</p>

                <div className="space-y-6">
                  {/* Atmosphere & Features */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Atmosphere</h3>
                    <p className="text-gray-300">{tavern.atmosphere}</p>
                    <h4 className="text-md font-semibold text-purple-400 mt-2">Special Feature</h4>
                    <p className="text-gray-300">{tavern.specialFeature}</p>
                  </div>

                  {/* Innkeeper */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Innkeeper</h3>
                    <p className="text-gray-300">{tavern.innkeeper.description}</p>
                    <p className="text-purple-300 mt-1">Quirk: {tavern.innkeeper.quirk}</p>
                  </div>

                  {/* Menu */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Menu</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-md font-semibold text-purple-400">Food</h4>
                        <ul className="list-disc list-inside text-gray-300">
                          {tavern.menu.food.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-md font-semibold text-purple-400">Drinks</h4>
                        <ul className="list-disc list-inside text-gray-300">
                          {tavern.menu.drinks.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-2">
                      <h4 className="text-md font-semibold text-purple-400">Specialties</h4>
                      <ul className="list-disc list-inside text-gray-300">
                        {tavern.menu.specialties.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Rooms */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Rooms</h3>
                    <div className="space-y-2">
                      {tavern.rooms.map((room, i) => (
                        <div key={i} className="bg-[#1B0A20] rounded-lg p-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-white">{room.type}</span>
                            <span className="text-yellow-400">{room.price}</span>
                          </div>
                          <p className="text-gray-400 text-sm">{room.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rumors & Events */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Current Rumors</h3>
                      <ul className="list-disc list-inside text-gray-300">
                        {tavern.rumors.map((rumor, i) => (
                          <li key={i}>{rumor}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Current Events</h3>
                      <ul className="list-disc list-inside text-gray-300">
                        {tavern.currentEvents.map((event, i) => (
                          <li key={i}>{event}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {generatedTaverns.length === 0 && (
              <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg">
                <p className="text-gray-400 text-center">
                  No taverns generated yet
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 