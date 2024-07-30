"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { UserType } from "../usertype.js";
import { useState, useEffect } from "react";

type NavbarType = {
  user: UserType | null;
  setUser: (e: any) => void;
  Islogin: (e: any) => void;
};

export default function MenuAppBar({ user, setUser, Islogin }: NavbarType) {
  const [auth, setAuth] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (user) {
      setAuth(true);
    }
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MyApp
          </Typography>

          {auth ? (
            <div>
              <button
                style={{ border: "none", color: "white", background: "none",cursor:'pointer' }}
                onClick={() => {
                  setUser(null);
                  Islogin(false);
                  setAuth(false);
                }}
              >
                Logout
              </button>

              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
                <span style={{ fontSize: "18px", marginLeft: "4px" }}>
                  {user?.userName}
                </span>
              </IconButton>
            </div>
          ) : (
            <>
              <h4 style={{ cursor: "pointer" }}>Login</h4>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
