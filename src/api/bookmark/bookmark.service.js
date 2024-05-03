import prisma from "../../config/prisma.instance.js";

const createBookmark = async (req, res) => {
  try {
    const bookmark = await prisma.bookmark.create({
      data: req.body,
    });

    return res.status(200).json(bookmark);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const getBookmarkByBook = async (bookId) => {
  try {
    let bookmarks = await prisma.bookmark.findMany({
      where: {
        book_id: bookId,
        delete_flag: false,
      },
    });

    return bookmarks;
  } catch (error) {
    console.log(error);
  }
};

const deleteBookmark = async (req, res) => {
  try {
    await prisma.bookmark.update({
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

export const Service = {
  createBookmark,
  getBookmarkByBook,
  deleteBookmark,
};
