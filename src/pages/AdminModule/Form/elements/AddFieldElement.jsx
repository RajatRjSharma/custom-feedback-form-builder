import { Avatar, Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import plusSvg from "../../../../assets/plus.svg";

const AddFieldElement = ({
  image,
  title,
  isSmallSize,
  initialData,
  handleClick,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        cursor: "pointer",
        "&:hover": {
          textDecoration: "underline",
        },
        height: "30px",
      }}
      onClick={() => handleClick(initialData)}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "30px", display: "flex", justifyContent: "center" }}>
          <Avatar
            alt="text-area-svg"
            src={image}
            sx={{
              height: isSmallSize ? "25px" : "30px",
              width: isSmallSize ? "25px" : "30px",
              borderRadius: "0",
            }}
          />
        </Box>
        <Typography
          sx={{ fontSize: "16px", color: "#2B2B2B", fontWeight: 400 }}
        >
          {title}
        </Typography>
      </Box>
      <Avatar
        alt="plus-svg"
        src={plusSvg}
        sx={{ height: "25px", width: "25px" }}
      />
    </Box>
  );
};

AddFieldElement.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isSmallSize: PropTypes.bool,
  initialData: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
};

export default AddFieldElement;
