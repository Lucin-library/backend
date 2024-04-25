import prisma from "../../config/prisma.instance.js";
import { DataBaseErrorHandler } from "../../error/DataBaseError.js";

const update = async (req, res) => {
  try {
    const updatedUser = await prisma.userAccount.update({
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

export const Service = {
  update,
};
