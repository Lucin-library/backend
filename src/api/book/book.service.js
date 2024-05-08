import prisma from "../../config/prisma.instance.js";
import { Service as RatingService } from "../rating/rating.service.js";

import { NotfoundHandler } from "../../error/NotFoundError.js";
const createBook = async (req, res) => {
  try {
    const book = await prisma.book.create({
      data: req.body,
    });

    return res.status(200).json(book);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const getAllBook = async (req, res) => {
  try {
    let books = await prisma.book.findMany({
      where: {
        delete_flag: false,
      },
      include: {
        author: true,
      },
    });

    if (books !== null) {
      books = books.filter((book) => book.author.delete_flag === false); //?
    }
    return books;
  } catch (error) {
    console.log(error);
  }
};

const updateBook = async (req, res) => {
  try {
    const book = await prisma.book.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });
    return book;
  } catch (error) {
    console.log(error);
  }
};

const deleteBook = async (req, res) => {
  try {
    await prisma.book.update({
      where: {
        id: req.params.id,
      },
      data: {
        delete_flag: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getBooks = async (page, pageSize) => {
  try {
    const books = await prisma.book.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        author: true,
      },
    });
    //if (books.length === 0) throw new NotfoundHandler.EntityNotFound("Book");
    return books;
  } catch (err) {
    console.error("Error getting books:", err);
    throw err;
  }
};

const getBookById = async (bookId) => {
  try {
    const book = await prisma.book.findUnique({
      where: {
        id: bookId,
      },
    });
    const author = await prisma.author.findUnique({
      where: {
        id: book.author_id,
      },
    });
    const ratings = await prisma.rating.findMany({
      where: {
        book_id: bookId,
      },
    });
    console.log(ratings);

    const { ratingCounts, totalRatings, commentsCount } =
      RatingService.countRatingsAndComments(ratings);

    return {
      book,
      author,
      ratingCounts,
      totalRatings,
      commentsCount,
    };
  } catch (err) {
    console.log(err);
  }
};

const getBookContent = async (bookId) => {
  try {
    const bookContents = await prisma.chapter.findMany({
      where: {
        book_id: bookId,
      },
      include: {
        contents: true,
      },
    });
    return bookContents;
  } catch (err) {
    console.error("Error getting book contents:", err);
    throw err;
  }
};

const getBookChaptersById = async (bookId) => {
  try {
    const bookChapters = await prisma.chapter.findMany({
      where: {
        book_id: bookId,
      },
    });
    return bookChapters;
  } catch (err) {
    console.error("Error getting book chapters:", err);
    throw err;
  }
};

const searchBooks = async (name) => {
  try {
    const books = await prisma.book.findMany({
      where: {
        title: {
          mode: "insensitive",
          contains: name,
        },
      },
    });
    return books;
  } catch (err) {
    console.error("Error find books by this name", err);
    throw err;
  }
};

const recommendByAuthor = async (page, pageSize, authorId) => {
  try {
    const books = await prisma.book.findMany({
      where: {
        author_id: authorId,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        author: true,
      },
    });
    if (books.length === 0) throw new NotfoundHandler.EntityNotFound("Book");
    return books;
  } catch (err) {
    console.error("Error getting books:", err);
    throw err;
  }
};

const recommendByGenre = async (page, pageSize, genre) => {
  try {
    const books = await prisma.book.findMany({
      where: { genre: genre },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        author: true,
      },
    });
    if (books.length === 0) throw new NotfoundHandler.EntityNotFound("Book");
    const totalBooks = await prisma.book.count({
      where: { genre: genre },
    });
    const lastPage = Math.ceil(totalBooks / pageSize);
    const result = {
      books: books,
      lastPage: lastPage,
    };

    return result;
  } catch (err) {
    console.error("Error getting books:", err);
    throw err;
  }
};

export const Service = {
  createBook,
  getAllBook,
  updateBook,
  deleteBook,
  getBookById,
  getBooks,
  getBookContent,
  getBookChaptersById,
  searchBooks,
  recommendByAuthor,
  recommendByGenre,
};
