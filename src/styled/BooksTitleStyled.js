import { styled } from "@mui/system";
import {
  OutlinedInput,
  outlinedInputClasses,
} from "@mui/material";

export const Span = styled("span")(({ theme }) => ({
  color: theme.palette.primary.main,
  display: "inline",
}));

export const SearchInput = styled(OutlinedInput)(({ theme }) => ({
  width: "300px",
  backgroundColor: theme.palette.background.paper,
  "@media(max-width: 600px)": {
    width: "100%",
  },
  border: `2px solid ${theme.palette.action.hover}`,
  color: theme.palette.common.black,
  borderRadius: "4px",
  "input::placeholder": {
    opacity: "70%",
  },
  input: {
    padding: "10px",
  },
  "&:hover": {
    backgroundColor: theme.palette.background.paper,
    [`& .${outlinedInputClasses.notchedOutline}`]: {
      border: "none",
    },
  },
  [`& .${outlinedInputClasses.notchedOutline}`]: {
    border: "none",
  },
  [`&.${outlinedInputClasses.focused}`]: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export const Ul = styled("ul")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: 'center',
  gap: "20px",
  "@media(max-width: 600px)": {
    flexDirection: 'column',
    alignItems: 'start',
    gap: '10px',
    width: '100%'
  },
}));

export const Section = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  "@media(max-width: 900px)": {
    flexDirection: 'column',
    alignItems: 'start',
    gap: '20px'
  },
}))