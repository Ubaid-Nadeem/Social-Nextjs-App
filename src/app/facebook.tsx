"use client";

import RecipeReviewCard from "./Card/card";
import { UserType } from "./usertype";
import "./facebook.css";
import { Unna } from "next/font/google";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import FaceIcon from "@mui/icons-material/Face";

type facebookType = {
  user: UserType | null;
  setUser: (user: any) => void;
};

export default function Facebook({ user }: facebookType) {
  let chr = "";
  function userPostIcon(userName: string) {
    let postIcon = userName.split(" ");
    for (let i = 0; i < postIcon.length; i++) {
      chr += postIcon[i][0];
    }
  }

  userPostIcon(user ? user.userName : "");

  return (
    <>
      <div style={{ marginTop: "100px" }}>
        <div style={{ maxWidth: "100%" }}>
          <h3>Hobbies</h3>
          {/* <Stack direction="row" spacing={1}> */}
          <div
            style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
            className="hobbiesContainer"
          >
            {user?.hobbies.map((hobby,i) => {
              return  <Chip icon={<FaceIcon />} label={hobby} key={i}/>
            })}
          </div>
        </div>

        <h3>Posts</h3>
        <div className="card-container">
          {user?.posts.map((post, index) => {
            return (
              <RecipeReviewCard key={index} userPost={post} postIcon={chr} />
            );
          })}
        </div>
      </div>
    </>
  );
}
