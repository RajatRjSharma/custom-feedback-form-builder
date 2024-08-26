import { TextField } from "@mui/material";

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

export default Input;
