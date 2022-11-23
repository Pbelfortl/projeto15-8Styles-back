import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
dotenv.config()


const app = express()
const router = express.Router()
app.use(router)
router.use(express.json())
router.use(cors())

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log('Rodando na porta:'+port)
})