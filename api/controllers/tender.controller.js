import Tender from "../models/tender.model.js";

//create new tender
export const createTender = async (req, res) => {
  const {
    name,
    description,
    startTime,
    endTime,
    bufferTime,
    tenderBaseAmount,
  } = req.body;
  try {
    const newTender = new Tender({
      name,
      description,
      startTime,
      endTime,
      bufferTime,
      tenderBaseAmount,
    });
    const tender = await newTender.save();
    res.json(tender);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

//get all tender
// Utility function for pagination
const paginateResults = (page, limit) => {
  const offset = (page - 1) * limit;
  return { offset, limit };
};

// Modified allTender endpoint with search, sort, filter, and pagination
export const allTender = async (req, res) => {
  const { 
    search = "", 
    sortField = "createdAt", 
    sortOrder = "desc", 
    page = 1, 
    limit = 10, 
    filterField, 
    filterValue 
  } = req.query;

  try {
    const query = {};

    // Add search functionality
    if (search) {
      query.name = { $regex: search, $options: "i" }; // Case-insensitive search
    }

    // Add filter functionality
    if (filterField && filterValue) {
      query[filterField] = filterValue;
    }

    // Pagination calculation
    const { offset, limit: finalLimit } = paginateResults(Number(page), Number(limit));

    // Sorting
    const sort = { [sortField]: sortOrder === "asc" ? 1 : -1 };

    // Fetch tenders with applied query, sort, and pagination
    const tenders = await Tender.find(query)
      .sort(sort)
      .skip(offset)
      .limit(finalLimit);

    // Get the total count for pagination purposes
    const totalCount = await Tender.countDocuments(query);

    res.json({
      tenders,
      totalCount,
      totalPages: Math.ceil(totalCount / finalLimit),
      currentPage: Number(page),
    });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const calculateBufferTime = (endTime, updatedEndTime) => {
  const endTimeMillis = new Date(endTime).getTime();
  const updatedEndTimeMillis = new Date(updatedEndTime).getTime();
  return (updatedEndTimeMillis - endTimeMillis) / 1000; // Difference in seconds
};

export const bufferTime = async (req, res) => {
  const { tenderId } = req.params;
  const { endTime } = req.body;

  try {
    const tender = await Tender.findById(tenderId);

    if (!tender) {
      return res.status(404).json({ message: "Tender not found" });
    }

    const currentEndTime = tender.endTime;
    const updatedEndTime = new Date(endTime);

    const currentTime = new Date();
    if (updatedEndTime <= currentTime) {
      return res
        .status(400)
        .json({
          message: "The new end time must be greater than the current time.",
        });
    }

    tender.previousEndTime = currentEndTime;
    tender.endTime = updatedEndTime;
    tender.bufferTime = calculateBufferTime(currentEndTime, updatedEndTime);
    await tender.save();

    res.status(200).json({
      tenderId: tender._id,
      previousEndTime: tender.previousEndTime,
      updatedEndTime: tender.endTime,
      bufferTime: tender.bufferTime,
      otherTenderData: tender, // Include any other relevant tender data
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Endpoint to fetch a single tender by ID
export const getTender = async (req, res) => {
  const { tenderId } = req.params;

  try {
    const tender = await Tender.findById(tenderId);
    if (!tender) {
      return res.status(404).json({ message: "Tender not found" });
    }

    res.status(200).json(tender);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// multiple tender delete
export const multipleTenderDelete = async (req, res) => {
  try {
    await Tender.deleteMany({ _id: { $in: req.body.ids } });
    res.status(200).send({ message: 'Tenders deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to delete tenders', error });
  }
}