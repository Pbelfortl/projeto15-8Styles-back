import express from 'express'
import { insertProduct } from '../Controllers/productsController.js'
import { productsCollection } from '../database/db.js'
import { productValidation } from '../Middlewares/productValidateMiddleware.js'



const productsRouter = express.Router()

productsRouter.post("/insertProduct",productValidation, insertProduct)
productsRouter.get("/product", async (req, res) => {
    try {
        const products = await productsCollection.find({}).toArray()
        res.send(products)
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
})

export default productsRouter
