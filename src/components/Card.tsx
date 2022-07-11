import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { FC, useState } from "react";
import { DraggableItem } from "../item";
import { MenuAlt2Icon } from "@heroicons/react/outline";

type CardProps = {
  task: DraggableItem;
  deleteTasks: (target: DraggableItem) => void;
};

export const Card: FC<CardProps> = ({ task, deleteTasks }) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <div className="flex cursor-move content-start items-start rounded-md border bg-white p-4">
        <MenuAlt2Icon className="h-4 w-4" />
        <div className="flex-1 px-4 text-sm">{task.contents}</div>

        <button
          className=""
          onClick={() => {
            setShow(!show);
          }}
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          {show ? (
            <div className="absolute z-50 list-none rounded border bg-white text-left text-sm">
              <ul className="">
                <li className="py-1 px-4 hover:bg-gray-100">
                  <div
                    onClick={() => {
                      return;
                    }}
                  >
                    Edit
                  </div>
                </li>
                <li className="py-1 px-4 hover:bg-gray-100">
                  <div
                    onClick={() => {
                      deleteTasks(task);
                    }}
                  >
                    Delete
                  </div>
                </li>
              </ul>
            </div>
          ) : (
            <></>
          )}
        </button>
      </div>
    </>
  );
};
