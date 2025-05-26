export const luskanRegion = {
  id: 'luskan-region',
  name: 'Luskan Region',
  description: 'A harsh coastal region dominated by the city of Luskan, known for its piracy and maritime trade.',
  biography: 'Once a powerful city-state, Luskan has fallen into disrepair but maintains its influence through naval power and trade.',
  color: '#1a3b5c',
  banner: '/art/regions/luskan.jpg',
  notableFeatures: ['The Host Tower of the Arcane', 'Northern Port', 'Pirate Havens'],
  history: {
    founding: 'Founded by northern seafarers',
    majorEvents: ['Rise of the Arcane Brotherhood', 'Fall of the Host Tower'],
    currentEra: 'Age of Recovery'
  },
  keyFigures: [{
    id: 'high-captain',
    name: 'Captain Beniago',
    title: 'High Captain of Luskan',
    era: 'Present',
    significance: 'Leader of the Ship Kurth and influential merchant',
    image: '/art/npcs/captain-beniago.jpg',
    avatarStyle: 'pirate'
  }],
  economy: {
    primaryIndustry: 'Maritime trade and fishing',
    gdp: 'Moderate',
    currency: 'Gold Pieces',
    tradeGoods: [{
      name: 'Fish',
      type: 'export',
      value: 'Moderate',
      tariff: '10%',
      description: 'Fresh and preserved seafood'
    }],
    tradePartners: [{
      name: 'Neverwinter',
      relationship: 'Competitive',
      primaryGoods: ['Seafood', 'Timber'],
      tradeAgreement: 'Limited trade agreement'
    }],
    transportationRoutes: [{
      name: 'Northern Sea Route',
      type: 'Sea',
      description: 'Main shipping route along the coast',
      security: 'Dangerous',
      frequency: 'Daily'
    }],
    economicPolicies: ['Free trade', 'Piracy tolerated'],
    marketRegulations: ['Ship registration required', 'Harbor fees']
  },
  seasons: [],
  magicalItems: [],
  locations: [
    'sword-mountains',
    'high-forest',
    'longsaddle',
    'amphail'
  ]
}; 