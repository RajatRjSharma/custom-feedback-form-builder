import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import PropTypes from "prop-types";

/**
 * Numeric rating field component.
 */
const NumericRating = ({ value, onChange, length = 10, error }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          border: "1px solid #DBD6D6",
          minHeight: "40px",
        }}
      >
        {Array.from({ length }, (_, i) => i + 1).map((_) => (
          <React.Fragment key={_}>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: value === _ ? "#849DF4" : "#FFFFFF",
                cursor: "pointer",
              }}
              onClick={() => onChange(_)}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  color: value === _ ? "#FFFFFF" : "#645757",
                  fontWeight: 400,
                }}
              >
                {_}
              </Typography>
            </Box>
            {_ !== 10 && (
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  backgroundColor: "#DBD6D6",
                  width: "1px",
                }}
              />
            )}
          </React.Fragment>
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

NumericRating.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  length: PropTypes.number,
  error: PropTypes.string,
};

export default NumericRating;
