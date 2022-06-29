import { Item } from "./item";
import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

export const tasksRepositry = () => {
  const findByGroupId = (groupId: string) => {
    return;
  };

  const save = (task: Item) => {
    return;
  };

  return { findByGroupId, save };
};

export const useTasks = (): [
  Item[],
  (...newTask: Item[]) => void,
  (dragIndex: number, hoverIndex: number, groupName: string) => void
] => {
  const [tasks, setTasks] = useState<Item[]>();

  const updateTasks = (...newTasks: Item[]) => {
    setTasks((prev) => {
      return [...(prev ?? []), ...newTasks];
    });
  };

  const findTasksByGroupName = (groupName: string) => {
    if (!tasks) return [];
    return tasks.filter((task) => {
      return task.groupName === groupName;
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

  return [tasks ?? [], updateTasks, moveTasks];
};
