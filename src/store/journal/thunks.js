import { doc, setDoc, collection, deleteDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload } from "../../helpers";
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setPhotoToActiveNote,
  setSaving,
  updateNote,
} from "./journalSlice";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    dispatch(savingNewNote({}));

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
      imageUrls: [],
    };

    const newDoc = await doc(collection(FirebaseDB, `${uid}/journal/notes`));

    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const { uid } = getState().auth;
    const { active: noteActive } = getState().journal;

    const noteToFireStore = { ...noteActive };

    delete noteToFireStore.id;

    if (noteActive.title !== "" || noteActive.body !== "") {
      const docRef = doc(FirebaseDB, `${uid}/journal/notes/${noteActive.id}`);

      await setDoc(docRef, noteToFireStore, { merge: true });
    }
    dispatch(updateNote(noteActive));
  };
};

export const startUploandingFile = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());

    /* await fileUpload(files[0]); */

    const fileUploadPromises = [];

    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
      console.log("me estoy disparando");
    }
    const photosUrls = await Promise.all(fileUploadPromises);

    dispatch(setPhotoToActiveNote(photosUrls));
  };
};

export const startDeleteNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: noteActive } = getState().journal;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${noteActive.id}`);

    await deleteDoc(docRef);

    dispatch(deleteNoteById(noteActive.id));
  };
};
