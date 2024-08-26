import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSubmission,
  getCurrentForm,
  getFormsBasedOnFieldValue,
  setOpenCurrentFormDialog,
} from "../../../store/websiteSlice";
import { setNotification } from "../../../store/genericSlice";
import CustomFormDialog from "../../../components/Dialogs/CustomFormDialog";
import { NotificationType } from "../../../components/Notification/constants";

const Form = ({ children }) => {
  const dispatch = useDispatch();
  const [currentFormIndex, setCurrentFormIndex] = useState(0);
  const [formResponse, setFormResponse] = useState({});
  const { publishedForms, currentForm, openCurrentFormDialog } = useSelector(
    (state) => state.website
  );

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
    if (
      publishedForms?.length &&
      publishedForms[currentFormIndex]?.id &&
      publishedForms[currentFormIndex]?.isPublished
    ) {
      dispatch(getCurrentForm(publishedForms[currentFormIndex]?.id));
    }
  }, [publishedForms]);

  useEffect(() => {
    if (currentForm?.active && currentForm?.isPublished) {
      setFormResponseState([...(currentForm?.listOfFields || [])]);
      dispatch(setOpenCurrentFormDialog(true));
    }
  }, [currentForm]);

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
            handleClose={() => dispatch(setOpenCurrentFormDialog(false))}
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
