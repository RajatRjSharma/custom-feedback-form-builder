import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Plus from "../../../../assets/plus.svg";

/**
 * Add new form card component to display as first card in admin dashboard.
 */
const NewFormCard = ({ handleClick }) => {
  return (
    <Card
      onClick={handleClick}
      variant="outlined"
      sx={{
        height: "350px",
        width: "300px",
        boxShadow: 2,
        borderRadius: 2,
        cursor: "pointer",
      }}
    >
      <CardContent
        sx={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Box
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Avatar
            alt="add-form"
            src={Plus}
            sx={{ height: "60px", width: "60px" }}
          />
          <Typography
            sx={{ fontSize: "32px", color: "#000000", fontWeight: 500 }}
          >
            New Form
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

NewFormCard.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default NewFormCard;
