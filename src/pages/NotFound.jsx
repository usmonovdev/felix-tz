import React from "react";
import { IconPageNotFound } from "../icons";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";

const Main = styled("main")({
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "30px",
});

const NotFound = () => {
  const navigate = useNavigate();
  const reloadPage = () => {
    window.location.reload();
  };
  
  return (
    <Main>
        <IconPageNotFound />
      <Box sx={{ display: "flex", flexDirection: "row", gap: "20px" }}>
        <Button onClick={() => navigate("/")} variant="contained">
          Go Home Page
        </Button>
        <Button onClick={reloadPage} variant="outlined">
          Reload Page
        </Button>
      </Box>
    </Main>
  );
};

export default NotFound;
