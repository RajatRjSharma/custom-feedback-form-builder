import {
  Avatar,
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import backDarkSvg from "../../../../assets/back_dark.svg";
import {
  clearEditField,
  setForm,
  setListOfFields,
} from "../../../../store/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setNotification } from "../../../../store/genericSlice";
import { NotificationType } from "../../../../components/Notification/constants";

const EditField = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [isRequired, setIsRequired] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [options, setOptions] = useState([]);
  const { editField, form } = useSelector((state) => state.admin);

  useEffect(() => {
    if (editField?.active && editField?.data) {
      setTitle(editField?.data?.title || "");
      setIsRequired(editField?.data?.isRequired || false);
      setErrorMessage(editField?.data?.error || "");
      setOptions(editField?.data?.options || []);
    }
  }, [editField]);

  const handleSave = () => {
    switch (editField?.type) {
      case "field": {
        const index = form?.listOfFields?.findIndex(
          (_) => _?.id === editField?.data?.id
        );
        if (index !== -1 && editField?.data?.id) {
          let updatedList = [...(form?.listOfFields || [])];
          updatedList[index] = {
            ...updatedList[index],
            title,
            isRequired,
            error: errorMessage,
          };
          if (isRequired && !errorMessage?.trim()) {
            dispatch(
              setNotification({
                active: true,
                message: `Enter valid error message or toggle is required`,
                type: NotificationType.ERROR,
              })
            );
            return;
          }
          if (["radio", "category"].includes(editField?.data?.type)) {
            let tempOptions = [...options].filter((_) => _?.trim());
            updatedList[index].options = [...new Set(tempOptions)];
          }
          dispatch(setListOfFields(updatedList));
          dispatch(clearEditField());
        }
        break;
      }
      case "form-title": {
        const updateForm = { ...form };
        updateForm.title = title;
        if (title?.trim()) {
          dispatch(setForm(updateForm));
          dispatch(clearEditField());
        }
        break;
      }
      default: {
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
        }}
        onClick={() => dispatch(clearEditField())}
      >
        <Avatar
          alt="back-dark-svg"
          src={backDarkSvg}
          sx={{
            height: "20px",
            width: "13px",
            borderRadius: "0",
          }}
        />
        <Typography
          sx={{ fontSize: "16px", color: "#4B4949", fontWeight: 600 }}
        >
          Back to Add Fields
        </Typography>
      </Box>
      <TextField
        autoFocus
        margin="dense"
        id={"title-edit-field"}
        label={editField?.type === "form-title" ? "Form Title" : "Title"}
        type={"text"}
        fullWidth
        variant="standard"
        sx={{ width: "100%", marginTop: 0 }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {["radio", "category"].includes(editField?.data?.type) &&
        editField?.type === "field" && (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{ fontSize: "15px", color: "#3F3939", fontWeight: 500 }}
            >
              Options
            </Typography>
            {options?.length > 0 &&
              options?.map((_, index) => (
                <TextField
                  key={index}
                  autoFocus
                  margin="dense"
                  id={"option-field-" + index}
                  label={""}
                  type={"text"}
                  variant="standard"
                  sx={{ width: "70%", marginTop: 0 }}
                  value={options[index]}
                  onChange={(e) => {
                    let tempOptions = [...options];
                    tempOptions[index] = e.target.value;
                    setOptions(tempOptions);
                  }}
                />
              ))}
            <Box>
              <Button
                variant="contained"
                color="inherit"
                size="small"
                sx={{ fontSize: "12px", fontWeight: 500, mt: 1 }}
                onClick={() => {
                  const tempOptions = [...options];
                  tempOptions.push("");
                  setOptions(tempOptions);
                }}
              >
                ADD
              </Button>
            </Box>
          </Box>
        )}
      {editField?.type === "field" && (
        <FormControlLabel
          control={
            <Switch
              checked={isRequired}
              onChange={(e) => {
                setErrorMessage("");
                setIsRequired(e.target.checked);
              }}
            />
          }
          label="Required"
        />
      )}
      {isRequired && editField?.type === "field" && (
        <TextField
          autoFocus
          margin="dense"
          id={"title-edit-field"}
          label={"Error message"}
          type={"text"}
          fullWidth
          variant="standard"
          sx={{ width: "100%", marginTop: 0 }}
          value={errorMessage}
          helperText={"Helper text"}
          disabled={!isRequired}
          onChange={(e) => setErrorMessage(e.target.value)}
        />
      )}
      <Box sx={{ display: "flex", gap: 1.5 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ fontSize: "15px", fontWeight: 500 }}
          onClick={handleSave}
        >
          SAVE
        </Button>
        <Button
          variant="contained"
          color="inherit"
          size="large"
          sx={{ fontSize: "15px", fontWeight: 500 }}
          onClick={() => dispatch(clearEditField())}
        >
          CANCEL
        </Button>
      </Box>
    </>
  );
};

export default EditField;
