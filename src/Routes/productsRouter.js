import express from 'express'
import { insertProduct } from '../Controllers/productsController.js'
import { productValidation } from '../Middlewares/productValidateMiddleware.js'



const productsRouter = express.Router()

productsRouter.post("/insertProduct",productValidation, insertProduct)

export default productsRouter
