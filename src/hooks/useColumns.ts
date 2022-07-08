import { useCallback, useState } from "react";
import { ItemTypes } from "../itemTypes";
import { Item } from "../item";
import { v4 as uuidv4 } from "uuid";
import { useTasks } from "../hooks/useTasks";

export const useColumns = (): [
  Item[],
  (name: string) => void,
  (indexI: number, indexJ: number) => void,
  Item[],
  (newTask: Item, index: number) => void,
  (dragIndex: number, hoverIndex: number, groupName: string) => void,
  (target: Item) => void
] => {
  const [columns, setColumns] = useState<Item[]>();
  const [tasks, updateTasks, swapTasks, alignTasks, deleteTasks] = useTasks();

  const updateColumns = useCallback(
    (name: string) => {
      setColumns((prev) => {
        const newColumn = {
          key: uuidv4(),
          groupName: name,
          note: "",
          type: ItemTypes.column,
        };
        return [...(prev ?? []), newColumn];
      });
    },
    [columns, setColumns]
  );

  const swapColumns = useCallback(
    (indexI: number, indexJ: number) => {
      setColumns((prev) => {
        if (!prev) return;
        const newColumns = prev.filter((_, index) => index !== indexI);
        newColumns.splice(indexJ, 0, { ...prev[indexI] });
        alignTasks(
          newColumns.map((column) => {
            return column.groupName;
          })
        );
        return [...newColumns];
      });
    },
    [columns, setColumns]
  );

  return [
    columns ?? [],
    updateColumns,
    swapColumns,
    tasks ?? [],
    updateTasks,
    swapTasks,
    deleteTasks,
  ];
};
