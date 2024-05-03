import prisma from "../../config/prisma.instance.js";
import { DataBaseErrorHandler } from "../../error/DataBaseError.js";

const update = async (req, res) => {
  try {
    const updatedUser = await prisma.user_account.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });
    return updatedUser;
  } catch (error) {
    throw new DataBaseErrorHandler.CannotUpdate("user");
  }
};

const getAllUser = async (req, res) => {
  try {
    let users = await prisma.user_account.findMany({
      where: {
        delete_flag: false,
      },
    });
    return users;
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (userId) => {
  try {
    const user = await prisma.user_account.findUnique({
      where: {
        id: userId,
        delete_flag: false,
      },
    });

    return user;
  } catch (err) {
    console.log(err);
  }
};

export const Service = {
  update,
  getAllUser,
  getUserById,
};
