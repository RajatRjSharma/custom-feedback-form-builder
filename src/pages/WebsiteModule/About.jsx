import React from "react";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const About = () => (
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
        About Us
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph>
        Our mission is to provide exceptional services and support to our
        clients. Learn more about our values, vision, and team.
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary="Innovative Solutions"
            secondary="We use the latest technologies to deliver cutting-edge solutions."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Customer-Centric Approach"
            secondary="We prioritize our clients' needs and work closely with them to achieve their goals."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Experienced Team"
            secondary="Our team consists of highly skilled professionals with extensive industry experience."
          />
        </ListItem>
      </List>
    </Box>
  </Container>
);

export default About;
