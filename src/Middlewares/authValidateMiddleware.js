import { sessionsCollection, usersCollection } from "../database/db.js";

export default async function authValidate(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  console.log(token)
  if (!token)
    return res.status(401).send({ message: "Token incorreto ou inexistente" });

  try {
    const session = await sessionsCollection.findOne({ token });
    //console.log(session);
    const user = await usersCollection.findOne({ _id: session?.userId });

    delete user.password;

    req.validUser = user;
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  next();
}
