import { ItemTypes } from "./itemTypes";

export type Item = {
  key: string;
  groupName: string;
  contents: string;
  type: ItemTypes;
};

export type ItemWithIndex = Item & { index: number };
