import { Item } from "../item";
import { useState, useCallback } from "react";

export const useTasks = (): [
  Item[],
  (newTask: Item, index: number) => void,
  (dragIndex: number, hoverIndex: number, groupName: string) => void,
  (groupNames: string[]) => void,
  (target: Item) => void
] => {
  const [tasks, setTasks] = useState<Item[]>();

  const updateTasks = (newTask: Item, index: number) => {
    setTasks((current) => {
      const newTasks = [...(current ?? [])];
      newTasks.splice(index, 0, newTask);
      return newTasks;
    });
  };

  const swapTasks = useCallback(
    (dragIndex: number, hoverIndex: number, groupName: string) => {
      setTasks((current) => {
        if (!current) return;
        const item = current[dragIndex];
        if (!item) return;
        const newItems = current?.filter((_, idx) => idx !== dragIndex);
        newItems?.splice(hoverIndex, 0, { ...item, groupName });
        return newItems;
      });
    },
    [tasks, setTasks]
  );

  const deleteTasks = useCallback(
    (target: Item) => {
      setTasks((current) => {
        if (!current) return;
        const items = current.filter((item) => {
          return item != target;
        });
        return items;
      });
    },
    [tasks, setTasks]
  );

  const alignTasks = (groupNames: string[]) => {
    setTasks((current) => {
      if (!current) return;
      const newTasks: Item[] = [];
      groupNames.map((groupName) => {
        const grouped = current.filter((task) => {
          return task.groupName == groupName;
        });
        newTasks.push(...grouped);
      });
      return newTasks;
    });
  };

  return [tasks ?? [], updateTasks, swapTasks, alignTasks, deleteTasks];
};
