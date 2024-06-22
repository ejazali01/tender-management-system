import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgetPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Home from "./pages/Home";
import VerifyOtp from "./pages/auth/VerifyOtp";
import Layout from "./pages/layout";
// import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";
import DashboardLayout from "./pages/admin/DashboardLayout";
import AllQuatation from "./components/AllQuatation";
import ScrollToTop from "./components/ScrollToTop";
import Bid from "./pages/Bids";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signin" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="verify-otp" element={<VerifyOtp />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="/my/bids" element={<Bid />} />

          {/* User routes */}
          {/* <Route path="my" element={<PrivateRoute />}>
          </Route> */}

          {/* Admin routes */}
          <Route path="my/dashboard" element={<AdminRoute />}>
            <Route index element={<DashboardLayout />} />
            <Route path="quatation/:tenderId" element={<AllQuatation />} />{" "}
            {/* Update here */}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
