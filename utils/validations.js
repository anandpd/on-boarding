import joi from "joi";

export const registrationValidation = data => {
  const { error } = joi
    .object({
      name: joi.string().required(),
      email: joi.string().required().email(),
      contact: joi.number().required(),
      countryCode: joi.string().required(),
      password: joi.string().min(6).required(),
    })
    .validate(data);

  if (error) throw new Error(error.message);
  if (data.contact.toString().length < 10) throw new Error('contact must be 10 digits long !')
};

export const loginValidation = data => {
  const { error } = joi
    .object({
      email: joi.string().required().email(),
      password: joi.string().required().min(6),
    })
    .validate(data);
  if (error) throw new Error(error.message)
};

export const contactValidation = data => {
  const { error } = joi.object({
    contact: joi.number().integer(),
    countryCode: joi.number().integer()
  }).validate(data);
  if (error) throw new Error(error.message);
  if (data.contact.toString().length < 10) throw new Error('Email must be 10 digits long !')
}

export const OTPfieldValidation = data => {
  const { error } = joi.object({
    contact: joi.number().integer(),
    otp: joi.number().integer()
  }).validate(data)
  if (error) throw new Error(error.message)
}