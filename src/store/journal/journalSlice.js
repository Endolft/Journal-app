import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    isEditing: false,
    mesageSaved: "",
    notes: [],
    active: null,
  },
  reducers: {
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isEditing = true;
      state.isSaving = false;
    },
    setActiveNote: (state, action) => {
      state.mesageSaved = "";
      state.active = action.payload;

      state.isSaving = false;
    },
    savingNewNote: (state) => {
      state.isSaving = true;
    },

    setNote: (state, action) => {
      state.notes = action.payload.filter(
        (note) => note.title !== "" || note.body !== ""
      );
      state.notes.temporalImages = [];
    },
    setSaving: (state) => {
      state.isSaving = false;
      //todo msj de error
    },
    updateNote: (state, action) => {
      state.mesageSaved = "";
      state.isSaving = false;
      state.isEditing = false;

      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        }

        return note;
      });
      state.mesageSaved = `${action.payload.title}`;
    },
    setPhotoToActiveNote: (state, action) => {
      if (`${action.payload[0]}`.includes(`blob:http`)) {
        state.active.temporalImages = [
          ...state.active.temporalImages,
          ...action.payload,
        ];

        state.isSaving = false;
        return;
      }
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
      state.active.temporalImages = [];
      state.isSaving = false;
    },
    deletePhoto: (state,action) => {
      if (`${action.payload[0]}`.includes(`blob:http`)) {
        state.active.temporalImages = [
          
          ...action.payload,
        ];

        state.isSaving = false;
        return;
      }
      state.active.imageUrls = [ ...action.payload];
      state.active.temporalImages = [];
      state.isSaving = false;
      
    },
    deleteNoteById: (state, action) => {
      state.active = null;
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    clearNoteLogout: (state) => {
      state.isSaving = false;
      state.isEditing = false;
      state.mesageSaved = "";
      state.notes = [];
      state.active = null;
      state.temporalImages = [];
    },
  },
});
export const {
  addNewEmptyNote,
  clearNoteLogout,
  deleteNoteById,
  deletePhoto,
  setActiveNote,
  savingNewNote,
  setNote,
  setSaving,
  setPhotoToActiveNote,
  updateNote,
} = journalSlice.actions;
