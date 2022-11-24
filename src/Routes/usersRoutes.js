import { Router } from "express";
import { signUp } from "../Controllers/usersControler.js";
import { signupValidation } from "../Middlewares/sign-upValidateMiddleware.js";

const usersRouter = Router();

usersRouter.post("/sign-up", signupValidation, signUp);

export default usersRouter;