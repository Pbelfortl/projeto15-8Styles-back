import { ObjectId } from "mongodb";
import { productsCollection } from "../database/db.js";

export async function cartValidation(req, res, next) {
  const productId = req.query.product;

  if (!productId) {
    return res
      .status(404)
      .send({
        message: "insira o id do produto por query: ?product=idDoProduto",
      });
  }

  try {
    const productAlreadyInCart = await productsCollection.findOne({ _id: new ObjectId(productId) })

    if(productAlreadyInCart) {
      return res.send({message: "Esse produto já está no seu carrinho"}).status(409)
    } else {
    res.locals.product = productAlreadyInCart;
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  next();
}