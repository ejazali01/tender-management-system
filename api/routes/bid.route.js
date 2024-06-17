import express from "express";
// import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {addBids, allBids} from "../controllers/bid.controller.js"

const router = express.Router();

//create bids
router.post("/add-bid", addBids );

//create package
router.get("/:tenderId", allBids);

export default router;
