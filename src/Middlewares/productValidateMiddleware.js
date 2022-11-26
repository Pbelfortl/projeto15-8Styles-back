import productSchema from "../Models/productModel.js";

export async function productValidation (req, res, next) {

    const product = req.body
    
    const validation = productSchema.validate(product)

    if(validation.error){
        return res.status(422).send("Insira todas as informações corretamente")
    }

    req.product = product

    next()
}