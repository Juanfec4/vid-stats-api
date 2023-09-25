import bcrypt from "bcryptjs";
import crypto from "crypto";

const SALT_NUM = 10;

//Generate x-api-key

export const generateApiKey = async () => {
  const token = crypto.randomUUID();
  const hashedToken = await bcrypt.hash(token, SALT_NUM);
  return { token, hashedToken };
};
