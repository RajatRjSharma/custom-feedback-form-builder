import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import editDarkSvg from "../assets/edit_dark.svg";
import deleteDarkSvg from "../assets/delete_dark.svg";

const FieldElement = ({
  title,
  handleEdit,
  handleDelete,
  children,
  isEditOn = false,
}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        maxWidth: "500px",
        boxShadow: 2,
        borderRadius: 1,
        backgroundColor: isEditOn ? "#E1E8FF" : "#FFFFFF",
      }}
    >
      <CardHeader
        sx={{
          width: "100%",
          px: 1,
          pt: 1.5,
          pb: 1,
        }}
        title={
          <Typography
            sx={{ fontSize: "14px", color: "#232323", fontWeight: 400 }}
          >
            {title || ""}
          </Typography>
        }
      />
      <CardContent
        sx={{
          width: "100%",
          padding: 1,
          "&:last-child": {
            paddingBottom: 1.5,
          },
        }}
      >
        {children}
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "end",
          gap: 0.5,
          p: 1,
          mr: 0.5,
        }}
      >
        <Avatar
          alt="edit-dark-svg"
          src={editDarkSvg}
          sx={{
            height: "25px",
            width: "25px",
            borderRadius: "0",
            cursor: "pointer",
          }}
          onClick={handleEdit}
        />
        <Avatar
          alt="delete-dark-svg"
          src={deleteDarkSvg}
          sx={{
            height: "25px",
            width: "25px",
            borderRadius: "0",
            cursor: "pointer",
          }}
          onClick={handleDelete}
        />
      </CardActions>
    </Card>
  );
};

export default FieldElement;
