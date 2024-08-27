import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { Navigate, Route, Routes, Link } from "react-router-dom";
import Form from "./Form";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";

/**
 * Website module to handle the user form rendering based on
 * conditions and show website pages like home, about and contact us.
 */
const WebsiteModule = () => {
  return (
    <Form>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Website
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
          <Button color="inherit" component={Link} to="/contact">
            Contact
          </Button>
          <Button color="inherit" component={Link} to="/admin">
            Admin
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/*" element={<Navigate to="" replace />} />
        </Routes>
      </Container>
    </Form>
  );
};

export default WebsiteModule;
