import { useAtomActions } from "atomic-state";
import { NOTES } from "atoms";
import Button from "./Button";
import { useModal } from "./Modal";

export default function Note(props) {
  const noteActions = useAtomActions(NOTES);
  const { Modal, actions } = useModal();

  return (
    <>
      <Modal>
        <h2 className="text-2xl font-semibold">Delete note</h2>
        <p>¿Delete note &quot;{props.title}&quot;?</p>
        <div className="py-4 space-y-2 flex space-x-3">
          <Button
            onClick={() => {
              noteActions.delete(props);
              setTimeout(() => {
                actions.close();
              }, 100);
            }}
          >
            Yes
          </Button>
          <Button onClick={actions.close} className="bg-white text-gray-900">
            No
          </Button>
        </div>
      </Modal>
      <div
        onDoubleClick={(e) => {
          e.preventDefault();
          actions.open();
        }}
        key={props.datetime}
        className="w-full md:w-1/3 p-2"
      >
        <div className="rounded-md shadow-md h-full p-4 hover:bg-gray-50 cursor-pointer">
          <h2 className="text-lg font-semibold">{props.title}</h2>
          <small>{props.content}</small>
        </div>
      </div>
    </>
  );
}
