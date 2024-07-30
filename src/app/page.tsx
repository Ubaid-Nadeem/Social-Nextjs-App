"use client";

import { useEffect, useState } from "react";
import Facebook from "./facebook";
import Login from "./login";
import { UserType } from "./usertype";
import MenuAppBar from "./Navbar/navbar";
export default function Home() {
  let [islogin, setIslogin] = useState<boolean>(false);
  // let [userHobbies,setUserHobbies] = useState([])
  let [user, setUser] = useState<UserType | null>(null);


  return (
    <>
      <MenuAppBar user={user} setUser={setUser} Islogin={setIslogin} />
      {islogin ? (
        <Facebook user={user} setUser={setUser} />
      ) : (
        <Login changeAuthStatus={setIslogin} setUser={setUser} />
      )}
    </>
  );
}
