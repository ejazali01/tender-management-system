import React from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../redux/reducers/AuthSlice";

export function DrawerDefault() {
  const currentUser = useSelector((state) => state?.auth?.user);
  console.log(currentUser);
  const [open, setOpen] = React.useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const handleLinkClick = () => {
    closeDrawer(); // Close the drawer when link is clicked
  };

  return (
    <React.Fragment>
      <button onClick={openDrawer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </button>
      <Drawer
        placement="right"
        open={open}
        onClose={closeDrawer}
        className="p-4 "
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Tender Management
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <Typography color="gray" className="mb-8 pr-4 font-normal">
          Optimize Your Procurement with Our Comprehensive Tender and Bidding
          Platform.
        </Typography>
        <div className="flex flex-col gap-2 w-full overflow-y-auto custom-scrollbar">
          <Link to="/my/bids" onClick={handleLinkClick}>
            <Button size="sm" className="w-full" variant="outlined">
              Bids
            </Button>
          </Link>


          {currentUser?.user?.user_role === 1 && (
           
              <Link
                to={`/my/${
                  currentUser?.user?.user_role === 1 ? "dashboard" : "profile"
                }`}
                onClick={handleLinkClick}
              >
                <Button size="sm" className="w-full" variant="outlined">
                  Dashboard
                </Button>
              </Link>
           
          )}
        </div>

        <div className="absolute bottom-0 left-0 p-4 w-full h-40 shadow-xl bg-gray-200">
          <Button
            onClick={() => {
              dispatch(logout());
              toast.success("logout success");
              navigate("/signin");
            }}
            size="sm"
            className="w-full"
            variant="outlined"
          >
            Sign Out
          </Button>
        </div>
      </Drawer>
    </React.Fragment>
  );
}
