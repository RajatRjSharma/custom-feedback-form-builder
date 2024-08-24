import { Box } from "@mui/material";
import React, { useState } from "react";
import Header from "../../../components/Header";
import NewFormCard from "./components/NewFormCard";
import FormCard from "./components/FormCard";
import CreateNewFormDialog from "./components/CreateNewFormDialog";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Header />
      <main
        style={{
          height: "100%",
          width: "100%",
          marginTop: "64px",
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
          {a.map(() => (
            <FormCard />
          ))}
        </Box>
        {openDialog && (
          <CreateNewFormDialog
            open={openDialog}
            handleClose={() => setOpenDialog(false)}
            handleSubmit={({ name }) => {
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
