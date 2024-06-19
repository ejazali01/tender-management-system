import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { createTender } from "../redux/reducers/TenderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TenderSchema } from "../../utils/Validation";
import toast from "react-hot-toast";
// import TenderList from '../components/TenderList';

const Tender = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state?.tender);
  
  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(createTender(values)).unwrap();
      toast.success("Tender Created");
      resetForm();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-[700px] mx-auto ">
      <h1 className="py-3 text-center text-xl font-semibold">Create Tender</h1>
      <Formik
        initialValues={{
          name: "",
          description: "",
          startTime: "",
          endTime: "",
          tenderBaseAmount: "", // Add tenderBaseAmount to initial values
        }}
        validationSchema={TenderSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col max-w-[400px]">
              <label>Tender Name</label>
              <Field
                name="name"
                type="text"
                className="border px-2 rounded-md"
              />
              <ErrorMessage name="name" component="div" />
            </div>
            <div className="flex flex-col">
              <label>Tender Description</label>
              <Field
                name="description"
                as="textarea"
                className="border px-2 rounded-md"
              />
              <ErrorMessage name="description" component="div" />
            </div>
            <div className="flex flex-col max-w-[400px]">
              <label>Start Time</label>
              <Field
                name="startTime"
                type="datetime-local"
                className="border px-2 rounded-md"
              />
              <ErrorMessage name="startTime" component="div" />
            </div>
            <div className="flex flex-col max-w-[400px]">
              <label>End Time</label>
              <Field
                name="endTime"
                type="datetime-local"
                className="border px-2 rounded-md"
              />
              <ErrorMessage name="endTime" component="div" />
            </div>
            <div className="flex flex-col max-w-[400px]">
              <label>Tender Base Amount</label>
              <Field
                name="tenderBaseAmount"
                type="number"
                className="border px-2 rounded-md"
              />
              <ErrorMessage name="tenderBaseAmount" component="div" />
            </div>
            <button
              disabled={loading}
              type="submit"
              className="bg-blue-300 flex items-center justify-center p-1 px-4 rounded hover:bg-blue-200"
            >
              {loading ? (
                <svg className="w-6 h-6 animate-rotate" viewBox="0 0 50 50">
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
                "Create Tender"
              )}
            </button>
          </Form>
        )}
      </Formik>
      {/* <TenderList /> */}
    </div>
  );
};

export default Tender;
