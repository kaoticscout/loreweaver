import { Region } from '../../../../types/region'
import { luskan } from '../cities/luskan'
import { illusk } from '../cities/illusk'
import { mirabar } from '../locations/mirabar'
import { thornhold } from '../locations/thornhold'

export const luskanRegion: Region = {
  id: 'luskan-region',
  name: 'Luskan Territory',
  description: 'The territory surrounding the pirate city of Luskan, including the dangerous waters of the Sword Coast.',
  biography: 'Luskan, known as the City of Sails, has long been a haven for pirates and maritime trade.',
  color: '#1a3a4a',
  banner: '/art/regions/luskan.jpg',
  notableFeatures: ['Host Tower of the Arcane', 'Harbor district', 'Pirate ships'],
  history: {
    founding: '1088 DR',
    majorEvents: ['Rise of the Host Tower', 'Pirate Wars', 'Alliance with Ship Captains'],
    currentEra: 'Rule of the High Captains'
  },
  keyFigures: [{
    id: 'high-captain',
    name: 'Captain Beniago',
    title: 'High Captain of Luskan',
    era: 'Present',
    significance: 'Leader of the Ship Captains\' Confederation',
    image: '/art/npcs/captain-beniago.jpg',
    avatarStyle: 'pirate'
  }],
  economy: {
    primaryIndustry: 'Maritime trade and piracy',
    gdp: 'Substantial',
    currency: 'Gold Pieces',
    tradeGoods: [{
      name: 'Stolen goods',
      type: 'export',
      value: 'Variable',
      tariff: 'None',
      description: 'Various goods acquired through piracy'
    }],
    tradePartners: [{
      name: 'Black Market Networks',
      relationship: 'Strong',
      primaryGoods: ['Contraband', 'Weapons'],
      tradeAgreement: 'Unofficial arrangements'
    }],
    transportationRoutes: [{
      name: 'Northern Sea Route',
      type: 'Maritime',
      description: 'Main shipping lane along the Sword Coast',
      security: 'Dangerous',
      frequency: 'Daily traffic'
    }],
    economicPolicies: ['Free trade', 'Piracy tolerated'],
    marketRegulations: ['Minimal oversight', 'Bribe-based system']
  },
  seasons: [],
  magicalItems: [],
  cities: [luskan, illusk],
  locations: [mirabar, thornhold]
} 