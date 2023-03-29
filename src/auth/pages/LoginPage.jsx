import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
} from "@mui/material";
import { Google } from "@mui/icons-material";

import { useForm } from "../../hooks";

import {
  checkingAuthentication,
  starGoogleSignIn,
  starLoginWithEmailPassword,
} from "../../store/auth/thunks";

const formData = { email: "", password: "" };
export const LoginPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm(formData);

  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(checkingAuthentication());

    dispatch(starLoginWithEmailPassword({ email, password }));
  };
  const onGoogleSignIn = () => {
    
    dispatch(starGoogleSignIn());
  };

  return (
    <form onSubmit={onSubmit} className="animate__animated animate__fadeIn">
      <Grid container>
        <Grid item xs={12} sx={{ mt: 4 }}>
          <TextField
            item
            fullWidth
            label="correo"
            type="email"
            placeholder="correo"
            name="email"
            onChange={onInputChange}
            value={email}
          />
        </Grid>

        <Grid item xs={12} sx={{ mt: 4 }}>
          <TextField
            fullWidth
            label="contraseña"
            type="password"
            placeholder="contraseña"
            name="password"
            onChange={onInputChange}
            value={password}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          display={!!errorMessage ? "" : "none"}
          sx={{ mt: 4 }}
        >
          <Alert severity="error">{errorMessage}</Alert>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              type="submit"
              disabled={isAuthenticating}
              fullWidth
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              fullWidth
              onClick={onGoogleSignIn}
              disabled={isAuthenticating}
            >
              <Google />
              <Typography sx={{ ml: 1 }}>Google</Typography>
            </Button>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Link
              component={RouterLink}
              color="inherit"
              to="/auth/register"
              sx={{ mt: 2 }}
            >
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
