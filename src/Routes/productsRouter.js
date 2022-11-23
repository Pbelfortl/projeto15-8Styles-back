import express from 'express'
import { insertProduct } from '../Controllers/productsController'



const productsRouter = express.Router()

productsRouter.post("/insertProduct", insertProduct)
