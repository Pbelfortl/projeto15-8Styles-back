import { ObjectId } from "mongodb";
import { cartCollection } from "../database/db.js";

export async function removeFromCartValidation(req, res, next) {
  const productId = req.query.product;
  

  if (!productId) {
    return res.status(404).send({
      message: "insira o id do produto por query: ?product=idDoProduto",
    });
  }

  try {
    const productToBeRemoved = await cartCollection.findOne({
      _id: new ObjectId(productId),
    });
    console.log(productToBeRemoved)
    if (productToBeRemoved) {
      res.locals.product = productToBeRemoved;

    } else {
      return res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  next();
}