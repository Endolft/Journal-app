import { doc, collection, deleteDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";

import { saveImages, saveNote } from "../../services/";

import {
  addNewEmptyNote,
  deleteNoteById,
  deleteSavedPhoto,
  savingNewNote,
  setActiveNote,
  setPhotoToActiveNote,
  setSaving,
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

export const startSaveNote = ({ files = [] }) => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    console.log(files);
    await saveImages({ files, dispatch });

    const { uid } = getState().auth;
    const { active: noteActive } = getState().journal;
    const noteToFireStore = { ...noteActive };

    saveNote({ noteToFireStore, noteActive, uid, dispatch });
  };
};

export const deleteImageSaved = (files = []) => {
  return async (dispatch, getState) => {
    //estado para borrar de cloudnary

    dispatch(deleteSavedPhoto(files));
  };
};

export const startUploandingFile = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());

    const filesArray = Object.values(files);

    const filesCodified = [];

    for (const file of filesArray) {
      if (file.type.includes("image")) {
        filesCodified.push(URL.createObjectURL(file));
      }
    }

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
