import prisma from "../../config/prisma.instance.js";

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
        deleteFlag: false,
      },
      include: {
        author: true,
      },
    });

    if (books !== null) {
      books = books.filter((book) => book.author.deleteFlag === false); //?
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
        deleteFlag: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// import { NotfoundHandler } from "../../error/NotFoundError.js";

// const countRatingsAndComments = (ratings) => {
//   let ratingCounts = {
//     5: 0,
//     4: 0,
//     3: 0,
//     2: 0,
//     1: 0,
//   };
//   let commentsCount = 0;

//   for (const rating of ratings) {
//     const stars = Math.round(rating.rating);
//     if (stars >= 1 && stars <= 5) {
//       ratingCounts[stars]++;
//     }
//     if (rating.review_text) {
//       commentsCount++;
//     }
//   }

//   return { ratingCounts, commentsCount };
// };

// export const getBooks = async (page, pageSize) => {
//   try {
//     const books = await prisma.book.findMany({
//       skip: (page - 1) * pageSize,
//       take: pageSize,
//     });
//     if (books.length === 0) throw new NotfoundHandler.EntityNotFound("Book");
//     return books;
//   } catch (err) {
//     console.error("Error getting books:", err);
//     throw err;
//   }
// };

// const getBookById = async (bookId) => {
//   try {
//     const book = await prisma.book.findUnique({
//       where: {
//         id: bookId,
//       },
//     });
//     const author = await prisma.author.findUnique({
//       where: {
//         id: book.author_id,
//       },
//     });
//     const ratings = await prisma.rating.findMany({
//       where: {
//         book_id: bookId,
//       },
//     });
//     console.log(ratings);

//     const { ratingCounts, commentsCount } = countRatingsAndComments(ratings);

//     return {
//       author,
//       ratingCounts,
//       commentsCount,
//     };
//   } catch (err) {}
// };

// const getBookContent = async (bookId) => {
//   try {
//     const bookContents = await prisma.chapter.findMany({
//       where: {
//         book_id: bookId,
//       },
//       include: {
//         contents: true,
//       },
//     });
//     return bookContents;
//   } catch (err) {
//     console.error("Error getting book contents:", err);
//     throw err;
//   }
// };

// const getBookChaptersById = async (bookId) => {
//   try {
//     const bookChapters = await prisma.chapter.findMany({
//       where: {
//         book_id: bookId,
//       },
//     });
//     return bookChapters;
//   } catch (err) {
//     console.error("Error getting book chapters:", err);
//     throw err;
//   }
// };

export const Service = {
  createBook,
  getAllBook,
  updateBook,
  deleteBook,
  // getBookById,
  // getBooks,
  // getBookContent,
  // getBookChaptersById,
};
