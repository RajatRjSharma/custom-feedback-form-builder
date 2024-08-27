import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import QuestionAndAnswer from "../elements/QuestionAndAnswer";
import { formatDate } from "../../../../services/helperFunctions";

/**
 * Feedback accordion component to render user submission details.
 */
const FeedBackAccordion = ({ index, submission, form }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              color: "#254AA8",
              fontWeight: 400,
              lineHeight: 1,
            }}
          >
            {`Feedback ${index}`}
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              color: "#000000",
              fontWeight: 400,
              lineHeight: 1,
              mr: 1,
            }}
          >
            {formatDate(submission?.createdAt) || "Invalid Timestamp"}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {form?.listOfFields?.map((question, index) => (
            <QuestionAndAnswer
              key={question?.id || index}
              question={question}
              submission={submission}
            />
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

FeedBackAccordion.propTypes = {
  index: PropTypes.number.isRequired,
  submission: PropTypes.shape({
    createdAt: PropTypes.string,
  }).isRequired,
  form: PropTypes.shape({
    listOfFields: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default FeedBackAccordion;
