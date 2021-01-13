import joi from "joi";

export const registrationValidation = (data) => {
  return joi
    .object({
      name: joi.string().required(),
      email: joi.string().required().email(),
      password: joi.string().min(6).required(),
    })
    .validate(data);
};
