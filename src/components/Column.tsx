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
  move: (dragIndex: number, hoverIndex: number, groupName: string) => void;
};

export const Column = (props: ColumnProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const displayNone = (): void => setIsOpen(false);

  const [, ref] = useDrop({
    accept: ItemTypes.card, // 渡せるようにする
    hover(dragItem: ItemWithIndex) {
      const dragIndex = dragItem.index;
      if (dragItem.groupName === props.item.groupName) return;
      const targetIndex =
        dragIndex < props.firstIndex
          ? // forward
            props.firstIndex + props.tasks.length - 1
          : // backward
            props.firstIndex + props.tasks.length;
      props.move(dragIndex, targetIndex, props.item.groupName);
      dragItem.index = targetIndex;
      dragItem.groupName = props.item.groupName;
    },
  });

  return (
    <div className="rounded p-2 h-[90%] bg-gray-100 border-x border-y boder-t border-b w-[335px]">
      <div className="flex items-center m-2">
        <div className="rounded-full w-6 h-6 text-center bg-slate-200">
          {props.tasks.length}
        </div>
        <span className="flex-1 ml-2">{props.item.groupName}</span>
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
      {/* refの位置が重要。ulだと存在しなかった */}
      <div className="overflow-y-auto h-5/6" ref={ref}>
        <div className="ml-2 mr-2 mt-2 mb-4">
          {isOpen ? (
            <AddTask
              displayNone={displayNone}
              hooks2={props.updateTasks}
              groupName={props.item.groupName}
              index={props.firstIndex + props.tasks.length}
            />
          ) : (
            <></>
          )}
        </div>
        <ul className="">
          {props.tasks?.map((task, index) => {
            return (
              <li key={task.key} className="m-2">
                <Draggable
                  item={task}
                  index={props.firstIndex + index}
                  move={props.move}
                >
                  <Card task={task} index={index}></Card>
                </Draggable>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
