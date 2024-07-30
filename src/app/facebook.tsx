"use client";

import RecipeReviewCard from "./Card/card";
import { UserType } from "./usertype";
import "./facebook.css";
import { Unna } from "next/font/google";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import FaceIcon from "@mui/icons-material/Face";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import { ReactNode } from "react";
import CreateIcon from "@mui/icons-material/Create";

type facebookType = {
  user: UserType | null;
  setUser: (user: any) => void;
};

export default function Facebook({ user, setUser }: facebookType) {
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
        <div style={{ maxWidth: "100%", paddingBottom: "20px" }}>
          <h3>Hobbies</h3>
          <div
            style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
            className="hobbiesContainer"
          >
            {user?.hobbies.length == 0 ? (
              <h4 style={{ textAlign: "center", width: "100%", color: "grey" }}>
                No Hobbies
              </h4>
            ) : (
              user?.hobbies.map((hobby, i) => {
                return <Chip icon={<FaceIcon />} label={hobby} key={i} />;
              })
            )}
            <span style={{cursor:'pointer'}}
              onClick={() => {
                if (user) {
                  let addHobby = prompt("what's your hobby");
                  if (addHobby) {
                    // user.hobbies.push(addHobby as string);
                    // setUser(user);
                  alert(`Your new hobby is ${addHobby}! This feature is comming Soon!!`)
                  }
                }
              }}
            >
              <Chip label="Add Hobbies" color="primary" icon={<AddIcon />} />
            </span>
          </div>

        </div>

        <Divider />

        <div style={{display:'flex',justifyContent:'space-between',width:'100%',alignItems:'center'}}>
          <h3>Posts</h3>
          <span style={{cursor:'pointer'}}>
          <Chip label="Create Post" color="primary" icon={<CreateIcon />} />
          </span>

        </div>
        <div className="card-container">
          {user?.posts.length == 0 ? (
            <h4 style={{ textAlign: "center", width: "100%", color: "grey" }}>
              No Posts
            </h4>
          ) : (
            user?.posts.map((post, index) => {
              return (
                <RecipeReviewCard
                  key={index}
                  userPost={post}
                  postIcon={chr}
                  userName={user.userName}
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
