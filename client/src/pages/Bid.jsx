import React from "react";
import { useSelector } from "react-redux";
import TenderList from "../components/TenderList";


const Bid = () => {
  const { error, loading } = useSelector((state) => state?.bids);
  return (
    <>
      <div className="h-screen w-full mx-auto ">
        {loading && loading === true && (
          <h1 className="text-sm text-center">Loading...</h1>
        )}
        <h1 className="text-center">Tender List</h1>
        <div className="">
          <TenderList />
        </div>
      </div>
    </>
  );
};

export default Bid;
