import { Service } from "./book.service.js";

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

export const Controller = {
  getAllBooks,
  getBookById,
  getBookContent,
  getBookChapters,
};
