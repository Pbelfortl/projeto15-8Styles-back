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

export async function getProducts (req, res) {
    
    const category = req.query.category
    const subCategory = req.query.subCategory

    try {

        if(category && subCategory){
            const product = await productsCollection.find({subCategory:subCategory}).toArray()
            console.log(product)
            return res.status(200).send(product)
        }

        if(category){
            const product = await productsCollection.find({category:category}).toArray()
            console.log(product)
            return res.status(200).send(product)
        }

        const product = await productsCollection.find().toArray()
        console.log(product)
        res.status(200).send(product)
    }catch (err) {
        res.sendStatus(500)
    }
    
}