import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { FC, useState } from "react";
import { Item } from "../item";
import { MenuAlt2Icon } from "@heroicons/react/outline";

type CardProps = {
  task: Item;
  index: number;
  deleteTasks: (target: Item) => void;
};

export const Card: FC<CardProps> = ({
  task,
  index,
  deleteTasks,
}: CardProps) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <div className="cursor-move flex items-start content-start rounded-md border-x border-y boder-t border-b bg-white p-4">
        <MenuAlt2Icon className="w-4 h-4" />
        <div className="flex-1 text-sm pl-4 pr-4">{task.note}</div>

        <button
          className=""
          onClick={() => {
            setShow(!show);
          }}
        >
          <DotsHorizontalIcon className="w-4 h-4" />
          {show ? (
            <div className="bg-white text-left text-sm absolute z-50 list-none border-x border-y boder-t border-b rounded">
              <ul className="">
                <li className="hover:bg-gray-100 pt-1 pb-1 pl-4 pr-4">
                  <div
                    onClick={() => {
                      return;
                    }}
                  >
                    Edit
                  </div>
                </li>
                <li className="hover:bg-gray-100 pt-1 pb-1 pl-4 pr-4">
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
