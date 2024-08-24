import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Avatar } from "@mui/material";
import logo from "../assets/logo.svg";

const Header = ({ showButtons = false }) => {
  return (
    <AppBar
      position="fixed"
      sx={{ height: "64px", backgroundColor: "#FFFFFF" }}
    >
      <Toolbar>
        <Box
          sx={{ display: "flex", gap: 1, flexGrow: 1, alignItems: "center" }}
        >
          <Avatar alt="logo" src={logo} sx={{ height: "60px" }} />
          <Typography
            variant="h6"
            color={"#262626"}
            fontSize={"24px"}
            fontWeight={500}
          >
            User FeedBack
          </Typography>
        </Box>
        {showButtons && (
          <Box sx={{ display: "flex", gap: 3 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ fontSize: "15px", fontWeight: 500 }}
            >
              SAVE
            </Button>
            <Button
              variant="contained"
              color="success"
              size="large"
              sx={{ fontSize: "15px", fontWeight: 500 }}
            >
              PUBLISH
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
