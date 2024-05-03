import { Service } from "../rating/rating.service.js";
import { Service as BookService } from "../book/book.service.js";

const createRating = async (req, res) => {
  try {
    const rating = await Service.createRating(req, res);
    res.status(200).json(rating);
  } catch (error) {
    console.log(error);
  }
};

const getRatingByBook = async (req, res) => {
  try {
    const bookId = req.query.bookId;
    const book = await BookService.getBookById(bookId);
    if (book === null || book === undefined || book.delete_flag === true) {
      res.status(404).json("Sach khong co trong he thong!");
      return;
    }
    const ratings = await Service.getRatingByBook(bookId);
    if (ratings === null || ratings === undefined || ratings.length === 0)
      res.status(404).json("Khong co Rating hop le!");
    else res.status(200).json(ratings);
  } catch (error) {
    console.log(error);
  }
};

const deleteRating = async (req, res) => {
  try {
    const userId = req.params.id;
    const bookId = req.query.bookId;

    const Rating = await Service.deleteRating(userId, bookId);
    res.status(200).json("xóa thành công!");
  } catch (error) {
    res.status(500).json("Có lỗi xảy ra, vui lòng thử lại!");
  }
};

const updateRating = async (req, res) => {
  try {
    const userId = req.params.id;
    const bookId = req.query.bookId;
    const rating = await Service.updateRating(req, userId, bookId);
    res.status(200).json(rating);
  } catch (error) {
    console.log(error);
  }
};

export const Controller = {
  createRating,
  getRatingByBook,
  deleteRating,
  updateRating,
};
