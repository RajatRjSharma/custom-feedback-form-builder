import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";

const CreateNewFormDialog = ({ open, handleClose, handleSubmit }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleDialogSubmit = () => {
    if (name?.trim()) {
      handleSubmit({ name });
    } else {
      setError("Enter valid Form Name !");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle variant="h6">Create Feedback Form</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Form Name"
          type="text"
          fullWidth
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ width: "400px" }}
          error={!!error}
          helperText={error}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="text"
          color="primary"
          size="medium"
          onClick={handleDialogSubmit}
        >
          Create
        </Button>
        <Button
          variant="text"
          color="secondary"
          size="medium"
          onClick={handleClose}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNewFormDialog;
