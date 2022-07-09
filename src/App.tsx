import { DndProvider } from "react-dnd";
import AppBar from "./components/AppBar";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Column } from "./components/Column";
import { NewColumnButton } from "./components/NewColumnButton";
import { useState } from "react";
import { AddAColumnModal } from "./components/AddAColumnModal";
import { Draggable } from "./components/Draggable";
import { useColumns } from "./hooks/useColumns";

export const useShowModal = (): [boolean, (showModal: boolean) => void] => {
  const [showModal, setShowModal] = useState(false);

  const updateShowModal = (showModal: boolean) => {
    setShowModal(showModal);
  };

  return [showModal, updateShowModal];
};

const App = () => {
  const [
    columns,
    updateColumns,
    swapColumns,
    tasks,
    updateTasks,
    swapTasks,
    deleteTasks,
  ] = useColumns();

  const [showModal, updateShowModal] = useShowModal();

  let index = 0;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen">
        <AppBar />
        <div className="mt-8 h-full">
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
                    <Draggable
                      item={column}
                      index={columnIndex}
                      swapItems={swapColumns}
                    >
                      <Column
                        item={column}
                        firstIndex={firstIndex}
                        tasks={groupedTasks}
                        updateTasks={updateTasks}
                        deleteTasks={deleteTasks}
                        swapTasks={swapTasks}
                      ></Column>
                    </Draggable>
                  </li>
                );
              })}
              <NewColumnButton
                updateShowModal={updateShowModal}
              ></NewColumnButton>
              <AddAColumnModal
                showModal={showModal}
                updateShowModal={updateShowModal}
                updateNewColumnName={updateColumns}
              ></AddAColumnModal>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
