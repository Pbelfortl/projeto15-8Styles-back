import { ObjectId } from "mongodb";
import { cartCollection, productsCollection } from "../database/db.js";

export async function addToCartValidation(req, res, next) {
  const productId = req.query.product;
  const user = req.validUser;
  
  console.log(productId)

  try {
    const productToBeAdded = await productsCollection.findOne({
      _id: ObjectId(productId)
    });

    //console.log(productToBeAdded)

    const productAlreadyinCart = await cartCollection.findOne({ $and: [{
      _id: ObjectId(productId)}, {user: user?._id}]
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
    }

    //console.log(productToBeAdded)
    res.locals.product = productToBeAdded

    next()

  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}