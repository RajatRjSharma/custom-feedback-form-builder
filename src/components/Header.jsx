import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

/**
 * Header component for admin.
 */
const Header = ({
  showButtons = false,
  handlePublish = () => {},
  handleFormSave = () => {},
  form,
  showToWebsite = false,
}) => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      sx={{ height: "64px", backgroundColor: "#FFFFFF" }}
    >
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexGrow: 1,
            alignItems: "center",
          }}
        >
          <Avatar
            alt="logo"
            src={logo}
            sx={{ height: "60px", cursor: "pointer" }}
            onClick={() => navigate("/admin")}
          />
          <Typography
            variant="h6"
            color={"#262626"}
            fontSize={"24px"}
            fontWeight={500}
          >
            User FeedBack
          </Typography>
        </Box>
        {showButtons && (
          <Box sx={{ display: "flex", gap: 3 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ fontSize: "15px", fontWeight: 500 }}
              onClick={handleFormSave}
            >
              {form?.id ? "UPDATE" : "SAVE"}
            </Button>
            <Button
              variant="contained"
              color="success"
              size="large"
              sx={{ fontSize: "15px", fontWeight: 500 }}
              onClick={handlePublish}
            >
              {form?.isPublished ? "UN-PUBLISH" : "PUBLISH"}
            </Button>
          </Box>
        )}
        {showToWebsite && (
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ fontSize: "15px", fontWeight: 500 }}
            onClick={() => navigate("/")}
          >
            WEBSITE
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  showButtons: PropTypes.bool,
  handlePublish: PropTypes.func,
  handleFormSave: PropTypes.func,
  form: PropTypes.shape({
    id: PropTypes.string,
    isPublished: PropTypes.bool,
  }),
  showToWebsite: PropTypes.bool,
};

export default Header;
