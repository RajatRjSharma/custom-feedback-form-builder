import { Avatar, Box, Typography } from "@mui/material";
import face1Svg from "../assets/face1.svg";
import face2Svg from "../assets/face2.svg";
import face3Svg from "../assets/face3.svg";
import face4Svg from "../assets/face4.svg";
import face5Svg from "../assets/face5.svg";

const SmileyRating = ({ value, onChange, error }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: "40px",
          gap: 2,
        }}
      >
        <Avatar
          alt="face1-svg"
          src={face1Svg}
          sx={{
            height: "40px",
            width: "40px",
            cursor: "pointer",
            backgroundColor: value === 1 ? "#849DF4" : "#FFFFFF",
            border: value === 1 ? "2px solid #849DF4" : "none",
          }}
          onClick={() => onChange(1)}
        />
        <Avatar
          alt="face2-svg"
          src={face2Svg}
          sx={{
            height: "40px",
            width: "40px",
            cursor: "pointer",
            backgroundColor: value === 2 ? "#849DF4" : "#FFFFFF",
            border: value === 2 ? "2px solid #849DF4" : "none",
          }}
          onClick={() => onChange(2)}
        />
        <Avatar
          alt="face3-svg"
          src={face3Svg}
          sx={{
            height: "40px",
            width: "40px",
            cursor: "pointer",
            backgroundColor: value === 3 ? "#849DF4" : "#FFFFFF",
            border: value === 3 ? "2px solid #849DF4" : "none",
          }}
          onClick={() => onChange(3)}
        />
        <Avatar
          alt="face4-svg"
          src={face4Svg}
          sx={{
            height: "40px",
            width: "40px",
            cursor: "pointer",
            backgroundColor: value === 4 ? "#849DF4" : "#FFFFFF",
            border: value === 4 ? "2px solid #849DF4" : "none",
          }}
          onClick={() => onChange(4)}
        />
        <Avatar
          alt="face5-svg"
          src={face5Svg}
          sx={{
            height: "40px",
            width: "40px",
            cursor: "pointer",
            backgroundColor: value === 5 ? "#849DF4" : "#FFFFFF",
            border: value === 5 ? "2px solid #849DF4" : "none",
          }}
          onClick={() => onChange(5)}
        />
      </Box>
      {error?.trim() && (
        <Typography
          sx={{
            fontSize: "13px",
            color: "#d32f2f",
            fontWeight: 400,
            ml: 2,
            mt: "2px",
          }}
        >
          {error}
        </Typography>
      )}
    </>
  );
};

export default SmileyRating;
