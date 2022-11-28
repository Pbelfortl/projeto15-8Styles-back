import { ObjectId } from "mongodb";
import { cartCollection, productsCollection } from "../database/db.js";

export async function addToCartValidation(req, res, next) {
  const productId = req.query.product;
  const user = req.validUser;
  
  

  try {
    const productToBeAdded = await productsCollection.findOne({
      _id: new ObjectId(productId)
    });

    //console.log(productToBeAdded)

    const productAlreadyinCart = await cartCollection.findOne({ $and: [{
      _id: new ObjectId(productId)}, {user: user._id}]
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

    // function validateProductToBeInserted() { //Verifica se o produto já está no carrinho e pertence ao usuário logado
      
    //   if (productId === productAlreadyinCart?._id && productAlreadyinCart && productAlreadyinCart.user.toString() === user._id.toString()) {
    //     return true;
    //   } else return false
    // }
    
    

    // } else if (productToBeAdded) {
    //   res.locals.product = productToBeAdded;

    // } else {
    //   return res.sendStatus(404);
    // }

  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  next();
}