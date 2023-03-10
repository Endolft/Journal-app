import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    mesageSaved: "",
    notes: [],
    active: null,
  },
  reducers: {
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);

      state.isSaving = false;
    },
    setActiveNote: (state, action) => {
      state.mesageSaved = "";
      state.active = action.payload;
    },
    savingNewNote: (state) => {
      state.isSaving = true;
    },

    setNote: (state, action) => {
      state.notes = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      //todo msj de error
    },
    updateNote: (state, action) => {
      state.mesageSaved = "";
      state.isSaving = false;

      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        }

        return note;
      });
      state.mesageSaved = `${action.payload.title}, actualizado correctamente`;
    },
    setPhotoToActiveNote: (state, action) => {
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
      state.isSaving = false;
    },
    deleteNoteById: (state, action) => {
      state.active= null;
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    clearNoteLogout: (state) => {
      state.isSaving = false;
      state.mesageSaved = "";
      state.notes = [];
      state.active = null;
    },
  },
});
export const {
  addNewEmptyNote,
  clearNoteLogout,
  deleteNoteById,
  setActiveNote,
  savingNewNote,
  setNote,
  setSaving,
  setPhotoToActiveNote,
  updateNote,
} = journalSlice.actions;
