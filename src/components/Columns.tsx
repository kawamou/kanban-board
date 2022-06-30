import { Column } from "./Column";
import { NewColumnButton } from "./NewColumnButton";
import { useState, useCallback } from "react";
import { AddAColumnModal } from "../pages/AddAColumnModal";
export const useColumns = (): [
  Item[],
  (name: string) => void,
  (indexI: number, indexJ: number) => void
] => {
  const [columns, setColumns] = useState<Item[]>();

  const updateColumns = (name: string) => {
    const newColumn = {
      key: uuidv4(),
      groupName: name,
      note: "",
      type: ItemTypes.column,
      index: 0,
    };
    setColumns([...(columns ?? []), newColumn]);
  };

  const swapColumns = (indexI: number, indexJ: number) => {
    if (!columns) return;
    const updatedColumns = columns;
    const newUpdatedColumns = updatedColumns.filter(
      (_, index) => index !== indexI
    );
    newUpdatedColumns.splice(indexJ, 0, { ...columns[indexI] });
    setColumns([...newUpdatedColumns]);
  };

  return [columns ?? [], updateColumns, swapColumns];
};
import { Draggable } from "./Draggable";
import { useColumns } from "../hooks/useColumns";

export const useShowModal = (): [boolean, (showModal: boolean) => void] => {
  const [showModal, setShowModal] = useState(false);

  const updateShowModal = (showModal: boolean) => {
    setShowModal(showModal);
  };

  return [showModal, updateShowModal];
};

export type Column = {
  name: string;
  index: number;
  type: ItemTypes;
  tasks: Item[];
};

export const Columns = () => {
  const [columns, updateColumns, swapColumns] = useColumns();

  const [showModal, updateShowModal] = useShowModal();

  const [tasks, updateTasks, moveTasks] = useTasks();

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
        {columns.map((column) => {
          const groupedTasks = tasks.filter((task) => {
            return task.groupName === column.groupName;
          });
          const firstIndex = index;
          index = index + groupedTasks.length;
          return (
            <li key={column.key} className="list-none">
              {/* <Draggable item={column} index={index} move={moveColumn}> */}
              <Column
                item={column}
                firstIndex={firstIndex}
                tasks={groupedTasks}
                updateTasks={updateTasks}
                move={moveTasks}
              ></Column>
              {/* </Draggable> */}
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
