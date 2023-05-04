import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cron from "node-cron";
import routes from "./routes/routes.js";
import updateStatus from "./app/config/updateStatus.js";
import emailGenerator from "./app/config/emailGenerator.js";

/* CONFIGURATIONS */
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

/* ROUTES */
routes(app);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6000;

try {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Database is connected...");

  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });

  app.get("/", (req, res) => {
    res.send("Hello");
  });
} catch (error) {
  console.log("Database not connected...");
}

/* CRON JOB */
cron.schedule("19 0 * * *", () => {
  console.log("Running cron job...");
  updateStatus();
  emailGenerator();
});
