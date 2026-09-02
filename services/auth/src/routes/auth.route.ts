import express from "express";
import { loginUser } from "../controller/auth.controller.js";

const authRoute = express.Router();

authRoute.post("/login", loginUser)

export default authRoute