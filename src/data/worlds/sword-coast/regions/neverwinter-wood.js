export const neverwinterWood = {
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
  locations: [
    'neverwinter',
    'wyrms-peak',
    'waterdeep',
    'candlekeep',
    'daggerford',
    'baldurs-gate',
    'mirabar'
  ]
}; 