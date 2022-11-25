import express from 'express'
import { getProducts, insertProduct } from '../Controllers/productsController.js'
import { productValidation } from '../Middlewares/productValidateMiddleware.js'



const productsRouter = express.Router()

productsRouter.post("/insertProduct",productValidation, insertProduct)

productsRouter.get("getProducts/", getProducts)

export default productsRouter
