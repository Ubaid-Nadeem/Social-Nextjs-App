"use client";

import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "./login.css";
import { UserType } from "./usertype";
type LoginType = {
  changeAuthStatus: (status: boolean) => void;
  setUser: (user: any) => void;
};

let users = [
  {
    email: "ubaid@gmail.com",
    password: "ubaid123",
    userName: "Ubaid Nadeem",
    posts: [
      {
        title: "Playing Circket",
        content:
          "lLorem ipsum dolor sit amet consectetur adipisicing elit. Saepe velit cum aspernatur numquam asperiores sunt vero eligendi ut ducimus rerum aperiam officiis necessitatibus consequuntur cupiditate, unde voluptates dolore eaque quo!",
        likes: 27,
      },
      {
        title: "Going to picnic",
        content:
          "lLorem ipsum dolor sit amet consectetur adipisicing elit. Saepe velit cum aspernatur numquam asperiores sunt vero eligendi ut ducimus rerum aperiam officiis necessitatibus consequuntur cupiditate, unde voluptates dolore eaque quo!",
        likes: 12,
      },
    ],
    hobbies: [
      "swimming",
      "football",
      "Computer programming",
      "swimming",
      "singing",
      "Learning",
      "Photography",
    ],
  },
  {
    email: "moiz@gmail.com",
    password: "moiz123",
    userName: "Moiz",
    posts: [
      {
        title: "Going to picnic",
        content:
          "lLorem ipsum dolor sit amet consectetur adipisicing elit. Saepe velit cum aspernatur numquam asperiores sunt vero eligendi ut ducimus rerum aperiam officiis necessitatibus consequuntur cupiditate, unde voluptates dolore eaque quo!",
        likes: 6,
      },
    ],
    hobbies: [
      "Computer programming",
      "swimming",
      "singing",
      "Learning",
      "Photography",
      "Video Game",
      "Hiking",
    ],
  },
];

export default function Login({ changeAuthStatus, setUser }: LoginType) {
  let [userEmail, setUserEmail] = useState("");
  let [userPassword, setUserPassword] = useState("");
  let [signupName, setSignupName] = useState("");
  let [signupEmail, setSignupEmail] = useState("");
  let [signupPassword, setSignupPassword] = useState("");

  const [isLogin, setIslogin] = useState(true);

  // type userType = {
  //   userName: string,
  //   email: string,
  //   password: string,
  //   posts: [
  //     {
  //       title: "",
  //       content: "",
  //       likes: 10,
  //     },
  //   ],
  //   hobbies: "",
  // }

  function getUserNameAndPassword(e: any) {
    if (e.target.name == "email") {
      setUserEmail(e.target.value);
    } else {
      setUserPassword(e.target.value);
    }
  }

  function loginHandler() {
    let [userFound] = users.filter(
      (user) => user.email === userEmail && user.password === userPassword
    );

    if (userFound) {
      changeAuthStatus(true);
      setUser(userFound);
    }
    else{
      alert('Incorrect email and password tryagain.')
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
    alert("feature is comming soon!");
    // let newUser: UserType = {
    //   userName: signupName,
    //   email: signupEmail,
    //   password: signupPassword,
    //   posts: [],
    //   hobbies: [],
    // };
    // users.push(newUser);
    // alert("Your account is Created!");
    // console.log(users);
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

          {/* <input
        type="text"
        placeholder="Email"
        name="email"
       
      />
      <input
        type="text"
        placeholder="password"
        name="password"
        }
      />
      <button >Login</button> */}
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
