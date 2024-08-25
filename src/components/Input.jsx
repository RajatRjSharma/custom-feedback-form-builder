import { TextField } from "@mui/material";

const Input = ({ label, type = "text", onChange, value, error }) => {
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
      sx={{ backgroundColor: "#FFFFFF" }}
    />
  );
};

export default Input;
