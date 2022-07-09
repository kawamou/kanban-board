import { DotsHorizontalIcon, PlusIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { useDrop } from "react-dnd";
import { Card } from "./Card";
import { AddTask } from "./AddTask";
import { Item, ItemWithIndex } from "../item";
import { Draggable } from "./Draggable";
import { ItemTypes } from "../itemTypes";

type ColumnProps = {
  item: Item;
  firstIndex: number;
  tasks: Item[];
  updateTasks: (newTask: Item, index: number) => void;
  deleteTasks: (target: Item) => void;
  swapTasks: (dragIndex: number, hoverIndex: number, groupName: string) => void;
};

export const Column: React.FC<ColumnProps> = ({
  item,
  firstIndex,
  tasks,
  updateTasks,
  deleteTasks,
  swapTasks,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const displayNone = (): void => setIsOpen(false);

  const [, ref] = useDrop({
    accept: ItemTypes.card, // 渡せるようにする
    hover(dragItem: ItemWithIndex) {
      const dragIndex = dragItem.index;
      if (dragItem.groupName === item.groupName) return;
      const targetIndex =
        dragIndex < firstIndex
          ? // forward
            firstIndex + tasks.length - 1
          : // backward
            firstIndex + tasks.length;
      swapTasks(dragIndex, targetIndex, item.groupName);
      dragItem.index = targetIndex;
      dragItem.groupName = item.groupName;
    },
  });

  return (
    <div className="rounded p-2 h-[90%] bg-gray-100 border-x border-y boder-t border-b w-[335px]">
      <div className="flex items-center m-2">
        <div className="rounded-full w-6 h-6 text-center bg-slate-200">
          {tasks.length}
        </div>
        <span className="flex-1 ml-2">{item.groupName}</span>
        <button
          className=""
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <PlusIcon className="w-4 h-4"></PlusIcon>
        </button>
        <button className="">
          <DotsHorizontalIcon className="w-4 h-4 ml-2"></DotsHorizontalIcon>
        </button>
      </div>
      <div className="overflow-y-auto h-5/6" ref={ref}>
        <div className="ml-2 mr-2 mt-2 mb-4">
          {isOpen ? (
            <AddTask
              displayNone={displayNone}
              updateTasks={updateTasks}
              groupName={item.groupName}
              index={firstIndex + tasks.length}
            />
          ) : (
            <></>
          )}
        </div>
        <ul className="">
          {tasks?.map((task, index) => {
            return (
              <li key={task.key} className="m-2">
                <Draggable
                  item={task}
                  index={firstIndex + index}
                  swapItems={swapTasks}
                >
                  <Card task={task} deleteTasks={deleteTasks}></Card>
                </Draggable>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
