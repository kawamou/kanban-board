import { ItemTypes } from "./itemTypes";

export type DraggableItem = {
  key: string;
  groupName: string;
  contents: string;
  type: ItemTypes;
};

export type DraggableItemWithIndex = DraggableItem & { index: number };
