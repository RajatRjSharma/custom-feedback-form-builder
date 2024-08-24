import React from "react";
import Home from "./Home";
import { Navigate, Route, Routes } from "react-router-dom";

const WebsiteModule = () => {
  return (
    <Routes>
      <Route path="" element={<Home />}></Route>
      <Route path="*" element={<Navigate to="" replace />} />
    </Routes>
  );
};

export default WebsiteModule;
