import express from "express";

import dotenv from "dotenv";
import connectdb from "./config/db.js";
dotenv.config();

import authRoute from "./routes/auth.route.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/auth", authRoute)

app.listen(port, () => {
    console.log(`Auth Services is running in port ${port}`)
    connectdb();
})