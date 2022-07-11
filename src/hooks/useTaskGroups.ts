import { useCallback, useState } from "react";
import { ItemTypes } from "../itemTypes";
import { DraggableItem } from "../item";
import { v4 as uuidv4 } from "uuid";
import { useTasks } from "./useTasks";

export const useTaskGroups = (): [
  DraggableItem[],
  (name: string) => void,
  (indexI: number, indexJ: number) => void,
  DraggableItem[],
  (newTask: DraggableItem, index: number) => void,
  (dragIndex: number, hoverIndex: number, groupName: string) => void,
  (target: DraggableItem) => void
] => {
  const [taskGroups, setTaskGroups] = useState<DraggableItem[]>();
  const [tasks, updateTasks, swapTasks, alignTasks, deleteTasks] = useTasks();

  const updateTaskGroups = useCallback(
    (name: string) => {
      setTaskGroups((current) => {
        const newTaskGroup = {
          key: uuidv4(),
          groupName: name,
          contents: "",
          type: ItemTypes.column,
        };
        return [...(current ?? []), newTaskGroup];
      });
    },
    [taskGroups, setTaskGroups]
  );

  const swapTaskGroups = useCallback(
    (indexI: number, indexJ: number) => {
      setTaskGroups((current) => {
        if (!current) return;
        const newTaskGroups = current.filter((_, index) => index !== indexI);
        newTaskGroups.splice(indexJ, 0, { ...current[indexI] });
        alignTasks(
          newTaskGroups.map((taskGroup) => {
            return taskGroup.groupName;
          })
        );
        return [...newTaskGroups];
      });
    },
    [taskGroups, setTaskGroups]
  );

  return [
    taskGroups ?? [],
    updateTaskGroups,
    swapTaskGroups,
    tasks ?? [],
    updateTasks,
    swapTasks,
    deleteTasks,
  ];
};
