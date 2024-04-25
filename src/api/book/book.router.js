import { Router } from "express";
import { Controller } from "./book.controller.js";

const router = Router();
router.route("/").get(Controller.getAllBook);
router.route("/").post(Controller.createBook);
router.route("/:id").patch(Controller.updateBook);
router.route("/:id").delete(Controller.deleteBook);

export default router;
