import { doc, setDoc, collection, deleteDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload } from "../../helpers";
import {
  addNewEmptyNote,
  deleteNoteById,
  deletePhoto,
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
      temporalImages: [],
    };

    const newDoc = await doc(collection(FirebaseDB, `${uid}/journal/notes`));

    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startSaveNote = (files = []) => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }
    const photosUrls = await Promise.all(fileUploadPromises);

    dispatch(setPhotoToActiveNote(photosUrls));

    const { uid } = getState().auth;
    const { active: noteActive } = getState().journal;
    const noteToFireStore = { ...noteActive };

    delete noteToFireStore.id;
    delete noteToFireStore.temporalImages;

    if (noteActive.title !== "" || noteActive.body !== "") {
      const docRef = doc(FirebaseDB, `${uid}/journal/notes/${noteActive.id}`);

      await setDoc(docRef, noteToFireStore, { merge: true });
    }
    dispatch(updateNote(noteActive));
  };
};

export const deleteImagebyUrl = (files=[]) => {
  return async (dispatch, getState) => {

   
    dispatch(deletePhoto(files))

  };
};

export const startUploandingFile = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());

    const filesCodified = [];

    for (const file of files) {
      filesCodified.push(URL.createObjectURL(file));
    }

    /*   const fileUploadPromises = [];

    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    
    }
    const photosUrls = await Promise.all(fileUploadPromises);  */

    dispatch(setPhotoToActiveNote(filesCodified));
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
