import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminModule from "./pages/AdminModule";
import WebsiteModule from "./pages/WebsiteModule";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="admin/*" element={<AdminModule />} />
        <Route path="/*" element={<WebsiteModule />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
