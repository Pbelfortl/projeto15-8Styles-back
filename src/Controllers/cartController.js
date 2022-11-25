import { cartCollection } from "../database/db.js";

export async function addProductToCart(req, res) {
  const product = res.locals.product; //item virá do middleware de validação do carrinho
  console.log(product)

  try {
    await cartCollection.insertOne(product);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function removeProductFromCart(req, res) {
  const productToBeRemoved = res.locals.product;

  try {
    await cartCollection.deleteOne({ _id: productToBeRemoved._id });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
}
