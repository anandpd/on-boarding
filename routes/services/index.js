import User from "../../models/User";

const services = {
  /**
   * @description : checks if a user exists with email throws error if doesnot exists
   */
  checkUserExist: async function checkUserWithEmail(email) {
    const user = await User.findOne({ email });
    if (user) throw new Error("User already Exists !!");
  },
};

export default services;
