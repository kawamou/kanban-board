import { MenuIcon } from "@heroicons/react/outline";

const AppBar = () => {
  return (
    <div className="flex h-14 items-center bg-[#24292f]">
      <button>
        <MenuIcon className="ml-4 h-6 w-6 text-gray-50"></MenuIcon>
      </button>
      <span className="ml-4 text-gray-50 ">react-kanban-sample</span>
    </div>
  );
};

export default AppBar;
