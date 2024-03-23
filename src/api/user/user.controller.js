import { Service } from "./user.service.js";

const login = (req, res, next) => {
  try {
    // Service.login(req.body);
    res.status(200).json("Dcm");
  } catch (e) {
    res.status(400).send(e.message);
  }
};

export const Controller = {
  login: login,
};
