import { Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "../../../components/Header";
import SubmissionCard from "./components/SubmissionCard";
import { getForm, getSubmissions } from "../../../store/adminSlice";

/**
 * Parent for submission card.
 */
const Submission = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  /**
   * Initial form submission fetch based on param :id.
   */
  useEffect(() => {
    if (id?.trim()) {
      dispatch(getForm(id?.trim()));
      dispatch(getSubmissions(id?.trim()));
    } else {
      navigate("/admin");
    }
  }, [id, dispatch, navigate]);

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
          height: window.innerHeight - 64 + "px",
          marginTop: "64px",
          backgroundColor: "#F3F3F3",
          padding: "20px",
        }}
      >
        <SubmissionCard></SubmissionCard>
      </main>
    </Box>
  );
};

export default Submission;
