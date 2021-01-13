import jwt from "jsonwebtoken";

const services = {
  /**
   * @description : checks if a user exists with email throws error if doesnot exists
   */
  checkUserExist: async function findWithEmail(modelObj, value) {
    const user = await modelObj.findOne({ email: value });
    if (user) return true;
    return false;
  },

  createModel: async function createModel(modelObj, body) {
    const newModel = new modelObj(body);
    return await newModel.save();
  },

  generateToken: async function generateToken(payload, secret, options) {
    const token = jwt.sign(payload, secret, options);
    return token;
  },
};

export default services;
