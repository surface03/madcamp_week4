import React from "react";
import { AppBar, Toolbar, IconButton, Tabs, Tab } from "@mui/material";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/sample_logo.png";

import TopicTabs from "./TopicTabs";

const HeaderAppBar = ({
  mainTopics,
}) => {
  const navigate = useNavigate();

  const gradientStyle = {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    width: '1234px'
  };

  // Check if the user is logged in
  const userId = sessionStorage.getItem('user');
  const isLoggedIn = userId !== null;

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/signup");
  };

  const handleLogoutClick = () => {
    // Implement logout logic here
    sessionStorage.removeItem('user');
    navigate("/");
  };

  const handleMyPageClick = () => {
    navigate("/mypage"); // Replace with actual mypage route
  };

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <Link to="/">
          <img src={Logo} alt="Logo" style={{ cursor: "pointer" }} />
        </Link>
      </div>
      <AppBar position="static" style={gradientStyle}>
        <Toolbar>
          <TopicTabs
            mainTopics={mainTopics}
            style={{ marginLeft: '100px' }}
          />

          {isLoggedIn ? (
            <>
              <Button
                type="primary"
                style={{ marginLeft: "auto" }}
                onClick={handleLogoutClick}
              >
                Logout
              </Button>
              <Button onClick={handleMyPageClick}>
                My Page
              </Button>
            </>
          ) : (
            <>
              <Button
                type="primary"
                style={{ marginLeft: "auto" }}
                onClick={handleLoginClick}
              >
                Login
              </Button>
              <Button onClick={handleRegisterClick}>
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: '64px' }}></div>
    </>
  );
};

export default HeaderAppBar;
