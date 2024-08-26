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

const formsCollectionRef = collection(db, "forms");
const submissionsCollectionRef = collection(db, "submissions");

export const getForms = () => async (dispatch) => {
  dispatch(setLoader(true));
  try {
    const formsQuery = query(formsCollectionRef, orderBy("createdAt", "desc"));
    const forms = await getDocs(formsQuery);
    dispatch(
      setForms(
        forms?.docs?.map((form) => ({ ...form.data(), id: form.id } || []))
      )
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

export const getForm = (formID) => async (dispatch) => {
  if (formID) {
    dispatch(setLoader(true));
    try {
      const formRef = doc(db, "forms", formID);
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

export const updateForm = (formID, form, navigate) => async (dispatch) => {
  if (formID) {
    dispatch(setLoader(true));
    try {
      delete form.active;
      delete form.id;
      delete form.createdAt;
      const formRef = doc(db, "forms", formID);
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

export const deleteForm = (formID) => async (dispatch) => {
  if (formID) {
    const batch = writeBatch(db);
    dispatch(setLoader(true));
    try {
      const formRef = doc(db, "forms", formID);
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

export const getSubmissions = (formID) => async (dispatch) => {
  if (formID) {
    dispatch(setLoader(true));
    try {
      const formRef = doc(db, "forms", formID);
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
