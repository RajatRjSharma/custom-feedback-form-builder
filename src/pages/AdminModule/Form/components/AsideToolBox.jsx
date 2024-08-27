import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import AddField from "./AddField";
import EditField from "./EditField";

/**
 * Aside wrapper-up component to display add fields, based on fields and edit field.
 */
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

AsideToolBox.propTypes = {
  showBasedOn: PropTypes.object.isRequired,
  setShowBasedOn: PropTypes.func.isRequired,
};

export default AsideToolBox;
