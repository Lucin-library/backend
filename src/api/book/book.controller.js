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
    if (books === null) res.status(200).json("Khong co sach hop le!");
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

export const getAllBooks = async (req, res) => {
  console.log("get all book");
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const books = await Service.getBooks(page, pageSize);
    res.status(200).json(books);
  } catch (err) {
    console.error("Error getting all books:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const detail = await Service.getBookById(bookId);
    console.log("get book By id");
    res.status(200).json(detail);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getBookContent = async (req, res) => {
  try {
    const bookId = req.params.bookId; // Assuming bookId is passed as a route parameter
    const bookContents = await Service.getBookContent(bookId);

    res.json(bookContents);
  } catch (err) {
    console.error("Error getting book contents:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getBookChapters = async (req, res) => {
  try {
    console.log("get chapter");
    const bookId = req.params.bookId;
    const bookChapters = await Service.getBookChaptersById(bookId);

    res.json(bookChapters);
  } catch (err) {
    console.error("Error getting book chapters:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const searchBooks = async (req, res) => {
  try {
    const name = req.params.name;
    const books = await Service.searchBooks(name);
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const recommendByAuthor = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const authorId = req.params.authorId;
    const books = await Service.recommendByAuthor(page, pageSize, authorId);
    res.status(200).json(books);
  } catch (err) {
    console.error("Error getting all books:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const recommendByGenre = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const genre = req.params.name;
    const books = await Service.recommendByGenre(page, pageSize, genre);
    res.status(200).json(books);
  } catch (err) {
    console.error("Error getting all books:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const Controller = {
  createBook,
  getAllBook,
  updateBook,
  deleteBook,
  getAllBooks,
  getBookById,
  getBookContent,
  getBookChapters,
  searchBooks,
  recommendByAuthor,
  recommendByGenre,
};
