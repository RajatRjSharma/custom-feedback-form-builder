import { TextField } from "@mui/material";
import PropTypes from "prop-types";

/**
 * Will convert UTC time to local time for display.
 */
const convertToLocal = (utcTime) => {
  try {
    const [hours, minutes] = utcTime.split(":").map(Number);
    const date = new Date();
    date.setUTCHours(hours, minutes, 0, 0);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
};

/**
 * Will convert local time to UTC time for storage.
 */
const convertToUTC = (localTime) => {
  try {
    const [hours, minutes] = localTime.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date.toISOString().split("T")[1].slice(0, 5);
  } catch {
    return "";
  }
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

TimeInput.propTypes = {
  label: PropTypes.string.isRequired,
  basedOnSwitchKey: PropTypes.string.isRequired,
  basedOnValueKey: PropTypes.string.isRequired,
  showBasedOn: PropTypes.object.isRequired,
  setShowBasedOn: PropTypes.func.isRequired,
};

export default TimeInput;
