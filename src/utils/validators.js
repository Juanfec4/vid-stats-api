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

//Check if video is under x mins
const isValidDuration = (duration_string, x) => {
  const parts = duration_string.split(":").map(Number);

  let hours = 0,
    minutes = 0,
    seconds = 0;

  // Determine the format based on the number of parts
  if (parts.length === 3) {
    [hours, minutes, seconds] = parts;
  } else if (parts.length === 2) {
    [minutes, seconds] = parts;
  } else {
    throw new Error("Invalid duration_string format");
  }

  // Convert the duration to total minutes
  const totalDurationInMinutes = hours * 60 + minutes + seconds / 60;

  return totalDurationInMinutes < x;
};

export default {
  isValidEmail,
  isValidUrl,
  isString,
  isValidKey,
  isValidDuration,
};
