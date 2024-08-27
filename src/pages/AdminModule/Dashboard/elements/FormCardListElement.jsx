import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

const FormCardListElement = ({ title, value }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Typography sx={{ fontSize: "13px", color: "#8E8E8E", fontWeight: 500 }}>
        {title}
      </Typography>
      <Typography sx={{ fontSize: "13px", color: "#000000", fontWeight: 500 }}>
        {value}
      </Typography>
    </Box>
  );
};

FormCardListElement.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default FormCardListElement;
