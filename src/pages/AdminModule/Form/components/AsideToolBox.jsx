import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import AddField from "./AddField";
import EditField from "./EditField";

const AsideToolBox = ({ showBasedOn, setShowBasedOn }) => {
  const { editField } = useSelector((state) => state.admin);

  return (
    <Box
      sx={{
        width: "400px",
        backgroundColor: "#FFFFFF",
        boxShadow: 2,
        paddingY: 2,
        paddingX: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        height: window.innerHeight - 64 + "px",
        overflowY: "auto",
      }}
    >
      {editField?.active ? (
        <EditField />
      ) : (
        <AddField showBasedOn={showBasedOn} setShowBasedOn={setShowBasedOn} />
      )}
    </Box>
  );
};

export default AsideToolBox;
