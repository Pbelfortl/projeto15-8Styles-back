import {Router} from 'express'
import { addProductToCart, removeProductFromCart, listCart } from '../Controllers/cartController.js'
import { addToCartValidation } from '../Middlewares/addToCartValidateMiddleware.js'
import { removeFromCartValidation } from '../Middlewares/removeFromCartValidateMiddleware.js'
import authValidate from '../Middlewares/authValidateMiddleware.js'

const cartRouter = Router()

cartRouter.get("/cart", listCart)
cartRouter.use(authValidate)
cartRouter.post("/addCart", addToCartValidation, addProductToCart)
cartRouter.post("/removeCart", removeFromCartValidation, removeProductFromCart)

export default cartRouter;