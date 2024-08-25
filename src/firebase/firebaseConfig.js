import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKAimDoeR1RAasLlmDIg_0uMNHTsyeDYc",
  authDomain: "custom-form-96e8b.firebaseapp.com",
  projectId: "custom-form-96e8b",
  storageBucket: "custom-form-96e8b.appspot.com",
  messagingSenderId: "761030814296",
  appId: "1:761030814296:web:8af4e1a24a3e71741cb82d",
  measurementId: "G-V2H2VSL6DS",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
