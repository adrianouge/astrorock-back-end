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
ordersRouter.post('/', ordersController.createNewOrder)
ordersRouter.post('/:id', ordersController.updateOrderById)
ordersRouter.get('/:id', ordersController.getOrderById)
ordersRouter.get('/user/:id', ordersController.getOrderById)
ordersRouter.delete('/:id', ordersController.deleteOrderById)