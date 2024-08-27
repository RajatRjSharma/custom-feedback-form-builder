import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const Input = ({
  label,
  type = "text",
  onChange,
  value,
  error,
  disabled = false,
}) => {
  return (
    <TextField
      label={label}
      type={type}
      variant="outlined"
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      error={!!error}
      helperText={error}
      sx={{
        backgroundColor: "#FFFFFF",
        "& .MuiFormHelperText-root": {
          marginLeft: "0px",
        },
      }}
      disabled={disabled}
    />
  );
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(["text", "password", "email", "number", "date"]), // Specify valid input types
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Input;
