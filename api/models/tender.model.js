import mongoose from "mongoose";

const TenderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    bufferTime: { type: Number, required: true }, // in minutes
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Tender = mongoose.model("Tender", TenderSchema);

export default Tender;
