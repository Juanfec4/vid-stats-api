import express from "express";
import userController from "../controllers/userController.js";
import validators from "../utils/validators.js";

const middleware = new express.Router();

middleware.use(async (req, res, next) => {
  if (req.path === "/register") return next();

  let api_key = null;

  //Get api_key from request headers
  if (req.headers?.["x-api-key"]) {
    api_key = req.headers["x-api-key"];
  }

  //Get stored keys from DB
  const storedKeys = (await userController.handleGetUserKeys()).map(
    (user) => user.api_key
  );

  //Check if key is not valid or missing
  if (!api_key || !validators.isValidKey(api_key, storedKeys)) {
    return res.status(400).json({
      message: `invalid [x-api-key], send a POST request to '/register' to generate one.`,
    });
  }
  next();
});

export default middleware;
