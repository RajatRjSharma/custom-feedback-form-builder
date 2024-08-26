import { createSlice } from "@reduxjs/toolkit";
import {
  getDocs,
  collection,
  query,
  where,
  doc,
  getDoc,
  addDoc,
  increment,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { setLoader, setNotification } from "./genericSlice";
import { NotificationType } from "../components/Notification/constants";

const initialState = {
  publishedForms: [],
  currentForm: {
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
  openCurrentFormDialog: false,
};

const websiteSlice = createSlice({
  name: "website",
  initialState,
  reducers: {
    setPublishedForms: (state, action) => {
      state.publishedForms = action.payload;
    },
    clearPublishedForms: (state) => {
      state.publishedForms = [];
    },
    setCurrentForm: (state, action) => {
      state.currentForm = action.payload;
    },
    clearCurrentForm: (state) => {
      state.currentForm = { ...initialState?.currentForm };
    },
    setOpenCurrentFormDialog: (state, action) => {
      state.openCurrentFormDialog = action.payload;
    },
    clearOpenCurrentFormDialog: (state) => {
      state.openCurrentFormDialog = false;
    },
  },
});

export const {
  setPublishedForms,
  clearPublishedForms,
  setCurrentForm,
  clearCurrentForm,
  setOpenCurrentFormDialog,
  clearOpenCurrentFormDialog,
} = websiteSlice.actions;

export default websiteSlice.reducer;

const formsCollectionRef = collection(db, "forms");
const submissionsCollectionRef = collection(db, "submissions");

export const getFormsBasedOnFieldValue =
  (fieldName, fieldValue) => async (dispatch) => {
    dispatch(setLoader(true));
    try {
      const queryForDoc = query(
        formsCollectionRef,
        where(fieldName, "==", fieldValue)
      );
      const data = await getDocs(queryForDoc);
      dispatch(
        setPublishedForms(
          data?.docs?.map((doc) => ({ ...doc.data(), id: doc.id })) || []
        )
      );
    } catch (error) {
      dispatch(
        setNotification({
          active: true,
          message: `Error trying to get form list based on field`,
          type: NotificationType.ERROR,
        })
      );
      console.error(error);
    } finally {
      dispatch(setLoader(false));
    }
  };

export const getCurrentForm = (formID) => async (dispatch) => {
  if (formID) {
    dispatch(setLoader(true));
    try {
      const docRef = doc(db, "forms", formID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        dispatch(
          setCurrentForm({ ...docSnap.data(), id: docSnap.id, active: true })
        );
        dispatch(incrementFormFieldByOne(formID, "viewed"));
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

export const addSubmission = (userResponse, formID) => async (dispatch) => {
  if (formID) {
    dispatch(setLoader(true));
    try {
      const formRef = doc(db, "forms", formID);
      await addDoc(submissionsCollectionRef, { userResponse, form: formRef });
      dispatch(
        setNotification({
          active: true,
          message: `Form submitted successfully`,
          type: NotificationType.SUCCESS,
        })
      );
      dispatch(setOpenCurrentFormDialog(false));
      dispatch(incrementFormFieldByOne(formID, "submitted"));
    } catch (error) {
      dispatch(
        setNotification({
          active: true,
          message: `Error trying to submit form`,
          type: NotificationType.ERROR,
        })
      );
      console.error(error);
    } finally {
      dispatch(setLoader(false));
    }
  }
};

export const incrementFormFieldByOne =
  (formID, incrementField) => async (dispatch) => {
    if (formID) {
      dispatch(setLoader(true));
      try {
        const docRef = doc(db, "forms", formID);
        await updateDoc(docRef, { [incrementField]: increment(1) });
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
