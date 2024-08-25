import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import NewFormCard from "./components/NewFormCard";
import FormCard from "./components/FormCard";
import CreateNewFormDialog from "./components/CreateNewFormDialog";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearEditField,
  clearForm,
  getForms,
  setForm,
} from "../../../store/adminSlice";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const { forms } = useSelector((state) => state.admin);

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
      <Header />
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
                  active: true,
                  isPublished: false,
                  title: name,
                  listOfFields: [],
                  basedOn: {
                    basedOnURL: false,
                    url: "",
                    basedOnDate: false,
                    date: "",
                    basedOnTime: false,
                    time: "",
                  },
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

export default AdminDashboard;
