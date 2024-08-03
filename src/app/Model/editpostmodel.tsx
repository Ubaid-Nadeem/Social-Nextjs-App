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
  postIndex: number;
};

export default function EditPostModel({ user, postIndex }: ModelType) {
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

  function updatePost() {
    console.log(postTitle, postContent);
  }

  return (
    <div>
        <span onClick={handleOpen}>
        Edit
        </span>
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
              id="outlined-basic"
              label="Post Content"
              variant="outlined"
              fullWidth
              style={{ marginBottom: "20px" }}
              onChange={handleEvent}
              value={postContent}
              name="postContent"
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
