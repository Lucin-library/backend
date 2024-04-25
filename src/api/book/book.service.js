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

export const Service = {
  createBook,
  getAllBook,
  updateBook,
  deleteBook,
};
