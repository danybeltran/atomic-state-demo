import { createAtom } from "atomic-state";

type NoteType = {
  id?: string;
  title?: string;
  content?: string;
  datetime?: number;
};

export const NOTES = createAtom<NoteType[]>({
  name: "user-notes",
  default: [],
  localStoragePersistence: true,
  actions: {
    add({ args, dispatch }) {
      const { title, content } = args as NoteType;
      const note: NoteType = {
        id: `${Math.random()}`.split(".")[1],
        title,
        content,
        datetime: Date.now(),
      };
      dispatch((notes) => [note, ...notes]);
    },
    delete({ args, dispatch }) {
      const { id } = args as NoteType;
      dispatch((notes) => notes.filter((note) => note.id !== id));
    },
  },
});
