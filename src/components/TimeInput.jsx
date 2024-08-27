import { TextField } from "@mui/material";

const convertToLocal = (utcTime) => {
  const [hours, minutes] = utcTime.split(":").map(Number);
  const date = new Date();
  date.setUTCHours(hours, minutes, 0, 0);
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const convertToUTC = (localTime) => {
  const [hours, minutes] = localTime.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString().split("T")[1].slice(0, 5);
};

const TimeInput = ({
  label,
  basedOnSwitchKey,
  basedOnValueKey,
  showBasedOn,
  setShowBasedOn,
}) => {
  const handleTimeChange = (e) => {
    const localTime = e.target.value;
    const utcTimeString = convertToUTC(localTime);
    setShowBasedOn((prev) => ({ ...prev, [basedOnValueKey]: utcTimeString }));
  };

  const displayTime = showBasedOn?.[basedOnValueKey]
    ? convertToLocal(showBasedOn[basedOnValueKey])
    : "";

  return (
    <TextField
      autoFocus
      margin="dense"
      id={`${label}-time`}
      label={label}
      type="time"
      fullWidth
      variant="standard"
      sx={{ width: "100%", marginTop: 0 }}
      disabled={!showBasedOn?.[basedOnSwitchKey]}
      value={displayTime}
      InputLabelProps={{ shrink: true }}
      onChange={handleTimeChange}
    />
  );
};

export default TimeInput;