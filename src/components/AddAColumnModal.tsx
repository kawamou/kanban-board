import React, { useState } from "react";
import { XIcon } from "@heroicons/react/outline";

export type AddAColumnModalProps = {
  showModal: boolean;
  updateShowModal: (showModal: boolean) => void;
  updateNewColumnName: (name: string) => void;
};

export const AddAColumnModal: React.FC<AddAColumnModalProps> = ({
  showModal,
  updateShowModal,
  updateNewColumnName,
}) => {
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
          className="fixed top-0 left-0 flex h-full w-full content-center items-center bg-black/70 text-sm"
          onClick={(e) => {
            ChecksForClicksOutside(e);
          }}
        >
          <div className="mx-auto w-96 rounded bg-white">
            <div className="flex rounded-t border-b bg-gray-100 p-4">
              <p className="flex-1 font-semibold">Add a Column</p>
              <button
                onClick={() => {
                  updateShowModal(false);
                }}
              >
                <XIcon className="ml-4 flex h-4 w-4 text-gray-500"></XIcon>
              </button>
            </div>
            <div className="flex flex-col gap-2 p-4">
              <label className="font-semibold">Column name</label>
              <input
                type="text"
                placeholder=""
                className="rounded border p-2"
                value={text}
                onChange={(e) => {
                  handleOnChange(e);
                }}
              />
              <button
                className={`w-fit text-sm ${
                  text ? "bg-green-500" : "bg-green-200"
                } rounded py-1 px-4 text-white`}
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
