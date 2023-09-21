import express from "express";
const router = express.Router();
import * as user from "../controllers/userController.js";

router.get("/", user.getAllUsers);
router.get("/:id", user.getUserById);
router.post("/signup", user.createUser);
router.post("/login", user.loginUser);

export default router;
