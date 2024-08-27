import { createSlice } from "@reduxjs/toolkit";
import {
  getDocs,
  collection,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  orderBy,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { setLoader, setNotification } from "./genericSlice";
import { NotificationType } from "../components/Notification/constants";

export const initialState = {
  form: {
    active: false,
    isPublished: false,
    publishedOn: null,
    createdAt: null,
    title: "",
    listOfFields: [],
    submitted: 0,
    viewed: 0,
    basedOn: {
      basedOnURL: false,
      url: "",
      basedOnDate: false,
      date: "",
      basedOnTime: false,
      time: "",
    },
  },
  editField: {
    active: false,
    type: "",
    data: null,
  },
  forms: [],
  submissions: [],
};

/**
 * Admin slice to handle store state for admin module.
 */
export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setForm: (state, action) => {
      state.form = action.payload;
    },
    setListOfFields: (state, action) => {
      state.form.listOfFields = action.payload;
    },
    setEditField: (state, action) => {
      state.editField = action.payload;
    },
    setForms: (state, action) => {
      state.forms = action.payload;
    },
    setSubmissions: (state, action) => {
      state.submissions = action.payload;
    },
    clearForm: (state) => {
      state.form = { ...initialState?.form };
    },
    clearListOfFields: (state) => {
      state.form.listOfFields = [];
    },
    clearEditField: (state) => {
      state.editField = { ...initialState?.editField };
    },
    clearForms: (state) => {
      state.forms = [];
    },
    clearSubmissions: (state) => {
      state.submissions = [];
    },
  },
});

export const {
  setForm,
  setListOfFields,
  setEditField,
  setForms,
  setSubmissions,
  clearForm,
  clearForms,
  clearListOfFields,
  clearEditField,
  clearSubmissions,
} = adminSlice.actions;

export default adminSlice.reducer;

/**
 * Firestore collections refs
 */
const formsCollectionRef = collection(db, "forms");
const submissionsCollectionRef = collection(db, "submissions");

/**
 * Method to fetch forms from firestore store forms collection order by createdAt key.
 */
export const getForms = () => async (dispatch) => {
  dispatch(setLoader(true));
  try {
    const formsQuery = query(formsCollectionRef, orderBy("createdAt", "desc"));
    const forms = await getDocs(formsQuery);
    dispatch(
      setForms(forms?.docs?.map((form) => ({ ...form.data(), id: form.id })))
    );
  } catch (error) {
    dispatch(
      setNotification({
        active: true,
        message: `Error trying to get form list`,
        type: NotificationType.ERROR,
      })
    );
    console.error(error);
  } finally {
    dispatch(setLoader(false));
  }
};

/**
 * Method to add form to firestore store forms collection.
 */
export const addForm = (form, navigate) => async (dispatch) => {
  dispatch(setLoader(true));
  try {
    delete form.active;
    await addDoc(formsCollectionRef, {
      ...form,
      createdAt: new Date().toString(),
    });
    if (navigate) {
      dispatch(
        setNotification({
          active: true,
          message: `Form saved successfully`,
          type: NotificationType.SUCCESS,
        })
      );
      navigate("/admin");
    }
  } catch (error) {
    dispatch(
      setNotification({
        active: true,
        message: `Error trying to save form`,
        type: NotificationType.ERROR,
      })
    );
    console.error(error);
  } finally {
    dispatch(setLoader(false));
  }
};

/**
 * Method to fetch form from firstore store forms collections based on form id.
 */
export const getForm = (formId) => async (dispatch) => {
  if (formId) {
    dispatch(setLoader(true));
    try {
      const formRef = doc(db, "forms", formId);
      const formSnap = await getDoc(formRef);
      if (formSnap.exists()) {
        dispatch(
          setForm({ ...formSnap.data(), id: formSnap.id, active: true })
        );
      } else {
        dispatch(
          setNotification({
            active: true,
            message: `Form not found`,
            type: NotificationType.ERROR,
          })
        );
      }
    } catch (error) {
      dispatch(
        setNotification({
          active: true,
          message: `Error trying to fetch form`,
          type: NotificationType.ERROR,
        })
      );
      console.error(error);
    } finally {
      dispatch(setLoader(false));
    }
  }
};

/**
 * Method to update form to firstore store forms collections based on form id.
 */
export const updateForm = (formId, form, navigate) => async (dispatch) => {
  if (formId) {
    dispatch(setLoader(true));
    try {
      delete form.active;
      delete form.id;
      delete form.createdAt;
      const formRef = doc(db, "forms", formId);
      await updateDoc(formRef, form);
      if (navigate) {
        dispatch(
          setNotification({
            active: true,
            message: `Form updated successfully`,
            type: NotificationType.SUCCESS,
          })
        );
        if (navigate) navigate("/admin");
      }
    } catch (error) {
      dispatch(
        setNotification({
          active: true,
          message: `Error trying to update form`,
          type: NotificationType.ERROR,
        })
      );
      console.error(error);
    } finally {
      dispatch(setLoader(false));
    }
  }
};

/**
 * Method to delete form from firstore store form collections
 * and also delete related submission from submissions collection.
 */
export const deleteForm = (formId) => async (dispatch) => {
  if (formId) {
    const batch = writeBatch(db);
    dispatch(setLoader(true));
    try {
      const formRef = doc(db, "forms", formId);
      const submissionsQuery = query(
        submissionsCollectionRef,
        where("form", "==", formRef)
      );
      const submissionsSnap = await getDocs(submissionsQuery);
      submissionsSnap.forEach((submission) => {
        batch.delete(submission.ref);
      });
      batch.delete(formRef);
      await batch.commit();
      dispatch(
        setNotification({
          active: true,
          message: `Form and related submissions deleted successfully`,
          type: NotificationType.SUCCESS,
        })
      );
      dispatch(getForms());
    } catch (error) {
      dispatch(
        setNotification({
          active: true,
          message: `Error trying to delete form and related submissions`,
          type: NotificationType.ERROR,
        })
      );
      console.error(error);
    } finally {
      dispatch(setLoader(false));
    }
  }
};

/**
 * Method to fetch submissions from firstore store submissions
 * collections order by createdAt key and based on specific form.
 */
export const getSubmissions = (formId) => async (dispatch) => {
  if (formId) {
    dispatch(setLoader(true));
    try {
      const formRef = doc(db, "forms", formId);
      const submissionQuery = query(
        submissionsCollectionRef,
        where("form", "==", formRef),
        orderBy("createdAt", "desc")
      );
      const submissions = await getDocs(submissionQuery);
      dispatch(
        setSubmissions(
          submissions?.docs?.map((submission) => {
            let tempSubmission = {
              ...submission.data(),
              id: submission.id,
            };
            delete tempSubmission.form;
            return tempSubmission;
          })
        )
      );
    } catch (error) {
      dispatch(
        setNotification({
          active: true,
          message: `Error trying to get submissions list`,
          type: NotificationType.ERROR,
        })
      );
      console.error(error);
    } finally {
      dispatch(setLoader(false));
    }
  }
};
