import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useLocationChange from "../../../services/hooks/useLocationChange";
import useDateTime from "../../../services/hooks/useDateTime";
import CustomFormDialog from "../../../components/Dialogs/CustomFormDialog";
import {
  addSubmission,
  clearCurrentForm,
  clearOpenCurrentFormDialog,
  clearPublishedForms,
  getCurrentForm,
  getFormsBasedOnFieldValue,
  setCompletedFormIdsList,
  setOpenCurrentFormDialog,
} from "../../../store/websiteSlice";
import { setNotification } from "../../../store/genericSlice";
import { NotificationType } from "../../../components/Notification/constants";
import {
  isDateEqualWithCurrentDate,
  isTimeEqualToCurrentTime,
} from "../../../services/helperFunctions";

const Form = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocationChange();
  const dateTime = useDateTime();
  const [formResponse, setFormResponse] = useState({});
  const {
    publishedForms,
    currentForm,
    openCurrentFormDialog,
    completedFormIdsList,
  } = useSelector((state) => state.website);

  const setFormResponseState = (listOfFields) => {
    let tempAnsList = {};
    listOfFields?.forEach((_) => {
      if (_?.id) tempAnsList[_?.id] = { value: null, error: "" };
    });
    setFormResponse({ ...tempAnsList });
  };

  const validateAnswers = () => {
    let isValid = true;
    let tempAnsList = { ...formResponse };
    currentForm?.listOfFields?.forEach((_) => {
      if (_?.id)
        if (
          _?.isRequired &&
          !formResponse?.[_?.id]?.value?.toString()?.trim()
        ) {
          isValid = false;
          tempAnsList[_?.id] = {
            ...(tempAnsList[_?.id] || {}),
            error: _?.error,
          };
        } else {
          tempAnsList[_?.id] = { ...(tempAnsList[_?.id] || {}), error: "" };
        }
    });
    setFormResponse(tempAnsList);
    return { isValid, tempAnsList };
  };

  const handleSubmit = () => {
    const { isValid, tempAnsList } = validateAnswers();
    if (isValid) {
      if (tempAnsList && currentForm?.id)
        dispatch(
          addSubmission(
            {
              formId: currentForm?.id,
              formResponse: { ...tempAnsList },
            },
            currentForm?.id
          )
        );
    } else {
      dispatch(
        setNotification({
          active: true,
          message: `Some required fields are empty, Please fill them`,
          type: NotificationType.ERROR,
        })
      );
    }
  };

  useEffect(() => {
    if (dispatch) {
      dispatch(getFormsBasedOnFieldValue("isPublished", true));
    }
  }, [dispatch]);

  useEffect(() => {
    if (publishedForms?.length && location && !openCurrentFormDialog) {
      console.log(publishedForms, location);
      publishedForms?.some((form) => {
        const { basedOnURL, basedOnDate, basedOnTime, url, date, time } =
          form?.basedOn;
        const isUrlTrue = basedOnURL ? location?.href?.includes(url) : false;
        const isDateTrue = basedOnDate
          ? isDateEqualWithCurrentDate(date)
          : false;
        const isTimeTrue = basedOnTime ? isTimeEqualToCurrentTime(time) : false;
        console.log(
          basedOnURL,
          basedOnDate,
          basedOnTime,
          url,
          date,
          time,
          isUrlTrue,
          isDateTrue,
          isTimeTrue,
          completedFormIdsList?.includes(form?.id),
          form?.id
        );
        if (form?.id && !completedFormIdsList?.includes(form?.id))
          if (basedOnDate && basedOnTime && basedOnURL) {
            if (isUrlTrue && isDateTrue && isTimeTrue) {
              dispatch(getCurrentForm(form?.id));
              return true;
            }
          } else if (basedOnDate && basedOnTime) {
            if (isDateTrue && isTimeTrue) {
              dispatch(getCurrentForm(form?.id));
              return true;
            }
          } else if (basedOnTime && basedOnURL) {
            if (isUrlTrue && isTimeTrue) {
              dispatch(getCurrentForm(form?.id));
              return true;
            }
          } else if (basedOnDate && basedOnURL) {
            if (isUrlTrue && isDateTrue) {
              dispatch(getCurrentForm(form?.id));
              return true;
            }
          } else if (basedOnTime) {
            if (isTimeTrue) {
              dispatch(getCurrentForm(form?.id));
              return true;
            }
          } else if (basedOnDate) {
            if (isDateTrue) {
              dispatch(getCurrentForm(form?.id));
              return true;
            }
          } else if (basedOnURL) {
            if (isUrlTrue) {
              dispatch(getCurrentForm(form?.id));
              return true;
            }
          }
        return false;
      });
    }
  }, [
    publishedForms,
    location,
    completedFormIdsList,
    dateTime,
    openCurrentFormDialog,
  ]);

  useEffect(() => {
    if (currentForm?.active && currentForm?.isPublished) {
      setFormResponseState([...(currentForm?.listOfFields || [])]);
      dispatch(setOpenCurrentFormDialog(true));
    }
  }, [currentForm]);

  useEffect(() => {
    return () => {
      dispatch(clearCurrentForm());
      dispatch(clearOpenCurrentFormDialog());
      dispatch(clearPublishedForms());
    };
  }, []);

  return (
    <>
      {children}
      {openCurrentFormDialog &&
        currentForm?.active &&
        currentForm?.isPublished && (
          <CustomFormDialog
            open={
              openCurrentFormDialog &&
              currentForm?.active &&
              currentForm?.isPublished
            }
            handleClose={(formId) => {
              dispatch(setOpenCurrentFormDialog(false));
              if (formId) dispatch(setCompletedFormIdsList(formId));
              dispatch(clearCurrentForm());
            }}
            form={currentForm}
            formResponse={formResponse}
            setFormResponse={setFormResponse}
            handleSubmit={handleSubmit}
          />
        )}
    </>
  );
};

export default Form;
