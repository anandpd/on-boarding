import services from "../services";
import { generateToken } from '../utils/generateToken';
import User from "../models/User";
import status from "../utils/statusCodes";
import { contactValidation, loginValidation, registrationValidation } from "../utils/validations";
import { sendEmailTo } from "../utils/sendMail";

export const registerUser = async (req, res) => {
  registrationValidation(req.body);
  if (req.body.contact.toString().length < 10) throw new Error('contact must be 10 digits long !')
  const { email } = req.body;
  await services.checkUserExist(User, email);
  var user = await services.createModel(User, req.body);
  await services.hashPasswordAndUpdate(user, "password");

  const payload = {
    user: {
      id: user.id,
    },
  }

  const userToken = generateToken(payload);
  const emailToken = await services.generateToken(payload, process.env.EMAIL_SECRET, "1d")

  sendEmailTo(email, emailToken, true)
    .then((success) => {
      res.status(status.created).json({
        success: true,
        ip: req.connection.remoteAddress,
        message: "User added successfully, link sent to your email !!",
        token: userToken,
      });
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const loginUser = async (req, res) => {

  const { error } = loginValidation(req.body);
  if (error) throw new Error(error.message);

  const { email, password } = req.body;
  const user = await services.checkUserExist(User, email);

  const payload = {
    user: {
      id: user.id
    }
  }
  if (!user) throw new Error("Email does not exists or is invalid !");
  if (!(await services.authenticatePassword(password, user.password))) {
    throw new Error("Invalid credentials !");
  }

  const userToken = generateToken(payload);
  const emailToken = generateToken(payload, process.env.EMAIL_SECRET, "1d");

  sendEmailTo(email, emailToken)
    .then((data) => {
      res.status(status.ok).json({
        success: true,
        ip: req.connection.remoteAddress,
        message: `${user.name} Logged in successfully !`,
        token: userToken,
      });
    })
    .catch((err) => {
      return res.status(status.badRequest).json(err);
    });
};

export const verifyEmail = async (req, res) => {
  const { emailToken } = req.params;
  const verifiedUser = services.verifyUser(emailToken);
  if (!verifiedUser) throw new Error("Email not verified !");
  const updatedUser = services.updateModel(verifiedUser);
  await updatedUser.save();
  res
    .status(status.accepted)
    .json({ success: true, message: "Email verified successfully !!" });
};

export const verifyContact = async (req, res) => {
  contactValidation(req.body);
  if (req.body.contact.toString().length() < 10) throw new Error('Contact must be 10 digits !');

  const { contact } = req.body;
  const user = await services.findContact(User, contact);
  services.updateOTP(user);
  res.status(status.ok).json({ success: true, message: `OTP successfully sent to : ${contact}` })
}