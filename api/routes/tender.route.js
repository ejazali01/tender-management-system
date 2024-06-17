import express from "express";
import { allTender, createTender } from "../controllers/tender.controller.js";

// import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router()

// book package
router.post("/create-tender", createTender);

//get all tender
router.get("/",  allTender);



export default router;
