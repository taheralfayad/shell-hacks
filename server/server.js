import 'dotenv/config';
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import companies from "./routes/companies.js";
import admins from "./routes/admins.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/companies", companies);
app.use("/admins", admins);

mongoose.connect(process.env.MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
