import { Box, Typography } from "@mui/material";
import StatsElement from "../elements/StatsElement";

const FormInsights = ({ submitted, viewed, basedOn }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Box sx={{ width: "100%", height: "100%", display: "flex", gap: 4 }}>
        <StatsElement title={"Views"} value={viewed ?? 0} />
        <StatsElement title={"Submitted"} value={submitted ?? 0} />
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
            color: "#2E2E2E",
            fontWeight: 600,
            lineHeight: 1,
          }}
        >
          {`Page URL contains ${basedOn?.basedOnURL ? basedOn?.url : "--"}`}
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            color: "#2E2E2E",
            fontWeight: 600,
            lineHeight: 1,
          }}
        >
          {`Date: ${basedOn?.basedOnDate ? basedOn?.date : "--"}`}
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            color: "#2E2E2E",
            fontWeight: 600,
            lineHeight: 1,
          }}
        >
          {`Time: ${basedOn?.basedOnTime ? basedOn?.time : "--"}`}
        </Typography>
      </Box>
    </Box>
  );
};

export default FormInsights;
