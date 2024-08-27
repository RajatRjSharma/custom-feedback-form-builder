import { Box, Switch, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import DateInput from "../../../../components/DateInput";
import TimeInput from "../../../../components/TimeInput";

/**
 * Element to handle based on components.
 */
const BasedOnElement = ({
  title,
  showBasedOn,
  setShowBasedOn,
  basedOnSwitchKey,
  basedOnValueKey,
  label,
  type,
  shrink = {},
}) => {
  const textField = () => {
    switch (type) {
      case "date": {
        return (
          <DateInput
            label={label}
            basedOnSwitchKey={basedOnSwitchKey}
            basedOnValueKey={basedOnValueKey}
            showBasedOn={showBasedOn}
            setShowBasedOn={setShowBasedOn}
          />
        );
      }
      case "time": {
        return (
          <TimeInput
            label={label}
            basedOnSwitchKey={basedOnSwitchKey}
            basedOnValueKey={basedOnValueKey}
            showBasedOn={showBasedOn}
            setShowBasedOn={setShowBasedOn}
          />
        );
      }
      default: {
        return (
          <TextField
            autoFocus
            margin="dense"
            id={label + "-" + type}
            label={label}
            type={type}
            fullWidth
            variant="standard"
            sx={{ width: "100%", marginTop: 0 }}
            disabled={!showBasedOn?.[basedOnSwitchKey]}
            value={showBasedOn?.[basedOnValueKey]}
            InputLabelProps={{ ...shrink }}
            onChange={(e) =>
              setShowBasedOn((_) => ({
                ..._,
                [basedOnValueKey]: e.target.value,
              }))
            }
          />
        );
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography
          sx={{ fontSize: "14px", color: "#4C4545", fontWeight: 500 }}
        >
          {title}
        </Typography>
        <Switch
          checked={showBasedOn?.[basedOnSwitchKey]}
          onChange={(e) =>
            setShowBasedOn((_) => ({
              ..._,
              [basedOnValueKey]: "",
              [basedOnSwitchKey]: e.target.checked,
            }))
          }
        />
      </Box>
      {textField()}
    </Box>
  );
};

BasedOnElement.propTypes = {
  title: PropTypes.string.isRequired,
  showBasedOn: PropTypes.object.isRequired,
  setShowBasedOn: PropTypes.func.isRequired,
  basedOnSwitchKey: PropTypes.string.isRequired,
  basedOnValueKey: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "date", "time", "number", "email", "url"])
    .isRequired,
  shrink: PropTypes.object,
};

export default BasedOnElement;
