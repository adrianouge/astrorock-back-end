import express from 'express'
import { CartsController } from '../controllers/CartsController'
import { CartsDTO } from '../dtos/CartsDTO'
import { CartsBusiness } from '../business/CartsBusiness'
import { CartsDatabase } from '../database/CartsDatabase'
import { ProductsDatabase } from '../database/ProductsDatabase'
import { TokenManager } from '../services/TokenManager'

export const cartsRouter = express.Router()
const cartsController = new CartsController(
    new CartsDTO(),
    new CartsBusiness(
        new ProductsDatabase(),
        new CartsDatabase(),
        new TokenManager(),
        new CartsDTO()
    ),
)
cartsRouter.get('/', cartsController.getCartByUser)
cartsRouter.post('/', cartsController.addProductToCart)
cartsRouter.post('/updatecart', cartsController.updateProductAmountInCart)
cartsRouter.delete('/deductproduct', cartsController.deductProductFromCart)