import { Column } from "./Column";
import { NewColumnButton } from "./NewColumnButton";
import { useState, useCallback } from "react";
import { AddAColumnModal } from "../pages/AddAColumnModal";
import { Draggable } from "./Draggable";
import { useColumns } from "../hooks/useColumns";

export const useShowModal = (): [boolean, (showModal: boolean) => void] => {
  const [showModal, setShowModal] = useState(false);

  const updateShowModal = (showModal: boolean) => {
    setShowModal(showModal);
  };

  return [showModal, updateShowModal];
};

export const Columns = () => {
  const [
    columns,
    updateColumns,
    swapColumns,
    tasks,
    updateTasks,
    moveTasks,
    deleteTasks,
  ] = useColumns();

  const [showModal, updateShowModal] = useShowModal();

  const moveColumn = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      swapColumns(dragIndex, hoverIndex);
    },
    [columns]
  );

  let index = 0;

  return (
    <div className="m-4 h-full">
      <div className="flex gap-4 h-full">
        {columns.map((column, columnIndex) => {
          const groupedTasks = tasks.filter((task) => {
            return task.groupName === column.groupName;
          });
          const firstIndex = index;
          index = index + groupedTasks.length;
          return (
            <li key={column.key} className="list-none">
              <Draggable item={column} index={columnIndex} move={moveColumn}>
                <Column
                  item={column}
                  firstIndex={firstIndex}
                  tasks={groupedTasks}
                  updateTasks={updateTasks}
                  deleteTasks={deleteTasks}
                  move={moveTasks}
                ></Column>
              </Draggable>
            </li>
          );
        })}
        <NewColumnButton updateShowModal={updateShowModal}></NewColumnButton>
        <AddAColumnModal
          showModal={showModal}
          updateShowModal={updateShowModal}
          updateNewColumnName={updateColumns}
        ></AddAColumnModal>
      </div>
    </div>
  );
};
