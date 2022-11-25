import {Router} from 'express'
import { addProductToCart, removeProductFromCart, listCart } from '../Controllers/cartController.js'
import { cartValidation } from '../Middlewares/cartValidateMiddleware.js'

const cartRouter = Router()

cartRouter.get("/cart", listCart)
cartRouter.use(cartValidation)
cartRouter.post("/addCart", addProductToCart)
cartRouter.post("/removeCart", removeProductFromCart)

export default cartRouter;