import express from "express";
import videoController from "../controllers/videoController.js";

const router = express.Router();

//Get video details
router.get("/", (req, res) => {
  return videoController.handleGetVideo(req, res);
});

export default router;
