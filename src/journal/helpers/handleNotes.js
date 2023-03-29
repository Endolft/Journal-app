import { useDispatch } from "react-redux";
import { startDeleteNote, startSaveNote } from "../../store/journal";

export const handleNotes = (files) => {
  const dispatch = useDispatch();

  const onSaveNote = () => {
    dispatch(startSaveNote(files));
  };

  const onDelete = () => {
    dispatch(startDeleteNote());
  };

  return { onSaveNote, onDelete };
};
