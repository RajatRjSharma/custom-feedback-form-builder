import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import GetRespectiveField from "../GetRespectiveField";

/**
 * Main dialog which will render the form for user feedback.
 */
const CustomFormDialog = ({
  open,
  handleClose,
  handleSubmit,
  form,
  formResponse,
  setFormResponse,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => handleClose(form?.id || "")}
      PaperProps={{
        sx: {
          width: "500px",
          boxShadow: 2,
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle
        variant="h6"
        sx={{ backgroundColor: "#5578F4", color: "#FFFFFF", height: "60px" }}
      >
        {form?.title || ""}
      </DialogTitle>
      <DialogContent
        sx={{
          overflowY: "auto",
          width: "100%",
          maxHeight: "calc(100% - 60px)",
          justifyContent: "start",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box sx={{ paddingTop: "8px", width: "100%" }}></Box>
        {form?.listOfFields?.length ? (
          form?.listOfFields?.map((_, index) => (
            <GetRespectiveField
              data={_}
              key={_?.id || index}
              hideActions={true}
              formResponse={formResponse}
              setFormResponse={setFormResponse}
            />
          ))
        ) : (
          <Box
            sx={{
              height: "300px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontSize: "36px", color: "#5C5858", fontWeight: 500 }}
            >
              No Field To Show
            </Typography>
          </Box>
        )}
      </DialogContent>
      {form?.listOfFields?.length > 0 && (
        <DialogActions>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="text"
              color="primary"
              size="large"
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button
              variant="text"
              color="error"
              size="large"
              onClick={() => handleClose(form?.id || "")}
            >
              Cancel
            </Button>
          </Box>
        </DialogActions>
      )}
    </Dialog>
  );
};

CustomFormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  form: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    listOfFields: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
      })
    ),
  }),
  formResponse: PropTypes.object,
  setFormResponse: PropTypes.func.isRequired,
};

export default CustomFormDialog;
