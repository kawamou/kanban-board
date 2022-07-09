import { MenuIcon } from "@heroicons/react/outline";

const AppBar = () => {
  return (
    <div className="flex items-center h-14 bg-[#24292f]">
      <button>
        <MenuIcon className="ml-4 text-gray-50 h-6 w-6"></MenuIcon>
      </button>
      <span className="ml-4 text-gray-50 ">react-kanban-sample</span>
    </div>
  );
};

export default AppBar;
