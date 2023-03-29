import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal";

export const useSelectNote = ({ formState, noteActive, setfiles }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    setfiles([]);
  }, [noteActive.id]);
};
