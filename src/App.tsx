import { DndProvider } from "react-dnd";
import AppBar from "./components/AppBar";
import { KanbanBoardPage } from "./pages/KanbanBoardPage";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen">
        <AppBar />
        <div className="mt-8 h-full">
          <KanbanBoardPage />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
