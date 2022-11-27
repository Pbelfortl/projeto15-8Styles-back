import { sessionsCollection, usersCollection } from "../database/db.js";

export default async function authValidate(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token)
    return res.status(401).send({ message: "Token incorreto ou inexistente" });

  const session = await sessionsCollection.findOne({ token });
  const user = await usersCollection.findOne({ _id: session?.userId });
  console.log(user);
  delete user.password;

  req.validUser = user;

  next();
}
