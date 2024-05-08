import { Service } from "../genre/genre.service.js";

const getAllGenre = async (req, res) => {
  try {
    const genres = await Service.getAllGenre(req, res);
    res.status(200).json(genres);
  } catch (error) {
    console.log(error);
  }
};

export const Controller = {
  getAllGenre,
};
