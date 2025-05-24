import { Region } from '../../../../types/region'
import { coastview } from '../cities/coastview'
import { westwind } from '../cities/westwind'
import { grandImperialMall } from '../locations/grand-imperial-mall'
import { battyHotel } from '../locations/batty-hotel'
import { stadionLove } from '../locations/stadion-love'
import { voodooChapel } from '../locations/voodoo-chapel'

export const pacifica: Region = {
  id: 'pacifica',
  name: 'Pacifica District',
  description: 'Once meant to be Night City\'s crown jewel of tourism, Pacifica now stands as a testament to corporate abandonment. Its half-finished luxury hotels and entertainment complexes serve as vertical slums, controlled by the Voodoo Boys and other gangs.',
  biography: 'Pacifica was originally planned as a luxury resort district, but the economic collapse following the Fourth Corporate War led to its abandonment by investors. Now it\'s one of the most dangerous and isolated parts of Night City.',
  color: '#00a3ff',
  banner: '/art/environments/cyberpunk/6 - GWUvFch.png',
  images: [
    '/art/environments/cyberpunk/6 - GWUvFch.png',
    '/art/environments/cyberpunk/26 - 1QgcDQQ.jpg',
    '/art/environments/cyberpunk/38 - t420m8O.jpg',
    '/art/environments/cyberpunk/38 - t420m8O.jpg',
    
  ],
  notableFeatures: [
    'Abandoned luxury resorts',
    'The Grand Imperial Mall',
    'Combat zones',
    'Netrunner territory',
    'Haitian community'
  ],
  history: {
    founding: '2020s',
    majorEvents: [
      'Resort District Project Launch',
      'Corporate Abandonment',
      'Voodoo Boys Takeover',
      'NetWatch Conflict'
    ],
    currentEra: 'Gang Control Era'
  },
  keyFigures: [{
    id: 'placide',
    name: 'Placide',
    title: 'Voodoo Boys Lieutenant',
    era: 'Present',
    significance: 'Key figure in the Voodoo Boys gang, controls much of Pacifica\'s underground activities',
    image: '/art/environments/cyberpunk/26 - 1QgcDQQ.jpg',
    avatarStyle: 'gang'
  }],
  economy: {
    primaryIndustry: 'Black Market and Data Trade',
    gdp: 'Unknown (Unofficial Economy)',
    currency: 'Eurodollar (€$)',
    tradeGoods: [{
      name: 'NetRunner Services',
      type: 'export',
      value: 'High',
      tariff: 'None (Unofficial)',
      description: 'High-level hacking and data manipulation services'
    }],
    tradePartners: [{
      name: 'Various Criminal Organizations',
      relationship: 'Complex',
      primaryGoods: ['Information', 'Weapons', 'Tech'],
      tradeAgreement: 'Informal Arrangements'
    }],
    transportationRoutes: [{
      name: 'Abandoned NCART Station',
      type: 'Limited Transit',
      description: 'Partially functioning transit system',
      security: 'Gang-controlled',
      frequency: 'Irregular'
    }],
    economicPolicies: [
      'Informal economy',
      'Gang-regulated trade',
      'Barter system prevalent'
    ],
    marketRegulations: [
      'Gang-enforced rules',
      'Survival economy',
      'No official oversight'
    ]
  },
  seasons: [],
  magicalItems: [],
  cities: [
    coastview,
    westwind
  ],
  locations: [
    grandImperialMall,
    battyHotel,
    stadionLove,
    voodooChapel
  ]
} 