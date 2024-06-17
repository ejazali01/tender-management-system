import React from "react";

const Empty = ({ icon, message }) => {
  return (
    <div className=" w-full mt-20 ">
      <div className="p-4 m-auto flex justify-center items-center  dark:border-gray-700">
        <div className="flex flex-col  m-auto text-8xl opacity-30 items-center justify-center  mb-4 rounded bg-gray-50 ">
          {icon}
          <h1 className=" text-2xl text-center opacity-100">{message}</h1>
        </div>
      </div>
    </div>
  );
};

export default Empty;
