import { Box } from "@mui/material";
import Header from "../../../components/Header";
import { useParams } from "react-router-dom";

const AdminForm = () => {
  const param = useParams();
  console.log(param);
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Header showButton={true} />
      <main
        style={{
          height: "100%",
          width: "100%",
          marginTop: "64px",
        }}
      ></main>
    </Box>
  );
};

export default AdminForm;
