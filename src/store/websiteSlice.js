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
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { setLoader, setNotification } from "./genericSlice";
import { NotificationType } from "../components/Notification/constants";

const initialState = {
  publishedForms: [],
  currentForm: {
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
  openCurrentFormDialog: false,
  completedFormIdsList: [],
};

/**
 * Website slice to handle store state for website module.
 */
const websiteSlice = createSlice({
  name: "website",
  initialState,
  reducers: {
    setPublishedForms: (state, action) => {
      state.publishedForms = action.payload;
    },
    setCurrentForm: (state, action) => {
      state.currentForm = action.payload;
    },
    setOpenCurrentFormDialog: (state, action) => {
      state.openCurrentFormDialog = action.payload;
    },
    setCompletedFormIdsList: (state, action) => {
      state.completedFormIdsList = [
        ...state.completedFormIdsList,
        action.payload,
      ];
    },
    clearPublishedForms: (state) => {
      state.publishedForms = [];
    },
    clearCurrentForm: (state) => {
      state.currentForm = { ...initialState?.currentForm };
    },
    clearOpenCurrentFormDialog: (state) => {
      state.openCurrentFormDialog = false;
    },
    clearCompletedFormIdsList: (state) => {
      state.completedFormIdsList = [];
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
  setCompletedFormIdsList,
  clearCompletedFormIdsList,
} = websiteSlice.actions;

export default websiteSlice.reducer;

/**
 * Firestore collections refs
 */
const formsCollectionRef = collection(db, "forms");
const submissionsCollectionRef = collection(db, "submissions");

/**
 * Method to fetch forms from firestore store forms collection order by
 * createdAt key and based on field value like isPublished to true in this case.
 */
export const getFormsBasedOnFieldValue =
  (fieldName, fieldValue) => async (dispatch) => {
    dispatch(setLoader(true));
    try {
      const formsQuery = query(
        formsCollectionRef,
        where(fieldName, "==", fieldValue),
        orderBy("createdAt", "desc")
      );
      const forms = await getDocs(formsQuery);
      dispatch(
        setPublishedForms(
          forms?.docs?.map((form) => ({ ...form.data(), id: form.id })) || []
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

/**
 * Method to fetch form from firestore store forms collection based on form id
 * for user responses.
 */
export const getCurrentForm = (formId) => async (dispatch) => {
  if (formId) {
    dispatch(setLoader(true));
    try {
      const formRef = doc(db, "forms", formId);
      const formSnap = await getDoc(formRef);
      if (formSnap.exists()) {
        dispatch(
          setCurrentForm({ ...formSnap.data(), id: formSnap.id, active: true })
        );
        dispatch(incrementFormFieldByOne(formId, "viewed"));
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
 * Method to add user response submission to firestore store submissions
 * collection and add ref to form for which submission is made.
 */
export const addSubmission = (userResponse, formId) => async (dispatch) => {
  if (formId) {
    dispatch(setLoader(true));
    try {
      const formRef = doc(db, "forms", formId);
      await addDoc(submissionsCollectionRef, {
        ...userResponse,
        form: formRef,
        createdAt: new Date().toString(),
      });
      dispatch(
        setNotification({
          active: true,
          message: `Form submitted successfully`,
          type: NotificationType.SUCCESS,
        })
      );
      dispatch(setOpenCurrentFormDialog(false));
      dispatch(incrementFormFieldByOne(formId, "submitted"));
      dispatch(setCompletedFormIdsList(formId));
      dispatch(clearCurrentForm());
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

/**
 * Method to increment the field value in firestore forms collection by 1.
 */
export const incrementFormFieldByOne =
  (formId, incrementField) => async (dispatch) => {
    if (formId) {
      dispatch(setLoader(true));
      try {
        const formRef = doc(db, "forms", formId);
        await updateDoc(formRef, { [incrementField]: increment(1) });
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
