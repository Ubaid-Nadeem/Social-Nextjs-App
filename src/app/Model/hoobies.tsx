import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { UserType } from "../usertype";
import Chip from "@mui/material/Chip";
import FaceIcon from "@mui/icons-material/Face";
import AddIcon from "@mui/icons-material/Add";





const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

type ModelType = {
  user: UserType | null;
  setUser: (e: any) => void;
};

export default function HobbyModel({ user, setUser }: ModelType) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newHobby, setNewHobby] = useState<string>("");

  function handleEvent(event: any) {
    setNewHobby(event.target.value);
  }

  function addNewHobby() {
    if (newHobby.length > 1 && user) {
      let cloneHobbies = [...user?.hobbies, newHobby];
      let cloneUser = { ...user, hobbies: cloneHobbies };
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
      setNewHobby("");
    } else {
      alert("please fill Input Field");
    }
  }

  return (
    <div>
      <span onClick={handleOpen}>
      <Chip icon={<AddIcon />} label={"Add Hobbies"} color="primary" />
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
            <h2>Add Hobbies</h2>
            <TextField
              id="outlined-basic"
              label="New Hobby"
              variant="outlined"
              fullWidth
              style={{ marginBottom: "20px" }}
              onChange={handleEvent}
              value={newHobby}
              name="postTitle"
            />

            <Button variant="contained" onClick={addNewHobby}>
              Add
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
