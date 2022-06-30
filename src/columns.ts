import { ItemTypes } from "./itemTypes";
import { Item } from "./item";

export type Column = {
  name: string;
  type: ItemTypes;
  tasks: Item[];
};
