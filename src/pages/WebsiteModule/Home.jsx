import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * Simple about us page.
 */
const Home = () => {
  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to Our Website
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          We provide top-notch services and solutions to meet your needs.
          Explore our pages to learn more about what we do and how we can help
          you achieve your goals.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/contact")}
        >
          Contact Us
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
