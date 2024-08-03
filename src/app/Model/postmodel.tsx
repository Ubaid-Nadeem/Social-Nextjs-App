import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { UserType } from "../usertype";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 270,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

type ModelType = {
  user: UserType | null;
  setUser: (e: any) => void;
};

export default function TransitionsModal({ user, setUser }: ModelType) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [postTitle, setPostTitle] = useState<string | undefined>("");
  const [postContent, setPostContent] = useState<string | undefined>("");

  function handleEvent(event: any) {
    if (event.target.name == "postTitle") {
      setPostTitle(event.target.value);
    } else {
      setPostContent(event.target.value);
    }
  }

  function newPost() {
    if (postTitle && user && postContent) {
      if (postTitle?.length > 1 && postContent.length > 1) {
        let post = {
          title: postTitle,
          content: postContent,
          likes: 0,
        };
        let clonePosts = [post, ...user?.posts];
        let cloneUser = { ...user, posts: clonePosts };
        setUser(cloneUser);
        localStorage.setItem("activeUser", JSON.stringify({ user: cloneUser }));

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

        handleClose();
        setPostContent("");
        setPostTitle("");
      } else {
        alert("error : please fill Input Field");
      }
    } else {
      alert("error : please fill Input Field");
    }
  }

  return (
    <div>
      <Button onClick={handleOpen}>Create post</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} >
            <h2>New Post</h2>
            <TextField
              id="outlined-basic"
              label="Post Title"
              variant="outlined"
              fullWidth
              style={{ marginBottom: "20px" }}
              onChange={handleEvent}
              value={postTitle}
              name="postTitle"
            />
            <TextField
              id="outlined-basic"
              label="Post Content"
              variant="outlined"
              fullWidth
              style={{ marginBottom: "20px" }}
              onChange={handleEvent}
              value={postContent}
              name="postContent"
            />

            <Button variant="contained" onClick={newPost}>
              Create
            </Button>
            <Button
              variant="outlined"
              color="error"
              style={{ marginLeft: "10px" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
