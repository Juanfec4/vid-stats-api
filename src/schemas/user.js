import { Schema, model } from "mongoose";

//User schema
/*
{
    name,
    email,
    api_key,
    api_limit
}
*/

const userSchema = new Schema({
  name: String,
  email: String,
  api_key: String,
});

export default model("User", userSchema);
