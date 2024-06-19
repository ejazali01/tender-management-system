import React, { useEffect } from "react";
import TenderList from "../components/TenderList";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { getAllTender } from "../redux/reducers/TenderSlice";

const Bid = () => {
  const dispatch = useDispatch();
  const fetchTender = async () => {
    try {
      await dispatch(getAllTender()).unwrap();
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchTender();
  }, [dispatch]);

  return (
    <>
      <div className="h-screen w-full mx-auto ">
        <div className="">
          <h1 className="text-center">Tender List</h1>
          <TenderList />  
        </div>
      </div>
    </>
  );
};

export default Bid;
