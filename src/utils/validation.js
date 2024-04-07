import Joi from "joi";
const registerValidate = (data) => {
  console.log({ validate: data });
  const accountSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    fullName: Joi.string().required(),
    password: Joi.string().min(8).max(32).required(),
    confirmPassword: Joi.ref("password"),
    phoneNumber: Joi.string().pattern(new RegExp("^[0-9]{10}$")).required(),
    dayOfBirth: Joi.date().iso().required(),
    gender: Joi.number().required(),
  });
  return accountSchema.validate(data);
};

const loginValidate = (data) => {
  const accountSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).max(32).required(),
  });

  return accountSchema.validate(data);
};

const passwordValidate = (data) => {
  const passwordSchema = Joi.object({
    password: Joi.string().min(8).max(32).required(),
  });
  return passwordSchema.validate(data);
};

export const validate = {
  registerValidate,
  loginValidate,
  passwordValidate,
};
