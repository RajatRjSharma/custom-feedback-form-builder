import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import QuestionAndAnswer from "../elements/QuestionAndAnswer";
import { formatDate } from "../../../../services/helperFunctions";

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
            {`Accordion ${index}`}
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

export default FeedBackAccordion;
