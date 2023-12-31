import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

//Register to API
router.post("/", (req, res) => {
  return userController.handleNewUser(req, res);
});

export default router;
