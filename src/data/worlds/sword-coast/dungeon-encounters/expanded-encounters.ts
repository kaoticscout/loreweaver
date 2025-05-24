import { DungeonEncounter } from '../../../../types/dungeon-encounter';

export const expandedEncounters: Record<number, DungeonEncounter[]> = {
  1: [
    {
      id: 'kobold-warren',
      name: 'Kobold Warren',
      description: 'A maze-like network of tunnels inhabited by a large tribe of kobolds who have set up elaborate traps and ambush points.',
      level: 1,
      difficulty: 'Medium',
      type: 'Combat',
      enemies: [
        {
          name: 'Kobold Chieftain',
          type: 'Humanoid',
          count: 1,
          cr: 1,
          abilities: [
            'Pack Tactics',
            'Sunlight Sensitivity',
            'Leadership (Bonus Action)',
            'Multiattack'
          ],
          traits: ['Small size', 'Darkvision'],
          alignment: 'Lawful Evil'
        },
        {
          name: 'Kobold Warrior',
          type: 'Humanoid',
          count: 8,
          cr: 0.125,
          abilities: ['Pack Tactics', 'Sunlight Sensitivity'],
          traits: ['Small size', 'Darkvision'],
          alignment: 'Lawful Evil'
        }
      ],
      rewards: [
        {
          type: 'Gold',
          description: 'Stolen trinkets and coins',
          value: '50 gp'
        },
        {
          type: 'Equipment',
          description: 'Crude weapons and traps'
        }
      ],
      location: {
        dungeon: 'Undermountain',
        area: 'Upper Tunnels',
        environment: 'Underground'
      }
    },
    {
      id: 'rat-infestation',
      name: 'Giant Rat Infestation',
      description: 'The sewers beneath the city have become overrun with unusually large and aggressive rats.',
      level: 1,
      difficulty: 'Easy',
      type: 'Combat',
      enemies: [
        {
          name: 'Giant Rat Alpha',
          type: 'Beast',
          count: 1,
          cr: 0.5,
          abilities: ['Keen Smell', 'Pack Tactics', 'Bite'],
          traits: ['Disease Carrier'],
          alignment: 'Unaligned'
        },
        {
          name: 'Giant Rat',
          type: 'Beast',
          count: 12,
          cr: 0.125,
          abilities: ['Keen Smell', 'Pack Tactics'],
          traits: ['Disease Carrier'],
          alignment: 'Unaligned'
        }
      ],
      rewards: [
        {
          type: 'Gold',
          description: 'Lost coins in the sewers',
          value: '25 gp'
        }
      ],
      location: {
        dungeon: 'Waterdeep Sewers',
        area: 'Main Junction',
        environment: 'Urban'
      }
    }
  ],
  2: [
    {
      id: 'bandit-stronghold',
      name: 'Bandit Stronghold',
      description: 'A fortified camp where numerous bandits have gathered under the leadership of several experienced captains.',
      level: 2,
      difficulty: 'Hard',
      type: 'Combat',
      enemies: [
        {
          name: 'Bandit Captain',
          type: 'Humanoid',
          count: 2,
          cr: 2,
          abilities: [
            'Multiattack',
            'Parry',
            'Leadership'
          ],
          traits: ['Combat Expertise'],
          alignment: 'Neutral Evil'
        },
        {
          name: 'Bandit Archer',
          type: 'Humanoid',
          count: 6,
          cr: 0.5,
          abilities: ['Precise Shot', 'Quick Draw'],
          traits: ['Sharpshooter'],
          alignment: 'Neutral Evil'
        },
        {
          name: 'Bandit Warrior',
          type: 'Humanoid',
          count: 12,
          cr: 0.25,
          abilities: ['Pack Tactics'],
          traits: ['Coordinated Attack'],
          alignment: 'Neutral Evil'
        }
      ],
      rewards: [
        {
          type: 'Gold',
          description: 'Stolen wealth',
          value: '200 gp'
        },
        {
          type: 'Equipment',
          description: 'Weapons and armor',
          value: '100 gp'
        }
      ],
      location: {
        dungeon: 'Sword Mountains',
        area: 'Fortified Camp',
        environment: 'Mountain'
      }
    }
  ],
  3: [
    {
      id: 'cultist-ritual',
      name: 'Dark Ritual Chamber',
      description: 'A hidden temple where cultists are performing a dark ritual to summon otherworldly entities.',
      level: 3,
      difficulty: 'Deadly',
      type: 'Combat',
      enemies: [
        {
          name: 'Cult Leader',
          type: 'Humanoid',
          count: 1,
          cr: 4,
          abilities: [
            'Spellcasting',
            'Dark Devotion',
            'Leadership'
          ],
          traits: ['Magic Resistance'],
          alignment: 'Chaotic Evil'
        },
        {
          name: 'Cult Fanatic',
          type: 'Humanoid',
          count: 4,
          cr: 2,
          abilities: ['Spellcasting', 'Dark Devotion'],
          traits: ['Zealot'],
          alignment: 'Chaotic Evil'
        },
        {
          name: 'Cultist',
          type: 'Humanoid',
          count: 16,
          cr: 0.125,
          abilities: ['Dark Devotion'],
          traits: ['Fanatical'],
          alignment: 'Chaotic Evil'
        }
      ],
      rewards: [
        {
          type: 'Magic Item',
          description: 'Ritual Dagger',
          value: '300 gp',
          rarity: 'Uncommon'
        },
        {
          type: 'Gold',
          description: 'Ceremonial offerings',
          value: '150 gp'
        }
      ],
      location: {
        dungeon: 'Temple of the Dark Moon',
        area: 'Ritual Chamber',
        environment: 'Underground Temple'
      }
    }
  ],
  4: [
    {
      id: 'undead-crypt',
      name: 'Ancient Crypt',
      description: 'A sprawling underground crypt filled with various types of undead, all under the control of a powerful necromancer.',
      level: 4,
      difficulty: 'Hard',
      type: 'Combat',
      enemies: [
        {
          name: 'Necromancer',
          type: 'Humanoid',
          count: 1,
          cr: 5,
          abilities: [
            'Spellcasting',
            'Undead Command',
            'Grim Harvest'
          ],
          traits: ['Undead Master'],
          alignment: 'Neutral Evil'
        },
        {
          name: 'Wight',
          type: 'Undead',
          count: 3,
          cr: 3,
          abilities: ['Life Drain', 'Multiattack'],
          traits: ['Sunlight Sensitivity'],
          alignment: 'Neutral Evil'
        },
        {
          name: 'Skeleton Warrior',
          type: 'Undead',
          count: 12,
          cr: 0.5,
          abilities: ['Shortsword', 'Shortbow'],
          traits: ['Undead Nature'],
          alignment: 'Lawful Evil'
        },
        {
          name: 'Zombie',
          type: 'Undead',
          count: 20,
          cr: 0.25,
          abilities: ['Undead Fortitude'],
          traits: ['Undead Nature'],
          alignment: 'Neutral Evil'
        }
      ],
      rewards: [
        {
          type: 'Magic Item',
          description: 'Necromancer\'s Staff',
          value: '500 gp',
          rarity: 'Rare'
        },
        {
          type: 'Gold',
          description: 'Ancient treasures',
          value: '300 gp'
        }
      ],
      location: {
        dungeon: 'Crypt of the Forgotten King',
        area: 'Main Chamber',
        environment: 'Underground'
      }
    }
  ],
  5: [
    {
      id: 'dragon-cult',
      name: 'Dragon Cult Stronghold',
      description: 'A fortified monastery where dragon cultists train and worship, protected by various draconic creatures.',
      level: 5,
      difficulty: 'Deadly',
      type: 'Combat',
      enemies: [
        {
          name: 'Dragon Cult High Priest',
          type: 'Humanoid',
          count: 1,
          cr: 6,
          abilities: [
            'Spellcasting',
            'Dragon\'s Blessing',
            'Leadership'
          ],
          traits: ['Dragon Soul'],
          alignment: 'Lawful Evil'
        },
        {
          name: 'Half-Dragon Warrior',
          type: 'Dragon',
          count: 2,
          cr: 4,
          abilities: [
            'Multiattack',
            'Breath Weapon',
            'Dragon Strike'
          ],
          traits: ['Draconic Heritage'],
          alignment: 'Lawful Evil'
        },
        {
          name: 'Dragon Cult Fanatic',
          type: 'Humanoid',
          count: 6,
          cr: 2,
          abilities: [
            'Spellcasting',
            'Fanatical Devotion'
          ],
          traits: ['Dragon Blessed'],
          alignment: 'Lawful Evil'
        },
        {
          name: 'Guard Drake',
          type: 'Dragon',
          count: 8,
          cr: 1,
          abilities: ['Bite', 'Guard'],
          traits: ['Keen Senses'],
          alignment: 'Lawful Evil'
        },
        {
          name: 'Dragon Cult Acolyte',
          type: 'Humanoid',
          count: 12,
          cr: 0.5,
          abilities: ['Minor Spellcasting'],
          traits: ['Dragon Devotee'],
          alignment: 'Lawful Evil'
        }
      ],
      rewards: [
        {
          type: 'Magic Item',
          description: 'Dragon Scale Armor',
          value: '1000 gp',
          rarity: 'Rare'
        },
        {
          type: 'Gold',
          description: 'Dragon cult treasury',
          value: '500 gp'
        }
      ],
      location: {
        dungeon: 'Monastery of the Scaled God',
        area: 'Training Grounds',
        environment: 'Mountain'
      }
    }
  ],
  6: [
    {
      id: 'giant-stronghold',
      name: 'Frost Giant Stronghold',
      description: 'A massive ice fortress in the frozen north, home to a clan of frost giants and their various servants and thralls.',
      level: 6,
      difficulty: 'Deadly',
      type: 'Combat',
      enemies: [
        {
          name: 'Frost Giant Jarl',
          type: 'Giant',
          count: 1,
          cr: 8,
          abilities: [
            'Multiattack',
            'Great Axe',
            'Rock Throwing',
            'Frost Aura'
          ],
          traits: ['Cold Immunity', 'Giant Might'],
          alignment: 'Neutral Evil'
        },
        {
          name: 'Frost Giant',
          type: 'Giant',
          count: 4,
          cr: 6,
          abilities: [
            'Multiattack',
            'Great Axe',
            'Rock Throwing'
          ],
          traits: ['Cold Immunity'],
          alignment: 'Neutral Evil'
        },
        {
          name: 'Winter Wolf',
          type: 'Monstrosity',
          count: 6,
          cr: 3,
          abilities: [
            'Pack Tactics',
            'Snow Camouflage',
            'Frost Breath'
          ],
          traits: ['Keen Hearing and Smell'],
          alignment: 'Neutral Evil'
        },
        {
          name: 'Ice Troll',
          type: 'Giant',
          count: 8,
          cr: 2,
          abilities: [
            'Multiattack',
            'Regeneration',
            'Ice Claws'
          ],
          traits: ['Cold Immunity'],
          alignment: 'Chaotic Evil'
        }
      ],
      rewards: [
        {
          type: 'Magic Item',
          description: 'Frost Giant\'s Greataxe',
          value: '2000 gp',
          rarity: 'Very Rare'
        },
        {
          type: 'Gold',
          description: 'Giant\'s hoard',
          value: '1000 gp'
        }
      ],
      location: {
        dungeon: 'Icespire Peak',
        area: 'Giant\'s Hall',
        environment: 'Arctic'
      }
    }
  ],
  7: [
    {
      id: 'dragon-lair',
      name: 'Adult Dragon\'s Lair',
      description: 'The lair of an adult green dragon, filled with toxic fumes and corrupted plant life, guarded by various servants and cultists.',
      level: 7,
      difficulty: 'Deadly',
      type: 'Combat',
      enemies: [
        {
          name: 'Adult Green Dragon',
          type: 'Dragon',
          count: 1,
          cr: 15,
          abilities: [
            'Multiattack',
            'Poison Breath',
            'Frightful Presence',
            'Legendary Actions'
          ],
          traits: ['Poison Immunity', 'Amphibious'],
          alignment: 'Lawful Evil',
          legendaryActions: [
            {
              name: 'Tail Attack',
              description: 'The dragon makes a tail attack.',
              cost: 1
            },
            {
              name: 'Wing Attack',
              description: 'The dragon beats its wings.',
              cost: 2
            }
          ]
        },
        {
          name: 'Corrupted Treant',
          type: 'Plant',
          count: 2,
          cr: 9,
          abilities: [
            'Multiattack',
            'Animate Trees',
            'Rock',
            'Slam'
          ],
          traits: ['False Appearance', 'Siege Monster'],
          alignment: 'Neutral Evil'
        },
        {
          name: 'Yuan-ti Malison',
          type: 'Monstrosity',
          count: 4,
          cr: 3,
          abilities: [
            'Multiattack',
            'Spellcasting',
            'Shapechanger'
          ],
          traits: ['Magic Resistance', 'Poison Immunity'],
          alignment: 'Neutral Evil'
        },
        {
          name: 'Poisonous Snake Swarm',
          type: 'Beast',
          count: 8,
          cr: 1,
          abilities: [
            'Swarm',
            'Poison Bite'
          ],
          traits: ['Swarm Tactics'],
          alignment: 'Unaligned'
        }
      ],
      rewards: [
        {
          type: 'Magic Item',
          description: 'Dragon Scale Mail',
          value: '5000 gp',
          rarity: 'Very Rare'
        },
        {
          type: 'Gold',
          description: 'Dragon\'s hoard',
          value: '3000 gp'
        }
      ],
      location: {
        dungeon: 'Emerald Depths',
        area: 'Dragon\'s Chamber',
        environment: 'Forest'
      }
    }
  ],
  8: [
    {
      id: 'mind-flayer-colony',
      name: 'Mind Flayer Colony',
      description: 'A hidden colony of mind flayers deep underground, where they conduct terrible experiments and plot the domination of the surface world.',
      level: 8,
      difficulty: 'Deadly',
      type: 'Combat',
      enemies: [
        {
          name: 'Mind Flayer Elder Brain',
          type: 'Aberration',
          count: 1,
          cr: 14,
          abilities: [
            'Creature Sense',
            'Legendary Psychic Defense',
            'Psychic Link',
            'Tentacle Attack'
          ],
          traits: ['Magic Resistance', 'Telepathy 5 miles'],
          alignment: 'Lawful Evil',
          legendaryActions: [
            {
              name: 'Tentacle Attack',
              description: 'The elder brain makes a tentacle attack.',
              cost: 1
            },
            {
              name: 'Mind Blast',
              description: 'The elder brain uses its Mind Blast.',
              cost: 2
            }
          ]
        },
        {
          name: 'Mind Flayer Arcanist',
          type: 'Aberration',
          count: 2,
          cr: 8,
          abilities: [
            'Spellcasting',
            'Mind Blast',
            'Extract Brain'
          ],
          traits: ['Magic Resistance', 'Telepathy'],
          alignment: 'Lawful Evil'
        },
        {
          name: 'Mind Flayer',
          type: 'Aberration',
          count: 4,
          cr: 7,
          abilities: [
            'Mind Blast',
            'Extract Brain',
            'Tentacles'
          ],
          traits: ['Magic Resistance', 'Telepathy'],
          alignment: 'Lawful Evil'
        },
        {
          name: 'Intellect Devourer',
          type: 'Aberration',
          count: 8,
          cr: 2,
          abilities: [
            'Detect Sentience',
            'Devour Intellect',
            'Body Thief'
          ],
          traits: ['Telepathy'],
          alignment: 'Lawful Evil'
        },
        {
          name: 'Enslaved Thrall',
          type: 'Humanoid',
          count: 20,
          cr: 0.5,
          abilities: [
            'Psychically Controlled',
            'Basic Combat'
          ],
          traits: ['Dominated'],
          alignment: 'Unaligned'
        }
      ],
      rewards: [
        {
          type: 'Magic Item',
          description: 'Mind Flayer Staff',
          value: '8000 gp',
          rarity: 'Very Rare'
        },
        {
          type: 'Gold',
          description: 'Colony treasury',
          value: '4000 gp'
        }
      ],
      location: {
        dungeon: 'Underdark Depths',
        area: 'Elder Brain Chamber',
        environment: 'Underground'
      }
    }
  ],
  9: [
    {
      id: 'demon-portal',
      name: 'Demon Portal Breach',
      description: 'A massive portal to the Abyss has been opened, allowing demons to pour through into the Material Plane.',
      level: 9,
      difficulty: 'Deadly',
      type: 'Combat',
      enemies: [
        {
          name: 'Balor',
          type: 'Fiend',
          count: 1,
          cr: 19,
          abilities: [
            'Multiattack',
            'Fire Aura',
            'Death Throes',
            'Teleport'
          ],
          traits: ['Magic Resistance', 'Fire Immunity'],
          alignment: 'Chaotic Evil',
          legendaryActions: [
            {
              name: 'Whip Attack',
              description: 'The balor makes a whip attack.',
              cost: 1
            },
            {
              name: 'Teleport',
              description: 'The balor magically teleports.',
              cost: 2
            }
          ]
        },
        {
          name: 'Marilith',
          type: 'Fiend',
          count: 2,
          cr: 16,
          abilities: [
            'Multiattack',
            'Reactive',
            'Magic Resistance',
            'Teleport'
          ],
          traits: ['Magic Weapons', 'Six Arms'],
          alignment: 'Chaotic Evil'
        },
        {
          name: 'Glabrezu',
          type: 'Fiend',
          count: 4,
          cr: 9,
          abilities: [
            'Multiattack',
            'Magic Resistance',
            'Innate Spellcasting'
          ],
          traits: ['True Sight'],
          alignment: 'Chaotic Evil'
        },
        {
          name: 'Vrock',
          type: 'Fiend',
          count: 8,
          cr: 6,
          abilities: [
            'Multiattack',
            'Spores',
            'Stunning Screech'
          ],
          traits: ['Magic Resistance'],
          alignment: 'Chaotic Evil'
        },
        {
          name: 'Dretch',
          type: 'Fiend',
          count: 20,
          cr: 0.25,
          abilities: [
            'Multiattack',
            'Fetid Cloud'
          ],
          traits: ['Abyssal Weakness'],
          alignment: 'Chaotic Evil'
        }
      ],
      rewards: [
        {
          type: 'Magic Item',
          description: 'Demon Lord\'s Weapon',
          value: '15000 gp',
          rarity: 'Legendary'
        },
        {
          type: 'Gold',
          description: 'Abyssal treasures',
          value: '8000 gp'
        }
      ],
      location: {
        dungeon: 'Temple of the Abyss',
        area: 'Portal Chamber',
        environment: 'Hellscape'
      }
    }
  ],
  10: [
    {
      id: 'celestial-temple',
      name: 'Celestial Temple Under Siege',
      description: 'A temple of celestial beings that has come under attack by forces of evil, creating an epic battle between good and evil.',
      level: 10,
      difficulty: 'Deadly',
      type: 'Combat',
      enemies: [
        {
          name: 'Solar',
          type: 'Celestial',
          count: 1,
          cr: 21,
          abilities: [
            'Multiattack',
            'Slaying Longbow',
            'Flying Sword',
            'Healing Touch'
          ],
          traits: ['Angelic Weapons', 'Divine Awareness'],
          alignment: 'Lawful Good',
          legendaryActions: [
            {
              name: 'Teleport',
              description: 'The solar teleports up to 120 feet.',
              cost: 1
            },
            {
              name: 'Searing Burst',
              description: 'The solar emits magical, divine energy.',
              cost: 2
            }
          ]
        },
        {
          name: 'Planetar',
          type: 'Celestial',
          count: 2,
          cr: 16,
          abilities: [
            'Multiattack',
            'Healing Touch',
            'Innate Spellcasting'
          ],
          traits: ['Angelic Weapons', 'Magic Resistance'],
          alignment: 'Lawful Good'
        },
        {
          name: 'Deva',
          type: 'Celestial',
          count: 4,
          cr: 10,
          abilities: [
            'Multiattack',
            'Healing Touch',
            'Change Shape'
          ],
          traits: ['Angelic Weapons', 'Magic Resistance'],
          alignment: 'Lawful Good'
        },
        {
          name: 'Couatl',
          type: 'Celestial',
          count: 8,
          cr: 4,
          abilities: [
            'Bite',
            'Constrict',
            'Change Shape',
            'Innate Spellcasting'
          ],
          traits: ['Magic Weapons', 'Shielded Mind'],
          alignment: 'Lawful Good'
        }
      ],
      rewards: [
        {
          type: 'Magic Item',
          description: 'Celestial Weapon',
          value: '20000 gp',
          rarity: 'Legendary'
        },
        {
          type: 'Gold',
          description: 'Divine offerings',
          value: '10000 gp'
        }
      ],
      location: {
        dungeon: 'Temple of Radiance',
        area: 'Grand Sanctuary',
        environment: 'Divine Realm'
      }
    }
  ],
  11: [
    {
      id: 'ancient-vault',
      name: 'Ancient Dragon Vault',
      description: 'A long-forgotten vault containing the remains and treasures of multiple ancient dragons, now guarded by powerful constructs and undead dragons.',
      level: 11,
      difficulty: 'Deadly',
      type: 'Combat',
      enemies: [
        {
          name: 'Ancient Dracolich',
          type: 'Undead Dragon',
          count: 1,
          cr: 22,
          abilities: [
            'Multiattack',
            'Frightful Presence',
            'Necrotic Breath',
            'Paralyzing Touch'
          ],
          traits: ['Legendary Resistance', 'Magic Resistance'],
          alignment: 'Neutral Evil',
          legendaryActions: [
            {
              name: 'Detect',
              description: 'The dracolich makes a Wisdom (Perception) check.',
              cost: 1
            },
            {
              name: 'Tail Attack',
              description: 'The dracolich makes a tail attack.',
              cost: 2
            }
          ]
        },
        {
          name: 'Steel Predator',
          type: 'Construct',
          count: 2,
          cr: 16,
          abilities: [
            'Multiattack',
            'Magic Resistance',
            'Tracking'
          ],
          traits: ['Magic Weapons', 'Constructed Nature'],
          alignment: 'Lawful Neutral'
        },
        {
          name: 'Shield Guardian',
          type: 'Construct',
          count: 4,
          cr: 7,
          abilities: [
            'Multiattack',
            'Shield',
            'Regeneration'
          ],
          traits: ['Bound', 'Constructed Nature'],
          alignment: 'Unaligned'
        },
        {
          name: 'Helmed Horror',
          type: 'Construct',
          count: 8,
          cr: 4,
          abilities: [
            'Multiattack',
            'Magic Resistance',
            'Spell Immunity'
          ],
          traits: ['Constructed Nature'],
          alignment: 'Neutral'
        },
        {
          name: 'Animated Armor',
          type: 'Construct',
          count: 20,
          cr: 1,
          abilities: [
            'Multiattack',
            'Constructed Nature'
          ],
          traits: ['Antimagic Susceptibility'],
          alignment: 'Unaligned'
        }
      ],
      rewards: [
        {
          type: 'Magic Item',
          description: 'Dragon Soul Gem',
          value: '25000 gp',
          rarity: 'Legendary'
        },
        {
          type: 'Gold',
          description: 'Ancient dragon hoard',
          value: '15000 gp'
        }
      ],
      location: {
        dungeon: 'Dragon\'s Tomb',
        area: 'Vault of Ages',
        environment: 'Ancient Ruins'
      }
    }
  ],
  12: [
    {
      id: 'elemental-nexus',
      name: 'Elemental Chaos Nexus',
      description: 'A convergence point of the elemental planes where powerful elemental beings wage war for control of the nexus.',
      level: 12,
      difficulty: 'Deadly',
      type: 'Combat',
      enemies: [
        {
          name: 'Elder Elemental',
          type: 'Elemental',
          count: 1,
          cr: 23,
          abilities: [
            'Multiattack',
            'Elemental Mastery',
            'Planar Control'
          ],
          traits: ['Elemental Nature', 'Magic Resistance'],
          alignment: 'Neutral',
          legendaryActions: [
            {
              name: 'Element Blast',
              description: 'The elder elemental releases a blast of pure elemental energy.',
              cost: 1
            },
            {
              name: 'Planar Step',
              description: 'The elder elemental steps between planes.',
              cost: 2
            }
          ]
        },
        {
          name: 'Elemental Prince',
          type: 'Elemental',
          count: 4,
          cr: 16,
          abilities: [
            'Multiattack',
            'Elemental Form',
            'Elemental Spells'
          ],
          traits: ['Elemental Body', 'Magic Resistance'],
          alignment: 'Neutral'
        },
        {
          name: 'Elemental Myrmidon',
          type: 'Elemental',
          count: 8,
          cr: 7,
          abilities: [
            'Multiattack',
            'Elemental Strike',
            'Magic Weapons'
          ],
          traits: ['Elemental Nature'],
          alignment: 'Neutral'
        },
        {
          name: 'Elemental',
          type: 'Elemental',
          count: 16,
          cr: 5,
          abilities: [
            'Multiattack',
            'Elemental Body'
          ],
          traits: ['Elemental Nature'],
          alignment: 'Neutral'
        },
        {
          name: 'Elemental Wisp',
          type: 'Elemental',
          count: 32,
          cr: 2,
          abilities: [
            'Elemental Touch',
            'Illumination'
          ],
          traits: ['Elemental Essence'],
          alignment: 'Neutral'
        }
      ],
      rewards: [
        {
          type: 'Magic Item',
          description: 'Elemental Orb of Power',
          value: '30000 gp',
          rarity: 'Artifact'
        },
        {
          type: 'Gold',
          description: 'Elemental crystals and rare minerals',
          value: '20000 gp'
        }
      ],
      location: {
        dungeon: 'Elemental Convergence',
        area: 'Nexus Core',
        environment: 'Elemental Chaos'
      }
    }
  ],
  13: [
    {
      id: 'fey-court',
      name: 'Feywild Court Battle',
      description: 'A grand battle in the Feywild as rival courts of the Seelie and Unseelie fey wage war for dominion over a powerful magical nexus.',
      level: 13,
      difficulty: 'Deadly',
      type: 'Combat',
      enemies: [
        {
          name: 'Archfey',
          type: 'Fey',
          count: 2,
          cr: 18,
          abilities: [
            'Innate Spellcasting',
            'Legendary Resistance',
            'Fey Charm',
            'Reality Warp'
          ],
          traits: ['Magic Resistance', 'Fey Majesty'],
          alignment: 'Neutral',
          legendaryActions: [
            {
              name: 'Fey Step',
              description: 'The archfey teleports in a shower of glittering light.',
              cost: 1
            },
            {
              name: 'Glamour Burst',
              description: 'The archfey releases a burst of enchanting magic.',
              cost: 2
            }
          ]
        },
        {
          name: 'Fey Knight',
          type: 'Fey',
          count: 5,
          cr: 11,
          abilities: [
            'Multiattack',
            'Fey Weapon',
            'Spellcasting'
          ],
          traits: ['Magic Resistance', 'Fey Nobility'],
          alignment: 'Neutral'
        },
        {
          name: 'Pixie Noble',
          type: 'Fey',
          count: 10,
          cr: 4,
          abilities: [
            'Superior Invisibility',
            'Pixie Magic',
            'Heart Sight'
          ],
          traits: ['Fey Nature', 'Magic Resistance'],
          alignment: 'Neutral Good'
        },
        {
          name: 'Sprite Warrior',
          type: 'Fey',
          count: 20,
          cr: 1,
          abilities: [
            'Heart Sight',
            'Invisibility',
            'Shortbow'
          ],
          traits: ['Fey Nature'],
          alignment: 'Neutral'
        },
        {
          name: 'Fey Wisp',
          type: 'Fey',
          count: 20,
          cr: 0.25,
          abilities: [
            'Illumination',
            'Variable Illumination',
            'Invisibility'
          ],
          traits: ['Fey Essence'],
          alignment: 'Chaotic Neutral'
        }
      ],
      rewards: [
        {
          type: 'Magic Item',
          description: 'Crown of the Fey Court',
          value: '35000 gp',
          rarity: 'Artifact'
        },
        {
          type: 'Gold',
          description: 'Fey treasures and magical trinkets',
          value: '25000 gp'
        }
      ],
      location: {
        dungeon: 'Court of the Eternal Dance',
        area: 'Grand Ballroom',
        environment: 'Feywild'
      }
    }
  ]
  // ... More encounters will be added in subsequent edits
}; 