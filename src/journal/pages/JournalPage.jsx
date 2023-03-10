import { JournalLayout } from "../layout/JournalLayout";
import { NoteViews, NothingSelectedView } from "../views";
import IconButton from "@mui/material/IconButton";
import { AddOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../store/journal/thunks";
import { useMemo } from "react";

export const JournalPage = () => {
  const dispatch = useDispatch();
  const { isSaving, active: noteActive } = useSelector(
    (state) => state.journal
  );
  const itSavingNote = useMemo(() => isSaving === false, [isSaving]);

  const addNote = () => {
    dispatch(startNewNote());
  };
  return (
    <JournalLayout>
      {(!!noteActive )? (
        <NoteViews />
      ) : (
        <NothingSelectedView className="animate__animated animate__fadeIn animate__slow" />
      )}
      <IconButton
        disabled={!itSavingNote}
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.9 },
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
        onClick={addNote}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};
