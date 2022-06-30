import { Item } from "../item";
import { useState, useCallback } from "react";

export const useTasks = (): [
  Item[],
  (newTask: Item, index: number) => void,
  (dragIndex: number, hoverIndex: number, groupName: string) => void,
  (groupNames: string[]) => void
] => {
  const [tasks, setTasks] = useState<Item[]>();

  const updateTasks = (newTask: Item, index: number) => {
    setTasks((prev) => {
      const newTasks = [...(prev ?? [])];
      newTasks.splice(index, 0, newTask);
      return newTasks;
    });
  };

  // コールバックに入れないと最新の値を参照できない
  // https://tyotto-good.com/blog/usestate-pitfalls
  const moveTasks = useCallback(
    (dragIndex: number, hoverIndex: number, groupName: string) => {
      setTasks((prev) => {
        if (!prev) return;
        const item = prev[dragIndex];
        if (!item) return;
        const newItems = prev?.filter((_, idx) => idx !== dragIndex);
        newItems?.splice(hoverIndex, 0, { ...item, groupName });
        return newItems;
      });
    },
    [tasks, setTasks]
  );

  const alignTasks = (groupNames: string[]) => {
    setTasks((prev) => {
      if (!prev) return;
      const newTasks: Item[] = [];
      groupNames.map((groupName) => {
        const grouped = prev.filter((task) => {
          return task.groupName == groupName;
        });
        newTasks.push(...grouped);
      });
      return newTasks;
    });
  };

  return [tasks ?? [], updateTasks, moveTasks, alignTasks];
};
