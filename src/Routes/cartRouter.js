import {Router} from 'express'
import { addProductToCart, removeProductFromCart, listCart, purchase } from '../Controllers/cartController.js'
import { addToCartValidation } from '../Middlewares/addToCartValidateMiddleware.js'
import { removeFromCartValidation } from '../Middlewares/removeFromCartValidateMiddleware.js'
import authValidate from '../Middlewares/authValidateMiddleware.js'
import { purchaseValidate } from '../Middlewares/purchaseValidate.js'

const cartRouter = Router()


cartRouter.use(authValidate)
cartRouter.get("/cart", listCart)
cartRouter.post("/addCart", addToCartValidation, addProductToCart)
cartRouter.post("/removeCart", removeFromCartValidation, removeProductFromCart)
cartRouter.post("/purchase", purchaseValidate, purchase)

export default cartRouter;