import services from "../routes/services";
// const { checkUserExist } = services;

/**
 *
 * @description : register a user
 * @body : name, email, password
 * @SuccessResponse : success : boolean, message : String, token : String
 */
export const addUser = async (req, res) => {
  const { name, email, password } = req.body;
  services.checkUserExist(email);
  res.json("User does not exists !!");
};
