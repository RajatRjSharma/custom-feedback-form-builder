import { Box, Typography } from "@mui/material";

const StatsElement = ({ title, value }) => {
  return (
    <Box
      sx={{
        width: "150px",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: "64px",
          color: "#010101",
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {value ?? 0}
      </Typography>
      <Typography
        sx={{
          fontSize: "24px",
          color: "#676767",
          fontWeight: 400,
          lineHeight: 1,
        }}
      >
        {title || "--"}
      </Typography>
    </Box>
  );
};

export default StatsElement;
