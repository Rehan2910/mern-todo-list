// Express server + MongoDB connection (A1, A2, A6)
require("dotenv").config();               // load variables from .env
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/tasks");

const app = express();

// A6: allow requests only from the React dev server, not every origin
app.use(cors({ origin: "http://localhost:3000" }));
// A1: parse JSON request bodies
app.use(express.json());

app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

// A2: connection string comes from .env (never hard-coded)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
