import express from 'express'
import { ProductsController } from '../controllers/ProductsController'
import { ProductsDTO } from '../dtos/ProductsDTO'
import { ProductsBusiness } from '../business/ProductsBusiness'
import { ProductsDatabase } from '../database/ProductsDatabase'
import { TokenManager } from '../services/TokenManager'
import { IdGenerator } from '../services/IdGenerator'

export const productsRouter = express.Router()

const productsController = new ProductsController(
    new ProductsDTO(),
    new ProductsBusiness(
        new ProductsDatabase(),
        new ProductsDTO(),
        new TokenManager(),
        new IdGenerator()
    ),
)

productsRouter.get('/', productsController.getAllProducts)
productsRouter.post('/registernewproduct', productsController.registerNewProduct)
productsRouter.post('/:id/editproduct', productsController.updateProductInfoById)
productsRouter.delete('/:id/deleteproduct', productsController.deleteProductById)
productsRouter.get('/:id', productsController.getProductById)
productsRouter.get('/search?q=', productsController.getProductsByNameLike)
