export type TRunnes = {
  id: number;
  key: string;
  icon: string;
  name: string;
  slots: TSlot[];
};

export type TSlot = {
  runes: TRunesItem[];
};

export type TRunesItem = {
  id: string;
  key: string;
  icon: string;
  name: string;
  shortDesc: string;
  longDesc: string;
};
