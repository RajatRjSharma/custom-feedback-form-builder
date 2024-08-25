import { createSlice } from "@reduxjs/toolkit";
import {
  getDocs,
  collection,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { setLoader, setNotification } from "./genericSlice";
import { NotificationType } from "../components/Notification/constants";

const initialState = {
  form: {
    active: false,
    isPublished: false,
    title: "",
    listOfFields: [],
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
  },
});

export const {
  setForm,
  setListOfFields,
  setEditField,
  setForms,
  clearForm,
  clearForms,
  clearListOfFields,
  clearEditField,
} = adminSlice.actions;

export default adminSlice.reducer;

const formsCollectionRef = collection(db, "forms");

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

export const getForm = (id) => async (dispatch) => {
  if (id) {
    dispatch(setLoader(true));
    try {
      const docRef = doc(db, "forms", id);
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

export const updateForm = (id, form, navigate) => async (dispatch) => {
  if (id) {
    dispatch(setLoader(true));
    try {
      delete form.active;
      delete form.id;
      const docRef = doc(db, "forms", id);
      await updateDoc(docRef, form);
      dispatch(
        setNotification({
          active: true,
          message: `Form updated successfully`,
          type: NotificationType.SUCCESS,
        })
      );
      navigate("/admin");
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

export const deleteForm = (id) => async (dispatch) => {
  if (id) {
    dispatch(setLoader(true));
    try {
      const docRef = doc(db, "forms", id);
      await deleteDoc(docRef);
      dispatch(
        setNotification({
          active: true,
          message: `Form deleted successfully`,
          type: NotificationType.SUCCESS,
        })
      );
      dispatch(getForms());
    } catch (error) {
      dispatch(
        setNotification({
          active: true,
          message: `Error trying to delete form`,
          type: NotificationType.ERROR,
        })
      );
      console.error(error);
    } finally {
      dispatch(setLoader(false));
    }
  }
};
