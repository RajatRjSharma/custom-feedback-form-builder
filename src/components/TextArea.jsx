import { TextField } from "@mui/material";

const TextArea = ({ label, rows = 4, onChange, value, error }) => {
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
      sx={{ backgroundColor: "#FFFFFF" }}
    />
  );
};

export default TextArea;
