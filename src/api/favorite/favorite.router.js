import { Router } from "express";
import { Controller } from "./favorite.controller.js";

const router = Router();
router.route("/").post(Controller.createFavorite);
router.route("/user").get(Controller.getFavoriteByUser);
router.route("/:id").delete(Controller.deleteFavorite);
export default router;
