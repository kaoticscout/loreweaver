import { Location } from '../types/location';

export const locations: Location[] = [
  {
    id: "waterdeep",
    name: "Waterdeep",
    description: "The City of Splendors, a bustling metropolis and one of the greatest cities in Faerûn. Located on the Sword Coast, it is the most influential city in the North.",
    type: "City",
    coordinates: { x: 280, y: 380 },
    population: 132000,
    primaryRaces: ["Humans", "Elves", "Dwarves"],
    notableFeatures: ["The Yawning Portal", "Castle Waterdeep", "The City of the Dead"],
    services: ["Trading", "Crafting", "Magic", "Entertainment"],
    localGovernment: "The Lords of Waterdeep"
  },
  {
    id: "neverwinter",
    name: "Neverwinter",
    description: "The Jewel of the North, a city known for its craftsmanship and magical items. Despite recent calamities, it remains a bustling city.",
    type: "City",
    coordinates: { x: 265, y: 280 },
    population: 23000,
    primaryRaces: ["Humans", "Dwarves", "Half-Elves"],
    notableFeatures: ["The Protector's Enclave", "The Chasm", "The Moonstone Mask"],
    services: ["Crafting", "Magic", "Trading"],
    localGovernment: "Lord Neverember"
  },
  {
    id: "luskan",
    name: "Luskan",
    description: "A former pirate city and maritime power, now struggling to reclaim its former glory.",
    type: "City",
    coordinates: { x: 255, y: 230 },
    population: 16000,
    primaryRaces: ["Humans", "Half-Orcs", "Dwarves"],
    notableFeatures: ["The Hosttower of the Arcane", "The Shipwrights' House"],
    services: ["Trading", "Shipbuilding", "Entertainment"],
    localGovernment: "The High Captains"
  },
  {
    id: "mirabar",
    name: "Mirabar",
    description: "A mining city known for its skilled metalworkers and gem cutters.",
    type: "City",
    coordinates: { x: 340, y: 220 },
    population: 12000,
    primaryRaces: ["Dwarves", "Humans", "Gnomes"],
    notableFeatures: ["The Mirabarran Mines", "The Axe of Mirabar"],
    services: ["Mining", "Crafting", "Trading"],
    localGovernment: "The Council of Sparkling Stones"
  },
  {
    id: "longsaddle",
    name: "Longsaddle",
    description: "A small town famous for the Harpell family of wizards.",
    type: "Village",
    coordinates: { x: 300, y: 300 },
    population: 1200,
    primaryRaces: ["Humans", "Gnomes"],
    notableFeatures: ["The Harpell Estate", "The Longsaddle Academy"],
    services: ["Magic", "Education", "Trading"],
    localGovernment: "The Harpell Family"
  },
  {
    id: "amphail",
    name: "Amphail",
    description: "A small but prosperous town known for horse breeding and training.",
    type: "Village",
    coordinates: { x: 285, y: 350 },
    population: 800,
    primaryRaces: ["Humans", "Half-Elves"],
    notableFeatures: ["The Amphail Stables", "The Grand Stables"],
    services: ["Horse Breeding", "Trading", "Inn"],
    localGovernment: "The Amphail Council"
  },
  {
    id: "daggerford",
    name: "Daggerford",
    description: "A fortified town that guards an important crossing of the Trade Way.",
    type: "Village",
    coordinates: { x: 275, y: 420 },
    population: 1000,
    primaryRaces: ["Humans", "Halflings"],
    notableFeatures: ["The Daggerford Bridge", "The River Shining"],
    services: ["Trading", "Defense", "Inn"],
    localGovernment: "Duke Pwyll Greatshout"
  },
  {
    id: "candlekeep",
    name: "Candlekeep",
    description: "A fortress library containing the largest collection of books and scrolls in Faerûn.",
    type: "Landmark",
    coordinates: { x: 260, y: 480 },
    significance: "The greatest repository of knowledge in Faerûn",
    history: "Founded over a thousand years ago by the great sage Alaundo",
    notableFeatures: ["The Great Library", "The Avowed's Quarters", "The Candlekeep Archives"]
  },
  {
    id: "sword-mountains",
    name: "Sword Mountains",
    description: "A mountain range home to various monsters and several dwarven strongholds.",
    type: "Landmark",
    coordinates: { x: 290, y: 320 },
    significance: "Major geographical feature and source of valuable minerals",
    history: "Ancient dwarven homeland and current home to various creatures",
    notableFeatures: ["Dwarven Strongholds", "Mining Operations", "Monster Lairs"]
  },
  {
    id: "high-forest",
    name: "High Forest",
    description: "An ancient forest realm, one of the largest forests in Faerûn.",
    type: "Landmark",
    coordinates: { x: 380, y: 320 },
    significance: "One of the last great elven realms in Faerûn",
    history: "Ancient elven homeland and current home to various fey creatures",
    notableFeatures: ["Ancient Trees", "Elven Settlements", "Fey Crossings"]
  }
]; 