import { useAtomValue } from "atomic-state";
import { NOTES } from "atoms";
import AddNote from "components/AddNote";
import Button from "components/Button";
import { useModal } from "components/Modal";
import Note from "components/Note";

export default function Index() {
  const note = useAtomValue(NOTES);
  const { Modal, actions, open } = useModal();

  return (
    <main>
      <Modal>
        <section className="space-y-2">
          <h2 className="font-semibold text-2xl">Add note</h2>
          <AddNote onSave={actions.close} />
        </section>
      </Modal>
      <div className="flex space-x-4 text-sm">
        <a
          className="text-blue-700 border-dotted border-blue-700 border-b-2 py2"
          href="https://github.com/danybeltran/atomic-state-demo"
          target="_blank"
          rel="noreferrer"
        >
          View on Github
        </a>
        <a
          className="text-blue-700 border-dotted border-blue-700 border-b-2 py2"
          href="https://github.com/danybeltran/atomic-state"
          target="_blank"
          rel="noreferrer"
        >
          atomic-state
        </a>
      </div>
      <h2 className="text-4xl font-semibold border-dotted py-4">
        Your local notes
      </h2>
      <p>
        <small>Double tap a note to delete it</small>
      </p>
      <div hidden={open} className="p-4 fixed z-0 bottom-0 right-0 m-2">
        <Button className="md:w-32 md:text-xs" onClick={actions.open}>
          Add note
        </Button>
      </div>
      <section className="py-4 flex flex-wrap">
        {note.map((note) => (
          <Note key={note.datetime} {...note} />
        ))}
      </section>
    </main>
  );
}
