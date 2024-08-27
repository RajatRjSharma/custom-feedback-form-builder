import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import StatsElement from "../elements/StatsElement";

/**
 * Form Insights component to render information for form in submission page.
 */
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

FormInsights.propTypes = {
  submitted: PropTypes.number.isRequired,
  viewed: PropTypes.number.isRequired,
  basedOn: PropTypes.shape({
    basedOnURL: PropTypes.bool,
    url: PropTypes.string,
    basedOnDate: PropTypes.bool,
    date: PropTypes.string,
    basedOnTime: PropTypes.bool,
    time: PropTypes.string,
  }),
};

export default FormInsights;
