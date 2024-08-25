import { Box } from "@mui/material";
import Header from "../../../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import AsideToolBox from "./components/AsideToolBox";
import CreateEditForm from "./components/CreateEditForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getForm,
  setForm,
  addForm,
  updateForm,
} from "../../../store/adminSlice";
import { NotificationType } from "../../../components/Notification/constants";
import { setNotification } from "../../../store/genericSlice";
import {
  isValidDate,
  isValidTime,
  isValidURL,
} from "../../../services/helperFunctions";

const AdminForm = () => {
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
    if (
      !showBasedOn?.basedOnURL ||
      (showBasedOn?.basedOnURL && !isValidURL(showBasedOn?.url?.trim()))
    ) {
      dispatch(
        setNotification({
          active: true,
          message: `Valid based on URL is required before publish`,
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

    if (showBasedOn?.basedOnTime && !showBasedOn?.basedOnDate) {
      dispatch(
        setNotification({
          active: true,
          message: `Based on date is required for based on time before publish`,
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
      publishedOn: !form?.isPublished ? new Date().toDateString() : "",
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
          ...form,
          active: true,
          isPublished: false,
          publishedOn: "",
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
    } else if (id?.trim()) {
      dispatch(getForm(id?.trim()));
    } else {
      navigate("/admin");
    }
  }, [id, dispatch, navigate, getForm]);

  useEffect(() => {
    if (form?.basedOn) {
      setShowBasedOn((_) => ({ ..._, ...form?.basedOn }));
    }
  }, [form]);

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

export default AdminForm;
