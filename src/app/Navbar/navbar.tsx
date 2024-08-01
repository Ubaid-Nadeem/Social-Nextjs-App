"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { UserType } from "../usertype.js";
import { useState, useEffect } from "react";
import "./navbar.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import DehazeIcon from "@mui/icons-material/Dehaze";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
type NavbarType = {
  user: UserType | null;
  setUser: (e: any) => void;
  Islogin: (e: any) => void;
};

export function TemporaryDrawer({ user, logOutUser }: any) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
      >
        <AccountCircle />
        <span style={{ fontSize: "18px", marginLeft: "4px" }}>
          {user?.userName}
        </span>
      </IconButton>
      <Divider />
      <List>
        {["All Post", "Create Post", "About"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <PowerSettingsNewIcon />
          </ListItemIcon>
          <ListItemText primary={"Logout"} onClick={logOutUser} />
        </ListItemButton>
      </ListItem>
    </Box>
  );

  return (
    <div>
      <DehazeIcon onClick={toggleDrawer(true)} style={{ cursor: "pointer" }} />

      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

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

  const logOutUser = () => {
    setUser(null);
    Islogin(false);
    setAuth(false);
    localStorage.removeItem("activeUser");
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
              <div className="Nav-sidebar-web">
                <button
                  style={{
                    border: "none",
                    color: "white",
                    background: "none",
                    cursor: "pointer",
                  }}
                  onClick={logOutUser}
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
              <div className="Nav-sidebar-mobile">
                <TemporaryDrawer user={user} logOutUser={logOutUser} />
              </div>
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
