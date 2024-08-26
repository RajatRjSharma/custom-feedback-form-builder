import { FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";

const RadioCollection = ({
  name,
  value = null,
  onChange,
  options,
  error,
  disabled = false,
}) => {
  return (
    <>
      <RadioGroup
        name={name}
        value={value}
        onChange={(_) => onChange(_.target.value)}
      >
        {options?.map((_, index) => (
          <FormControlLabel
            key={index}
            value={_}
            control={<Radio />}
            label={_}
            disabled={disabled}
          />
        ))}
      </RadioGroup>
      {error?.trim() && (
        <Typography
          sx={{
            fontSize: "13px",
            color: "#d32f2f",
            fontWeight: 400,
            mt: "2px",
          }}
        >
          {error}
        </Typography>
      )}
    </>
  );
};

export default RadioCollection;
