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
import TransitionsModal from "./Model/postmodel";
import HobbyModel from "./Model/hoobies";
import List from '@mui/material/List';
import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse';


type facebookType = {
  user: UserType | null;
  setUser: (user: any) => void;
};

export default function Facebook({ user, setUser }: facebookType) {
  let chr = "";
  function userPostIcon(userName: string) {
    let postIcon = userName.split(" ");

    for (let i = 0; i < postIcon.length; i++) {
      if (postIcon[i][0] != undefined) {
        chr += postIcon[i][0];
      }
    }
  }

  userPostIcon(user ? user.userName : "");

  const handleDelete = (index: any) => {
    if (user) {
      let updatedHobbies: string[] = user?.hobbies;
      updatedHobbies.splice(index, 1);
      let userClone = { ...user, hobbies: updatedHobbies };
      setUser(userClone);
      localStorage.setItem("activeUser", JSON.stringify({ user: userClone }));

      let getAllUsers: any = JSON.parse(
        localStorage.getItem("socialUsers") as string
      );
      let currentUserIndex = 0;
      getAllUsers.forEach((element: any, index: any) => {
        if (
          user.email === element.email &&
          user.password === element.password
        ) {
          currentUserIndex = index;
        }
      });

      getAllUsers[currentUserIndex] = userClone;
      localStorage.setItem("socialUsers", JSON.stringify(getAllUsers));
    }
  };

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
                return (
                  <Chip
                    label={hobby}
                    onDelete={() => {
                      handleDelete(i);
                    }}
                    key={i}
                    icon={<FaceIcon />}
                    // <Chip label={hobby} key={i}
                  />
                );
              })
            )}
            <span style={{ cursor: "pointer" }}>
              <HobbyModel user={user} setUser={setUser} />
            </span>
          </div>
        </div>

        <Divider />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <h3>Posts</h3>
          <span
            style={{ cursor: "pointer" }}
            // onClick={() => {
            //   let postTitle = prompt("Post Title");
            //   if (postTitle) {
            //     let postDiscription = prompt("Post Discription");
            //     if (postDiscription && user) {
            //       let newPost = {
            //         title: postTitle,
            //         content: postDiscription,
            //         likes: 0,
            //       };
            //       let clonePosts = [newPost, ...user?.posts];
            //       let cloneUser = { ...user, posts: clonePosts };
            //       setUser(cloneUser);
            //     } else {
            //       return;
            //     }
            //   }
            // }}
          >
            {/* <Chip label="Create Post" color="primary" icon={<CreateIcon />} /> */}
            <TransitionsModal setUser={setUser} user={user} />
          </span>
        </div>

        <div className="card-container">
          <div>
            {user?.posts.length == 0 ? (
              <h4 style={{ textAlign: "center", width: "100%", color: "grey" }}>
                No Posts
              </h4>
            ) : (
              <List sx={{ mt: 1 }}>
                <TransitionGroup>
                  {user?.posts.map((post, index) => {
                    return (
                      <Collapse key={index}>
                      <RecipeReviewCard
                        userPost={post}
                        postIcon={chr}
                        userName={user.userName}
                        id={index}
                        user={user}
                        setUser={setUser}
                      />
                    </Collapse>
                    );
                  })}
                </TransitionGroup>
              </List>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
