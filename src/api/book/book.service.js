import prisma from "../../config/prisma.instance.js";
import { NotfoundHandler } from "../../error/NotFoundError.js";

const countRatingsAndComments = (ratings) => {
  let ratingCounts = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };
  let commentsCount = 0;

  for (const rating of ratings) {
    const stars = Math.round(rating.rating);
    if (stars >= 1 && stars <= 5) {
      ratingCounts[stars]++;
    }
    if (rating.review_text) {
      commentsCount++;
    }
  }

  return { ratingCounts, commentsCount };
};

export const getBooks = async (page, pageSize) => {
  try {
    const books = await prisma.book.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    if (books.length === 0) throw new NotfoundHandler.EntityNotFound("Book");
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

    const { ratingCounts, commentsCount } = countRatingsAndComments(ratings);

    return {
      author,
      ratingCounts,
      commentsCount,
    };
  } catch (err) {}
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

export const Service = {
  getBookById,
  getBooks,
  getBookContent,
  getBookChaptersById,
};
