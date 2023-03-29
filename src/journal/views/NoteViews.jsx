import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Grid, Button, TextField, IconButton } from "@mui/material";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import {
  SaveOutlined,
  UploadOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import { ImageGallery } from "../components";
import { startUploandingFile } from "../../store/journal";
import { useForm } from "../../hooks/useForm";
import { useDateString, useSelectNote } from "../hooks";
import { handleNotes } from "../helpers/handleNotes";

export const NoteViews = () => {
  const {
    active: noteActive,
    mesageSaved,
    isSaving,
  } = useSelector((state) => state.journal);
  const dispatch = useDispatch();

  const [files, setfiles] = useState([]);

  const { body, title, date, onInputChange, formState } = useForm(noteActive);
  const dateString = useDateString(date);
  useSelectNote({ formState, noteActive, setfiles });

  const { onDelete, onSaveNote } = handleNotes({ files });
  const isSavingNote = useMemo(() => isSaving === true, [isSaving]);

  useEffect(() => {
    if (mesageSaved.length > 0) {
      Swal.fire("Tarea guardada!", `${mesageSaved}`, "success");
    }
  }, [mesageSaved]);

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;
    console.log(target.files);

    setfiles(target.files);

    dispatch(startUploandingFile(target.files));
  };

  const fileInputRef = useRef();

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      sx={{ mb: 1 }}
      alignItems="center"
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {" "}
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <input
          type={"file"}
          multiple
          onChange={onFileInputChange}
          style={{ display: "none" }}
          ref={fileInputRef}
        />
        <IconButton
          color="primary"
          disabled={isSavingNote}
          onClick={() => fileInputRef.current.click()}
        >
          <UploadOutlined />
        </IconButton>

        <Button
          color="primary"
          sc={{ padding: 2 }}
          onClick={onSaveNote}
          disabled={isSavingNote}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          label="Titulo"
          placeholder="Ingrese un titulo"
          sx={{ border: "none", mb: 1 }}
          value={title}
          name={"title"}
          onChange={onInputChange}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué sucedio hoy?"
          minRows={5}
          value={body}
          name="body"
          onChange={onInputChange}
        />
      </Grid>
      <Grid container justifyContent="end">
        <Button sx={{ mt: 2 }} color="error" onClick={onDelete}>
          <DeleteOutlined />
          Borrar
        </Button>
      </Grid>
      <ImageGallery />
    </Grid>
  );
};
