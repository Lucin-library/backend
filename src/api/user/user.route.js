import { Router } from "express";
import { Controller } from "./user.controller.js";

const router = Router();
router.route("/login").post(Controller.login);

export default router;
