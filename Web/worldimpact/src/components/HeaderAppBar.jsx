import React from "react";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../images/sample_logo.png";

const HeaderAppBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="logo"
          component={Link}
          to="/"
        >
          <img src={Logo} alt="logo" style={{ height: "50px" }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderAppBar;