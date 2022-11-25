import { ObjectId } from "mongodb";
import { cartCollection, productsCollection } from "../database/db.js";

export async function addToCartValidation(req, res, next) {
  const productId = req.query.product;

  try {
    const productToBeAdded = await productsCollection.findOne({
      _id: new ObjectId(productId),
    });

    const productAlreadyinCart = await cartCollection.findOne({
      _id: new ObjectId(productId),
    });

    if (!productId) {
      return res.status(404).send({
        message: "insira o id do produto por query: ?product=idDoProduto",
      });
    }

    if (productAlreadyinCart) {
      return res
        .status(409)
        .send({ message: "Esse produto já está no seu carrinho" });
    } else if (productToBeAdded) {
      res.locals.product = productToBeAdded;
    } else {
      return res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  next();
}