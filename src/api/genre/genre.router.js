import { Router } from "express";
import { Controller } from "./genre.controller.js";

const router = Router();
router.route("/").get(Controller.getAllGenre);

export default router;
