import { usersCollection, sessionsCollection } from "../database/db.js";
import bcrypt from "bcrypt"
import { v4 as uuidV4 } from "uuid";

export async function signUp(req, res) {
    const user = req.user;
    console.log(user)
    const hashPassword = bcrypt.hashSync(user.password, 10);

    try {    
        await usersCollection.insertOne({...user, password: hashPassword});
        res.sendStatus(201);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function signIn(req, res) {
    const user = req.user;
    const token = uuidV4();

    try {
        //const userName = userExists.name;
        await sessionsCollection.insertOne(
            {
                token,
                userId: user._id
            }
        )

        res.send({ token });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

}

