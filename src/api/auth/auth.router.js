import { Router } from "express";
import { Controller } from "./auth.controller.js";

const router = Router();
router.route("/login").post(Controller.login);
router.route("/register").post(Controller.register);

export default router;
