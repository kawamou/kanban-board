import { PlusIcon } from "@heroicons/react/outline";

type NewColumnButtonProps = {
  updateShowModal: (showModal: boolean) => void;
};

export const NewColumnButton: React.FC<NewColumnButtonProps> = ({
  updateShowModal,
}) => {
  return (
    <button
      className="h-[103px] w-[335px] border border-dashed hover:underline"
      onClick={() => {
        updateShowModal(true);
      }}
    >
      <div className="flex items-center justify-center">
        <PlusIcon className="h-4 w-4"></PlusIcon>
        <span className="ml-2">Add column</span>
      </div>
    </button>
  );
};
