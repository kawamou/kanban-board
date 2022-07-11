import React, { useState } from "react";
import { DraggableItem } from "../item";
import { ItemTypes } from "../itemTypes";
import { v4 as uuidv4 } from "uuid";

type AddTaskProps = {
  displayNone: () => void;
  updateTasks: (arg: DraggableItem, index: number) => void;
  groupName: string;
  index: number;
};

// https://qiita.com/akifumii/items/ec9fdb9dd7d649c2f3dc#%E9%96%A2%E6%95%B0%E7%B5%8C%E7%94%B1
export const AddTask: React.FC<AddTaskProps> = ({
  displayNone,
  updateTasks,
  groupName,
  index,
}) => {
  const [text, setText] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleOnSubmit = () => {
    if (!text) return;
    updateTasks(
      {
        key: uuidv4(),
        groupName: groupName,
        contents: text,
        type: ItemTypes.card,
      },
      index
    );
    setText("");
    displayNone();
  };

  return (
    <>
      <div className="">
        <textarea
          value={text}
          onChange={(e) => handleOnChange(e)}
          className="w-full p-2 text-sm"
        ></textarea>
        <div className="flex gap-2">
          <button
            onClick={() => {
              handleOnSubmit();
            }}
            className={`flex-1 text-sm ${
              text ? "bg-green-500" : "bg-green-200"
            } rounded py-1 px-4 text-white`}
          >
            Add
          </button>
          <button
            className="flex-1 rounded bg-gray-200 py-1 px-4 text-sm"
            onClick={() => {
              setText("");
              displayNone();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};
