import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

//middlewares
import {notFound ,errorHandler} from "./middlewares/error.js";

dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/gta", (req, res) => {
  res.json("HEllo GTA ROUTE")
})
app.post("/gta", (req, res) => {
  res.json({success: true, data: req.body})
})

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

//routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

const __dirname = path.resolve();
app.use("/uploads/products", express.static(path.join(__dirname, "../uploads/products")));
app.use("/uploads/avatars", express.static(path.join(__dirname, "../uploads/avatars")));

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html")));
}else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  })
}

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));