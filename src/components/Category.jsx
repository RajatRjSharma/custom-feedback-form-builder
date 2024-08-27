import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

const Category = ({ value, onChange, options = [], error }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: "100%",
          width: "100%",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {options?.map((_, index) => (
          <Box
            key={index}
            sx={{
              height: "40px",
              paddingX: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: value === _ ? "#849DF4" : "#FFFFFF",
              cursor: "pointer",
              border: "1px solid #DBD6D6",
            }}
            onClick={() => onChange(_)}
          >
            <Typography
              sx={{
                fontSize: "16px",
                color: value === _ ? "#FFFFFF" : "#504F4F",
                fontWeight: 400,
              }}
            >
              {_}
            </Typography>
          </Box>
        ))}
      </Box>
      {error?.trim() && (
        <Typography
          sx={{
            fontSize: "13px",
            color: "#d32f2f",
            fontWeight: 400,
            mt: "2px",
          }}
        >
          {error}
        </Typography>
      )}
    </>
  );
};

Category.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  error: PropTypes.string,
};

export default Category;
