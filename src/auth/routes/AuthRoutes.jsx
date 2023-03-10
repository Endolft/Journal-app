import { Route, Routes, Navigate } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { routes } from "./routes";

export const AuthRoutes = () => {
  return (
    <Routes>
      {routes.map(({ path, Component,title}) => {
        return (
          <Route
            path={path}
            key={path}
            element={
              <AuthLayout Title={title}>
                <Component />
              </AuthLayout>
            }
          />
        );
      })}
      <Route path={"/*"} element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
