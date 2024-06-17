import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBids } from "../redux/reducers/BidSlice";
import { Typography } from "@material-tailwind/react";

const RealTimeBids = ({ tenderId, setHighestBid }) => {
  const dispatch = useDispatch();
  const { loading, error, bid } = useSelector((state) => state.bids);

  const fetchBids = async () => {
    try {
      const bidsData = await dispatch(getAllBids(tenderId)).unwrap();
      if (bidsData.length > 0) {
        const highestBid = Math.max(...bidsData.map((bid) => bid.bidCost));
        setHighestBid(highestBid);
      } else {
        setHighestBid(0);
      }
    } catch (error) {
      console.error("Failed to fetch bids:", error.message);
    }
  };

  useEffect(() => {
    fetchBids();
  }, [dispatch, tenderId]);

  return (
    <div>
      <div className=" mt-4 p-4 max-h-56 overflow-y-auto">
        
        {loading ? (
          <p>Loading bids...</p>
        ) : bid === null ? (
          <p>No bids available.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 ">
            <thead className="bg-gray-800 ">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-xs text-gray-200 uppercase tracking-wider">
                  Company Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider">
                  Bid Cost
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y  divide-gray-200">
              {bid.map((bidData) => (
                <tr key={bidData._id} className="bg-gray-900 text-white">
                  <td className="px-6 py-1 whitespace-nowrap">
                    <Typography variant="body" color="blue-gray text-sm text-white">
                      {bidData.companyName}
                    </Typography>
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap">
                    <Typography variant="body" color="blue-gray text-sm text-white">
                      {bidData.bidCost}
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RealTimeBids;
