import cors from "cors";
import express from "express";
import path from "path";
import dotenv from "dotenv";
import { connectDB } from "./config/db-config.js";
import bookShelfRoutes from "./routes/index.js";
import cookieParser from "cookie-parser";

// Config to access environment variables in the system
dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5173",
      "http://localhost:4173",
      "https://book-shelf-react-app.onrender.com",
      "https://bookshelf-capstone.netlify.app",
      "https://capstion-frontend-bookshelf.vercel.app",
      "https://bookshel-capstone-project.netlify.app"
    ],
    credentials: true,
  })
);
app.use(cookieParser());

// Organize Static assets
app.use(express.static("assets"));

// Setting up Routes Middleware
app.use("/api/v1", bookShelfRoutes);

// Serve the React app's index.html for the root route
app.get("/", (_req, res) => {
  const filePath = new URL("build/index.html", import.meta.url).pathname;
  res.sendFile(path.join(filePath));
});
// This will start the server and listen to the port defined in ENV.
app.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`);
});

connectDB();
