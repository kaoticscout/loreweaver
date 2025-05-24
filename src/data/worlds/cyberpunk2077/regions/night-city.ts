import { Region } from '../../../../types/region'
import { cityCenter } from '../cities/city-center'
import { watson } from '../cities/watson'
import { heywood } from '../cities/heywood'
import { westbrook } from '../cities/westbrook'
import { santoDomingo } from '../cities/santo-domingo'
import { afterlifebar } from '../locations/afterlife-bar'
import { lizzyBar } from '../locations/lizzys-bar'
import { viktorsClinic } from '../locations/viktors-clinic'
import { megabuildingH10 } from '../locations/megabuilding-h10'
import { arasaka } from '../locations/arasaka-tower'
import { konpekiPlaza } from '../locations/konpeki-plaza'
import { clouds } from '../locations/clouds'
import { totalimages } from '../locations/totalmages'
import { mistyShop } from '../locations/mistys-shop'

export const nightCity: Region = {
  id: 'night-city',
  name: 'Night City Metropolitan Area',
  description: 'The heart of the cyberpunk world, Night City is a sprawling metropolis where chrome meets concrete, and dreams meet reality. This autonomous megacity is divided into distinct districts, each with its own character and dangers.',
  biography: 'Founded by corporate mogul Richard Night in 1994, Night City has evolved from a corporate dream into a living nightmare of inequality, violence, and technological excess.',
  color: '#ff0055',
  banner: '/art/environments/cyberpunk/38 - t420m8O.jpg',
  images: [
    '/art/environments/cyberpunk/38 - t420m8O.jpg',
    '/art/environments/cyberpunk/12 - XhA6ruK.jpg'    
  ],
  notableFeatures: [
    'Towering megabuildings',
    'Corporate plazas',
    'Underground markets',
    'Neon-lit streets',
    'Heavily augmented population'
  ],
  history: {
    founding: '1994',
    majorEvents: [
      'Corporate Wars of 2020',
      'The Fourth Corporate War',
      'The Unification Act of 2069',
      'The DataKrash'
    ],
    currentEra: 'Post-Fourth Corporate War'
  },
  keyFigures: [{
    id: 'saburo-arasaka',
    name: 'Saburo Arasaka',
    title: 'CEO of Arasaka Corporation',
    era: 'Present',
    significance: 'The most powerful man in Night City, controlling the largest megacorporation',
    image: '/art/environments/cyberpunk/12 - XhA6ruK.jpg',
    avatarStyle: 'corporate'
  }],
  economy: {
    primaryIndustry: 'Corporate Services and Technology',
    gdp: 'Estimated 900 billion eurodollars',
    currency: 'Eurodollar (€$)',
    tradeGoods: [{
      name: 'Cyberware',
      type: 'export',
      value: 'Very High',
      tariff: 'Variable by district',
      description: 'Cutting-edge cybernetic enhancements'
    }],
    tradePartners: [{
      name: 'Arasaka Corporation',
      relationship: 'Dominant',
      primaryGoods: ['Security Services', 'Cyberware', 'Weapons'],
      tradeAgreement: 'Corporate Monopoly'
    }],
    transportationRoutes: [{
      name: 'NCART System',
      type: 'Rapid Transit',
      description: 'City-wide automated transit system',
      security: 'Corporate-controlled',
      frequency: '24/7 Operation'
    }],
    economicPolicies: [
      'Corporate self-regulation',
      'Minimal government oversight',
      'Free market extremism'
    ],
    marketRegulations: [
      'Corporate-enforced standards',
      'Black market tolerance',
      'Limited consumer protection'
    ]
  },
  seasons: [],
  magicalItems: [],
  cities: [
    cityCenter,
    watson,
    heywood,
    westbrook,
    santoDomingo
  ],
  locations: [
    afterlifebar,
    lizzyBar,
    viktorsClinic,
    megabuildingH10,
    arasaka,
    konpekiPlaza,
    clouds,
    totalimages,
    mistyShop
  ]
} 