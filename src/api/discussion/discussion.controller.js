import { Service } from "../discussion/discussion.service.js";

const create = async (req, res) => {
  try {
    const comment = await Service.create(req, res);
    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
  }
};

const getAllComment = async (req, res) => {
  try {
    const comments = await Service.getAllComment(req, res);
    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
  }
};

export const Controller = {
  create,
  getAllComment,
};
