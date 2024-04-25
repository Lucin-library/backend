import { Router } from "express";
import { Controller } from "./user.controller.js";

const router = Router();
router.route("/update/:id").patch(Controller.update);

export default router;
