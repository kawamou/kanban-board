import { DotsHorizontalIcon, PlusIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { useDrop } from "react-dnd";
import { Card } from "./Card";
import { AddTask } from "./AddTask";
import { DraggableItem, DraggableItemWithIndex } from "../item";
import { Draggable } from "./Draggable";
import { ItemTypes } from "../itemTypes";

type ColumnProps = {
  columnName: string;
  firstIndex: number;
  tasks: DraggableItem[];
  updateTasks: (newTask: DraggableItem, index: number) => void;
  deleteTasks: (target: DraggableItem) => void;
  swapTasks: (dragIndex: number, hoverIndex: number, groupName: string) => void;
};

export const Column: React.FC<ColumnProps> = ({
  columnName,
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
    hover(dragItem: DraggableItemWithIndex) {
      const dragIndex = dragItem.index;
      if (dragItem.groupName === columnName) return;
      const targetIndex =
        dragIndex < firstIndex
          ? // forward
            firstIndex + tasks.length - 1
          : // backward
            firstIndex + tasks.length;
      swapTasks(dragIndex, targetIndex, columnName);
      dragItem.index = targetIndex;
      dragItem.groupName = columnName;
    },
  });

  return (
    <div className="h-[90%] w-[335px] rounded border bg-gray-100 p-2">
      <div className="m-2 flex items-center">
        <div className="h-6 w-6 rounded-full bg-slate-200 text-center">
          {tasks.length}
        </div>
        <span className="ml-2 flex-1">{columnName}</span>
        <button
          className=""
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <PlusIcon className="h-4 w-4"></PlusIcon>
        </button>
        <button className="">
          <DotsHorizontalIcon className="ml-2 h-4 w-4"></DotsHorizontalIcon>
        </button>
      </div>
      <div className="h-5/6 overflow-y-auto" ref={ref}>
        <div className="mx-2 mt-2 mb-4">
          {isOpen ? (
            <AddTask
              displayNone={displayNone}
              updateTasks={updateTasks}
              groupName={columnName}
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
