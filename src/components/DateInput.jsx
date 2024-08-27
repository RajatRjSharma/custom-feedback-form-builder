import { TextField } from "@mui/material";
import PropTypes from "prop-types";

/**
 * Will convert UTC date to local date for display.
 */
const convertToLocal = (utcDate) => {
  try {
    const [year, month, day] = utcDate.split("-").map(Number);
    const date = new Date();
    date.setUTCFullYear(year);
    date.setUTCMonth(month - 1);
    date.setUTCDate(day);
    const localDateString = date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const [dayLocal, monthLocal, yearLocal] = localDateString.split("/");
    return `${yearLocal}-${monthLocal}-${dayLocal}`;
  } catch {
    return "";
  }
};

/**
 * Will convert Local date to UTC date for storage.
 */
const convertToUTC = (localDate) => {
  try {
    const [year, month, day] = localDate.split("-").map(Number);
    const date = new Date();
    date.setFullYear(year);
    date.setMonth(month - 1);
    date.setDate(day);
    const utcDate = new Date(date.toUTCString()).toISOString();
    return utcDate.split("T")[0];
  } catch {
    return "";
  }
};

const DateInput = ({
  label,
  basedOnSwitchKey,
  basedOnValueKey,
  showBasedOn,
  setShowBasedOn,
}) => {
  const handleDateChange = (e) => {
    const localDate = e.target.value;
    const utcDateString = convertToUTC(localDate);
    setShowBasedOn((prev) => ({ ...prev, [basedOnValueKey]: utcDateString }));
  };

  const displayDate = showBasedOn?.[basedOnValueKey]
    ? convertToLocal(showBasedOn[basedOnValueKey])
    : "";

  return (
    <TextField
      autoFocus
      margin="dense"
      id={`${label}-date`}
      label={label}
      type="date"
      fullWidth
      variant="standard"
      sx={{ width: "100%", marginTop: 0 }}
      disabled={!showBasedOn?.[basedOnSwitchKey]}
      value={displayDate}
      InputLabelProps={{ shrink: true }}
      onChange={handleDateChange}
    />
  );
};

DateInput.propTypes = {
  label: PropTypes.string.isRequired,
  basedOnSwitchKey: PropTypes.string.isRequired,
  basedOnValueKey: PropTypes.string.isRequired,
  showBasedOn: PropTypes.object.isRequired,
  setShowBasedOn: PropTypes.func.isRequired,
};

export default DateInput;
