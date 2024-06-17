import Tender from "../models/tender.model.js";

//create new tender
export const createTender = async (req, res) => {
  const { name, description, startTime, endTime, bufferTime } = req.body;
  try {
    const newTender = new Tender({
      name,
      description,
      startTime,
      endTime,
      bufferTime,
    });
    const tender = await newTender.save();
    res.json(tender);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

//create new tender
export const allTender = async (req, res) => {
  try {
    const tenders = await Tender.find().sort({ createdAt: -1 });
    res.json(tenders);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
