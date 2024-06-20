import express from "express";
// import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {addBids, allBids, deleteSingleOrMultiple} from "../controllers/bid.controller.js"

const router = express.Router();

//create bids
router.post("/add-bid", addBids );

// delete single or multiple bids
router.delete('/delete-multi', deleteSingleOrMultiple)

//create package
router.get("/:tenderId", allBids);


export default router;
