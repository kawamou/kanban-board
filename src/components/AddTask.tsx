import React, { useState } from "react";
import { Item } from "../item";
import { ItemTypes } from "../itemTypes";
import { v4 as uuidv4 } from "uuid";

type AddTaskProps = {
  displayNone: () => void;
  updateTasks: (arg: Item, index: number) => void;
  groupName: string;
  index: number;
};

// https://qiita.com/akifumii/items/ec9fdb9dd7d649c2f3dc#%E9%96%A2%E6%95%B0%E7%B5%8C%E7%94%B1
export const AddTask = ({
  displayNone,
  updateTasks,
  groupName,
  index,
}: AddTaskProps) => {
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
        note: text,
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
          className="w-full text-sm p-2"
        ></textarea>
        <div className="flex gap-2">
          <button
            onClick={() => {
              handleOnSubmit();
            }}
            className={`border-1 text-sm flex-1 ${
              text ? "bg-green-500" : "bg-green-200"
            } text-white py-1 px-4 rounded`}
          >
            Add
          </button>
          <button
            className="border-1 text-sm flex-1 bg-gray-200 py-1 px-4 rounded"
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
