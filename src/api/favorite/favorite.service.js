import prisma from "../../config/prisma.instance.js";

const createFavorite = async (req, res) => {
  try {
    const favorite = await prisma.favorite.create({
      data: req.body,
    });

    return res.status(200).json(favorite);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const getFavoriteByUser = async (userId) => {
  try {
    let favorites = await prisma.favorite.findMany({
      where: {
        user_id: userId,
        delete_flag: false,
      },
      include: {
        book: true,
      },
    });

    favorites = favorites.filter(
      (favorite) => favorite.book.delete_flag === false
    );

    return favorites;
  } catch (error) {
    console.log(error);
  }
};

const deleteFavorite = async (userId, bookId) => {
  try {
    return await prisma.favorite.update({
      where: {
        user_id_book_id: {
          user_id: userId,
          book_id: bookId,
        },
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
  createFavorite,
  getFavoriteByUser,
  deleteFavorite,
};
