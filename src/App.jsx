import { ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";
import { CreateAccount, Home, NotFound, SignIn } from "./pages";
import Theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
