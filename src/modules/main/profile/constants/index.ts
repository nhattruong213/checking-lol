import { Mods } from '../type';

export const StatMods: Mods[] = [
  {
    group: 'offense',
    items: [
      { id: 5008, icon: '5008.png', name: 'Adaptive Force' },
      { id: 5005, icon: '5005.png', name: 'Attack Speed' },
      { id: 5007, icon: '5007.png', name: 'Ability Haste' },
    ],
  },
  {
    group: 'flex',
    items: [
      { id: 5008, icon: '5008.png', name: 'Adaptive Force' },
      { id: 5010, icon: '5010.png', name: 'Move Speed' },
      { id: 5001, icon: '5001.png', name: 'Health Scaling' },
    ],
  },
  {
    group: 'defense',
    items: [
      { id: 5011, icon: '5011.png', name: 'Health' },
      { id: 5013, icon: '5013.png', name: 'Tenacity and Slow Resist' },
      { id: 5001, icon: '5001.png', name: 'Health Scaling' },
    ],
  },
];
