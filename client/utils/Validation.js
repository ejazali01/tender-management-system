import * as Yup from "yup";

// Validation Schema
export const TenderSchema = Yup.object().shape({
    name: Yup.string().required("Tender Name is required"),
    description: Yup.string().required("Tender Description is required"),
    startTime: Yup.date().required("Start Time is required"),
    endTime: Yup.date().required("End Time is required"),
    bufferTime: Yup.number()
      .required("Buffer Time is required")
      .positive("Buffer Time must be positive"),
  });

  // Validation Schema
export const BidSchema = Yup.object().shape({
  companyName: Yup.string().required("Company Name is required"),
  bidCost: Yup.number()
    .required("Bid Cost is required")
    .positive("Bid Cost must be positive"),
});