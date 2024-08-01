"use client";

import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "./login.css";
import { UserType } from "./usertype";
import { json } from "stream/consumers";
type LoginType = {
  changeAuthStatus: (status: boolean) => void;
  setUser: (user: any) => void;
  loading: boolean;
  setLoading: (e: any) => void;
};

export default function Login({
  changeAuthStatus,
  setUser,
  loading,
  setLoading,
}: LoginType) {
  let [userEmail, setUserEmail] = useState("");
  let [userPassword, setUserPassword] = useState("");
  let [signupName, setSignupName] = useState("");
  let [signupEmail, setSignupEmail] = useState("");
  let [signupPassword, setSignupPassword] = useState("");
  let [allUsers, setAllUsers] = useState<UserType[] | null>(null);

  const [isLogin, setIslogin] = useState(true);

  useEffect(() => {
    setLoading(true);
    console.log("connected");
    let getAllUsers = JSON.parse(localStorage.getItem("socialUsers") as string);
    setAllUsers(getAllUsers);
    setLoading(false)
  }, []);

  function getUserNameAndPassword(e: any) {
    if (e.target.name == "email") {
      setUserEmail(e.target.value);
    } else {
      setUserPassword(e.target.value);
    }
  }

  function loginHandler() {
    setLoading(true);
    
    let getAllUsers: UserType[] | null = JSON.parse(
      localStorage.getItem("socialUsers") as string
    );
    
    setAllUsers(getAllUsers);

    if (getAllUsers) {
      let [userFound] = getAllUsers.filter(
        (user) => user.email === userEmail && user.password === userPassword
      );
      if (userFound) {
        changeAuthStatus(true);
        setUser(userFound);
        setLoading(false);
        let activeUser = {
          user: userFound,
        };
        localStorage.setItem("activeUser", JSON.stringify(activeUser));
      } else {
        alert("Incorrect email and password tryagain.");
      }
    } else {
      setLoading(false);
      alert("User Not Found");
    }
  }

  function signUpHandler(e: any) {
    if (e.target.name == "name") {
      setSignupName(e.target.value);
    } else if (e.target.name == "email") {
      setSignupEmail(e.target.value);
    } else {
      setSignupPassword(e.target.value);
    }
  }

  function changeAuthMethod() {
    setIslogin(!isLogin);
  }

  function createAccout() {
    if (signupName.length >= 3) {
      if (signupEmail.length > 1) {
        if (signupPassword.length > 5) {
          let newUser = {
            userName: signupName,
            email: signupEmail,
            password: signupPassword,
            posts: [],
            hobbies: [],
          };
          if (allUsers == null) {
            let cloneUsers = [newUser];
            allUsers = cloneUsers;
            localStorage.setItem("socialUsers", JSON.stringify(cloneUsers));
            alert("Your Account is created! You can login now");
            setIslogin(!isLogin);
          } else {
            let cloneUsers = [...allUsers, newUser];
            allUsers = cloneUsers;
            localStorage.setItem("socialUsers", JSON.stringify(cloneUsers));
            alert("Your Account is created! You can login now");
            setIslogin(!isLogin);
          }
        } else {
          alert("Weak Password! enter a atleast 5 characters");
        }
      } else {
        alert("Invalid email");
      }
    } else {
      alert("Invalid Name");
    }
  }
  return (
    <>
      {isLogin ? (
        <div id="loginContainer">
          <h2>Login</h2>
          <TextField
            className="inputField"
            // helperText="Please enter your name"
            id="demo-helper-text-aligned"
            label="Email"
            onChange={getUserNameAndPassword}
            value={userEmail}
            name="email"
          />
          <TextField
            className="inputField"
            helperText=" "
            id="demo-helper-text-aligned-no-helper"
            label="Password"
            type="password"
            onChange={getUserNameAndPassword}
            value={userPassword}
            name="password"
          />
          <br />
          <Button variant="contained" onClick={loginHandler}>
            login
          </Button>

          <p style={{ fontSize: "15px" }}>
            Sign up your account{" "}
            <span
              style={{
                textDecoration: "underline",
                color: "blue",
                cursor: "pointer",
              }}
              onClick={changeAuthMethod}
            >
              Sign up
            </span>{" "}
          </p>
        </div>
      ) : (
        <div id="signUpContainer">
          <h2>Sign Up</h2>
          <TextField
            className="inputField"
            id="demo-helper-text-aligned"
            label="Name"
            name="name"
            value={signupName}
            onChange={signUpHandler}
          />

          <TextField
            className="inputField"
            id="demo-helper-text-aligned"
            label="Email"
            name="email"
            value={signupEmail}
            onChange={signUpHandler}
          />
          <TextField
            className="inputField"
            helperText=" "
            id="demo-helper-text-aligned-no-helper"
            label="Password"
            type="password"
            name="password"
            value={signupPassword}
            onChange={signUpHandler}
          />
          <br />
          <Button variant="contained" onClick={createAccout}>
            Sign up
          </Button>

          <p>
            I have already account{" "}
            <span
              style={{
                textDecoration: "underline",
                color: "blue",
                cursor: "pointer",
              }}
              onClick={changeAuthMethod}
            >
              Login here
            </span>
          </p>
        </div>
      )}{" "}
    </>
  );
}
