const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 5001;
const verifyRoute = require("./routes/verifyRoute");
const companyRoutes = require("./routes/companyRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
// app.use(cookie - parser());
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error(err));

mongoose.connect(process.env.MONGO_URI);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use("/api/auth", verifyRoute);

app.use("/api/companies", companyRoutes);
app.use("/api/applications", applicationRoutes);
