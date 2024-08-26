import React from "react";
import Home from "./Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Form from "./Form";

const WebsiteModule = () => {
  return (
    <Form>
      <Routes>
        <Route path="" element={<Home />}></Route>
        <Route path="*" element={<Navigate to="" replace />} />
      </Routes>
    </Form>
  );
};

export default WebsiteModule;
