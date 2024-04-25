import { Service } from "../author/author.service.js";

const createAuthor = async (req, res) => {
  try {
    const author = await Service.createAuthor(req, res);
    res.status(200).json(author);
  } catch (error) {
    console.log(error);
  }
};

const getAllAuthor = async (req, res) => {
  try {
    const authors = await Service.getAllAuthor(req, res);
    res.status(200).json(authors);
  } catch (error) {
    console.log(error);
  }
};

const getAuthorById = async (req, res) => {
  try {
    const author = await Service.getAuthorById(req, res);
    res.status(200).json(author);
  } catch (error) {
    console.log(error);
  }
};

const updateAuthor = async (req, res) => {
  try {
    const author = await Service.updateAuthor(req, res);
    res.status(200).json(author);
  } catch (error) {
    console.log(error);
  }
};

const deleteAuthor = async (req, res) => {
  try {
    await Service.deleteAuthor(req, res);
    res.status(200).json("Xóa thành công!");
  } catch (error) {
    res.status(500).json("Có lỗi xảy ra, vui lòng thử lại!");
  }
};

export const Controller = {
  createAuthor,
  getAllAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
};
