import signupSchema from "../Models/sign-up.model";
import { usersCollection} from "../database/db";

export async function signupValidation(req, res, next)  {
    const user = req.body;

    if (req.body.password !== req.body.confirmedPass) {
        return res.status(409).send({ message: "As duas senhas devem ser iguais" })
    }

    try {
        const userExists = await usersCollection.findOne({ email });

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
