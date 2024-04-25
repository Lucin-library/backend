import prisma from "../../config/prisma.instance.js";

const createAuthor = async (req, res) => {
  try {
    const author = await prisma.author.create({ data: req.body });
    return author;
  } catch (error) {
    console.log(error);
  }
};

const getAllAuthor = async (req, res) => {
  try {
    const authors = await prisma.author.findMany({
      where: {
        deleteFlag: false,
      },
      include: {
        books: true,
      },
    });
    return authors;
  } catch (error) {
    console.log(error);
  }
};

const getAuthorById = async (req, res) => {
  try {
    const authors = await prisma.author.findUnique({
      where: {
        id: req.params.id,
        deleteFlag: false,
      },
      include: {
        books: true,
      },
    });
    return authors;
  } catch (error) {
    console.log(error);
  }
};

const updateAuthor = async (req, res) => {
  try {
    const author = await prisma.author.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });
    return author;
  } catch (error) {
    console.log(error);
  }
};

const deleteAuthor = async (req, res) => {
  try {
    await prisma.author.update({
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
  createAuthor,
  getAllAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
};
