import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

/**
 * Element to wrap Question and answer display in accordion.
 */
const QuestionAndAnswer = ({ question, submission }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Typography
        sx={{
          fontSize: "14px",
          color: "#232323",
          fontWeight: 400,
          lineHeight: 1,
          wordBreak: "break-all",
          wordWrap: "break-word",
        }}
      >
        {`${question?.title} - (${question?.type?.toUpperCase()})`}
      </Typography>
      <Typography
        sx={{
          fontSize: "14px",
          color: "#2323239E",
          fontWeight: 400,
          lineHeight: 1,
          wordBreak: "break-all",
          wordWrap: "break-word",
        }}
      >
        {`${submission?.formResponse?.[question?.id]?.value || ""}`}
      </Typography>
    </Box>
  );
};

QuestionAndAnswer.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  submission: PropTypes.shape({
    formResponse: PropTypes.objectOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      })
    ),
  }).isRequired,
};

export default QuestionAndAnswer;
