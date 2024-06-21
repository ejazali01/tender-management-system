import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { convertToIST } from "../../utils/Time";
import Quatation from "./Quatation";
import Loading from "./Loading";
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
  const navigate = useNavigate();
  const { user } = useSelector((state) => state?.auth?.user);
  const { error, loading, tender } = useSelector((state) => state?.tender);

  const excludedKeys = [
    "__v",
    "_id",
    "createdAt",
    "updatedAt",
    "previousEndTime",
    "bufferTime",
  ];
  const tableHeaders =
    tender.length > 0
      ? Object.keys(tender[0]).filter((key) => !excludedKeys.includes(key))
      : [];

  const [remainingTimes, setRemainingTimes] = useState([]);
  const [bidFormOpen, setBidFormOpen] = useState(false);
  const [selectedTenderId, setSelectedTenderId] = useState(null);

  useEffect(() => {
    const updateRemainingTimes = () => {
      if (tender && tender.length > 0) {
        const updatedTimes = tender.map((tenderItem) =>
          calculateRemainingTime(tenderItem.endTime)
        );
        setRemainingTimes(updatedTimes);
      }
    };

    updateRemainingTimes();
    const intervalId = setInterval(updateRemainingTimes, 1000);

    return () => clearInterval(intervalId);
  }, [tender]);

  const handleBidClick = (tenderId) => {
    if (!user) {
      navigate("/signin");
    }
    setSelectedTenderId(tenderId);
    setBidFormOpen(true);
  };

  const handleBidFormClose = () => {
    setBidFormOpen(false);
    setSelectedTenderId(null);
  };

  return (
    <div>
      {error && <h2 className="flex justify-center">{error.message}</h2>}
      {tender && loading === true ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : (
        tender && (
          <Card className="relative h-screen w-full overflow-scroll custom-scrollbar">
            <div className="w-full h-screen">
              <table className="w-full relative min-w-max table-auto text-left">
                <thead>
                  <tr>
                    <th
                      key="number"
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
                    <th
                      key="makeBid"
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70 text-semibold uppercase text-gray-900"
                      >
                        Make a Bid
                      </Typography>
                    </th>
                    {tableHeaders?.map((head) => (
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
                  </tr>
                </thead>
                <tbody>
                  {tender.map((tenderItem, index) => {
                    const remainingTime = remainingTimes[index];
                    const isLessThanFiveMinutes =
                      remainingTime && remainingTime.totalSeconds < 300;
                    const isTimeUp =
                      remainingTime && remainingTime.totalSeconds === 0;

                    let remainingTimeClassName = "";
                    if (isTimeUp) {
                      remainingTimeClassName =
                        "bg-red-500 text-white font-bold hover:bg-red-400";
                    } else if (isLessThanFiveMinutes) {
                      remainingTimeClassName =
                        "bg-yellow-500 font-bold hover:bg-yellow-400"; // Yellow for less than 5 minutes
                    } else {
                      remainingTimeClassName =
                        "bg-green-500 font-bold hover:bg-green-400";
                    }

                    return (
                      <tr key={tenderItem._id}>
                        <td className="border-b">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="px-6 py-4 whitespace-nowrap font-normal text-left"
                          >
                            {index + 1}
                          </Typography>
                        </td>

                        <td className="border-b">
                          <button
                            disabled={isTimeUp}
                            onClick={() => handleBidClick(tenderItem._id)}
                            className={`px-6 py-4 whitespace-nowrap font-normal text-left ${
                              isTimeUp
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-green-500 text-white hover:bg-green-400"
                            }`}
                          >
                            Add Bid
                          </button>
                        </td>
                        {tableHeaders.map((header) => (
                          <td
                            key={header}
                            className="border-b hover:bg-gray-400"
                          >
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className={`px-6 py-4 whitespace-nowrap font-normal text-left ${
                                header === "description"
                                  ? "max-w-[400px] max-h-20 custom-scrollbar text-wrap overflow-y-auto"
                                  : ""
                              }`}
                            >
                              {header === "startTime" || header === "endTime"
                                ? convertToIST(tenderItem[header])
                                : tenderItem[header]}
                            </Typography>
                          </td>
                        ))}
                        <td className={`border-b ${remainingTimeClassName}`}>
                          <Typography
                            variant="small"
                            className="px-6 py-4 whitespace-nowrap font-normal text-left text-white"
                          >
                            {remainingTime ? remainingTime.formatted : "N/A"}
                          </Typography>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="absolute sticky bottom-0 z-20 left-0 max-w-40 bg-gray-300 p-1 px-3">
              <span className="text-gray-800">
                Total Tender: {tender.length}
              </span>
            </div>
          </Card>
        )
      )}
      <Quatation
        open={bidFormOpen}
        handleClose={handleBidFormClose}
        tenderId={selectedTenderId}
        setSelectedTenderId={setSelectedTenderId}
      />
    </div>
  );
};

const TenderList = () => {
  return (
    <div className="w-full mx-auto">
      <div>
        <Table />
      </div>
    </div>
  );
};

export default TenderList;
