import { useEffect, useState } from "react";
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
  user: UserType;
  postIndex: number;
  setUser: (e: any) => void;
};

export default function EditPostModel({ user, postIndex,setUser }: ModelType) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [postTitle, setPostTitle] = useState<string>("");
  const [postContent, setPostContent] = useState<string>("");

  useEffect(() => {
    setPostTitle(user?.posts[postIndex].title as string);
    setPostContent(user?.posts[postIndex].content as string);
  }, []);

  function handleEvent(event: any) {
    if (event.target.name == "postTitle") {
      setPostTitle(event.target.value);
    } else {
      setPostContent(event.target.value);
    }
  }

  function updatePost() {
    if (postTitle?.length > 1 && postContent?.length > 1) {
      console.log(postTitle);
      console.log(postContent);
      let post = user?.posts;
      post[postIndex].content = postContent;
      post[postIndex].title = postTitle;
      console.log(post)

      let cloneUser = { ...user, posts: post };
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

      handleClose(  )

    }
  }

  return (
    <div>
      <span onClick={handleOpen}>Edit</span>
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
          <Box sx={style}>
            <h2>Edit Post</h2>
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
              label="Post Content"
              variant="outlined"
              fullWidth
              style={{ marginBottom: "20px" }}
              onChange={handleEvent}
              value={postContent}
              name="postContent"
              multiline
              rows={4}
              id="outlined-multiline-static"
            />

            <Button variant="contained" onClick={updatePost}>
              Save
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
