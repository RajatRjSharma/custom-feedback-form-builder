import { Avatar, Box, Typography } from "@mui/material";
import starSvg from "../assets/star.svg";
import starActiveSvg from "../assets/star_active.svg";

const StarRating = ({ value, onChange, length = 5, error }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: "40px",
          gap: 2,
        }}
      >
        {Array.from({ length }, (_, i) => i + 1).map((_) =>
          _ <= value ? (
            <Avatar
              key={_}
              alt="star-svg"
              src={starActiveSvg}
              sx={{
                height: "30px",
                width: "30px",
                borderRadius: "0",
                cursor: "pointer",
              }}
              onClick={() => onChange(_)}
            />
          ) : (
            <Avatar
              key={_}
              alt="star-active-svg"
              src={starSvg}
              sx={{
                height: "30px",
                width: "30px",
                borderRadius: "0",
                cursor: "pointer",
              }}
              onClick={() => onChange(_)}
            />
          )
        )}
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

export default StarRating;
