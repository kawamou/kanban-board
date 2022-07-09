import { PlusIcon } from "@heroicons/react/outline";

type NewColumnButtonProps = {
  updateShowModal: (showModal: boolean) => void;
};

export const NewColumnButton: React.FC<NewColumnButtonProps> = ({
  updateShowModal,
}) => {
  return (
    <button
      className="border-dashed border-x border-y boder-t border-b w-[335px] h-[103px] hover:underline"
      onClick={() => {
        updateShowModal(true);
      }}
    >
      <div className="flex items-center justify-center">
        <PlusIcon className="w-4 h-4"></PlusIcon>
        <span className="ml-2">Add column</span>
      </div>
    </button>
  );
};
