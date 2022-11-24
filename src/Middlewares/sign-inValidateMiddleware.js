import signinSchema from "../Models/sign-inModel.js";
import { usersCollection } from "../database/db.js";
import bcrypt from "bcrypt";

export async function signupValidation(req, res, next) {
    const { email, password } =  req.body;

    try {
        const userExists = await usersCollection.findOne({ email });
        if (!userExists) {
           return res.sendStatus(401);
        } 

        const passwordOk = bcrypt.compareSync(password, userExists.password);
        if (!passwordOk) {
           return res.sendStatus(401);
        }

        req.user = userExists;

   } catch (error) {
       console.log(error);
       res.sendStatus(500);
   }

   

   next();
}