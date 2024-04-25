import { Service } from "./user.service.js";

const update = async (req, res) => {
  try {
    const newUser = await Service.update(req, res);
    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    res.status(err.statusCode).json(err.message);
  }
};

export const Controller = {
  update,
};
