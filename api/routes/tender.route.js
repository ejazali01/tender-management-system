import express from "express";
import {
  allTender,
  bufferTime,
  createTender,
  getTender,
  multipleTenderDelete,
} from "../controllers/tender.controller.js";

// import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

//get all tender
router.get("/", allTender);

// book package
router.post("/create-tender", createTender);

// Delete multiple tenders
router.delete("/delete-multi", multipleTenderDelete);

// fetch a single tender
router.get("/:tenderId", getTender);

// bufffer time
router.put("/buffer-time/:tenderId", bufferTime);




export default router;
