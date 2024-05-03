import { Service } from "../favorite/favorite.service.js";
import { Service as UserService } from "../user/user.service.js";

const createFavorite = async (req, res) => {
  try {
    const favorite = await Service.createFavorite(req, res);
    res.status(200).json(favorite);
  } catch (error) {
    console.log(error);
  }
};

const getFavoriteByUser = async (req, res) => {
  try {
    const userId = req.query.userId;
    const user = await UserService.getUserById(userId);
    if (user === null) {
      res.status(404).json("User khong co trong he thong!");
      return;
    }
    const favorites = await Service.getFavoriteByUser(userId);
    if (favorites === null || favorites.length === 0)
      res.status(404).json("Khong co favorite hop le!");
    else res.status(200).json(favorites);
  } catch (error) {
    console.log(error);
  }
};

const deleteFavorite = async (req, res) => {
  try {
    const userId = req.query.userId;
    const bookId = req.query.bookId;

    const favorite = await Service.deleteFavorite(userId, bookId);
    res.status(200).json("xóa thành công!");
  } catch (error) {
    res.status(500).json("Có lỗi xảy ra, vui lòng thử lại!");
  }
};

export const Controller = {
  createFavorite,
  getFavoriteByUser,
  deleteFavorite,
};
