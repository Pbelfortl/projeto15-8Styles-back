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
    res.locals.product = await productsCollection.findOne({ _id: productId });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  next();
}