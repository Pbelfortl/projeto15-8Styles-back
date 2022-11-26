import { cartCollection } from "../database/db.js";

export async function addProductToCart(req, res) {
  const product = res.locals.product;
  const user = req.validUser
  
  try {
    await cartCollection.insertOne({...product, user: user._id });
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function removeProductFromCart(req, res) {
  const productToBeRemoved = res.locals.product;
  const user = req.validUser

  try {
    await cartCollection.deleteOne({ $and: [{_id: productToBeRemoved._id, user: user._id}] });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
}

export async function listCart(req, res) {
  const user = req.validUser

  try {
    const cart = await cartCollection.find({user: user._id}).toArray();
    res.send(cart);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}