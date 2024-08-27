import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";

/**
 * Dialog for create form name.
 */
const CreateNewFormDialog = ({ open, handleClose, handleSubmit }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleDialogSubmit = () => {
    if (name?.trim()) {
      handleSubmit({ name });
    } else {
      setError("Enter valid form title");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleDialogSubmit();
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
          label="Form Title"
          type="text"
          fullWidth
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ width: "400px" }}
          error={!!error}
          helperText={error}
          onKeyDown={handleKeyDown}
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
          color="error"
          size="medium"
          onClick={handleClose}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CreateNewFormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default CreateNewFormDialog;
