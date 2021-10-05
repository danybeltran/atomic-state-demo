import { NOTES } from "atoms";
import { useState } from "react";
import { useAtomActions } from "atomic-state";
import Button from "./Button";

export default function AddNote({ onSave = () => {} }) {
  const actions = useAtomActions(NOTES);
  const [newNote, setNewNote] = useState<any>({});
  const updateNewNote = (e) => {
    const { name, value } = e.target;
    setNewNote((n) => ({
      ...n,
      [name]: value,
    }));
  };

  return (
    <section>
      <section className="space-y-2 flex flex-wrap">
        <section className="space-y-2 inline-block w-full">
          <label htmlFor="title">
            <small>Title</small>
          </label>
          <input
            id="title"
            name="title"
            className="border resize-none w-full shadow block px-4 py-2 rounded-md focus:outline-none focus:ring-2"
            placeholder="Title"
            value={newNote.title}
            onChange={updateNewNote}
          />
        </section>

        <section className="space-y-2 inline-block w-full">
          <label htmlFor="content">
            <small>Content</small>
          </label>
          <textarea
            id="content"
            name="content"
            className="border resize-none w-full shadow block px-4 py-2 rounded-md focus:outline-none focus:ring-2"
            value={newNote.content}
            placeholder="Content"
            onChange={updateNewNote}
          ></textarea>
        </section>
        <section className="space-y-2 py-4 w-full">
          <Button
            onClick={() => {
              actions.add(newNote);
              setTimeout(() => {
                onSave();
              }, 100);
            }}
            className="w-full shadow-lg px-4 py-2 rounded-md bg-black text-white"
          >
            Save
          </Button>
        </section>
      </section>
    </section>
  );
}
