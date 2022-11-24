import { productsCollection } from "../database/db.js";


export async function insertProduct (req, res) {

    const product = req.product

    try {
        productsCollection.insertOne(product)
        res.sendStatus(201)
    } catch (err) {
        res.sendStatus(500)
    }
    
}