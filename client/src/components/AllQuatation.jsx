import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-tailwind/react";
import Loading from "./Loading";
import { useParams } from "react-router-dom";
import { deleteBids, getAllBids } from "../redux/reducers/BidSlice";
import toast from "react-hot-toast";

const AllQuotation = () => {
  const { tenderId } = useParams();
  const dispatch = useDispatch();
  const { loading, error, bid } = useSelector((state) => state?.bids);

  const [selectedBids, setSelectedBids] = useState([]);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        await dispatch(getAllBids(tenderId)).unwrap();
      } catch (error) {
        toast.error(error.message);
      }
    };

    if (tenderId) {
      fetchBids();
    }
  }, [dispatch, tenderId]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleCheckboxChange = (bidId) => {
    setSelectedBids((prevSelected) =>
      prevSelected.includes(bidId)
        ? prevSelected.filter((id) => id !== bidId)
        : [...prevSelected, bidId]
    );
  };

  const handleSelectAll = () => {
    if (selectedBids.length === bid.length) {
      setSelectedBids([]);
    } else {
      setSelectedBids(bid.map((bidData) => bidData._id));
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteBids(selectedBids)).unwrap();
      toast.success("Bids deleted successfully");
      setSelectedBids([]);
      await dispatch(getAllBids(tenderId)).unwrap(); // Revalidate all bids after deletion
    } catch (error) {
      toast.error("Error deleting bids");
    }
  };

  const excludedKeys = ["_id", "__v", "createdAt", "updatedAt"];
  const tableHeaders =
    bid && bid.length > 0
      ? Object.keys(bid[0]).filter((key) => !excludedKeys.includes(key))
      : [];

  return (
    <>
      <div className="max-w-full m-auto h-screen ">
        {error && <h1 className="text-sm text-red-500">{error.message}</h1>}
        {loading ? (
          <div className="flex justify-center">
            <Loading />
          </div>
        ) : bid === null ? (
          <p>No bids available.</p>
        ) : (
          <>
            <div className="w-full flex items-center px-4 h-12 bg-gray-200 mb-4">
              <div>
                {selectedBids?.length > 0 && (
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-blue-500">
                      {selectedBids?.length}
                    </span>
                    <button
                      onClick={handleDelete}
                      disabled={selectedBids?.length === 0}
                      className="bg-transparent p-2 cursor-pointer focus:scale-95 hover:scale-105 hover:bg-gray-200 rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4 text-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className={`bg-gray-800 ${isSticky ? "sticky-header sticky" : ""}`}>
                <tr>
                  <th className="px-6 py-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={selectedBids.length === bid.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th
                    key="startTimeIST"
                    className="px-6 py-3 text-left font-semibold uppercase tracking-wider"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70 text-semibold text-xs text-gray-200 uppercase"
                    >
                      No
                    </Typography>
                  </th>
                  {tableHeaders.map((head) => (
                    <th key={head} className="px-6 py-1 whitespace-nowrap">
                      <Typography
                        variant="small"
                        color="blue-gray text-sm text-white"
                        className="font-normal leading-none opacity-70 text-semibold text-xs text-white uppercase"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bid.map((bidData, index) => (
                  <tr key={bidData._id} className="bg-gray-900 text-white">
                    <td className="border-b px-6">
                      <input
                        type="checkbox"
                        className="w-4 h-4"
                        checked={selectedBids.includes(bidData._id)}
                        onChange={() => handleCheckboxChange(bidData._id)}
                      />
                    </td>
                    <td className="border-b">
                      <Typography
                        variant="small"
                        color="blue-gray text-sm text-white"
                        className="px-6 py-4 whitespace-nowrap font-normal text-left"
                      >
                        {index + 1}
                      </Typography>
                    </td>
                    {tableHeaders.map((header) => (
                      <td key={header} className="px-6 py-1 whitespace-nowrap">
                        <Typography
                          variant="small"
                          color="blue-gray text-sm text-white"
                          className={`px-6 py-4 whitespace-nowrap font-normal text-left ${
                            header === "message"
                              ? "max-w-[400px] max-h-20 custom-scrollbar overflow-y-auto flex flex-wrap text-wrap"
                              : ""
                          }`}
                        >
                          {header === "isLastFiveMinutes" ? (
                            bidData[header] ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-4 text-red-500"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"
                                />
                              </svg>
                            ) : (
                              "NO"
                            )
                          ) : (
                            bidData[header]
                          )}
                        </Typography>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex gap-8 items-center max-w-40 px-4 fixed left-0 bottom-0 absolute  bg-gray-300">
              <span className="text-gray-800">
                Total Bids: {bid.length}
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AllQuotation;
