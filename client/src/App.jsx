import {} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PrivateRouting";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Item from "./pages/Item";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        {/* {user && <Navbar />} */}
        <Routes>
          <Route path="/" element={<PrivateRoute component={Item} />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
