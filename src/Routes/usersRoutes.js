import { Router } from "express";
import { signIn, signUp } from "../Controllers/usersControler.js";
import { signinValidation } from "../Middlewares/sign-inValidateMiddleware.js";
import { signupValidation } from "../Middlewares/sign-upValidateMiddleware.js";

const usersRouter = Router();

usersRouter.post("/sign-up", signupValidation, signUp);
usersRouter.post("/sign-in", signinValidation, signIn);

export default usersRouter;