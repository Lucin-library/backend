import { Router } from "express";
import { Controller } from "./discussion.controller.js";

const router = Router();
router.route("/").get(Controller.getAllComment);
router.route("/").post(Controller.create);

export default router;
