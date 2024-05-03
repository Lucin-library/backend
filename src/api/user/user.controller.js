import { Service } from "./user.service.js";

const getAllUser = async (req, res) => {
  try {
    const users = await Service.getAllUser(req, res);
    if (users === null) res.status(200).json("Khong co user hop le!");
    else res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

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
  getAllUser,
  update,
};
