import React, { useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography, Link, Alert } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "../../hooks";
import { startCreatingWithEmailPassword } from "../../store/auth/thunks";
import { useDispatch, useSelector } from "react-redux";

const formData = {
  email: "",
  password: "",
  displayName: "",
};

const formValidations = {
  email: [(value) => value.includes("@"), "El correo debe de tener un @"],
  password: [
    (value) => value.length >= 6,
    "La contraseña debe de tener mas de 6 caracteres",
  ],
  displayName: [(value) => value.length >= 1, "El nombre es obligatiorio"],
};

export const RegisterPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const dispatch = useDispatch();

  const { status, errorMessage } = useSelector((state) => state.auth);

  const isChekingAuthentication = useMemo(() => status === "cheking", [status]);

  const {
    displayName,
    email,
    password,
    onInputChange,
    formState,
    displayNameValid,
    emailValid,
    passwordValid,
    isFormValid,
  } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;

    dispatch(startCreatingWithEmailPassword({ email, password, displayName }));
  };
  return (
    <form onSubmit={onSubmit} className="animate__animated animate__fadeIn">
      <Grid container>
        <Grid item xs={12} sx={{ mt: 4 }}>
          <TextField
            item
            fullWidth
            label="Nombre Completo"
            type="text"
            placeholder="Tu Nombre"
            name="displayName"
            value={displayName}
            onChange={onInputChange}
            error={!!displayNameValid && formSubmitted}
            helperText={formSubmitted ? displayNameValid : ""}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 4 }}>
          <TextField
            fullWidth
            label="correo"
            type="email"
            placeholder="email"
            name="email"
            value={email}
            onChange={onInputChange}
            error={!!emailValid && formSubmitted}
            helperText={formSubmitted ? emailValid : ""}
          />
        </Grid>

        <Grid item xs={12} sx={{ mt: 4 }}>
          <TextField
            fullWidth
            label="contraseña"
            type="password"
            placeholder="contraseña"
            name="password"
            value={password}
            onChange={onInputChange}
            error={!!passwordValid && formSubmitted}
            helperText={formSubmitted ? passwordValid : ""}
          />
        </Grid>
        <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
          <Grid item xs={12} sm={6} display={!!errorMessage ? "" : "none"}>
            <Alert severity="error">{errorMessage}</Alert>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              fullWidth
              type="submit"
              disabled={isChekingAuthentication}
            >
              Crear cuenta
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
        </Grid>
        <Grid
          container
          justifyContent="end"
          alignItems="center"
          direction="row"
        >
          <Typography sx={{ mr: 1 }}> ya tiene una cuenta?</Typography>
          <Link component={RouterLink} color="inherit" to="/auth/login">
            Ingresar
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};
