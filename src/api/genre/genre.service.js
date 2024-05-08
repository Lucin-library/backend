import prisma from "../../config/prisma.instance.js";

const getAllGenre = async (req, res) => {
  try {
    let genres = await prisma.book.findMany({
      where: {
        delete_flag: false,
      },
      select: {
        genre: true,
      },
    });
    const uniqueGenres = new Set();
    genres.forEach((genreObj) => {
      uniqueGenres.add(genreObj.genre);
    });
    const uniqueGenresArray = Array.from(uniqueGenres);

    return uniqueGenresArray;
  } catch (error) {
    console.log(error);
  }
};

export const Service = {
  getAllGenre,
};
