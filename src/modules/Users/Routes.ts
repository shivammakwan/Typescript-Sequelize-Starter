import { Router } from "express";
import * as UserController from "./Controller";

const router = Router();

router.get("/user", UserController.getAllUsers);

router.post("/user/register", UserController.doRegistration);

export default router;