import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-tailwind/react";
import Loading from "./Loading";
import { useParams } from "react-router-dom";
import { getAllBids } from "../redux/reducers/BidSlice";
import toast from "react-hot-toast";

const AllQuotation = () => {
  const { tenderId } = useParams();
  const dispatch = useDispatch();
  const { loading, error, bid } = useSelector((state) => state.bids);

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
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-800">
              <tr>
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
        )}
      </div>
    </>
  );
};

export default AllQuotation;
