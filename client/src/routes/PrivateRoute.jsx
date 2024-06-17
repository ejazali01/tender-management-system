import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import API_URL from "../api";



export default function PrivateRoute() {
  const { user: currentUser } = useSelector((state) => state.user);
  const [ok, setOk] = useState(false);
  const navigate = useNavigate();

  const authCheck = async () => {
    try {
      const res = await API_URL.get('/api/auth/login');
      const data = await res.json();
      console.log("data:", data);
  
      if (data.check) {
        setOk(true);
      } else {
        setOk(false);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during auth check:", error);
      setOk(false);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (currentUser !== null) {
      authCheck();
    }
  }, [currentUser]);

  return ok ? <Outlet /> : <Spinner />;
}
