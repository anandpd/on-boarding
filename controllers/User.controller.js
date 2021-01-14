import services from "../services";
import { generateToken } from '../utils/generateToken';
import User from "../models/User";
import status from "../utils/statusCodes";
import { contactValidation, loginValidation, OTPfieldValidation, registrationValidation } from "../utils/validations";
import { sendEmailTo } from "../utils/sendMail";

export const registerUser = async (req, res) => {
  registrationValidation(req.body);

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
  const emailToken = generateToken(payload, process.env.EMAIL_SECRET, "1d")

  sendEmailTo(email, emailToken, true)
    .then((success) => {
      res.status(status.created).json({
        success: true,
        ip: req.connection.remoteAddress,
        message: "User added successfully, link sent to your email !!",
        authToken: userToken,
      });
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const loginUser = async (req, res) => {
  loginValidation(req.body);
  const { email, password } = req.body;
  const user = await services.checkUserExist(User, email, false);
  const payload = {
    user: {
      id: user.id
    }
  }
  if (!(await services.authenticatePassword(password, user.password))) {
    throw new Error("Invalid credentials !");
  }

  const userToken = generateToken(payload);
  const emailToken = generateToken(payload, process.env.EMAIL_SECRET, "1d");

  sendEmailTo(email, emailToken)
    .then(data => {
      res.status(status.ok).json({
        success: true,
        ip: req.connection.remoteAddress,
        message: `${user.name} Logged in successfully !`,
        authToken: userToken,
      });
    })
    .catch((err) => {
      return res.status(status.badRequest).json(err);
    });
};

export const verifyEmail = async (req, res) => {
  const { emailToken } = req.params;
  let verifiedUser = services.verifyUser(emailToken);
  verifiedUser = services.updateModel(verifiedUser);
  res
    .status(status.accepted)
    .json({ success: true, message: "Email verified successfully !!" });
};

export const sendOTPtoContact = async (req, res) => {
  contactValidation(req.body);
  const { contact, countryCode } = req.body;
  const user = await services.findContact(User, contact);
  services.sendOTP(user, "otp");
  res.status(status.accepted).json({ success: true, message: `OTP successfully sent to : ${countryCode}-${contact}` })
}

export const verifyOtp = async (req, res) => {
  OTPfieldValidation(req.body);
  const { contact } = req.body;
  const user = await services.findContact(User, contact);
  await services.verifyOTP(user, req.body.otp)
  res.status(status.accepted).json({ success: true, message: "Contact verified successfully !!" });

}

export const removeUser = async (req, res) => {
  const user = await services.findModelByid(User, req.user.id);
  services.removeModel(user);
  res.status(status.ok).json({ success: true, message: 'Deleted successfully !' });
}