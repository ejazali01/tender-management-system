import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogBody,
  IconButton,
} from "@material-tailwind/react";
import { BidSchema } from "../../utils/Validation";
import { addBid } from "../redux/reducers/BidSlice";
import RealTimeBids from "./RealTimeBids";
import toast from "react-hot-toast";

const Quatation = ({ open, handleClose, tenderId, setSelectedTenderId }) => {
  const { error, loading } = useSelector((state) => state?.bids);
  const dispatch = useDispatch();
  const [highestBid, setHighestBid] = useState(0);
  const [suggestedBidCosts, setSuggestedBidCosts] = useState([]);

  useEffect(() => {
    // Generate suggested bid costs based on the highest bid
    const generateSuggestedBidCosts = (highestBid) => {
      const newSuggestedBidCosts = [];
      for (let i = 1; i <= 3; i++) {
        newSuggestedBidCosts.push(highestBid + i * 1000);
      }
      return newSuggestedBidCosts;
    };

    setSuggestedBidCosts(generateSuggestedBidCosts(highestBid));
  }, [highestBid]);

  const handleSubmit = async (values, { resetForm, setFieldError }) => {
    if (values.bidCost <= highestBid) {
      setFieldError(
        "bidCost",
        "Bid cost must be greater than the current highest bid."
      );
      return;
    }

    try {
      const bidData = {
        ...values,
        tenderId: tenderId,
      };

      await dispatch(addBid(bidData)).unwrap();
      toast.success("Bid added successfully!");
      resetForm();
      handleClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSuggestedBidCost = (bidCost, setFieldValue) => {
    setFieldValue("bidCost", bidCost);
  };

  return (
    <>
      <Dialog className="max-w-2xl" open={open} handler={handleClose}>
        <div className="p-4 w-full h-screen">
          {loading && loading === true && (
            <h1 className="text-sm text-center">Loading...</h1>
          )}
          <div className="flex justify-between">
            <div className="flex justify-center w-full">
              <h1 className="text-center font-semibold">Add Quotation</h1>
            </div>
            <IconButton variant="text" color="blue-gray" onClick={handleClose}>
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
          <div className="flex justify-center">
            <div>
              <h2 className="text-lg font-semibold mb-2">
                Bids for Tender ID: {tenderId}
              </h2>
              <h2> </h2>
            </div>
          </div>
          <div>
            <RealTimeBids tenderId={tenderId} setHighestBid={setHighestBid} />
          </div>
          <div className="my-4">
            <h2 className="text-center text-white text-lg font-small bg-black">
              Current Highest Bid:{" "}
              <span className="font-bold text-green bg-black shadow-lg border px-4">
                ₹ {highestBid}
              </span>
            </h2>
          </div>
          <DialogBody>
            <Formik
              initialValues={{
                tenderId: "",
                companyName: "",
                bidCost: "",
              }}
              validationSchema={BidSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue, errors }) => (
                <Form className="flex flex-col gap-4">
                  <div className="flex flex-col max-w-[400px] ">
                    <label>Tender ID</label>
                    <input
                      disabled={true}
                      type="text"
                      value={tenderId}
                      onChange={(e) => setSelectedTenderId(e.target.value)}
                      className="border px-2 rounded-md"
                    />
                  </div>

                  <div className="flex flex-col max-w-[400px] ">
                    <label className="text-sm">Company Name</label>
                    <Field
                      name="companyName"
                      type="text"
                      className="border-2 border-gray-700 px-2 rounded-md"
                    />
                    <ErrorMessage
                      className="text-sm text-red-500"
                      name="companyName"
                      component="div"
                    />
                  </div>
                  <div className="flex flex-col max-w-[400px] ">
                    <label className="text-sm">Bid Cost</label>
                    <ErrorMessage
                      className="text-sm text-red-500 mb-2"
                      name="bidCost"
                      component="div"
                    />
                    <Field
                      name="bidCost"
                      type="number"
                      className="border-2 border-gray-700 px-2 rounded-md"
                    />
                    <div className="flex gap-2 mt-2">
                      {suggestedBidCosts.map((cost) => (
                        <button
                          key={cost}
                          type="button"
                          className="bg-transparent text-gray-700 outline outline-1 px-3 py-1 rounded-2xl hover:bg-gray-300"
                          onClick={() =>
                            handleSuggestedBidCost(cost, setFieldValue)
                          }
                        >
                          {cost}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-5 mt-6">
                    <Button
                      disabled={loading}
                      type="submit"
                      className="bg-blue-300 flex items-center justify-center hover:bg-blue-200"
                    >
                      {loading ? (
                        <svg
                          className="w-6 h-6 animate-rotate"
                          viewBox="0 0 50 50"
                        >
                          <circle
                            className="path stroke-current text-blue-500 animate-dash"
                            cx="25"
                            cy="25"
                            r="20"
                            fill="none"
                            strokeWidth="5"
                          ></circle>
                        </svg>
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </DialogBody>
        </div>
      </Dialog>
    </>
  );
};

export default Quatation;
