import express from 'express'
import { OrdersController } from '../controllers/OrdersController'
import { OrdersDTO } from '../dtos/OrdersDTO'
import { OrdersBusiness } from '../business/OrdersBusiness'
import { OrdersDatabase } from '../database/OrdersDatabase'
import { TokenManager } from '../services/TokenManager'
import { IdGenerator } from '../services/IdGenerator'
import { CartsDatabase } from '../database/CartsDatabase'

export const ordersRouter = express.Router()

const ordersController = new OrdersController(
    new OrdersDTO(),
    new OrdersBusiness(
        new OrdersDatabase(),
        new CartsDatabase(),
        new TokenManager(),
        new IdGenerator(),
        new OrdersDTO()
    )
)

ordersRouter.post('/orders/', ordersController.createNewOrder)
ordersRouter.post('/orders/:id', ordersController.updateOrderById)
ordersRouter.get('/orders/:id', ordersController.getOrderById)
ordersRouter.get('/orders/user/:id', ordersController.getOrderById)
ordersRouter.delete('/orders/:id', ordersController.deleteOrderById)