import bcrypt from "bcryptjs";

//Check if email is valid
const isValidEmail = (str) => {
  const validRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  return validRegex.test(str);
};

//Check if is string
const isString = (str) => {
  return typeof str === "string";
};

//Check if url is valid format
const isValidUrl = (str) => {
  const validRegex =
    /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
  return validRegex.test(str);
};

//Check if key is valid
const isValidKey = (api_key, hashed_keys) => {
  for (let hashed_key of hashed_keys) {
    let res = bcrypt.compareSync(api_key, hashed_key);
    if (res) return true;
  }
  return false;
};

export default {
  isValidEmail,
  isValidUrl,
  isString,
  isValidKey,
};
