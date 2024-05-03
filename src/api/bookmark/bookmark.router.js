import { Router } from "express";
import { Controller } from "./bookmark.controller.js";

const router = Router();
router.route("/").post(Controller.createBookmark);
router.route("/book").get(Controller.getBookmarkByBook);
router.route("/:id").delete(Controller.deleteBookmark);
export default router;
