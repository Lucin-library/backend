import { Router } from "express";
import { Controller } from "./author.controller.js";

const router = Router();
router.route("/").get(Controller.getAllAuthor);
router.route("/:id").get(Controller.getAuthorById);
router.route("/:id").patch(Controller.updateAuthor);
router.route("/:id").delete(Controller.deleteAuthor);
router.route("/").post(Controller.createAuthor);

export default router;
