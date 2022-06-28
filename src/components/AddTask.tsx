import React, { useState } from "react";
import { Item } from "../item";
import { ItemTypes } from "../itemTypes";
import { v4 as uuidv4, v4 } from "uuid";

// https://qiita.com/akifumii/items/ec9fdb9dd7d649c2f3dc#%E9%96%A2%E6%95%B0%E7%B5%8C%E7%94%B1
export const AddTask = (props: {
  displayNone: () => void;
  hooks2: (arg: Item) => void;
  groupName: string;
}) => {
  const [text, setText] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleOnSubmit = () => {
    if (!text) return;
    props.hooks2({
      key: uuidv4(),
      groupName: props.groupName,
      note: text,
      type: ItemTypes.card,
    });
    setText("");
    props.displayNone();
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
              props.displayNone();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};
