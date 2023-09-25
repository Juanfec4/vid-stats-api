import User from "../schemas/user.js";
import validators from "../utils/validators.js";
import { generateApiKey } from "../services/keyGen.js";

//Create new user
const handleNewUser = async (req, res) => {
  if (process.env?.ALLOW_REGISTER?.toLowerCase() === "false") {
    return res.status(403).json({
      message: `Server is not allowing user registration at the moment.`,
    });
  }
  const { name, email } = req.body;

  //Name is not a string
  if (!validators.isString(name)) {
    return res.status(400).json({
      message: `invalid name input, expected [type:string] got [type:${typeof name}]`,
    });
  }
  //Email is invalid
  if (!validators.isValidEmail(email)) {
    return res.status(400).json({
      message: `invalid email input, expected [format:abc123@email.xxx] got [format:${email}]`,
    });
  }

  //Email is not already in use
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: `invalid email input, user already exists with email: ${email}`,
      });
    }
  } catch (e) {
    console.error(e);
  }

  //Generate api_token
  let { token, hashedToken } = await generateApiKey();

  //Create new user on DB
  try {
    const res = await User.create({
      name,
      email,
      api_key: hashedToken,
    });
  } catch (e) {
    return response.status(500).json({ message: e });
  }

  //Success response
  return res.status(200).json({
    new_user: {
      ...req.body,
      ["x-api-key"]: token,
    },
  });
};

//Get user keys for validation
const handleGetUserKeys = async () => {
  const users = await User.find().select("api_key");
  return users;
};

export default {
  handleNewUser,
  handleGetUserKeys,
};
