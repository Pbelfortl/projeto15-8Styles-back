import signupSchema from "../Models/sign-upModel.js";
import { usersCollection } from "../database/db.js";

export async function signupValidation(req, res, next)  {
    const user = req.body;


    if (req.body.password !== req.body.confirmedPass) {
        return res.status(409).send({ message: "As duas senhas devem ser iguais" })
    }

    try {
        console.log("oi")
        const userExists = await usersCollection.findOne({ email: user.email });

        console.log(userExists)
        if (userExists) {
            return res.status(409).send({ message: "Esse email já existe" });
        }

        const { error } = signupSchema.validate(user, { abortEarly: false});

        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.status(422).send( {message: errors });
        }

        delete user.confirmedPass;
        req.user = user;
    } catch {
        return res.sendStatus(500);
    }   

    next();

}
