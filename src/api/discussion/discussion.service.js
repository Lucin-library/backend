import prisma from "../../config/prisma.instance.js";

const create = async (req, res) => {
  try {
    const comment = await prisma.discussion_thread.create({ data: req.body });
    return comment;
  } catch (error) {
    console.log(error);
  }
};

const getAllComment = async (req, res) => {
  try {
    const comments = await prisma.discussion_thread.findMany({
      where: {
        deleteFlag: false,
      },
      include: {
        user: true,
        childThreads: true,
      },
    });
    return comments;
  } catch (error) {
    console.log(error);
  }
};

export const Service = {
  create,
  getAllComment,
};
