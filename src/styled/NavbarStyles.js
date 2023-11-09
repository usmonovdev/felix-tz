import { styled } from "@mui/system";
import {
  OutlinedInput,
  outlinedInputClasses,
} from "@mui/material";

export const Span = styled("main")(({ theme }) => ({
  color: theme.palette.primary.main,
  display: "inline",
}));

export const SearchInput = styled(OutlinedInput)(({ theme }) => ({
  width: "300px",
  "@media(max-width: 600px)": {
    display: 'none'
  },
  color: "white",
  borderRadius: "4px",
  "input::placeholder": {
    opacity: "10%",
  },
  input: {
    padding: "10px",
  },
  "&:hover": {
    "@media(max-width: 600px)": {
      backgroundColor: theme.palette.secondary.alpha12,
    },
    [`& .${outlinedInputClasses.notchedOutline}`]: {
      border: "none",
    },
  },
  [`& .${outlinedInputClasses.notchedOutline}`]: {
    border: "none",
  },
  [`&.${outlinedInputClasses.focused}`]: {
    backgroundColor: theme.palette.secondary.alpha12,
  },
}));

export const Ul = styled("ul")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: "20px",
}));

export const NavbarBig = styled("nav")(({ theme }) => ({
  height: "80px",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));