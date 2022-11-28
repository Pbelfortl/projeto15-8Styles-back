import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import usersRouter from './Routes/usersRoutes.js'
import productsRouter from './Routes/productsRouter.js'
import cartRouter from './Routes/cartRouter.js'

const app = express();

app.use(express.json())
app.use(cors())
app.use(usersRouter)
app.use(productsRouter)
app.use(cartRouter)



const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log('Rodando na porta:'+port)
})