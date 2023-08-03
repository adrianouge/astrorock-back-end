import express from "express";
import cors from 'cors';
import dotenv from 'dotenv'
import { usersRouter } from './routers/UsersRouter'
import { productsRouter } from './routers/ProductsRouter'
import { ordersRouter } from "./routers/OrdersRouter";
import { cartsRouter } from "./routers/CartsRouter";

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.listen()

app.use('/users', usersRouter)
app.use('/posts', productsRouter)
app.use('/orders', ordersRouter)
app.use('/carts', cartsRouter)