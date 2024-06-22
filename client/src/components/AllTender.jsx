import React, { useEffect, useState } from "react";
import { Card, Typography, Button, Tooltip } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { convertToIST, formatBufferTime } from "../../utils/Time";
import { getAllTender, deleteMultipleTenders } from "../redux/reducers/TenderSlice";
import toast from "react-hot-toast";
import Loading from "./Loading";
import EditTenderEndTime from "./BufferTime";
import { useNavigate } from "react-router-dom";

const calculateRemainingTime = (endTime) => {
  const now = new Date();
  const end = new Date(endTime);
  const difference = end - now;
  if (difference <= 0) return { formatted: "Tender Close", totalSeconds: 0 };

  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    formatted: `${hours}h ${minutes}m ${seconds}s`,
    totalSeconds: difference / 1000,
  };
};

const Table = () => {
  const { error, loading, tenders } = useSelector((state) => state?.tender?.tender);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [remainingTimes, setRemainingTimes] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTender, setSelectedTender] = useState(null);
  const [selectedTenders, setSelectedTenders] = useState([]);

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

  useEffect(() => {
    const updateRemainingTimes = () => {
      if (tenders && tenders.length > 0) {
        const updatedTimes = tenders.map((tenderItem) => calculateRemainingTime(tenderItem.endTime));
        setRemainingTimes(updatedTimes);
      }
    };

    updateRemainingTimes();
    const intervalId = setInterval(updateRemainingTimes, 1000);

    return () => clearInterval(intervalId);
  }, [tenders]);

  const handleEditClick = (tenderItem) => {
    setSelectedTender(tenderItem);
    setEditModalOpen(true);
  };

  const handleCheckboxChange = (tenderId) => {
    setSelectedTenders((prevSelectedTenders) =>
      prevSelectedTenders.includes(tenderId)
        ? prevSelectedTenders.filter((id) => id !== tenderId)
        : [...prevSelectedTenders, tenderId]
    );
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteMultipleTenders(selectedTenders)).unwrap();
      setSelectedTenders([]);
      toast.success("Tenders deleted successfully");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleIdClick = (tenderId) => {
    navigate(`quatation/${tenderId}`);
  };

  return (
    <div>
      {error && <h2 className="flex justify-center">{error.message}</h2>}
      {loading ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : (
        tenders && (
          <Card className="relative h-screen w-full overflow-scroll custom-scrollbar">
            <div className="w-full mb-1 h-10 bg-gray-300 px-4 ">
              {selectedTenders.length > 0 && (
                <div className="flex items-center gap-1">
                  <span className="text-sm text-blue-500">{selectedTenders.length}</span>
                  <button
                    onClick={handleDelete}
                    disabled={selectedTenders.length === 0}
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

            <div className="w-full h-screen">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    <th
                      key="checkbox"
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedTenders(tenders.map((t) => t._id));
                          } else {
                            setSelectedTenders([]);
                          }
                        }}
                        checked={selectedTenders.length === tenders.length}
                      />
                    </th>

                    <th key="blank"
                    className="border-b  border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      
                    </th>
                    <th
                      key="startTimeIST"
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70 text-semibold uppercase text-gray-900"
                      >
                        No
                      </Typography>
                    </th>
                    {tenders.length > 0 &&
                      Object.keys(tenders[0])
                        .filter(
                          (key) =>
                            ![
                              "__v",
                              "createdAt",
                              "updatedAt",
                              "previousEndTime",
                            ].includes(key)
                        )
                        .map((head) => (
                          <th
                            key={head}
                            className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                          >
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal leading-none opacity-70 text-semibold uppercase text-gray-900"
                            >
                              {head}
                            </Typography>
                          </th>
                        ))}
                    <th
                      key="remainingTime"
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70 text-semibold uppercase text-gray-900"
                      >
                        Remaining Time
                      </Typography>
                    </th>
                    <th
                      key="previousEndTime"
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70 text-semibold uppercase text-gray-900"
                      >
                        Previous End Time
                      </Typography>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tenders.map((tenderItem, index) => {
                    const remainingTime = remainingTimes[index];
                    const isLessThanFiveMinutes =
                      remainingTime && remainingTime.totalSeconds < 300;
                    const isTimeUp =
                      remainingTime && remainingTime.totalSeconds === 0;

                    let remainingTimeClassName = "";
                    if (isTimeUp) {
                      remainingTimeClassName =
                        "bg-red-500 text-white hover:bg-red-400 font-bold";
                    } else if (isLessThanFiveMinutes) {
                      remainingTimeClassName =
                        "bg-yellow-500 hover:bg-yellow-400"; // Yellow for less than 5 minutes
                    } else {
                      remainingTimeClassName =
                        "bg-green-500 hover:bg-green-400";
                    }

                    return (
                      <tr key={tenderItem._id}>
                        <td className="border-b p-4">
                          <input
                            type="checkbox"
                            className="w-4 h-4"
                            checked={selectedTenders.includes(tenderItem._id)}
                            onChange={() =>
                              handleCheckboxChange(tenderItem._id)
                            }
                          />
                        </td>

                        <Tooltip content="Add BufferTime">

                        <td className="border-b ">
                          <button
                            onClick={() => handleEditClick(tenderItem)}
                            type="button"
                            className="p-2 text-blue-500 hover:bg-gray-200 hover:rounded-full"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                              />
                            </svg>
                          </button>
                        </td>
                        </Tooltip>

                        <td className="border-b">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="px-6 py-4 whitespace-nowrap font-normal text-left"
                          >
                            {index + 1}
                          </Typography>
                        </td>
                        {Object.keys(tenderItem)
                          .filter(
                            (key) =>
                              ![
                                "__v",
                                "createdAt",
                                "updatedAt",
                                "previousEndTime",
                              ].includes(key)
                          )
                          .map((header) => (
                            <td
                              key={header}
                              className="border-b hover:bg-gray-400"
                            >
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className={`px-6 py-4 whitespace-nowrap font-normal text-left ${
                                  header === "description"
                                    ? "max-w-[400px] max-h-20 custom-scrollbar overflow-y-auto flex flex-wrap text-wrap"
                                    : ""
                                } ${
                                  header === "_id"
                                    ? "bg-gray-500 text-white hover:bg-gray-400 font-bold cursor-pointer"
                                    : ""
                                }`}
                                onClick={() =>
                                  header === "_id" &&
                                  handleIdClick(tenderItem._id)
                                }
                              >
                                {header === "startTime" || header === "endTime"
                                  ? convertToIST(
                                      new Date(tenderItem[header])
                                    ).toLocaleString()
                                  : header === "bufferTime"
                                  ? formatBufferTime(tenderItem[header])
                                  : header === "_id"
                                  ? (
                                    <Tooltip content="click to watch Quotation">
                                      {tenderItem[header]}
                                    </Tooltip>
                                  )
                                  : tenderItem[header]}
                              </Typography>
                            </td>
                          ))}
                        <td className={`border-b ${remainingTimeClassName}`}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="px-6 py-4 whitespace-nowrap font-normal text-left text-white"
                          >
                            {remainingTime ? remainingTime.formatted : "N/A"}
                          </Typography>
                        </td>
                        <td className="border-b hover:bg-gray-400">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="px-6 py-4 whitespace-nowrap font-normal text-left"
                          >
                            {convertToIST(
                              new Date(tenderItem.previousEndTime)
                            ).toLocaleString()}
                          </Typography>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex gap-8 items-center max-w-36 fixed left-0 bottom-0 absolute  bg-gray-300">
              <span className="text-gray-800">
                Total Tender: {tenders.length}
              </span>
            </div>
          </Card>
        )
      )}
      {selectedTender && (
        <EditTenderEndTime
          tenderId={selectedTender._id}
          currentEndTime={selectedTender.endTime}
          previousEndTime={selectedTender.previousEndTime}
          bufferTime={selectedTender.bufferTime}
          open={editModalOpen}
          handleClose={() => setEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Table;
