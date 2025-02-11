const monsterGearData = [
  {
    name: 'Awakened District',
    imageUrl: 'URL_TO_AWAKENED_DISTRICT_IMAGE',
    skills: [
      {
        name: 'Prosperity',
        effect:
          'Your Shield items have + Shield equal to the value of your Items.',
        startingTier: 'Diamond',
        types: ['Shield'],
        imageUrl: 'URL_TO_PROSPERITY_IMAGE',
      },
      {
        name: 'Toughness',
        effect: 'Your Shield items have + Shield 2/6/12/20.',
        startingTier: 'Bronze',
        types: ['Shield'],
        imageUrl: 'URL_TO_TOUGHNESS_IMAGE',
      },
      {
        name: 'Trickle Down Economics',
        effect: 'When you use a Large item, Haste an item for 4 seconds.',
        startingTier: 'Gold',
        types: ['Haste'],
        imageUrl: 'URL_TO_TRICKLE_DOWN_ECONOMICS_IMAGE',
      },
    ],
    items: [
      {
        name: 'Balcony',
        effect:
          'The Property to the left of this has double value in combat and has its Cooldown reduced by 10/20/30%.',
        types: ['Property'],
        size: 'Medium',
        imageUrl: 'URL_TO_BALCONY_IMAGE',
      },
      {
        name: 'Landscraper',
        effect:
          "When you use an item, Shield equal to 1x/2x/3x this item's value.\nAt the start of each hour, this gains 1 value.",
        types: ['Property'],
        size: 'Large',
        imageUrl: 'URL_TO_LANDSCRAPER_IMAGE',
      },
      {
        name: 'Soul of the District',
        effect:
          'Active Effect: Shield equal to your current health.\nActive Effect: Deal Damage equal to your Shield.',
        types: ['Weapon'],
        size: 'Medium',
        imageUrl: 'URL_TO_SOUL_OF_THE_DISTRICT_IMAGE',
      },
      {
        name: 'Spacescraper',
        effect:
          'Active Effect: Shield equal to 2/3 times the value of your items.\nThis has triple value in combat.',
        types: ['Property'],
        size: 'Large',
        imageUrl: 'URL_TO_SPACESCRAPER_IMAGE',
      },
    ],
  },
  {
    name: 'Void Colossus',
    imageUrl: 'URL_TO_VOID_COLOSSUS_IMAGE',
    skills: [
      {
        name: "Titan's Might",
        effect: 'Increase all attack damage by 10%.',
        startingTier: 'Gold',
        types: ['Attack'],
        imageUrl: 'URL_TO_TITANS_MIGHT_IMAGE',
      },
    ],
    items: [
      {
        name: 'Colossal Core',
        effect: 'Doubles the effectiveness of all shield items.',
        types: ['Core'],
        size: 'Large',
        imageUrl: 'URL_TO_COLOSSAL_CORE_IMAGE',
      },
    ],
  },
];

export default monsterGearData;
