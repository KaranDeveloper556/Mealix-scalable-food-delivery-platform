import express from "express";
import { addUserRole, loginUser, myProfile } from "../controller/auth.controller.js";
import { isAuth } from "../middleware/isAuth.js";

const authRoute = express.Router();

authRoute.post("/login", loginUser);
authRoute.put("/add/role", isAuth, addUserRole);
authRoute.get("/me", isAuth, myProfile)

export default authRoute;