import { ObjectId } from "mongodb";
import { cartCollection, purchaseCollection } from "../database/db.js";

export async function addProductToCart(req, res) {
  const product = res.locals.product;
  console.log(product)
  const user = req.validUser
  console.log(user)

  
  try {

    await cartCollection.insertOne({product, user: user._id });
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function removeProductFromCart(req, res) {
  const productToBeRemoved = res.locals.product;
  const {_id} = req.validUser;

  console.log("Product id: " + productToBeRemoved._id)
  console.log("User Id: " + _id)

  try {
    await cartCollection.deleteOne({ $and: [{_id: productToBeRemoved._id}, {user: _id}] });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
}

export async function listCart(req, res) {
  const user = req.validUser

  try {
    if(user){
      const cart = await cartCollection.find({user: user._id}).toArray();
      console.log(cart)
      return res.send(cart);
    }
    
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function purchase(req, res) {
  const purchaseInformations = req.body
  const user = req.validUser

  try {
    await purchaseCollection.insertOne( {purchaseInformations, user: user._id})
    res.sendStatus(200);
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }

}