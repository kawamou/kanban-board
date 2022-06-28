import { DotsHorizontalIcon } from "@heroicons/react/outline";
import type { FC } from "react";
import { Item } from "../item";
import { MenuAlt2Icon } from "@heroicons/react/outline";

type CardProps = {
  task: Item;
  index: number;
};

export const Card: FC<CardProps> = (props: CardProps) => {
  return (
    <div className="cursor-move flex items-start content-start rounded-md border-x border-y boder-t border-b bg-white p-4">
      <MenuAlt2Icon className="w-4 h-4" />
      <div className="flex-1 text-sm pl-4 pr-4">{props.task.note}</div>
      <button className="">
        <DotsHorizontalIcon className="w-4 h-4" />
      </button>
    </div>
  );
};
