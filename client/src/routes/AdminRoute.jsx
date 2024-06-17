import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";


export default function AdminRoute() {
  const { user } = useSelector((state) => state.auth);

  const [ok, setOk] = useState(false);
  const navigate = useNavigate();

  const authCheck = async () => {
    try {
      const res = await API_URL.get('/api/auth/login');
      const data = await res.json();
      console.log("data:", data);
      if (data.check) {
        setOk(true);
        console.log(data);
        console.log(ok);
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
    if (user !== null && user !== false) {
      authCheck();
    }
  }, [user]);

  return ok ? <Outlet /> : <Spinner />;
}
