import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { convertToIST } from "../../utils/Time";
import { getAllTender } from "../redux/reducers/TenderSlice";
import toast from "react-hot-toast";

const calculateRemainingTime = (endTime) => {
  const now = new Date();
  const end = new Date(endTime);
  const difference = end - now;
  if (difference <= 0) return { formatted: "Tender Close", totalSeconds: 0 };

  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { formatted: `${hours}h ${minutes}m ${seconds}s`, totalSeconds: difference / 1000 };
};

const Table = () => {
  const { error, loading, tender } = useSelector((state) => state?.tender);
  const dispatch = useDispatch();

  const excludedKeys = [ "__v", "createdAt", "updatedAt",];
  const tableHeaders = tender.length > 0
    ? Object.keys(tender[0]).filter((key) => !excludedKeys.includes(key))
    : [];

  const [remainingTimes, setRemainingTimes] = useState([]);

  const fetchTender = async () => {
    try {
      await dispatch(getAllTender()).unwrap();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchTender();
  }, [dispatch]);

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

  return (
    <div>
      {error && <h2 className="flex justify-center ">{error.message}</h2>}
      {loading ? (
        <h2 className="flex justify-center py-2">Loading...</h2>
      ) : (
        tender && (
          <Card className="relative h-screen w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
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
                  const isLessThanFiveMinutes = remainingTime && remainingTime.totalSeconds < 300;
                  const isTimeUp = remainingTime && remainingTime.totalSeconds === 0;

                  let remainingTimeClassName = "";
                  if (isTimeUp) {
                    remainingTimeClassName = "bg-red-500 text-white font-bold";
                  } else if (isLessThanFiveMinutes) {
                    remainingTimeClassName = "bg-yellow-500"; // Yellow for less than 5 minutes
                  } else {
                    remainingTimeClassName = "bg-green-500";
                  }

                  return (
                    <tr key={tenderItem._id}>
                      <td className="border-b">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="px-6 py-4 whitespace-nowrap font-normal text-left "
                        >
                          {index + 1}
                        </Typography>
                      </td>
                      {tableHeaders.map((header) => (
                        <td key={header} className="border-b hover:bg-gray-400">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="px-6 py-4 whitespace-nowrap font-normal text-left  "
                          >
                            {header === "startTime" || header === "endTime"
                              ? convertToIST(tenderItem[header])
                              : tenderItem[header]}
                          </Typography>
                        </td>
                      ))}
                      <td className={`border-b hover:bg-gray-400 ${remainingTimeClassName}`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="px-6 py-4 whitespace-nowrap font-normal text-left text-white "
                        >
                          {remainingTime ? remainingTime.formatted : "N/A"}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="absolute bottom-0 left-0 bg-gray-300 p-1 px-3">
              <span className="text-gray-800">Total Tender: {tender.length}</span>
            </div>
          </Card>
        )
      )}
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
