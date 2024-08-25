import { Box, Switch, TextField, Typography } from "@mui/material";

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
          setShowBasedOn((_) => ({ ..._, [basedOnValueKey]: e.target.value }))
        }
      />
    </Box>
  );
};

export default BasedOnElement;
