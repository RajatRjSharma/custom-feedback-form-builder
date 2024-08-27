import { Container, Typography, Box, TextField, Button } from "@mui/material";

/**
 * Simple Contact us page.
 */
const Contact = () => (
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
        Contact Us
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph>
        We’d love to hear from you! Fill out the form below to get in touch with
        us, and we’ll respond as soon as possible.
      </Typography>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="message"
          label="Message"
          name="message"
          multiline
          rows={4}
        />
        <Button variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
          Send Message
        </Button>
      </Box>
    </Box>
  </Container>
);

export default Contact;
