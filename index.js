const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api');
const app = express();

app.use(express.json());

// MongoDB connection string from your environment variable
const MONGO_DB_URI = process.env.MONGO_DB_URI || "mongodb://user_4438mntzy:p4438mntzy@bytexldb.com:5050/db_4438mntzy";

mongoose.connect(MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// Use API routes
app.use('/', apiRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
