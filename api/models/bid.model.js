import mongoose from "mongoose";

const BidSchema = new mongoose.Schema({
  tenderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tender",
    required: true,
  },
  companyName: { type: String, required: true },
  bidTime: { type: Date, default: Date.now },
  bidCost: { type: Number, required: true },
  isLastFiveMinutes: { type: Boolean, default: false },
});

const Bid = mongoose.model("Bid", BidSchema);

export default Bid;
