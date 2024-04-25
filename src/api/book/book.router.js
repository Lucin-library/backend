import { Router } from "express";
import { Controller } from "./book.controller.js";

const router = Router();

router.route("/all").get(Controller.getAllBooks);
router.route("/:id").get(Controller.getBookById);
router.route("/:bookId/chapters").get(Controller.getBookChapters);
router.route("/:bookId/contents").get(Controller.getBookContent);

export default router;
