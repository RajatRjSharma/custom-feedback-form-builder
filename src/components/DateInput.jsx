import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const convertToLocal = (utcDate) => {
  const date = new Date(`${utcDate}T00:00:00Z`);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const convertToUTC = (localDate) => {
  const [year, month, day] = localDate.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.toISOString().split("T")[0];
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
