import { Router } from "express";
import { Controller } from "./rating.controller.js";

const router = Router();
router.route("/").post(Controller.createRating);
router.route("/book").get(Controller.getRatingByBook);
router.route("/:id").delete(Controller.deleteRating);
router.route("/:id").patch(Controller.updateRating);
export default router;
