import { TextField } from "@mui/material";

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

export default TextArea;
