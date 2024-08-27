import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import AsideToolBox from "./components/AsideToolBox";
import CreateEditForm from "./components/CreateEditForm";
import {
  getForm,
  setForm,
  addForm,
  updateForm,
  initialState,
  clearForm,
  clearEditField,
} from "../../../store/adminSlice";
import { setNotification } from "../../../store/genericSlice";
import { NotificationType } from "../../../components/Notification/constants";
import { isValidDate, isValidTime } from "../../../services/helperFunctions";

const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { form } = useSelector((state) => state.admin);
  const { id } = useParams();

  const [showBasedOn, setShowBasedOn] = useState({
    basedOnURL: false,
    url: "",
    basedOnDate: false,
    date: "",
    basedOnTime: false,
    time: "",
  });

  const validateBasedOn = () => {
    if (showBasedOn?.basedOnURL && !showBasedOn?.url?.trim()) {
      dispatch(
        setNotification({
          active: true,
          message: `Enter valid based on URL or toggle it before publish`,
          type: NotificationType.ERROR,
        })
      );
      return false;
    }

    if (showBasedOn?.basedOnDate && !isValidDate(showBasedOn?.date?.trim())) {
      dispatch(
        setNotification({
          active: true,
          message: `Enter valid based on date or toggle it before publish`,
          type: NotificationType.ERROR,
        })
      );

      return false;
    }

    if (showBasedOn?.basedOnTime && !isValidTime(showBasedOn?.time?.trim())) {
      dispatch(
        setNotification({
          active: true,
          message: `Enter valid based on time or toggle it before publish`,
          type: NotificationType.ERROR,
        })
      );

      return false;
    }

    if (
      !showBasedOn?.basedOnURL &&
      !showBasedOn?.basedOnDate &&
      !showBasedOn?.basedOnTime
    ) {
      dispatch(
        setNotification({
          active: true,
          message: `At-least one based on is required before publish`,
          type: NotificationType.ERROR,
        })
      );

      return false;
    }

    return true;
  };

  const handleFormSave = () => {
    const payload = { ...form, basedOn: { ...showBasedOn } };
    if (!form?.id) dispatch(addForm(payload, navigate));
    else dispatch(updateForm(form?.id, payload, navigate));
  };

  const handlePublish = () => {
    let payload = {
      ...form,
      isPublished: !form?.isPublished,
      publishedOn: !form?.isPublished ? new Date().toString() : null,
    };
    if (!form?.isPublished) payload.basedOn = { ...showBasedOn };
    if (form?.isPublished || validateBasedOn())
      if (!form?.id) dispatch(addForm(payload, navigate));
      else dispatch(updateForm(form?.id, payload, navigate));
  };

  useEffect(() => {
    if (id === "create") {
      dispatch(
        setForm({
          ...initialState?.form,
          title: form?.title || "",
          active: true,
        })
      );
    } else if (id?.trim()) {
      dispatch(getForm(id?.trim()));
    } else {
      navigate("/admin");
    }
  }, [id, dispatch, navigate, form?.title]);

  useEffect(() => {
    if (form?.basedOn) {
      setShowBasedOn((_) => ({ ..._, ...form?.basedOn }));
    }
  }, [form]);

  useEffect(() => {
    return () => {
      dispatch(clearForm());
      dispatch(clearEditField());
    };
  }, [dispatch]);

  return (
    <Box sx={{ height: "100%", width: "100%", backgroundColor: "#F3F3F3" }}>
      <Header
        showButtons={true}
        handlePublish={handlePublish}
        handleFormSave={handleFormSave}
        form={form}
      />
      <main
        style={{
          height: "100%",
          width: "100%",
          marginTop: "64px",
          backgroundColor: "#F3F3F3",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            height: "100%",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              width: "100%",
              height: window.innerHeight - 64 + "px",
              overflowY: "auto",
              display: "flex",
              justifyContent: "center",
              padding: 4,
            }}
          >
            {form.active && <CreateEditForm />}
          </Box>
          {form.active && (
            <AsideToolBox
              showBasedOn={showBasedOn}
              setShowBasedOn={setShowBasedOn}
            />
          )}
        </Box>
      </main>
    </Box>
  );
};

export default Form;
