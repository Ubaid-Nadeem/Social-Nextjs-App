"use client";

import { useEffect, useState } from "react";
import Facebook from "./facebook";
import Login from "./login";
import { UserType } from "./usertype";
import MenuAppBar from "./Navbar/navbar";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
export default function Home() {
  let [islogin, setIslogin] = useState<boolean>(false);
  const [open, setOpen] = useState(true);

  let [user, setUser] = useState<UserType | null>(null);
  let [isloading, setIsLoading] = useState(true);
  useEffect(() => {
    let getUser = JSON.parse(localStorage.getItem("activeUser") as string);

    if (getUser) {
      setUser(getUser.user);
      setIslogin(true);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {isloading ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            textAlign: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          Loading.....
        </div>
      ) : (
        <>
          <MenuAppBar user={user} setUser={setUser} Islogin={setIslogin} />
          {islogin ? (
            <Facebook user={user} setUser={setUser} />
          ) : (
            <Login
              changeAuthStatus={setIslogin}
              setUser={setUser}
              loading={isloading}
              setLoading={setIsLoading}
            />
          )}
        </>
      )}
    </>
  );
}
