import { DungeonEncounter } from '../../../../types/dungeon-encounter'

export const levelEncounters: Record<number, DungeonEncounter[]> = {
  1: [
    {
      id: 'goblin-ambush',
      name: 'Goblin Ambush',
      description: 'The narrow forest road winds through ancient trees, their gnarled branches casting long shadows across the path. A small band of goblins, their green skin camouflaged by the dense foliage, has set up an elaborate ambush. They\'ve rigged crude traps with vines and sharpened sticks, while their scouts perch in the trees above, ready to signal the attack. The goblins\' beady eyes gleam with malicious intent as they wait for unsuspecting travelers, their small hands gripping crude weapons. The air is thick with the scent of damp earth and the occasional rustle of leaves betrays their presence to the observant.',
      level: 1,
      difficulty: 'Easy',
      type: 'Combat',
      enemies: [
        {
          name: 'Goblin',
          type: 'Humanoid (Goblinoid)',
          count: 4,
          cr: 0.25,
          abilities: [
            'Nimble Escape: Can take the Disengage or Hide action as a bonus action',
            'Scimitar: Melee weapon attack, +4 to hit, 1d6+2 slashing damage',
            'Shortbow: Ranged weapon attack, +4 to hit, 1d6+2 piercing damage'
          ],
          traits: [
            'Darkvision 60 ft.',
            'Small size',
            'Speed 30 ft.'
          ],
          alignment: 'Neutral Evil'
        }
      ],
      rewards: [
        {
          type: 'Gold',
          description: '2d6 gold pieces',
          value: '2d6'
        },
        {
          type: 'Experience',
          description: '200 XP'
        }
      ],
      location: {
        dungeon: 'Forest Road',
        area: 'Narrow Pass',
        environment: 'Forest'
      },
      triggers: [
        {
          type: 'Proximity',
          description: 'Goblins attack when travelers enter the narrow pass',
          dc: 12
        }
      ],
      xp: 200,
      treasure: {
        gold: 10,
        gems: [{ type: 'Small Ruby', value: 10 }],
        equipment: [
          '4 scimitars',
          '4 shortbows',
          '20 arrows',
          '4 leather armor'
        ]
      }
    },
    {
      id: 'kobold-den',
      name: "Kobold's Den",
      description: 'Deep within a network of winding caves, the air grows thick with the acrid smell of smoke and the faint sound of chittering voices. A tribe of kobolds has transformed the natural caverns into a maze-like lair, with crude wooden barricades and spiked pit traps protecting their territory. The walls are adorned with primitive drawings depicting their victories, and the floor is littered with bones and discarded trinkets. The kobolds move with surprising agility through the cramped tunnels, their small forms darting between shadows as they prepare to defend their home. The sound of their draconic whispers echoes through the chambers, creating an eerie atmosphere.',
      level: 1,
      difficulty: 'Easy',
      type: 'Combat',
      enemies: [
        {
          name: 'Kobold',
          type: 'Humanoid (Kobold)',
          count: 6,
          cr: 0.125,
          abilities: [
            'Pack Tactics: Advantage on attack rolls when an ally is within 5 feet',
            'Sunlight Sensitivity: Disadvantage on attack rolls and perception checks in sunlight',
            'Dagger: Melee weapon attack, +4 to hit, 1d4+2 piercing damage',
            'Sling: Ranged weapon attack, +4 to hit, 1d4+2 bludgeoning damage'
          ],
          traits: [
            'Darkvision 60 ft.',
            'Small size',
            'Speed 30 ft.'
          ],
          alignment: 'Lawful Evil'
        }
      ],
      rewards: [
        {
          type: 'Gold',
          description: '1d6 gold pieces',
          value: '1d6'
        },
        {
          type: 'Experience',
          description: '150 XP'
        }
      ],
      location: {
        dungeon: 'Cave System',
        area: 'Main Cavern',
        environment: 'Underground'
      },
      xp: 150,
      treasure: {
        gold: 5,
        gems: [{ type: 'Small Garnet', value: 5 }],
        equipment: [
          '6 daggers',
          '6 slings',
          '30 sling bullets',
          '6 leather armor'
        ]
      }
    }
  ],
  2: [
    {
      id: 'cultist-initiation',
      name: 'Cultist Initiation',
      description: 'The abandoned temple stands as a testament to forgotten gods, its weathered stone walls covered in creeping vines and moss. Inside, the air is thick with the scent of burning incense and the low chanting of cultists. The main chamber is illuminated by flickering torchlight, casting dancing shadows across ancient murals depicting dark rituals. A group of robed figures moves in a circle around a central altar, their faces hidden beneath deep hoods. The lead cultist, a fanatic with eyes burning with zealotry, prepares to perform a dark ritual that will summon a minor fiend or undead creature. The atmosphere is heavy with anticipation and the promise of forbidden power.',
      level: 2,
      difficulty: 'Medium',
      type: 'Combat',
      enemies: [
        {
          name: 'Cultist',
          type: 'Humanoid (Any Race)',
          count: 3,
          cr: 0.5,
          abilities: [
            'Dark Devotion: Advantage on saving throws against being charmed or frightened',
            'Scimitar: Melee weapon attack, +3 to hit, 1d6+1 slashing damage',
            'Light Crossbow: Ranged weapon attack, +3 to hit, 1d8+1 piercing damage'
          ],
          traits: [
            'Medium size',
            'Speed 30 ft.'
          ],
          alignment: 'Any Evil'
        },
        {
          name: 'Cult Fanatic',
          type: 'Humanoid (Any Race)',
          count: 1,
          cr: 2,
          abilities: [
            'Dark Devotion: Advantage on saving throws against being charmed or frightened',
            'Multiattack: Makes two melee attacks',
            'Dagger: Melee weapon attack, +4 to hit, 1d4+2 piercing damage',
            'Inflict Wounds: 3d10 necrotic damage, DC 13 Constitution save for half'
          ],
          traits: [
            'Medium size',
            'Speed 30 ft.',
            'Spellcasting: 4th-level spellcaster'
          ],
          alignment: 'Any Evil'
        }
      ],
      rewards: [
        {
          type: 'Magic Item',
          description: "Cultist's Dagger",
          rarity: 'Uncommon'
        },
        {
          type: 'Experience',
          description: '450 XP'
        }
      ],
      location: {
        dungeon: 'Abandoned Temple',
        area: 'Ritual Chamber',
        environment: 'Indoor'
      },
      xp: 450,
      treasure: {
        gold: 50,
        art: [{ type: 'Silver Idol', value: 25 }],
        equipment: [
          '3 scimitars',
          '3 light crossbows',
          '30 crossbow bolts',
          '3 leather armor',
          '1 dagger',
          '1 quarterstaff'
        ],
        spellComponents: [
          'Ritual components worth 25 gp'
        ]
      }
    }
  ],
  3: [
    {
      id: 'mimic-infestation',
      name: 'Mimic Infestation',
      description: 'The abandoned wizard\'s tower stands silent and foreboding, its once-magnificent architecture now showing signs of decay. Inside, the air is stale and dust motes dance in the dim light filtering through broken windows. A pair of mimics has taken up residence, using their shapechanging abilities to transform into various pieces of furniture and magical items. The library is particularly treacherous, with bookshelves, chairs, and even the floor itself potentially being mimics in disguise. The creatures move with unnatural fluidity when they strike, their adhesive pseudopods lashing out to ensnare unsuspecting adventurers. The tower\'s former owner\'s magical experiments and research materials lie scattered about, tempting those who dare to investigate.',
      level: 3,
      difficulty: 'Hard',
      type: 'Combat',
      enemies: [
        {
          name: 'Mimic',
          type: 'Monstrosity (Shapechanger)',
          count: 2,
          cr: 2,
          abilities: [
            'Shapechanger: Can use an action to polymorph into an object or back into its true form',
            'Adhesive: Creatures that hit the mimic with a melee weapon attack must succeed on a DC 13 Strength check or become grappled',
            'False Appearance: While motionless, the mimic is indistinguishable from an ordinary object',
            'Pseudopod: Melee weapon attack, +5 to hit, 1d8+3 bludgeoning damage',
            'Bite: Melee weapon attack, +5 to hit, 1d8+3 piercing damage'
          ],
          traits: [
            'Darkvision 60 ft.',
            'Medium size',
            'Speed 15 ft.'
          ],
          alignment: 'Neutral'
        }
      ],
      rewards: [
        {
          type: 'Magic Item',
          description: "Wizard's Spellbook",
          rarity: 'Uncommon'
        },
        {
          type: 'Experience',
          description: '700 XP'
        }
      ],
      location: {
        dungeon: "Wizard's Tower",
        area: 'Library',
        environment: 'Indoor'
      },
      xp: 700,
      treasure: {
        gold: 100,
        gems: [{ type: 'Sapphire', value: 50 }],
        equipment: [
          '2 spellbooks',
          'Various alchemical components',
          'Arcane research notes'
        ]
      }
    }
  ],
  4: [
    {
      id: 'basilisk-hunt',
      name: 'Basilisk Hunt',
      description: 'The local village has been gripped by fear as a basilisk stalks the surrounding countryside. The creature\'s lair is a network of caves hidden within a rocky hillside, its entrance marked by the petrified remains of previous victims. The air inside is heavy with the scent of damp stone and the occasional sound of scales scraping against rock. The basilisk moves with deliberate grace, its eight legs carrying its massive form through the caverns. Its eyes, glowing with an unnatural light, can turn flesh to stone with a single glance. The walls of the cave are adorned with the petrified forms of various creatures, creating a macabre gallery of the basilisk\'s victims. The creature\'s presence has twisted the local wildlife, creating a dangerous ecosystem where even the plants seem to watch and wait.',
      level: 4,
      difficulty: 'Hard',
      type: 'Combat',
      enemies: [
        {
          name: 'Basilisk',
          type: 'Monstrosity',
          count: 1,
          cr: 3,
          abilities: [
            'Petrifying Gaze: When a creature starts its turn within 30 feet of the basilisk and can see it, the basilisk can force it to make a DC 12 Constitution saving throw',
            'Bite: Melee weapon attack, +5 to hit, 2d6+3 piercing damage',
            'Tail: Melee weapon attack, +5 to hit, 1d8+3 bludgeoning damage'
          ],
          traits: [
            'Darkvision 60 ft.',
            'Medium size',
            'Speed 20 ft.'
          ],
          alignment: 'Unaligned'
        }
      ],
      rewards: [
        {
          type: 'Magic Item',
          description: 'Basilisk Eye',
          rarity: 'Rare'
        },
        {
          type: 'Experience',
          description: '1,100 XP'
        }
      ],
      location: {
        dungeon: 'Cave System',
        area: 'Main Cavern',
        environment: 'Underground'
      },
      xp: 1100,
      treasure: {
        gold: 200,
        gems: [{ type: 'Emerald', value: 100 }],
        equipment: [
          'Basilisk hide (can be crafted into armor)',
          'Basilisk fangs (can be crafted into weapons)'
        ]
      }
    }
  ],
  5: [
    {
      id: 'young-dragon-lair',
      name: "Young Dragon's Lair",
      description: 'The ancient elven temple, once a place of beauty and grace, now serves as the lair of a young green dragon. The dragon has claimed the highest chamber as its own, perching on a throne of melted gold and precious stones. The air is thick with the acrid smell of poison and the constant sound of the dragon\'s scales scraping against stone as it moves. The walls are covered in the dragon\'s acidic breath marks, and the floor is littered with the remains of its meals. The dragon\'s hoard glitters in the dim light, a collection of stolen treasures and magical items. The creature\'s cunning mind is evident in the traps and obstacles it has set up throughout the temple, making it a deadly challenge for any who would dare to enter.',
      level: 5,
      difficulty: 'Deadly',
      type: 'Combat',
      enemies: [
        {
          name: 'Young Green Dragon',
          type: 'Dragon',
          count: 1,
          cr: 8,
          abilities: [
            'Amphibious: Can breathe air and water',
            'Bite: Melee weapon attack, +7 to hit, 2d10+4 piercing damage plus 1d6 poison damage',
            'Claw: Melee weapon attack, +7 to hit, 2d6+4 slashing damage',
            'Tail: Melee weapon attack, +7 to hit, 1d8+4 bludgeoning damage',
            'Poison Breath: 30-foot cone, 4d6 poison damage, DC 15 Constitution save for half',
            'Legendary Resistance: Can succeed on 3 saving throws per day'
          ],
          traits: [
            'Darkvision 60 ft.',
            'Blindsight 30 ft.',
            'Large size',
            'Speed 40 ft., fly 80 ft., swim 40 ft.'
          ],
          alignment: 'Lawful Evil',
          legendaryActions: [
            'Detect: Makes a Wisdom (Perception) check',
            'Tail Attack: Melee weapon attack, +7 to hit, 1d8+4 bludgeoning damage',
            'Wing Attack: Each creature within 10 feet must make a DC 15 Dexterity save or take 2d6+4 bludgeoning damage'
          ]
        }
      ],
      rewards: [
        {
          type: 'Magic Item',
          description: "Dragon's Hoard",
          rarity: 'Rare'
        },
        {
          type: 'Experience',
          description: '3,900 XP'
        }
      ],
      location: {
        dungeon: 'Ancient Elven Temple',
        area: 'Main Chamber',
        environment: 'Indoor'
      },
      xp: 3900,
      treasure: {
        gold: 1000,
        gems: [{ type: 'Diamond', value: 500 }],
        art: [{ type: 'Golden Statue', value: 750 }],
        magicItems: [{ name: 'Dragon Scale Mail', rarity: 'Rare' }],
        equipment: [
          'Dragon scales (can be crafted into armor)',
          'Dragon teeth (can be crafted into weapons)'
        ]
      }
    }
  ],
  6: [
    {
      id: 'mind-flayer-colony',
      name: 'Mind Flayer Colony',
      description: 'Deep in the Underdark, a small mind flayer colony has established itself in a network of natural caverns. The air is thick with the psychic energy of the mind flayers, creating a constant pressure against the minds of those who enter. The walls are covered in strange, pulsing growths that seem to respond to the mind flayers\' thoughts. The colony is organized around a central chamber where the mind flayers conduct their experiments on captured humanoids. The sound of mental communication fills the air, a constant whisper of alien thoughts. Intellect devourers scuttle through the shadows, their presence felt more than seen, as they hunt for new hosts to inhabit. The colony\'s influence extends beyond its physical boundaries, creating a zone of mental distortion that can drive weaker minds to madness.',
      level: 6,
      difficulty: 'Hard',
      type: 'Combat',
      enemies: [
        {
          name: 'Mind Flayer',
          type: 'Aberration',
          count: 1,
          cr: 7,
          abilities: [
            'Mind Blast: 60-foot cone, 3d6 psychic damage, DC 15 Intelligence save for half',
            'Extract Brain: Melee weapon attack, +7 to hit, 2d10+4 piercing damage',
            'Tentacles: Melee weapon attack, +7 to hit, 2d10+4 psychic damage',
            'Innate Spellcasting: Can cast detect thoughts, levitate, and plane shift',
            'Magic Resistance: Advantage on saving throws against spells and magical effects'
          ],
          traits: [
            'Darkvision 60 ft.',
            'Medium size',
            'Speed 30 ft.'
          ],
          alignment: 'Lawful Evil',
          resistances: ['Psychic'],
          immunities: ['Charmed', 'Frightened']
        },
        {
          name: 'Intellect Devourer',
          type: 'Aberration',
          count: 2,
          cr: 2,
          abilities: [
            'Detect Sentience: Can sense the presence of creatures with Intelligence 3 or higher within 300 feet',
            'Devour Intellect: Melee weapon attack, +4 to hit, 2d10 psychic damage',
            'Body Thief: Can take over a humanoid body',
            'Magic Resistance: Advantage on saving throws against spells and magical effects'
          ],
          traits: [
            'Darkvision 60 ft.',
            'Tiny size',
            'Speed 40 ft.'
          ],
          alignment: 'Lawful Evil',
          resistances: ['Bludgeoning', 'Piercing', 'Slashing'],
          immunities: ['Blinded', 'Deafened', 'Frightened']
        }
      ],
      rewards: [
        {
          type: 'Magic Item',
          description: 'Mind Flayer Brain',
          rarity: 'Rare'
        },
        {
          type: 'Experience',
          description: '2,900 XP'
        }
      ],
      location: {
        dungeon: 'Underdark Caverns',
        area: 'Mind Flayer Colony',
        environment: 'Underground'
      },
      xp: 2900,
      treasure: {
        gold: 500,
        gems: [{ type: 'Black Pearl', value: 250 }],
        magicItems: [{ name: 'Ring of Mind Shielding', rarity: 'Uncommon' }],
        equipment: [
          'Mind flayer tentacles (can be used as spell components)',
          'Psionic crystals (can be used for crafting)'
        ]
      }
    }
  ],
  7: [
    {
      id: 'beholder-lair',
      name: "Beholder's Lair",
      description: 'The ancient dwarven stronghold has been transformed into the lair of a beholder, its once-magnificent halls now twisted by the creature\'s paranoia and magical influence. The air crackles with magical energy, and the walls are covered in the beholder\'s eye ray marks. The central chamber is dominated by the beholder\'s floating form, surrounded by its vast hoard of magical items and treasures. The creature\'s many eyes constantly scan its domain, each one capable of unleashing a different magical effect. The beholder\'s paranoia has led it to create a complex network of traps and magical wards, making the stronghold a deadly maze for intruders. The sound of the beholder\'s constant muttering fills the air, as it plots and schemes against imagined threats.',
      level: 7,
      difficulty: 'Deadly',
      type: 'Combat',
      enemies: [
        {
          name: 'Beholder',
          type: 'Aberration',
          count: 1,
          cr: 13,
          abilities: [
            'Antimagic Cone: 150-foot cone of antimagic',
            'Eye Rays: Each eye can cast a different spell-like effect',
            'Floating: Hovers 20 feet above the ground',
            'All-Around Vision: Can\'t be surprised',
            'Legendary Resistance: Can succeed on 3 saving throws per day'
          ],
          traits: [
            'Darkvision 120 ft.',
            'Large size',
            'Speed 0 ft., fly 20 ft.'
          ],
          alignment: 'Lawful Evil',
          legendaryActions: [
            'Eye Ray: Uses one random eye ray',
            'Eye Ray: Uses one random eye ray',
            'Eye Ray: Uses one random eye ray'
          ],
          eyeRays: [
            'Charm Ray: DC 16 Wisdom save or be charmed for 1 hour',
            'Paralyzing Ray: DC 16 Constitution save or be paralyzed for 1 minute',
            'Fear Ray: DC 16 Wisdom save or be frightened for 1 minute',
            'Slowing Ray: DC 16 Dexterity save or be slowed for 1 minute',
            'Enervation Ray: 3d8 necrotic damage',
            'Telekinetic Ray: DC 16 Strength save or be moved 30 feet',
            'Sleep Ray: DC 16 Wisdom save or fall unconscious for 1 minute',
            'Petrification Ray: DC 16 Dexterity save or begin turning to stone',
            'Disintegration Ray: 10d8 force damage, DC 16 Dexterity save for half',
            'Death Ray: 3d6 necrotic damage, DC 16 Constitution save or die'
          ]
        }
      ],
      rewards: [
        {
          type: 'Magic Item',
          description: "Beholder's Eye",
          rarity: 'Very Rare'
        },
        {
          type: 'Experience',
          description: '10,000 XP'
        }
      ],
      location: {
        dungeon: 'Dwarven Stronghold',
        area: 'Throne Room',
        environment: 'Underground'
      },
      xp: 10000,
      treasure: {
        gold: 2000,
        gems: [{ type: 'Star Ruby', value: 1000 }],
        art: [{ type: 'Dwarven Crown', value: 1500 }],
        magicItems: [{ name: "Beholder's Eye Staff", rarity: 'Very Rare' }],
        equipment: [
          'Beholder eye stalks (can be used as spell components)',
          'Dwarven artifacts',
          'Ancient scrolls'
        ]
      }
    }
  ],
  8: [
    {
      id: 'lich-crypt',
      name: "Lich's Crypt",
      description: 'The ancient crypt stands as a monument to death and undeath, its walls covered in necromantic runes that glow with an eerie light. The air is thick with the stench of decay and the constant sound of the lich\'s phylactery pulsing with dark energy. The main chamber is dominated by the lich\'s throne, crafted from the bones of its victims. The lich itself is a skeletal figure wrapped in tattered robes, its eyes burning with an unnatural light. The crypt is filled with undead minions, their empty eyes watching for any sign of life. The walls are lined with shelves containing the lich\'s collection of forbidden knowledge and magical items. The atmosphere is heavy with the weight of centuries of evil, and the very air seems to drain the life from those who enter.',
      level: 8,
      difficulty: 'Deadly',
      type: 'Combat',
      enemies: [
        {
          name: 'Lich',
          type: 'Undead',
          count: 1,
          cr: 21,
          abilities: [
            'Legendary Resistance: Can succeed on 3 saving throws per day',
            'Rejuvenation: Returns to unlife if phylactery is intact',
            'Turn Resistance: Advantage on saving throws against turn undead',
            'Paralyzing Touch: Melee spell attack, +12 to hit, 3d6 cold damage and DC 18 Constitution save or be paralyzed',
            'Frightening Gaze: DC 18 Wisdom save or be frightened for 1 minute',
            'Disrupt Life: 3d6 necrotic damage to all living creatures within 20 feet',
            'Spellcasting: 18th-level spellcaster'
          ],
          traits: [
            'Darkvision 120 ft.',
            'Medium size',
            'Speed 30 ft.'
          ],
          alignment: 'Any Evil',
          resistances: ['Cold', 'Lightning', 'Necrotic'],
          immunities: ['Poison', 'Psychic', 'Bludgeoning', 'Piercing', 'Slashing'],
          legendaryActions: [
            'Cantrip: Casts a cantrip',
            'Paralyzing Touch: Makes a paralyzing touch attack',
            'Frightening Gaze: Uses frightening gaze',
            'Disrupt Life: Uses disrupt life'
          ]
        },
        {
          name: 'Skeleton',
          type: 'Undead',
          count: 4,
          cr: 0.25,
          abilities: [
            'Shortsword: Melee weapon attack, +4 to hit, 1d6+2 piercing damage',
            'Shortbow: Ranged weapon attack, +4 to hit, 1d6+2 piercing damage'
          ],
          traits: [
            'Darkvision 60 ft.',
            'Medium size',
            'Speed 30 ft.'
          ],
          alignment: 'Lawful Evil',
          vulnerabilities: ['Bludgeoning']
        }
      ],
      rewards: [
        {
          type: 'Magic Item',
          description: "Lich's Phylactery",
          rarity: 'Legendary'
        },
        {
          type: 'Experience',
          description: '33,000 XP'
        }
      ],
      location: {
        dungeon: 'Ancient Crypt',
        area: "Lich's Chamber",
        environment: 'Underground'
      },
      xp: 33000,
      treasure: {
        gold: 5000,
        gems: [{ type: 'Soul Gem', value: 2500 }],
        art: [{ type: 'Ancient Tome', value: 3000 }],
        magicItems: [{ name: 'Staff of Power', rarity: 'Very Rare' }],
        equipment: [
          'Lich\'s spellbook',
          'Necromantic components',
          'Ancient scrolls'
        ],
        spellComponents: [
          'Rare spell components worth 1000 gp'
        ]
      }
    }
  ],
  9: [
    {
      id: 'ancient-dragon-lair',
      name: "Ancient Dragon's Lair",
      description: 'The mountain peak has been claimed by an ancient red dragon, its massive form casting a shadow over the surrounding landscape. The dragon\'s lair is a vast cavern system, its walls covered in the creature\'s fiery breath marks. The air is thick with the smell of sulfur and the constant sound of the dragon\'s scales scraping against stone. The main chamber is dominated by the dragon\'s massive form, surrounded by its vast hoard of treasures. The dragon\'s presence has twisted the local environment, creating a zone of extreme heat and magical energy. The creature\'s cunning mind is evident in the traps and obstacles it has set up throughout the lair, making it a deadly challenge for any who would dare to enter. The sound of the dragon\'s constant muttering fills the air, as it plots and schemes against its enemies.',
      level: 9,
      difficulty: 'Deadly',
      type: 'Combat',
      enemies: [
        {
          name: 'Ancient Red Dragon',
          type: 'Dragon',
          count: 1,
          cr: 24,
          abilities: [
            'Legendary Resistance: Can succeed on 3 saving throws per day',
            'Fire Breath: 90-foot cone, 26d6 fire damage, DC 24 Dexterity save for half',
            'Bite: Melee weapon attack, +17 to hit, 2d10+10 piercing damage plus 2d6 fire damage',
            'Claw: Melee weapon attack, +17 to hit, 2d6+10 slashing damage',
            'Tail: Melee weapon attack, +17 to hit, 2d8+10 bludgeoning damage',
            'Wing Attack: Each creature within 15 feet must make a DC 25 Dexterity save or take 2d6+10 bludgeoning damage',
            'Frightful Presence: DC 21 Wisdom save or be frightened for 1 minute'
          ],
          traits: [
            'Blindsight 60 ft.',
            'Darkvision 120 ft.',
            'Huge size',
            'Speed 40 ft., fly 80 ft.'
          ],
          alignment: 'Chaotic Evil',
          resistances: ['Fire'],
          immunities: ['Fire'],
          legendaryActions: [
            'Detect: Makes a Wisdom (Perception) check',
            'Tail Attack: Makes a tail attack',
            'Wing Attack: Uses wing attack',
            'Fire Breath: Uses fire breath'
          ]
        }
      ],
      rewards: [
        {
          type: 'Magic Item',
          description: "Dragon's Hoard",
          rarity: 'Legendary'
        },
        {
          type: 'Experience',
          description: '62,000 XP'
        }
      ],
      location: {
        dungeon: 'Mountain Peak',
        area: "Dragon's Lair",
        environment: 'Mountain'
      },
      xp: 62000,
      treasure: {
        gold: 10000,
        gems: [{ type: "Dragon's Heart", value: 5000 }],
        art: [{ type: "Dragon's Crown", value: 7500 }],
        magicItems: [
          { name: 'Dragon Slayer Sword', rarity: 'Rare' },
          { name: 'Dragon Scale Armor', rarity: 'Very Rare' }
        ],
        equipment: [
          'Dragon scales (can be crafted into armor)',
          'Dragon teeth (can be crafted into weapons)',
          'Dragon bones (can be used for crafting)'
        ]
      }
    }
  ],
  10: [
    {
      id: 'tarrasque-awakening',
      name: 'Tarrasque Awakening',
      description: 'The earth trembles as the legendary tarrasque begins to stir from its long slumber. The creature\'s massive form lies beneath the surface, its presence causing the ground to crack and shift. The air is thick with the smell of earth and the constant sound of the tarrasque\'s breathing. The creature\'s awakening has caused widespread panic, as its massive form threatens to destroy everything in its path. The tarrasque\'s presence has twisted the local environment, creating a zone of extreme danger and magical energy. The creature\'s massive form is covered in thick, armored plates, making it nearly invulnerable to conventional attacks. The sound of the tarrasque\'s constant growling fills the air, as it prepares to emerge from its long slumber.',
      level: 10,
      difficulty: 'Deadly',
      type: 'Combat',
      enemies: [
        {
          name: 'Tarrasque',
          type: 'Monstrosity',
          count: 1,
          cr: 30,
          abilities: [
            'Legendary Resistance: Can succeed on 3 saving throws per day',
            'Magic Resistance: Advantage on saving throws against spells and magical effects',
            'Reflective Carapace: Any time the tarrasque is targeted by a magic missile, line spell, or spell requiring a ranged attack roll, roll a d6. On a 1-4, the tarrasque is unaffected',
            'Siege Monster: Double damage to objects and structures',
            'Bite: Melee weapon attack, +19 to hit, 4d12+10 piercing damage',
            'Claw: Melee weapon attack, +19 to hit, 4d8+10 slashing damage',
            'Horn: Melee weapon attack, +19 to hit, 4d10+10 piercing damage',
            'Tail: Melee weapon attack, +19 to hit, 4d6+10 bludgeoning damage',
            'Swallow: Melee weapon attack, +19 to hit, 4d12+10 piercing damage'
          ],
          traits: [
            'Blindsight 120 ft.',
            'Darkvision 120 ft.',
            'Gargantuan size',
            'Speed 40 ft.'
          ],
          alignment: 'Unaligned',
          resistances: ['Fire', 'Lightning', 'Cold'],
          immunities: ['Poison', 'Psychic', 'Bludgeoning', 'Piercing', 'Slashing'],
          legendaryActions: [
            'Attack: Makes one attack',
            'Move: Moves up to half its speed',
            'Chomp: Makes one bite attack'
          ]
        }
      ],
      rewards: [
        {
          type: 'Magic Item',
          description: 'Tarrasque Scale',
          rarity: 'Legendary'
        },
        {
          type: 'Experience',
          description: '155,000 XP'
        }
      ],
      location: {
        dungeon: 'Ancient Ruins',
        area: "Tarrasque's Chamber",
        environment: 'Underground'
      },
      xp: 155000,
      treasure: {
        gold: 20000,
        gems: [{ type: 'Tarrasque Heart', value: 10000 }],
        art: [{ type: 'Ancient Tablet', value: 15000 }],
        magicItems: [{ name: 'Tarrasque Scale Armor', rarity: 'Legendary' }],
        equipment: [
          'Tarrasque scales (can be crafted into armor)',
          'Tarrasque claws (can be crafted into weapons)',
          'Tarrasque bones (can be used for crafting)'
        ]
      }
    }
  ],
  11: [
    {
      id: 'archdevil-court',
      name: "Archdevil's Court",
      description: 'The Nine Hells are a realm of eternal torment and suffering, ruled by powerful archdevils. The court is a vast hall of black marble and gold, its walls covered in the screams of the damned. The air is thick with the smell of sulfur and the constant sound of infernal machinery. The main chamber is dominated by the archdevil\'s throne, crafted from the souls of its victims. The archdevil itself is a massive figure of pure evil, its form wreathed in flames. The court is filled with lesser devils, their forms twisted by centuries of evil. The walls are lined with shelves containing the archdevil\'s collection of forbidden knowledge and magical items. The atmosphere is heavy with the weight of eternal damnation, and the very air seems to burn with infernal energy.',
      level: 11,
      difficulty: 'Deadly',
      type: 'Combat',
      enemies: [
        {
          name: 'Archdevil',
          type: 'Fiend',
          count: 1,
          cr: 20,
          abilities: [
            'Legendary Resistance: Can succeed on 3 saving throws per day',
            'Magic Resistance: Advantage on saving throws against spells and magical effects',
            'Infernal Command: Can command any devil within 120 feet',
            'Hellish Weapons: All weapon attacks are magical and deal an extra 2d6 fire damage',
            'Spellcasting: 18th-level spellcaster',
            'Divine Awareness: Knows if it hears a lie'
          ],
          traits: [
            'Darkvision 120 ft.',
            'Large size',
            'Speed 30 ft., fly 60 ft.'
          ],
          alignment: 'Lawful Evil',
          resistances: ['Cold', 'Fire', 'Lightning', 'Poison'],
          immunities: ['Poison', 'Bludgeoning', 'Piercing', 'Slashing'],
          legendaryActions: [
            'Infernal Command: Commands a devil to attack',
            'Teleport: Teleports up to 120 feet',
            'Hellish Rebuke: Casts hellish rebuke'
          ]
        },
        {
          name: 'Pit Fiend',
          type: 'Fiend',
          count: 2,
          cr: 20,
          abilities: [
            'Magic Resistance: Advantage on saving throws against spells and magical effects',
            'Magic Weapons: All weapon attacks are magical',
            'Innate Spellcasting: Can cast fireball, wall of fire, and power word stun',
            'Multiattack: Makes four attacks'
          ],
          traits: [
            'Darkvision 120 ft.',
            'Large size',
            'Speed 30 ft., fly 60 ft.'
          ],
          alignment: 'Lawful Evil',
          resistances: ['Cold', 'Fire', 'Lightning', 'Poison'],
          immunities: ['Poison', 'Bludgeoning', 'Piercing', 'Slashing']
        }
      ],
      rewards: [
        {
          type: 'Magic Item',
          description: 'Infernal Contract',
          rarity: 'Legendary'
        },
        {
          type: 'Experience',
          description: '50,000 XP'
        }
      ],
      location: {
        dungeon: 'Nine Hells',
        area: 'Infernal Court',
        environment: 'Plane of Fire'
      },
      xp: 50000,
      treasure: {
        gold: 25000,
        gems: [{ type: 'Soul Gem', value: 15000 }],
        art: [{ type: 'Infernal Crown', value: 20000 }],
        magicItems: [{ name: 'Infernal Blade', rarity: 'Legendary' }],
        equipment: [
          'Infernal armor',
          'Hell-forged weapons',
          'Soul coins'
        ]
      }
    }
  ],
  12: [
    {
      id: 'elder-brain-lair',
      name: 'Elder Brain Lair',
      description: 'Deep in the Underdark, an elder brain leads a mind flayer colony in a vast network of caverns. The air is thick with the psychic energy of the elder brain, creating a constant pressure against the minds of those who enter. The walls are covered in strange, pulsing growths that seem to respond to the elder brain\'s thoughts. The colony is organized around a central chamber where the elder brain floats in a pool of brine, its massive form pulsing with psychic energy. The sound of mental communication fills the air, a constant whisper of alien thoughts. Mind flayers move through the shadows, their presence felt more than seen, as they carry out the elder brain\'s will. The colony\'s influence extends beyond its physical boundaries, creating a zone of mental distortion that can drive weaker minds to madness.',
      level: 12,
      difficulty: 'Deadly',
      type: 'Combat',
      enemies: [
        {
          name: 'Elder Brain',
          type: 'Aberration',
          count: 1,
          cr: 14,
          abilities: [
            'Legendary Resistance: Can succeed on 3 saving throws per day',
            'Magic Resistance: Advantage on saving throws against spells and magical effects',
            'Psychic Link: Can communicate telepathically with any creature within 5 miles',
            'Mind Blast: 60-foot cone, 4d8 psychic damage, DC 16 Intelligence save for half',
            'Tentacles: Melee weapon attack, +7 to hit, 2d10+4 psychic damage',
            'Extract Brain: Melee weapon attack, +7 to hit, 2d10+4 piercing damage'
          ],
          traits: [
            'Darkvision 60 ft.',
            'Large size',
            'Speed 10 ft., swim 30 ft.'
          ],
          alignment: 'Lawful Evil',
          resistances: ['Psychic'],
          immunities: ['Charmed', 'Frightened'],
          legendaryActions: [
            'Detect: Makes a Wisdom (Perception) check',
            'Psychic Link: Uses psychic link',
            'Mind Blast: Uses mind blast'
          ]
        },
        {
          name: 'Mind Flayer',
          type: 'Aberration',
          count: 4,
          cr: 7,
          abilities: [
            'Mind Blast: 60-foot cone, 3d6 psychic damage, DC 15 Intelligence save for half',
            'Extract Brain: Melee weapon attack, +7 to hit, 2d10+4 piercing damage',
            'Tentacles: Melee weapon attack, +7 to hit, 2d10+4 psychic damage',
            'Innate Spellcasting: Can cast detect thoughts, levitate, and plane shift',
            'Magic Resistance: Advantage on saving throws against spells and magical effects'
          ],
          traits: [
            'Darkvision 60 ft.',
            'Medium size',
            'Speed 30 ft.'
          ],
          alignment: 'Lawful Evil',
          resistances: ['Psychic'],
          immunities: ['Charmed', 'Frightened']
        }
      ],
      rewards: [
        {
          type: 'Magic Item',
          description: 'Elder Brain Tissue',
          rarity: 'Legendary'
        },
        {
          type: 'Experience',
          description: '45,000 XP'
        }
      ],
      location: {
        dungeon: 'Underdark',
        area: 'Elder Brain Chamber',
        environment: 'Underground'
      },
      xp: 45000,
      treasure: {
        gold: 30000,
        gems: [{ type: 'Mind Crystal', value: 20000 }],
        art: [{ type: 'Psionic Artifact', value: 25000 }],
        magicItems: [{ name: 'Mind Flayer Crown', rarity: 'Legendary' }],
        equipment: [
          'Mind flayer tentacles',
          'Psionic crystals',
          'Ancient scrolls'
        ]
      }
    }
  ],
  13: [
    {
      id: 'kraken-domain',
      name: "Kraken's Domain",
      description: 'The sunken city lies beneath the waves, its once-magnificent architecture now covered in coral and seaweed. The water is thick with the presence of the kraken, its massive form casting a shadow over the ruins. The creature\'s lair is a vast network of underwater caverns, its walls covered in the kraken\'s tentacle marks. The main chamber is dominated by the kraken\'s massive form, surrounded by its collection of sunken treasures. The kraken\'s presence has twisted the local environment, creating a zone of extreme danger and magical energy. The creature\'s massive tentacles can crush ships and drag them beneath the waves. The sound of the kraken\'s constant growling fills the water, as it prepares to defend its domain.',
      level: 13,
      difficulty: 'Deadly',
      type: 'Combat',
      enemies: [
        {
          name: 'Kraken',
          type: 'Monstrosity',
          count: 1,
          cr: 23,
          abilities: [
            'Legendary Resistance: Can succeed on 3 saving throws per day',
            'Amphibious: Can breathe air and water',
            'Freedom of Movement: Can\'t be restrained or paralyzed',
            'Siege Monster: Double damage to objects and structures',
            'Bite: Melee weapon attack, +7 to hit, 3d6+5 piercing damage',
            'Tentacles: Melee weapon attack, +7 to hit, 3d6+5 bludgeoning damage',
            'Lightning Storm: 120-foot radius, 4d10 lightning damage, DC 23 Dexterity save for half'
          ],
          traits: [
            'Darkvision 120 ft.',
            'Gargantuan size',
            'Speed 20 ft., swim 60 ft.'
          ],
          alignment: 'Chaotic Evil',
          resistances: ['Lightning', 'Thunder'],
          immunities: ['Lightning', 'Thunder'],
          legendaryActions: [
            'Tentacle Attack: Makes one tentacle attack',
            'Fling: Throws a creature up to 60 feet',
            'Lightning Storm: Creates a lightning storm'
          ]
        }
      ],
      rewards: [
        {
          type: 'Magic Item',
          description: 'Kraken Tentacle',
          rarity: 'Legendary'
        },
        {
          type: 'Experience',
          description: '50,000 XP'
        }
      ],
      location: {
        dungeon: 'Sunken City',
        area: 'Central Plaza',
        environment: 'Underwater'
      },
      xp: 50000,
      treasure: {
        gold: 40000,
        gems: [{ type: 'Pearl of the Deep', value: 30000 }],
        art: [{ type: 'Ancient Statue', value: 35000 }],
        magicItems: [{ name: 'Kraken Scale Armor', rarity: 'Legendary' }],
        equipment: [
          'Kraken tentacles',
          'Kraken scales',
          'Ancient artifacts'
        ]
      }
    }
  ],
  14: [
    {
      id: 'solar-trial',
      name: "Solar's Trial",
      description: 'The celestial realm is a place of pure light and divine energy, where a solar angel tests the worthiness of mortals. The trial chamber is a vast hall of white marble and gold, its walls covered in divine symbols. The air is thick with the presence of the solar, its massive form wreathed in holy light. The main chamber is dominated by the solar\'s throne, crafted from pure light. The solar itself is a massive figure of pure good, its form radiating divine energy. The chamber is filled with lesser celestials, their forms shining with holy light. The walls are lined with shelves containing the solar\'s collection of divine knowledge and magical items. The atmosphere is heavy with the weight of divine judgment, and the very air seems to burn with holy energy.',
      level: 14,
      difficulty: 'Deadly',
      type: 'Combat',
      enemies: [
        {
          name: 'Solar',
          type: 'Celestial',
          count: 1,
          cr: 21,
          abilities: [
            'Legendary Resistance: Can succeed on 3 saving throws per day',
            'Angelic Weapons: All weapon attacks are magical and deal an extra 6d8 radiant damage',
            'Divine Awareness: Knows if it hears a lie',
            'Innate Spellcasting: Can cast commune, detect evil and good, and plane shift',
            'Magic Resistance: Advantage on saving throws against spells and magical effects'
          ],
          traits: [
            'Darkvision 120 ft.',
            'Large size',
            'Speed 50 ft., fly 150 ft.'
          ],
          alignment: 'Lawful Good',
          resistances: ['Radiant', 'Bludgeoning', 'Piercing', 'Slashing'],
          immunities: ['Charmed', 'Exhaustion', 'Frightened'],
          legendaryActions: [
            'Teleport: Teleports up to 120 feet',
            'Searing Burst: 15-foot radius, 4d6 radiant damage',
            'Blinding Gaze: DC 15 Constitution save or be blinded'
          ]
        }
      ],
      rewards: [
        {
          type: 'Magic Item',
          description: "Solar's Feather",
          rarity: 'Legendary'
        },
        {
          type: 'Experience',
          description: '33,000 XP'
        }
      ],
      location: {
        dungeon: 'Celestial Realm',
        area: 'Trial Chamber',
        environment: 'Plane of Air'
      },
      xp: 33000,
      treasure: {
        gold: 50000,
        gems: [{ type: 'Celestial Diamond', value: 40000 }],
        art: [{ type: 'Celestial Harp', value: 45000 }],
        magicItems: [{ name: 'Holy Avenger', rarity: 'Legendary' }],
        equipment: [
          'Celestial armor',
          'Angelic weapons',
          'Divine scrolls'
        ]
      }
    }
  ],
  15: [
    {
      id: 'elder-brain-dragon',
      name: 'Elder Brain Dragon',
      description: 'The mind flayer colony has created a terrifying hybrid of an elder brain and a dragon, combining the psionic powers of the elder brain with the physical might of a dragon. The creature\'s lair is a vast network of caverns, its walls covered in the hybrid\'s psychic and physical marks. The air is thick with the psychic energy of the elder brain dragon, creating a constant pressure against the minds of those who enter. The main chamber is dominated by the hybrid\'s massive form, surrounded by its collection of treasures and magical items. The creature\'s presence has twisted the local environment, creating a zone of extreme danger and magical energy. The sound of the hybrid\'s constant mental communication fills the air, as it plots and schemes against its enemies.',
      level: 15,
      difficulty: 'Deadly',
      type: 'Combat',
      enemies: [
        {
          name: 'Elder Brain Dragon',
          type: 'Aberration',
          count: 1,
          cr: 22,
          abilities: [
            'Legendary Resistance: Can succeed on 3 saving throws per day',
            'Magic Resistance: Advantage on saving throws against spells and magical effects',
            'Psychic Link: Can communicate telepathically with any creature within 5 miles',
            'Mind Blast: 60-foot cone, 4d8 psychic damage, DC 16 Intelligence save for half',
            'Bite: Melee weapon attack, +12 to hit, 2d10+6 piercing damage plus 2d6 psychic damage',
            'Claw: Melee weapon attack, +12 to hit, 2d6+6 slashing damage',
            'Tail: Melee weapon attack, +12 to hit, 2d8+6 bludgeoning damage',
            'Wing Attack: Each creature within 10 feet must make a DC 20 Dexterity save or take 2d6+6 bludgeoning damage',
            'Psychic Breath: 60-foot cone, 4d8 psychic damage, DC 20 Intelligence save for half'
          ],
          traits: [
            'Blindsight 60 ft.',
            'Darkvision 120 ft.',
            'Huge size',
            'Speed 40 ft., fly 80 ft.'
          ],
          alignment: 'Lawful Evil',
          resistances: ['Psychic', 'Fire', 'Lightning'],
          immunities: ['Charmed', 'Frightened'],
          legendaryActions: [
            'Detect: Makes a Wisdom (Perception) check',
            'Psychic Link: Uses psychic link',
            'Mind Blast: Uses mind blast',
            'Wing Attack: Uses wing attack'
          ]
        },
        {
          name: 'Mind Flayer',
          type: 'Aberration',
          count: 6,
          cr: 7,
          abilities: [
            'Mind Blast: 60-foot cone, 3d6 psychic damage, DC 15 Intelligence save for half',
            'Extract Brain: Melee weapon attack, +7 to hit, 2d10+4 piercing damage',
            'Tentacles: Melee weapon attack, +7 to hit, 2d10+4 psychic damage',
            'Innate Spellcasting: Can cast detect thoughts, levitate, and plane shift',
            'Magic Resistance: Advantage on saving throws against spells and magical effects'
          ],
          traits: [
            'Darkvision 60 ft.',
            'Medium size',
            'Speed 30 ft.'
          ],
          alignment: 'Lawful Evil',
          resistances: ['Psychic'],
          immunities: ['Charmed', 'Frightened']
        }
      ],
      rewards: [
        {
          type: 'Magic Item',
          description: 'Elder Brain Dragon Scale',
          rarity: 'Legendary'
        },
        {
          type: 'Experience',
          description: '41,000 XP'
        }
      ],
      location: {
        dungeon: 'Underdark',
        area: "Dragon's Lair",
        environment: 'Underground'
      },
      xp: 41000,
      treasure: {
        gold: 60000,
        gems: [{ type: 'Dragon Mind Crystal', value: 50000 }],
        art: [{ type: 'Psionic Artifact', value: 55000 }],
        magicItems: [
          { name: 'Mind Flayer Crown', rarity: 'Legendary' },
          { name: 'Dragon Scale Armor', rarity: 'Very Rare' }
        ],
        equipment: [
          'Dragon scales',
          'Mind flayer tentacles',
          'Psionic crystals'
        ]
      }
    }
  ],
  16: [
    {
      id: 'orcus-throne',
      name: "Orcus's Throne Room",
      description: 'The Abyss is a realm of pure chaos and evil, ruled by the Demon Prince of Undeath, Orcus. The throne room is a vast hall of black marble and bone, its walls covered in the screams of the damned. The air is thick with the smell of death and the constant sound of infernal machinery. The main chamber is dominated by Orcus\'s throne, crafted from the bones of his victims. Orcus himself is a massive figure of pure evil, his form wreathed in necrotic energy. The court is filled with undead minions and demonic servants, their forms twisted by centuries of evil. The walls are lined with shelves containing Orcus\'s collection of forbidden knowledge and magical items. The atmosphere is heavy with the weight of eternal damnation, and the very air seems to burn with necrotic energy.',
      level: 16,
      difficulty: 'Deadly',
      type: 'Combat',
      enemies: [
        {
          name: 'Orcus',
          type: 'Fiend',
          count: 1,
          cr: 26,
          abilities: [
            'Legendary Resistance: Can succeed on 3 saving throws per day',
            'Magic Resistance: Advantage on saving throws against spells and magical effects',
            'Infernal Command: Can command any fiend within 120 feet',
            'Wand of Orcus: Melee weapon attack, +19 to hit, 3d8+9 necrotic damage',
            'Necrotic Breath: 60-foot cone, 8d8 necrotic damage, DC 23 Constitution save for half',
            'Spellcasting: 20th-level spellcaster'
          ],
          traits: [
            'Darkvision 120 ft.',
            'Huge size',
            'Speed 40 ft., fly 40 ft.'
          ],
          alignment: 'Chaotic Evil',
          resistances: ['Cold', 'Fire', 'Lightning', 'Poison'],
          immunities: ['Necrotic', 'Poison', 'Bludgeoning', 'Piercing', 'Slashing'],
          legendaryActions: [
            'Attack: Makes one attack',
            'Teleport: Teleports up to 120 feet',
            'Summon Undead: Summons 1d4 undead creatures'
          ]
        },
        {
          name: 'Death Knight',
          type: 'Undead',
          count: 4,
          cr: 17,
          abilities: [
            'Magic Resistance: Advantage on saving throws against spells and magical effects',
            'Magic Weapons: All weapon attacks are magical',
            'Hellfire Orb: Ranged spell attack, +9 to hit, 4d6 fire damage',
            'Parry: Adds 6 to AC against one attack',
            'Multiattack: Makes three attacks'
          ],
          traits: [
            'Darkvision 60 ft.',
            'Medium size',
            'Speed 30 ft.'
          ],
          alignment: 'Chaotic Evil',
          resistances: ['Cold', 'Fire', 'Lightning', 'Poison'],
          immunities: ['Necrotic', 'Poison']
        }
      ],
      rewards: [
        {
          type: 'Magic Item',
          description: "Wand of Orcus",
          rarity: 'Legendary'
        },
        {
          type: 'Experience',
          description: '90,000 XP'
        }
      ],
      location: {
        dungeon: 'Abyss',
        area: "Orcus's Throne Room",
        environment: 'Plane of Chaos'
      },
      xp: 90000,
      treasure: {
        gold: 100000,
        gems: [{ type: 'Soul Gem', value: 75000 }],
        art: [{ type: 'Demon Crown', value: 85000 }],
        magicItems: [
          { name: "Orcus's Wand", rarity: 'Legendary' },
          { name: 'Death Knight Armor', rarity: 'Legendary' }
        ],
        equipment: [
          'Demon weapons',
          'Undead artifacts',
          'Soul gems'
        ]
      }
    }
  ],
  17: [
    {
      id: 'tiamat-lair',
      name: "Tiamat's Lair",
      description: 'The Dragon Temple is a vast hall of gold and precious stones, its walls covered in the symbols of the five dragon types. The air is thick with the presence of Tiamat, the Queen of Dragons, her massive form casting a shadow over the temple. The main chamber is dominated by Tiamat\'s throne, crafted from the scales of her victims. Tiamat herself is a massive figure of pure evil, her five heads each representing a different type of dragon. The temple is filled with dragon minions, their forms shining with draconic energy. The walls are lined with shelves containing Tiamat\'s collection of draconic knowledge and magical items. The atmosphere is heavy with the weight of draconic power, and the very air seems to burn with elemental energy.',
      level: 17,
      difficulty: 'Deadly',
      type: 'Combat',
      enemies: [
        {
          name: 'Tiamat',
          type: 'Dragon',
          count: 1,
          cr: 30,
          abilities: [
            'Legendary Resistance: Can succeed on 3 saving throws per day',
            'Magic Resistance: Advantage on saving throws against spells and magical effects',
            'Multiattack: Makes five attacks',
            'Bite: Melee weapon attack, +19 to hit, 2d10+10 piercing damage plus 2d6 fire damage',
            'Claw: Melee weapon attack, +19 to hit, 2d6+10 slashing damage',
            'Tail: Melee weapon attack, +19 to hit, 2d8+10 bludgeoning damage',
            'Breath Weapons: Can use five different breath weapons',
            'Frightful Presence: DC 27 Wisdom save or be frightened for 1 minute'
          ],
          traits: [
            'Blindsight 60 ft.',
            'Darkvision 120 ft.',
            'Gargantuan size',
            'Speed 40 ft., fly 80 ft.'
          ],
          alignment: 'Lawful Evil',
          resistances: ['Fire', 'Cold', 'Lightning', 'Acid', 'Poison'],
          immunities: ['Fire', 'Cold', 'Lightning', 'Acid', 'Poison'],
          legendaryActions: [
            'Detect: Makes a Wisdom (Perception) check',
            'Tail Attack: Makes a tail attack',
            'Wing Attack: Uses wing attack',
            'Breath Weapon: Uses one breath weapon'
          ],
          breathWeapons: [
            'Fire Breath: 90-foot cone, 26d6 fire damage, DC 27 Dexterity save for half',
            'Cold Breath: 90-foot cone, 26d6 cold damage, DC 27 Dexterity save for half',
            'Lightning Breath: 90-foot line, 26d6 lightning damage, DC 27 Dexterity save for half',
            'Acid Breath: 90-foot line, 26d6 acid damage, DC 27 Dexterity save for half',
            'Poison Breath: 90-foot cone, 26d6 poison damage, DC 27 Constitution save for half'
          ]
        }
      ],
      rewards: [
        {
          type: 'Magic Item',
          description: "Tiamat's Scale",
          rarity: 'Legendary'
        },
        {
          type: 'Experience',
          description: '155,000 XP'
        }
      ],
      location: {
        dungeon: 'Dragon Temple',
        area: 'Summoning Chamber',
        environment: 'Indoor'
      },
      xp: 155000,
      treasure: {
        gold: 150000,
        gems: [{ type: 'Dragon Heart', value: 100000 }],
        art: [{ type: 'Dragon Crown', value: 125000 }],
        magicItems: [
          { name: "Tiamat's Scale Armor", rarity: 'Legendary' },
          { name: 'Dragon Slayer Sword', rarity: 'Legendary' }
        ],
        equipment: [
          'Dragon scales',
          'Dragon teeth',
          'Dragon bones'
        ]
      }
    }
  ],
  18: [
    {
      id: 'vecna-library',
      name: "Vecna's Library",
      description: 'The Archlich Vecna\'s library is a vast hall of black marble and gold, its walls covered in forbidden knowledge. The air is thick with the presence of Vecna, his skeletal form wreathed in necrotic energy. The main chamber is dominated by Vecna\'s throne, crafted from the bones of his victims. Vecna himself is a massive figure of pure evil, his form radiating necrotic energy. The library is filled with undead minions, their forms twisted by centuries of evil. The walls are lined with shelves containing Vecna\'s collection of forbidden knowledge and magical items. The atmosphere is heavy with the weight of eternal damnation, and the very air seems to burn with necrotic energy.',
      level: 18,
      difficulty: 'Deadly',
      type: 'Combat',
      enemies: [
        {
          name: 'Vecna',
          type: 'Undead',
          count: 1,
          cr: 26,
          abilities: [
            'Legendary Resistance: Can succeed on 3 saving throws per day',
            'Magic Resistance: Advantage on saving throws against spells and magical effects',
            'Spellcasting: 20th-level spellcaster',
            'Eye of Vecna: Can see through illusions and detect magic',
            'Hand of Vecna: Melee weapon attack, +17 to hit, 2d8+8 necrotic damage',
            'Necrotic Touch: Melee spell attack, +17 to hit, 3d6 necrotic damage'
          ],
          traits: [
            'Darkvision 120 ft.',
            'Medium size',
            'Speed 30 ft.'
          ],
          alignment: 'Neutral Evil',
          resistances: ['Cold', 'Fire', 'Lightning', 'Poison'],
          immunities: ['Necrotic', 'Poison', 'Bludgeoning', 'Piercing', 'Slashing'],
          legendaryActions: [
            'Cantrip: Casts a cantrip',
            'Spell: Casts a spell of 3rd level or lower',
            'Teleport: Teleports up to 120 feet',
            'Necrotic Touch: Makes a necrotic touch attack'
          ]
        },
        {
          name: 'Death Knight',
          type: 'Undead',
          count: 6,
          cr: 17,
          abilities: [
            'Magic Resistance: Advantage on saving throws against spells and magical effects',
            'Magic Weapons: All weapon attacks are magical',
            'Hellfire Orb: Ranged spell attack, +9 to hit, 4d6 fire damage',
            'Parry: Adds 6 to AC against one attack',
            'Multiattack: Makes three attacks'
          ],
          traits: [
            'Darkvision 60 ft.',
            'Medium size',
            'Speed 30 ft.'
          ],
          alignment: 'Chaotic Evil',
          resistances: ['Cold', 'Fire', 'Lightning', 'Poison'],
          immunities: ['Necrotic', 'Poison']
        }
      ],
      rewards: [
        {
          type: 'Magic Item',
          description: 'Eye of Vecna',
          rarity: 'Legendary'
        },
        {
          type: 'Experience',
          description: '90,000 XP'
        }
      ],
      location: {
        dungeon: "Vecna's Tower",
        area: 'Forbidden Library',
        environment: 'Indoor'
      },
      xp: 90000,
      treasure: {
        gold: 200000,
        gems: [{ type: 'Soul Gem', value: 150000 }],
        art: [{ type: 'Ancient Tome', value: 175000 }],
        magicItems: [
          { name: 'Eye of Vecna', rarity: 'Legendary' },
          { name: 'Hand of Vecna', rarity: 'Legendary' }
        ],
        equipment: [
          'Ancient spellbooks',
          'Necromantic components',
          'Arcane artifacts'
        ]
      }
    }
  ],
  19: [
    {
      id: 'asmodeus-court',
      name: "Asmodeus's Court",
      description: 'The Nine Hells are a realm of eternal torment and suffering, ruled by the Lord of the Nine Hells, Asmodeus. The court is a vast hall of black marble and gold, its walls covered in the screams of the damned. The air is thick with the smell of sulfur and the constant sound of infernal machinery. The main chamber is dominated by Asmodeus\'s throne, crafted from the souls of his victims. Asmodeus himself is a massive figure of pure evil, his form wreathed in flames. The court is filled with infernal minions, their forms twisted by centuries of evil. The walls are lined with shelves containing Asmodeus\'s collection of forbidden knowledge and magical items. The atmosphere is heavy with the weight of eternal damnation, and the very air seems to burn with infernal energy.',
      level: 19,
      difficulty: 'Deadly',
      type: 'Combat',
      enemies: [
        {
          name: 'Asmodeus',
          type: 'Fiend',
          count: 1,
          cr: 30,
          abilities: [
            'Legendary Resistance: Can succeed on 3 saving throws per day',
            'Magic Resistance: Advantage on saving throws against spells and magical effects',
            'Infernal Command: Can command any devil within 120 feet',
            'Hellfire: 60-foot cone, 10d6 fire damage, DC 25 Dexterity save for half',
            'Spellcasting: 20th-level spellcaster',
            'Divine Awareness: Knows if it hears a lie'
          ],
          traits: [
            'Darkvision 120 ft.',
            'Huge size',
            'Speed 40 ft., fly 60 ft.'
          ],
          alignment: 'Lawful Evil',
          resistances: ['Cold', 'Fire', 'Lightning', 'Poison'],
          immunities: ['Fire', 'Poison', 'Bludgeoning', 'Piercing', 'Slashing'],
          legendaryActions: [
            'Infernal Command: Commands a devil to attack',
            'Hellfire: Creates a line of fire',
            'Teleport: Teleports up to 120 feet',
            'Spell: Casts a spell of 3rd level or lower'
          ]
        },
        {
          name: 'Pit Fiend',
          type: 'Fiend',
          count: 8,
          cr: 20,
          abilities: [
            'Magic Resistance: Advantage on saving throws against spells and magical effects',
            'Magic Weapons: All weapon attacks are magical',
            'Innate Spellcasting: Can cast fireball, wall of fire, and power word stun',
            'Multiattack: Makes four attacks'
          ],
          traits: [
            'Darkvision 120 ft.',
            'Large size',
            'Speed 30 ft., fly 60 ft.'
          ],
          alignment: 'Lawful Evil',
          resistances: ['Cold', 'Fire', 'Lightning', 'Poison'],
          immunities: ['Poison', 'Bludgeoning', 'Piercing', 'Slashing']
        }
      ],
      rewards: [
        {
          type: 'Magic Item',
          description: "Asmodeus's Contract",
          rarity: 'Legendary'
        },
        {
          type: 'Experience',
          description: '155,000 XP'
        }
      ],
      location: {
        dungeon: 'Nessus',
        area: 'Infernal Court',
        environment: 'Plane of Fire'
      },
      xp: 155000,
      treasure: {
        gold: 300000,
        gems: [{ type: 'Soul Gem', value: 250000 }],
        art: [{ type: 'Infernal Crown', value: 275000 }],
        magicItems: [
          { name: "Asmodeus's Blade", rarity: 'Legendary' },
          { name: 'Infernal Armor', rarity: 'Legendary' }
        ],
        equipment: [
          'Infernal weapons',
          'Hell-forged armor',
          'Soul coins'
        ]
      }
    }
  ],
  20: [
    {
      id: 'final-challenge',
      name: 'The Final Challenge',
      description: 'The Dragon\'s Peak is a vast mountain range, its peaks covered in snow and ice. The air is thick with the presence of three ancient dragons, their massive forms casting shadows over the landscape. The main chamber is dominated by the dragons\' thrones, crafted from the scales of their victims. The dragons themselves are massive figures of pure power, their forms radiating elemental energy. The chamber is filled with dragon minions, their forms shining with draconic energy. The walls are lined with shelves containing the dragons\' collection of draconic knowledge and magical items. The atmosphere is heavy with the weight of draconic power, and the very air seems to burn with elemental energy.',
      level: 20,
      difficulty: 'Deadly',
      type: 'Combat',
      enemies: [
        {
          name: 'Ancient Gold Dragon',
          type: 'Dragon',
          count: 1,
          cr: 24,
          abilities: [
            'Legendary Resistance: Can succeed on 3 saving throws per day',
            'Magic Resistance: Advantage on saving throws against spells and magical effects',
            'Multiattack: Makes three attacks',
            'Bite: Melee weapon attack, +17 to hit, 2d10+10 piercing damage plus 2d6 fire damage',
            'Claw: Melee weapon attack, +17 to hit, 2d6+10 slashing damage',
            'Tail: Melee weapon attack, +17 to hit, 2d8+10 bludgeoning damage',
            'Breath Weapons: Can use fire and weakening breath',
            'Change Shape: Can polymorph into a humanoid'
          ],
          traits: [
            'Blindsight 60 ft.',
            'Darkvision 120 ft.',
            'Huge size',
            'Speed 40 ft., fly 80 ft., swim 40 ft.'
          ],
          alignment: 'Lawful Good',
          resistances: ['Fire'],
          immunities: ['Fire'],
          legendaryActions: [
            'Detect: Makes a Wisdom (Perception) check',
            'Tail Attack: Makes a tail attack',
            'Wing Attack: Uses wing attack',
            'Breath Weapon: Uses one breath weapon'
          ]
        },
        {
          name: 'Ancient Red Dragon',
          type: 'Dragon',
          count: 1,
          cr: 24,
          abilities: [
            'Legendary Resistance: Can succeed on 3 saving throws per day',
            'Magic Resistance: Advantage on saving throws against spells and magical effects',
            'Multiattack: Makes three attacks',
            'Bite: Melee weapon attack, +17 to hit, 2d10+10 piercing damage plus 2d6 fire damage',
            'Claw: Melee weapon attack, +17 to hit, 2d6+10 slashing damage',
            'Tail: Melee weapon attack, +17 to hit, 2d8+10 bludgeoning damage',
            'Fire Breath: 90-foot cone, 26d6 fire damage, DC 24 Dexterity save for half',
            'Frightful Presence: DC 21 Wisdom save or be frightened for 1 minute'
          ],
          traits: [
            'Blindsight 60 ft.',
            'Darkvision 120 ft.',
            'Huge size',
            'Speed 40 ft., fly 80 ft.'
          ],
          alignment: 'Chaotic Evil',
          resistances: ['Fire'],
          immunities: ['Fire'],
          legendaryActions: [
            'Detect: Makes a Wisdom (Perception) check',
            'Tail Attack: Makes a tail attack',
            'Wing Attack: Uses wing attack',
            'Fire Breath: Uses fire breath'
          ]
        },
        {
          name: 'Ancient Blue Dragon',
          type: 'Dragon',
          count: 1,
          cr: 23,
          abilities: [
            'Legendary Resistance: Can succeed on 3 saving throws per day',
            'Magic Resistance: Advantage on saving throws against spells and magical effects',
            'Multiattack: Makes three attacks',
            'Bite: Melee weapon attack, +16 to hit, 2d10+9 piercing damage plus 2d6 lightning damage',
            'Claw: Melee weapon attack, +16 to hit, 2d6+9 slashing damage',
            'Tail: Melee weapon attack, +16 to hit, 2d8+9 bludgeoning damage',
            'Lightning Breath: 120-foot line, 24d6 lightning damage, DC 23 Dexterity save for half',
            'Burrow: Can burrow through solid rock'
          ],
          traits: [
            'Blindsight 60 ft.',
            'Darkvision 120 ft.',
            'Huge size',
            'Speed 40 ft., fly 80 ft., burrow 40 ft.'
          ],
          alignment: 'Lawful Evil',
          resistances: ['Lightning'],
          immunities: ['Lightning'],
          legendaryActions: [
            'Detect: Makes a Wisdom (Perception) check',
            'Tail Attack: Makes a tail attack',
            'Wing Attack: Uses wing attack',
            'Lightning Breath: Uses lightning breath'
          ]
        }
      ],
      rewards: [
        {
          type: 'Magic Item',
          description: "Dragon's Hoard",
          rarity: 'Legendary'
        },
        {
          type: 'Experience',
          description: '155,000 XP'
        }
      ],
      location: {
        dungeon: "Dragon's Peak",
        area: 'Summit Chamber',
        environment: 'Mountain'
      },
      xp: 155000,
      treasure: {
        gold: 500000,
        gems: [{ type: 'Dragon Heart', value: 400000 }],
        art: [{ type: 'Dragon Crown', value: 450000 }],
        magicItems: [
          { name: 'Dragon Scale Armor', rarity: 'Legendary' },
          { name: 'Dragon Slayer Sword', rarity: 'Legendary' },
          { name: "Dragon's Eye", rarity: 'Legendary' }
        ],
        equipment: [
          'Dragon scales',
          'Dragon teeth',
          'Dragon bones',
          'Dragon hide'
        ]
      }
    }
  ]
} 