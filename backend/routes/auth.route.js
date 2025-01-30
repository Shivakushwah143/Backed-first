import express from "express";
import { logout, signin, signup } from "../controllers/auth.contorller.js";

const route = express.Router();

route.post("/signup", signup);
route.post("/signin", signin);

route.post("/logout", logout);

export default route;
