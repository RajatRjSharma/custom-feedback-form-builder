import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import backSvg from "../../../../assets/back.svg";
import { useSelector } from "react-redux";
import FormInsights from "./FormInsights";
import FeedBackAccordion from "./FeedBackAccordion";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../../services/helperFunctions";

const SubmissionCard = () => {
  const navigate = useNavigate();
  const { form, submissions } = useSelector((state) => state.admin);

  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        width: "100%",
        boxShadow: 2,
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          height: "60px",
          width: "100%",
          backgroundColor: "#5578F4",
          paddingY: 1,
          paddingX: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Avatar
            alt="back-svg"
            src={backSvg}
            sx={{
              height: "25px",
              width: "17px",
              borderRadius: "0",
              cursor: "pointer",
            }}
            onClick={() => navigate("/admin")}
          />
          <Typography
            sx={{ fontSize: "24px", color: "#FFFFFF", fontWeight: 500 }}
          >
            {form?.title || ""}
          </Typography>
        </Box>
        <Typography
          sx={{ fontSize: "18px", color: "#FFFFFF", fontWeight: 400, mr: 1 }}
        >
          {`Published On : ${
            formatDate(form?.publishedOn) || "Invalid Timestamp"
          }`}
        </Typography>
      </Box>
      <CardContent
        sx={{
          overflowY: "auto",
          width: "100%",
          maxHeight: "calc(100% - 60px)",
          justifyContent: "start",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          padding: 4,
        }}
      >
        {form?.active ? (
          <>
            <FormInsights
              submitted={form.submitted}
              viewed={form.viewed}
              basedOn={form.basedOn}
            />
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
                  fontSize: "20px",
                  color: "#000000",
                  fontWeight: 500,
                  lineHeight: 1,
                }}
              >
                Feedback List
              </Typography>
              {submissions?.map((submission, index) => (
                <FeedBackAccordion
                  key={submission?.id || index}
                  index={index + 1}
                  submission={submission}
                  form={form}
                />
              ))}
            </Box>
          </>
        ) : (
          <Box
            sx={{
              height: window.innerHeight - 210 + "px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontSize: "36px", color: "#5C5858", fontWeight: 500 }}
            >
              Nothing To Show
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default SubmissionCard;
