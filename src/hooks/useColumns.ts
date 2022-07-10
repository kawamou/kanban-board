import { useCallback, useState } from "react";
import { ItemTypes } from "../itemTypes";
import { DraggableItem } from "../item";
import { v4 as uuidv4 } from "uuid";
import { useTasks } from "../hooks/useTasks";

export const useColumns = (): [
  DraggableItem[],
  (name: string) => void,
  (indexI: number, indexJ: number) => void,
  DraggableItem[],
  (newTask: DraggableItem, index: number) => void,
  (dragIndex: number, hoverIndex: number, groupName: string) => void,
  (target: DraggableItem) => void
] => {
  const [columns, setColumns] = useState<DraggableItem[]>();
  const [tasks, updateTasks, swapTasks, alignTasks, deleteTasks] = useTasks();

  const updateColumns = useCallback(
    (name: string) => {
      setColumns((current) => {
        const newColumn = {
          key: uuidv4(),
          groupName: name,
          contents: "",
          type: ItemTypes.column,
        };
        return [...(current ?? []), newColumn];
      });
    },
    [columns, setColumns]
  );

  const swapColumns = useCallback(
    (indexI: number, indexJ: number) => {
      setColumns((current) => {
        if (!current) return;
        const newColumns = current.filter((_, index) => index !== indexI);
        newColumns.splice(indexJ, 0, { ...current[indexI] });
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
