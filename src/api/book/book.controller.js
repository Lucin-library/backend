import { Service } from "../book/book.service.js";

const createBook = async (req, res) => {
  try {
    const book = await Service.createBook(req, res);
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
  }
};

const getAllBook = async (req, res) => {
  try {
    const books = await Service.getAllBook(req, res);
    if (books === null || books.length == 0)
      res.status(200).json("Khong co sach hop le!");
    else res.status(200).json(books);
  } catch (error) {
    console.log(error);
  }
};

const updateBook = async (req, res) => {
  try {
    const book = await Service.updateBook(req, res);
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
  }
};

const deleteBook = async (req, res) => {
  try {
    await Service.deleteBook(req, res);
    res.status(200).json("Xóa thành công!");
  } catch (error) {
    res.status(500).json("Có lỗi xảy ra, vui lòng thử lại!");
  }
};

export const Controller = {
  createBook,
  getAllBook,
  updateBook,
  deleteBook,
};
