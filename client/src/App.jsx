import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgetPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Home from "./pages/Home";
import VerifyOtp from "./pages/auth/VerifyOtp";
import Bid from "./pages/Bid";
import Layout from "./pages/layout";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";
import DashboardLayout from "./pages/admin/DashboardLayout";
import Tender from "./components/Tender";
import Profile from "./pages/Profile";

const App = () => { 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* user */}
          {/* <Route path="/my" element={<PrivateRoute />}> */}
            <Route path="/bids" element={<Bid />} />
            <Route path="/profile" element={<Profile />} />
            
          {/* </Route> */}

          {/* admin */}
          {/* <Route path="/my" element={<AdminRoute />}> */}
          <Route path="/my/dashboard" element={<DashboardLayout />} >
            {/* <Route path="tender" element={<Tender />} /> */}
          </Route>
          {/* </Route> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
