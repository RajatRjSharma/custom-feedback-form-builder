import { Navigate, Route, Routes } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import AdminForm from "./AdminForm";

const AdminModule = () => (
  <Routes>
    <Route path="" element={<AdminDashboard />}></Route>
    <Route path="form/:id" element={<AdminForm />}></Route>
    <Route path="*" element={<Navigate to="" replace />} />
  </Routes>
);

export default AdminModule;
