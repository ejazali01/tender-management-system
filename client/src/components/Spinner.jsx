import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/${path}`, {
        state: { from: location.pathname },
      });
    }, 1000); // delay to show spinner for a short period
    return () => clearTimeout(timer);
  }, [navigate, location, path]);

  return (
    <div
      className="flex flex-col justify-center items-center"
      style={{ height: "100vh" }}
    >
      <div className="spinner-border text-center" role="status">
        <span className="visually-hidden text-center">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
