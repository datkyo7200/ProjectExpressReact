const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const initRoutes = require("./routes/routes");
const cors = require("cors");

const connectDB = async () => {
  const mongoURI = "mongodb://localhost:27017/mern-learning";
  try {
    await mongoose.connect(mongoURI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("MongoDB connection successfully 🌍🌍🌍");
  } catch (error) {
    console.log("😥😣 Error in DB connection: " + error);
    process.exit(1); //restart
  }
};

connectDB();

const app = express();

app.use(cors());

//  parse JSON-encoded bodies and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", initRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
