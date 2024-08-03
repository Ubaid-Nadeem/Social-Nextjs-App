"use client";

import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Post, UserType } from "../usertype";
import Divider from "@mui/material/Divider";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import ReplyIcon from "@mui/icons-material/Reply";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditPostModel from "../Model/editpostmodel";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

type UserPost = {
  userPost: Post;
  postIcon: string;
  userName: string;
  id: number;
  user: UserType;
  setUser: (e: any) => void;
};

export default function RecipeReviewCard({
  userPost,
  postIcon,
  userName,
  id,
  user,
  setUser,
}: UserPost) {
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const deletePOst = () => {
    if (user) {
      let updatedPosts = user.posts;
      updatedPosts.splice(id, 1);

      let cloneUser = { ...user, posts: updatedPosts };
      setUser(cloneUser);
      localStorage.setItem("activeUser", JSON.stringify({ user: cloneUser }));
      setAnchorEl(null);

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

      getAllUsers[currentUserIndex] = cloneUser;
      localStorage.setItem("socialUsers", JSON.stringify(getAllUsers));
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const editPost = () => {
    let clonePost = user.posts;
    console.log(clonePost[id]);
  };

  return (
    <>
      <Card sx={{ maxWidth: "100%", margin: "10px" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: blue[800] }} aria-label="recipe">
              {postIcon}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <div>
              <h4 style={{ margin: "0px", padding: "3px" }}>
                {userPost.title}
              </h4>
              <p style={{ margin: "0px", padding: "3px", fontSize: "11px" }}>
                Create by : {userName}
              </p>
            </div>
          }
        />

        <CardContent style={{ height: "content-fit" }}>
          <Typography variant="body2" color="text.secondary">
            {userPost.content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              fontSize: "14px",
              color: "gray",
            }}
          >
            <p
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2px",
              }}
            >
              <ThumbUpIcon /> <span>{userPost.likes}</span>
            </p>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2px",
              }}
            >
              <ModeCommentIcon />
              <span>0</span>
            </p>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2px",
              }}
            >
              <ReplyIcon /> <span>0</span>
            </p>
          </div>
          {/* <IconButton aria-label="add to favorites">
           <FavoriteIcon /> {userPost.likes}
        </IconButton> */}
        </CardActions>
      </Card>
      <div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem>
            <EditPostModel postIndex={id} user={user}/>
          </MenuItem>
          <MenuItem onClick={deletePOst}>Delete</MenuItem>
        </Menu>
      </div>
    </>
  );
}
