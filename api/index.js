import express from "express";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import tenderRoute from "./routes/tender.route.js"
import bidRoute from "./routes/bid.route.js"
import cors from "cors"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db.js";
import morgan from "morgan";
const app = express();
dotenv.config();

const __dirname = path.resolve();

// Connect Database
connectDB();
// // middleware
// app.use(cors(
//   {
//       origin: process.env.CORS_ORIGIN || "http://localhost:5173",
//       credentials: true,
//       methods:['GET', 'PUT', 'POST', 'DELETE'],
//   }
// ));

// Configure CORS to allow requests from your frontend domain
const allowedOrigins = [
  'http://localhost:5173', // Local development
  'https://tender-management-system.onrender.com' // Deployed frontend
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true // If you need to allow cookies or authorization headers
}));

app.use(morgan("dev"))
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: false, limit: '20kb' }))
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/tender", tenderRoute);
app.use("/api/bid", bidRoute);

//static files
app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

//port
app.listen(8080, () => {
  console.log("listening on 8080");
});
