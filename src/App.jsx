import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminModule from "./pages/AdminModule";
import WebsiteModule from "./pages/WebsiteModule";
import Notification from "./components/Notification";
import Loader from "./components/Loader";

/**
 * Custom user feedback app with two modules, admin and website.
 */
const App = () => {
  const { loader } = useSelector((state) => state.generic);
  return (
    <Router>
      {loader && <Loader />}
      <Notification />
      <Routes>
        <Route path="admin/*" element={<AdminModule />} />
        <Route path="/*" element={<WebsiteModule />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
