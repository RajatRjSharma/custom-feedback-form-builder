import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/Header";
import NewFormCard from "./components/NewFormCard";
import FormCard from "./components/FormCard";
import CreateNewFormDialog from "./components/CreateNewFormDialog";
import {
  clearEditField,
  clearForm,
  getForms,
  initialState,
  setForm,
} from "../../../store/adminSlice";

/**
 * Admin dashboard component.
 */
const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const { forms } = useSelector((state) => state.admin);

  /**
   * Initial clean and forms fetch.
   */
  useEffect(() => {
    dispatch(clearForm());
    dispatch(clearEditField());
    dispatch(getForms());
  }, [dispatch]);

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        backgroundColor: "#F3F3F3",
      }}
    >
      <Header showToWebsite={true} />
      <main
        style={{
          width: "100%",
          marginTop: "64px",
          backgroundColor: "#F3F3F3",
          height: window.innerHeight - 64 + "px",
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "100%",
            padding: "20px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            gap: 3,
          }}
        >
          <NewFormCard handleClick={() => setOpenDialog(true)} />
          {forms?.map((_, index) => (
            <FormCard key={index} data={_} />
          ))}
        </Box>
        {openDialog && (
          <CreateNewFormDialog
            open={openDialog}
            handleClose={() => setOpenDialog(false)}
            handleSubmit={({ name }) => {
              dispatch(
                setForm({
                  ...initialState?.form,
                  title: name,
                })
              );
              setOpenDialog(false);
              navigate("/admin/form/create");
            }}
          />
        )}
      </main>
    </Box>
  );
};

export default Dashboard;
