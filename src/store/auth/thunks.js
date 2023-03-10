import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmail,
  singInWithGoogle,
} from "../../firebase/providers";
import { loadNotes } from "../../helpers";
import { clearNoteLogout, setNote } from "../journal";
import { chekingCredentials, login, logout } from "./authSlices";

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(chekingCredentials());
  };
};

export const starGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(chekingCredentials());
    const result = await singInWithGoogle();
    if (!result.ok) {
      return dispatch(logout(result.errorMessage));
    }
    dispatch(login(result));
  };
};

export const startCreatingWithEmailPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch(chekingCredentials());

    const { ok, uid, photoURL, errorMessage } = await registerUserWithEmail({
      email,
      password,
      displayName,
    });

    if (!ok) {
      return dispatch(logout({ errorMessage }));
    }
    dispatch(login({ email, displayName, uid, photoURL }));
  };
};

export const starLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(chekingCredentials());

    const { ok, uid, photoURL, displayName, errorMessage } =
      await loginWithEmailPassword({ email, password });

    if (!ok) {
      return dispatch(logout({ errorMessage }));
    }
    dispatch(login({ email, displayName, uid, photoURL }));
  };
};

export const startLogOut = () => {
  return async (dispatch) => {
    await logoutFirebase();

    dispatch(logout());
    dispatch(clearNoteLogout());
  };
};

export const startLoandingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    if (!uid) {
      throw new Error(" el uid no existe");
    }
    const { notes } = await loadNotes(uid);

    dispatch(setNote(notes));
  };
};
