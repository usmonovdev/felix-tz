import { ThemeProvider } from "@mui/material/styles";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { CreateAccount, Home, NotFound, SignIn } from "./pages";
import { useEffect } from "react";
import Theme from "./theme";

const ProtectedRoute = ({
  isAllowed,
  redirectPath = "/auth/login",
  children,
}) => {
  if (isAllowed == false || isAllowed?.length < 1 || isAllowed == null) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  useEffect(() => {}, [isLoggedIn]);

  return (
    <ThemeProvider theme={Theme}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isAllowed={isLoggedIn}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/auth/register" element={<CreateAccount />} />
        <Route path="/auth/login" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
