import { createSlice } from "@reduxjs/toolkit";
import {
  getDocs,
  collection,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
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
    publishedOn: "",
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
    const data = await getDocs(formsCollectionRef);
    dispatch(
      setForms(data?.docs?.map((doc) => ({ ...doc.data(), id: doc.id })) || [])
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
    await addDoc(formsCollectionRef, form);
    dispatch(
      setNotification({
        active: true,
        message: `Form saved successfully`,
        type: NotificationType.SUCCESS,
      })
    );
    navigate("/admin");
  } catch (error) {
    dispatch(
      setNotification({
        active: true,
        message: `Error trying to add form`,
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
      const docRef = doc(db, "forms", formID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        dispatch(setForm({ ...docSnap.data(), id: docSnap.id, active: true }));
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
      const docRef = doc(db, "forms", formID);
      await updateDoc(docRef, form);
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
      const submissionsSnapshot = await getDocs(submissionsQuery);

      submissionsSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
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
      const queryForDoc = query(
        submissionsCollectionRef,
        where("form", "==", formRef)
      );
      const data = await getDocs(queryForDoc);
      dispatch(
        setSubmissions(
          data?.docs?.map((doc) => ({
            userResponse: doc.data()?.userResponse,
            id: doc.id,
          })) || []
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