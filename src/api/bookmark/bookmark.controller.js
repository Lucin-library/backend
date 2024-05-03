import { Service } from "../bookmark/bookmark.service.js";
import { Service as BookService } from "../book/book.service.js";

const createBookmark = async (req, res) => {
  try {
    const bookmark = await Service.createBookmark(req, res);
    res.status(200).json(bookmark);
  } catch (error) {
    console.log(error);
  }
};

const getBookmarkByBook = async (req, res) => {
  try {
    const bookId = req.query.bookId;
    const book = await BookService.getBookById(bookId);
    if (book === null || book.book.delete_flag === true) {
      res.status(404).json("Sach khong co trong he thong!");
      return;
    }
    const bookmarks = await Service.getBookmarkByBook(bookId);
    if (bookmarks === null) res.status(200).json("Khong co bookmark hop le!");
    else res.status(200).json(bookmarks);
  } catch (error) {
    console.log(error);
  }
};

const deleteBookmark = async (req, res) => {
  try {
    await Service.deleteBookmark(req, res);
    res.status(200).json("Xóa thành công!");
  } catch (error) {
    res.status(500).json("Có lỗi xảy ra, vui lòng thử lại!");
  }
};

export const Controller = {
  createBookmark,
  getBookmarkByBook,
  deleteBookmark,
};
