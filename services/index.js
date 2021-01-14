import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import moment from 'moment';

const services = {
  checkUserExist: async function findWithEmail(modelObj, value, registration = true) {
    const user = await modelObj.findOne({ email: value });
    if (registration) {
      if (user) throw new Error('User already exist !!');
    } else if (!user) throw new Error('User does not exists !!')

    return user;
  },
  checkContactExist: async function checkContactExist(modelObj, value, registration = true) {
    const contact = await modelObj.findOne({ contact: value });
    if (registration) {
      if (contact) throw new Error('User with this contact already exist !!')
    }
  },

  findContact: async function findWithContact(model, value) {
    const user = await model.findOne({ contact: value });
    if (!user) throw new Error('User doesn"t exist !!');
    return user;
  },

  createModel: async function createModel(modelObj, body) {
    const newModel = new modelObj(body);
    return await newModel.save();
  },

  authenticatePassword: async function authenticatePassword(originalPassword, password) {
    const match = await bcrypt.compare(originalPassword, password);
    if (!match) return false;
    return true;
  },

  verifyUser: async function verifyUser(emailToken) {
    const verified = jwt.verify(emailToken, process.env.EMAIL_SECRET);
    if (!verified) throw new Error('Email not verified !!')
    return verified;
  },

  updateModel: async function updateModel(modelObj) {
    modelObj.isVerified = true;
    await modelObj.save();
  },

  sendOTP: async function sendOTP(modelObj, key) {
    modelObj[key] = 123456
    let currentDate = moment(new Date());
    modelObj.otpSentTime = currentDate;
    await modelObj.save();
  },

  hashPasswordAndUpdate: async function hashPassword(modelObj, tf) {
    const salt = await bcrypt.genSalt(10);
    modelObj[tf] = await bcrypt.hash(modelObj[tf], salt);
    await modelObj.save();
  },

  verifyOTP: async function verifyotp(modelObj, _otp) {
    const { otp, otpSentTime } = modelObj;
    if (_otp !== otp) throw new Error('Invalid OTP');
    if (moment(new Date()).diff(otpSentTime, 'days') > 1) throw new Error('otp expired, try again !!')
    modelObj.isVerified = true;
    await modelObj.save();
  },

  findModelByid: async function findModel(model, id) {
    const modelObj = await model.findById(id);
    if (!modelObj) throw new Error('Not found !');
    return modelObj;
  },

  removeModel: async function removeUser(modelObj) {
    modelObj.isDeleted = true;
    await modelObj.save();
  }
};

export default services;
