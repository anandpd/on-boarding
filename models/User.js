import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },

  // Contact
  countryCode: {
    type: String,
    required: true
  },
  contact: {
    type: Number,
    required: true
  },
  otp: {
    type: Number,
  }
},
  {
    versionKey: false,
  }
);

export default model("user", userSchema);
