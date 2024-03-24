import express from "express";
import SignUp from "../controllers/SignUp.js";
import Login from "../controllers/Login.js";
import Authentication from "../controllers/Authentication.js";

const router = express.Router();

router.post("/signup", SignUp);
router.post("/login", Login);

export default router;
