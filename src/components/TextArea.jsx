import { TextField } from "@mui/material";
import PropTypes from "prop-types";

/**
 * Textarea field component.
 */
const TextArea = ({
  label,
  rows = 4,
  onChange,
  value,
  error,
  disabled = false,
}) => {
  return (
    <TextField
      label={label}
      multiline
      rows={rows}
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

TextArea.propTypes = {
  label: PropTypes.string,
  rows: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool,
};

export default TextArea;
