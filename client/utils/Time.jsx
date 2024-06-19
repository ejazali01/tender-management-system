import moment from "moment-timezone";

export const convertToIST = (utcDateString) => {
  return moment(utcDateString)
    .tz("Asia/Kolkata")
    .format("DD/MM/YYYY, hh:mm:ss A");
};


export const convertToLocalTimeZone = (date) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };
  return new Date(date).toLocaleString("en-US", options);
};

export const formatBufferTime = (bufferTimeInSeconds) => {
  const years = Math.floor(bufferTimeInSeconds / (365 * 24 * 60 * 60));
  const days = Math.floor((bufferTimeInSeconds % (365 * 24 * 60 * 60)) / (24 * 60 * 60));
  const months = Math.floor((days % 365) / 30); // Approximation
  const hours = Math.floor((bufferTimeInSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((bufferTimeInSeconds % (60 * 60)) / 60);

  return `${years ? `${years}y ` : ""}${months ? `${months}m ` : ""}${days ? `${days}d ` : ""}${hours ? `${hours}h ` : ""}${minutes ? `${minutes}m` : ""}`;
};
