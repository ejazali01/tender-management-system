import * as Yup from "yup";

// Validation Schema
export const TenderSchema = Yup.object().shape({
    name: Yup.string().required("Tender Name is required"),
    description: Yup.string().required("Tender Description is required"),
    startTime: Yup.date().required("Start Time is required"),
    endTime: Yup.date().required("End Time is required"),
    tenderBaseAmount: Yup.number()
    .required("Tender Base Amount is required")
    .positive("Tender Base Amount must be positive"),
  });

  // Validation Schema
export const BidSchema = Yup.object().shape({
  companyName: Yup.string().required("Company Name is required"),
  bidCost: Yup.number()
    .required("Bid Cost is required")
    .positive("Bid Cost must be positive"),
});

export const profileSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  address: Yup.string().max(200, "Address must be less than 200 characters"),
  phone: Yup.string().required("Phone is required"),
});