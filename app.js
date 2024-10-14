import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/connection.js";
import cors from "cors"

// models
import user from "./models/user.js";
import book from "./models/book.js";
import review from "./models/review.js";

// routes
import bookRoutes from "./routes/book.js";
import authRoutes from "./routes/auth.js";
import reviewRoutes from "./routes/review.js";
import notFoundHandler from "./middleware/not-found.js";

dotenv.config();


const app = express();
app.use(cors());
// middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json());

// routes
const baseURL = "/api";
app.use(baseURL, authRoutes);
app.use(baseURL, bookRoutes);
app.use(baseURL, reviewRoutes);

// error handlers
app.use(notFoundHandler)

connectDB();

try {

    const port = process.env.PORT;
    app.listen(port, console.log(`Server running on port http://localhost:${port}`));

} catch (error) {

    console.log(error.message);

}