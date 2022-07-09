import React, { useState } from "react";
import { XIcon } from "@heroicons/react/outline";

export type AddAColumnModalProps = {
  showModal: boolean;
  updateShowModal: (showModal: boolean) => void;
  updateNewColumnName: (name: string) => void;
};

export const AddAColumnModal = ({
  showModal,
  updateShowModal,
  updateNewColumnName,
}: AddAColumnModalProps) => {
  const [text, setText] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleOnSubmit = () => {
    if (!text) return;
    updateNewColumnName(text);
    updateShowModal(false);
    setText("");
  };

  const ChecksForClicksOutside = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target == e.currentTarget) {
      updateShowModal(false);
      setText("");
    }
  };

  return (
    <>
      {showModal ? (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/70 items-center content-center flex text-sm"
          onClick={(e) => {
            ChecksForClicksOutside(e);
          }}
        >
          <div className="bg-white rounded ml-auto mr-auto w-96">
            <div className="p-4 bg-gray-100 border-b flex rounded-t">
              <p className="flex-1 font-semibold">Add a Column</p>
              <button
                onClick={() => {
                  updateShowModal(false);
                }}
              >
                <XIcon className="ml-4 text-gray-500 h-4 w-4 flex"></XIcon>
              </button>
            </div>
            <div className="flex flex-col gap-2 p-4">
              <label className="font-semibold">Column name</label>
              <input
                type="text"
                placeholder=""
                className="border p-2 rounded"
                value={text}
                onChange={(e) => {
                  handleOnChange(e);
                }}
              />
              <button
                className={`border-1 text-sm w-fit ${
                  text ? "bg-green-500" : "bg-green-200"
                } text-white py-1 px-4 rounded`}
                onClick={() => {
                  handleOnSubmit();
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
