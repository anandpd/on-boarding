import services from "./services";
import bcrypt from "bcryptjs";
import User from "../models/User";
import status from "../utils/statusCodes";
import { registrationValidation } from "../utils/validations";

/**
 *
 * @description : register a user
 * @body : name, email, password
 * @SuccessResponse : success : boolean, message : String, token : String. ip: String
 */
export const addUser = async (req, res) => {
  let { error } = registrationValidation(req.body);
  if (error) throw new Error(error.message);

  const { email, password } = req.body;

  if (await services.checkUserExist(User, email))
    throw new Error("User already exists !");

  const user = await services.createModel(User, req.body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  const jwtOptions = {
    payload: {
      user: {
        id: user.id,
      },
    },
    options: {
      expiresIn: "1h",
    },
  };

  const token = await services.generateToken(
    jwtOptions.payload,
    process.env.SECRET,
    jwtOptions.options
  );

  await user.save();
  res.status(status.created).json({
    success: true,
    ip: req.connection.remoteAddress,
    message: "User added successfully !!",
    token: token,
  });
};
