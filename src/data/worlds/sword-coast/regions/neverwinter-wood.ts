import { Region } from '../../../../types/region'
import { neverwinter } from '../cities/neverwinter'
import { helmsHold } from '../cities/helms-hold'
import { testRuins } from '../locations/test-ruins'
import { emeraldEnclaveShop } from '../locations/emerald-enclave-shop'
import { waterdeep } from '../locations/waterdeep'
import { mirabar } from '../locations/mirabar'
import { baldursGate } from '../locations/baldurs-gate'
import { goldenFields } from '../locations/golden-fields'
import { longsaddle } from '../locations/longsaddle'
import { amphail } from '../locations/amphail'
import { daggerford } from '../locations/daggerford'
import { redLarch } from '../locations/red-larch'
import { candlekeep } from '../locations/candlekeep'
import { swordMountains } from '../locations/sword-mountains'
import { highForest } from '../locations/high-forest'
import { thornhold } from '../locations/thornhold'
import { blacklakeDistrict } from '../locations/blacklake-district'
import { theChasm } from '../locations/the-chasm'
import { neverdeathGraveyard } from '../locations/neverdeath-graveyard'

export const neverwinterWood: Region = {
  id: 'neverwinter-wood',
  name: 'Neverwinter Wood',
  description: 'A dense forest north of the city of Neverwinter, known for its mysterious ruins and dangerous creatures.',
  biography: 'The Neverwinter Wood has long been a place of mystery and danger, its ancient trees hiding secrets from ages past.',
  color: '#2d5a27',
  banner: '/art/regions/neverwinter-wood.jpg',
  notableFeatures: ['Ancient ruins', 'Dense forest canopy', 'Mysterious magical anomalies'],
  history: {
    founding: 'The wood predates recorded history',
    majorEvents: ['Discovery of ancient elven ruins', 'The Great Fire of 1385 DR'],
    currentEra: 'Age of Wild Magic'
  },
  keyFigures: [{
    id: 'elder-treant',
    name: 'Ancient Treant Guardian',
    title: 'Protector of the Wood',
    era: 'Present',
    significance: 'Guardian of the forest\'s oldest secrets',
    image: '/art/npcs/treant-guardian.jpg',
    avatarStyle: 'nature'
  }],
  economy: {
    primaryIndustry: 'Lumber and rare herbs',
    gdp: 'Limited',
    currency: 'Gold Pieces',
    tradeGoods: [{
      name: 'Rare herbs',
      type: 'export',
      value: 'High',
      tariff: 'None',
      description: 'Magical herbs that only grow in the wood'
    }],
    tradePartners: [{
      name: 'Neverwinter',
      relationship: 'Limited',
      primaryGoods: ['Lumber'],
      tradeAgreement: 'Restricted harvesting rights'
    }],
    transportationRoutes: [{
      name: 'Old Forest Road',
      type: 'Trail',
      description: 'Ancient path through the woods',
      security: 'Dangerous',
      frequency: 'Rarely used'
    }],
    economicPolicies: ['Restricted logging', 'Protected magical groves'],
    marketRegulations: ['No mass harvesting', 'Magical permits required']
  },
  seasons: [],
  magicalItems: [],
  cities: [neverwinter, helmsHold],
  locations: [
    neverwinter,
    waterdeep,
    mirabar,
    baldursGate,
    daggerford,
    candlekeep,
    testRuins,
    emeraldEnclaveShop,
    blacklakeDistrict,
    theChasm,
    neverdeathGraveyard,
    redLarch
  ]
} 