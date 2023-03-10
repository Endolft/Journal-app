import { Routes, Route, Navigate } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { useCheckAuth } from "../hooks";
import { ChekingAuth } from "../ui";
import { JournalRoutes } from "../journal/routes/JournalRoutes";

export const AppRouter = () => {

  const {status}=useCheckAuth()
  if (status === "checking") {
    return <ChekingAuth />;
  }
  return (
    <Routes>
      {status !== "authenticated" ? (
        <Route path="/auth/*" element={<AuthRoutes />} />
      ) : (
        <Route path="/*" element={<JournalRoutes />} />
      )}

      <Route path="/*" element={<Navigate to="auth/login" />} />
    </Routes>
  );
};
