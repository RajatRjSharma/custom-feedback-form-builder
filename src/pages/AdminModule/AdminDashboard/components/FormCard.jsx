import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import FormSvg from "../../../../assets/form.svg";

const FormCard = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        height: "350px",
        width: "300px",
        boxShadow: 2,
        borderRadius: 2,
        cursor: "pointer",
      }}
    >
      <CardHeader
        sx={{
          backgroundColor: "#F5D563",
          height: "70px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          p: 1.5,
        }}
        avatar={
          <Avatar
            alt="form-svg"
            src={FormSvg}
            sx={{ height: "100%", width: "100%" }}
          />
        }
      />
      <CardContent
        sx={{
          width: "100%",
          height: "calc(100% - 70px)",
          justifyContent: "space-between",
          display: "flex",
          flexDirection: "column",
          paddingY: 1.5,
          "&:last-child": {
            paddingBottom: 1.5,
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            justifyContent: "start",
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          <Typography
            sx={{ fontSize: "20px", color: "#000000", fontWeight: 500 }}
          >
            Delivery
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography
              sx={{ fontSize: "13px", color: "#8E8E8E", fontWeight: 500 }}
            >
              Submitted
            </Typography>
            <Typography
              sx={{ fontSize: "13px", color: "#000000", fontWeight: 500 }}
            >
              10
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography
              sx={{ fontSize: "13px", color: "#8E8E8E", fontWeight: 500 }}
            >
              Viewed
            </Typography>
            <Typography
              sx={{ fontSize: "13px", color: "#000000", fontWeight: 500 }}
            >
              55
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography
              sx={{ fontSize: "13px", color: "#8E8E8E", fontWeight: 500 }}
            >
              Date Published
            </Typography>
            <Typography
              sx={{ fontSize: "13px", color: "#000000", fontWeight: 500 }}
            >
              8/8/2024
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            justifyContent: "start",
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{ fontSize: "15px", fontWeight: 500 }}
            >
              VIEW SUBMISSION
            </Button>
          </Box>
          <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ fontSize: "15px", fontWeight: 500 }}
            >
              EDIT
            </Button>
            <Button
              variant="contained"
              color="success"
              size="large"
              sx={{ fontSize: "15px", fontWeight: 500 }}
            >
              DELETE
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FormCard;
