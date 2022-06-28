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
    newTasks.map((task) => {
      task.key = uuidv4();
    });
    setTasks([...newTasks, ...(tasks ?? [])]);
  };

  const findTasksByGroupName = (groupName: string) => {
    if (!tasks) return [];
    return tasks.filter((task) => {
      return task.groupName === groupName;
    });
  };

  const swapTasks = (indexI: number, indexJ: number, groupName: string) => {
    if (!tasks) return;
    const item = tasks[indexI];
    if (!item) return;
    setTasks((prev) => {
      const newItems = prev?.filter((_, idx) => idx !== indexI);
      newItems?.splice(indexJ, 0, { ...item, groupName });
      return newItems;
    });
    console.log(tasks);
  };

  const moveTasks = useCallback(
    (dragIndex: number, hoverIndex: number, groupName: string) => {
      swapTasks(dragIndex, hoverIndex, groupName);
    },
    [tasks, setTasks]
  );

  return [tasks ?? [], updateTasks, moveTasks];
};
