import React from "react";
import { IconLogOut, IconLogo, IconSearch } from "../icons";
import { List } from "../styled/Main";
import { Typography } from "@mui/material";
import { NavbarBig, SearchInput, Span, Ul } from "../styled/NavbarStyles";
import { useNavigate } from "react-router-dom"
import user from "../images/profile_photo.png"

const Navbar = () => {
  const navigate = useNavigate()
  const handleLogOut = () => {
    localStorage.removeItem("key")
    localStorage.removeItem("secret")
    localStorage.removeItem("isLoggedIn")
    navigate("/auth/login")
  };
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
          }}
        >
          <IconLogo />
          <Typography variant="subtitle1" color={"white"}>
            <Span>Books</Span> List
          </Typography>
        </List>
        <List>
          <SearchInput
            placeholder="Search for any training you want"
            startAdornment={<IconSearch />}
          />
        </List>
      </Ul>
      <Ul>
        <List
          onClick={handleLogOut}
          sx={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconLogOut />
        </List>
        <List
          sx={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={user} alt="user" />
        </List>
      </Ul>
    </NavbarBig>
  );
};

export default Navbar;
