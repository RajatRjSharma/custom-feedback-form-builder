import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Form from "./Form";
import Submission from "./Submission";

const AdminModule = () => (
  <Routes>
    <Route path="/" element={<Dashboard />}></Route>
    <Route path="/form/:id" element={<Form />}></Route>
    <Route path="/submission/:id" element={<Submission />}></Route>
    <Route path="/*" element={<Navigate to="" replace />} />
  </Routes>
);

export default AdminModule;
