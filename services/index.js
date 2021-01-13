import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const services = {
  checkUserExist: async function findWithEmail(modelObj, value) {
    const user = await modelObj.findOne({ email: value });
    if (user) throw new Error('User already exist !!');
    return user;
  },

  findContact: async function findWithContact(modelObj, value) {
    const user = await modelObj.findOne({ contact: value });
    if (!user) throw new Error('User doesn"t exist !!');
    return user;
  },

  createModel: async function createModel(modelObj, body) {
    const newModel = new modelObj(body);
    return await newModel.save();
  },

  generateToken: async function generateToken(payload, secret, expIn = '1h') {
    const token = jwt.sign(payload, secret, {
      expiresIn: expIn
    });
    return token;
  },

  authenticatePassword: async function authenticatePassword(
    originalPassword,
    password
  ) {
    const match = await bcrypt.compare(originalPassword, password);
    if (!match) return false;
    return true;
  },

  verifyUser: async function verifyUser(emailToken) {
    const verified = jwt.verify(emailToken, process.env.EMAIL_SECRET);
    if (!verified) return false;
    return verified;
  },

  updateModel: async function updateModel(modelObj) {
    modelObj["isVerified"] = true;
    return modelObj;
  },

  updateOTP: async function updateotp(modelObj) {
    modelObj.otp = 123456
    await modelObj.save();
  },

  hashPasswordAndUpdate: async function hashPassword(modelObj, tf) {
    const salt = await bcrypt.genSalt(10);
    modelObj[tf] = await bcrypt.hash(modelObj[tf], salt);
    await modelObj.save();
  }

};

export default services;
