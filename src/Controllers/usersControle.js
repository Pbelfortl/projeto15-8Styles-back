import { usersCollection, sessionsCollections } from "../database/db";
import bcrypt from "bcrypt"
import { v4 as uuidV4 } from "uuid";

export async function singUp(req, res) {
    const { user } = req.user;
    const hashPassword = bcrypt.hashSync(user.password, 10);

    try {    
        await usersCollection.insertOne({...user, password: hashPassword});
        res.sendStatus(201);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}

