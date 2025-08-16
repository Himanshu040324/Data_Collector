import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const port = process.env.PORT;
const mongoURI = process.env.MONGO_URI;

// MongoDB connection
async function connectDB() {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected...");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Hello World! DataCollector");
});

// POST route to save form data
app.post("/submit", async (req, res) => {
  try {
    // Connect to your specific database and collection
    const collection = mongoose.connection.db.collection("forms", {
      dbName: "Data_Collector", // Specify your database name here
    });
    await collection.insertOne(req.body);

    res.status(201).json({ message: "Form submitted successfully" });
  } catch (err) {
    console.error("Error submitting form:", err); // Better error logging
    res.status(500).json({ error: "Server error" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
