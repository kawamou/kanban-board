export const ItemTypes = {
  card: "card",
  column: "column",
} as const;

export type ItemTypes = typeof ItemTypes[keyof typeof ItemTypes];
