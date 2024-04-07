import { Service } from "../auth/auth.service.js";
import { validate } from "../../utils/validation.js";
import { InputErrorHandler } from "../../error/InputError.js";

const login = async (req, res, next) => {
  try {
    const { error } = validate.loginValidate(req.body);
    if (error) throw new InputErrorHandler.Validate(error.details[0].message);
    const { email, password } = req.body;
    await Service.login(email, password);
    res.status(200).json("Login successfully");
  } catch (e) {
    res.status(e.statusCode).json(e.message);
  }
};

const register = async (req, res, next) => {
  try {
    const { error } = validate.registerValidate(req.body);
    if (error) throw new InputErrorHandler.Validate(error.details[0].message);
    const user = await Service.register(req.body);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    res.status(err.statusCode).json(err.message);
  }
};

export const Controller = {
  login: login,
  register: register,
};
