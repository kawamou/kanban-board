import { ItemTypes } from "./itemTypes";

export type Item = {
  key: string;
  groupName: string;
  note: string;
  type: ItemTypes;
};

export type ItemWithIndex = Item & { index: number };
