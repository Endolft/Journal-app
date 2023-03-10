import { LoginPage, RegisterPage } from "../pages";

export const routes = [
  {
    Component: LoginPage,
    path: "login",
    title:"Login"
  },
  {
    Component: RegisterPage,
    path: "register",
    title:"Crear Cuenta"
  },
];
