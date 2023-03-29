import { FirebaseDB } from "../firebase/config";
import { updateNote } from "../store/journal/journalSlice";
import { doc, setDoc } from "firebase/firestore/lite";

export const saveNote = async ({
  noteToFireStore,
  noteActive,
  uid,
  dispatch,
}) => {
  delete noteToFireStore.id;
  delete noteToFireStore.temporalImages;

  if (noteActive.title !== "" || noteActive.body !== "") {
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${noteActive.id}`);

    await setDoc(docRef, noteToFireStore, { merge: true });
    dispatch(updateNote(noteActive));
  }
};
