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

cartsRouter.get('/cart', cartsController.getCartByUser)
cartsRouter.post('/cart', cartsController.addProductToCart)
cartsRouter.post('/cart/updatecart', cartsController.updateProductAmountInCart)
cartsRouter.delete('/cart/deductproduct', cartsController.deductProductFromCart)