import React from "react";
import { IconBell, IconLogo, IconSearch } from "../icons";
import { List } from "../styled/Main";
import {
  Typography
} from "@mui/material";
import { NavbarBig, SearchInput, Span, Ul } from "../styled/NavbarStyles";

const Navbar = () => {
  return (
    <NavbarBig>
      <Ul
        sx={{
          "@media(max-width: 600px)": {
            width: "100%",
          },
        }}
      >
        <List
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "20px",
            "@media(max-width: 600px)": {
              display: "none",
            },
          }}
        >
          <IconLogo />
          <Typography variant="subtitle1" color={"white"}>
            <Span>Books</Span> List
          </Typography>
        </List>
        <List
          sx={{
            "@media(max-width: 600px)": {
              width: "100%"
            },
          }}
        >
          <SearchInput
            placeholder="Search for any training you want"
            startAdornment={<IconSearch />}
          />
        </List>
      </Ul>
      <Ul
        sx={{
          "@media(max-width: 900px)": {
            display: "none",
          },
        }}
      >
        <List sx={{ cursor: "pointer" }}>
          <IconBell />
        </List>
        <List>
          <img src="/src/images/profile_photo.png" alt="user" />
        </List>
      </Ul>
    </NavbarBig>
  );
};

export default Navbar;
