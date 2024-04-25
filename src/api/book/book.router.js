import { Router } from "express";
import { Controller } from "./book.controller.js";

const router = Router();
router.route("/").get(Controller.getAllBook);
router.route("/").post(Controller.createBook);
router.route("/:id").patch(Controller.updateBook);
router.route("/:id").delete(Controller.deleteBook);

// router.route("/all").get(Controller.getAllBooks);
// router.route("/:id").get(Controller.getBookById);
// router.route("/:bookId/chapters").get(Controller.getBookChapters);
// router.route("/:bookId/contents").get(Controller.getBookContent);

export default router;
