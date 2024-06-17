import React, { useState } from "react";
// import { MdDoNotDisturb } from "react-icons/md";
// import { FaNotEqual } from "react-icons/fa";
import { useSelector } from "react-redux";
import Tender from "../../components/Tender";
import AllTender from "../../components/AllTender";
import AdminProfile from "../../components/AdminProfile";
// import Empty from "../../components/Empty";

const DashboardLayout = () => {
  const {
    user: currentUser,
    loading,
    error,
  } = useSelector((state) => state?.auth?.user);
  const [open, setOpen] = useState(false);
  const [isActive, setActive] = useState(1);

  const handleClick = (id) => {
    setActive(id);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-evenly gap-4">
      {currentUser && currentUser !== null ? (
        <>
          <button
            onClick={() => setOpen(!open)}
            type="button"
            className="inline-flex items-center p-2 mt-2 ms-3 group-hover:text-gray-900 group-hover:scale-105 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
          {open && (
            <div>
              <ul
                role="menu"
                data-popover="menu-1"
                data-popover-placement="bottom"
                className="absolute z-10 min-w-[180px] overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
              >
                <li
                  role="menuitem"
                  className="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                >
                  Menu Item 1
                </li>
                <li
                  role="menuitem"
                  className="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                >
                  Menu Item 2
                </li>
                <li
                  role="menuitem"
                  data-popover-target="nested-menu"
                  className="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                >
                  Nested Menu
                </li>
              </ul>
            </div>
          )}
          <aside
            to=""
            id="default-sidebar"
            className="fixed top-0 left-0 z-40 lg:w-64 h-[70vh] mt-24 transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar"
          >
            <div className="h-full px-3 py-4 overflow-y-auto  border-r-2 ">
              <ul className="space-y-2 font-medium">
                <li className="w-full">
                  <button
                    onClick={() => {
                      handleClick(1);
                    }}
                    className={`${
                      isActive === 1 && "bg-gray-300"
                    } flex items-center p-2 text-gray-700 rounded-lg  group w-sm lg:w-full hover:bg-gray-300`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
                      />
                    </svg>

                    <span className="ms-3 hidden lg:flex group-hover:text-gray-900 group-hover:scale-105">
                      Tender
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleClick(2);
                    }}
                    className={`${
                      isActive === 2 && "bg-gray-300"
                    } flex items-center  p-2  text-gray-700 rounded-lg w-sm lg:w-full  group  hover:bg-gray-300`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>

                    <span className=" ms-3 hidden lg:flex group-hover:text-gray-900 group-hover:scale-105 whitespace-nowrap">
                      Profile
                    </span>
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => {
                      handleClick(3);
                    }}
                    className={`${
                      isActive === 3 && "bg-gray-300"
                    } flex items-center  p-2  text-gray-700 rounded-lg w-sm lg:w-full  group  hover:bg-gray-300`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                      />
                    </svg>

                    <span className=" ms-3 hidden lg:flex group-hover:text-gray-900 group-hover:scale-105 whitespace-nowrap">
                      All Tender
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </aside>

          <div className="sm:ml-32 w-full  ">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
              <div className="flex  h-screen mb-4 rounded bg-gray-50 ">
                {isActive === 1 ? (
                  <Tender />
                ) : isActive === 2 ? (
                  <AdminProfile/>
                ) : isActive === 3 ? (
                  <AllTender />
                ) : (
                  <Empty icon={<FaNotEqual />} message="Page Not Found !" />
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>
          <p className="text-red-700">Login First</p>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
