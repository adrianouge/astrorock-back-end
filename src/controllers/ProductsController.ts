import { Request, Response } from "express";
import {
    DeleteProductByIdInput, DeleteProductByIdOutput,
    GetAllProductsOutput,
    GetProductByIdInput, GetProductByIdOutput,
    GetProductsByNameLikeInput, GetProductsByNameLikeOutput,
    ProductsDTO,
    RegisterNewProductInput, RegisterNewProductOutput,
    UpdateProductInfoInput, UpdateProductInfoOutput
} from "../dtos/ProductsDTO";
import { ProductsBusiness } from "../business/ProductsBusiness";
import { BaseError } from "../errors/BaseError";

export class ProductsController {
    constructor(
        private productsDTO: ProductsDTO,
        private productsBusiness: ProductsBusiness
    ) { }

    public registerNewProduct = async (req: Request, res: Response) => {
        try {
            const userToken = req.headers.authorization
            const { name, description, price, amountInStock } = req.body
            const priceAsNumber = Number(price)
            const amountInStockAsNumber = Number(amountInStock)
            const input: RegisterNewProductInput = this.productsDTO.registerNewProductInput(
                userToken,
                name, description,
                priceAsNumber,
                amountInStockAsNumber)
            const output: RegisterNewProductOutput = await this.productsBusiness.registerNewProduct(input)
            res.status(200).send(output)
        }
        catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.send(error.message)
            }
            else { res.send("Um erro inesperado ocorreu.") }
        }
    }
    public getProductById = async (req: Request, res: Response) => {
        try {
            const userToken = req.headers.authorization
            const { productId } = req.body
            const input: GetProductByIdInput = this.productsDTO.getProductByIdInput(userToken, productId)
            const output: GetProductByIdOutput = await this.productsBusiness.getProductById(input)
            res.status(200).send(output)
        }
        catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.send(error.message)
            }
            else { res.send("Um erro inesperado ocorreu.") }
        }
    }
    public getAllProducts = async (req: Request, res: Response) => {
        try {
            const output: GetAllProductsOutput = await this.productsBusiness.getAllProducts()
            res.status(200).send(output)
        }

        catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.send(error.message)
            }
            else { res.send("Um erro inesperado ocorreu.") }
        }
    }
    public getProductsByNameLike = async (req: Request, res: Response) => {
        try {
            const { termSearched } = req.body
            const input: GetProductsByNameLikeInput = this.productsDTO.getProductsByNameLikeInput(termSearched)
            const output: GetProductsByNameLikeOutput = await this.productsBusiness.getProductByNameLike(input)
            res.status(200).send(output)
        }

        catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.send(error.message)
            }
            else { res.send("Um erro inesperado ocorreu.") }
        }
    }
    public updateProductInfoById = async (req: Request, res: Response) => {
        try {
            const userToken = req.headers.authorization
            const { productId, productName, productDescription, productPrice, productAmountInStock, productCreatedAt } = req.body
            const input: UpdateProductInfoInput = this.productsDTO.updateProductInfoInput(userToken, productId, productName, productDescription, productPrice, productAmountInStock, productCreatedAt)
            const output: UpdateProductInfoOutput = await this.productsBusiness.updateProductInfo(input)
            res.status(200).send(output)
        }

        catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.send(error.message)
            }
            else { res.send("Um erro inesperado ocorreu.") }
        }
    }
    public deleteProductById = async (req: Request, res: Response) => {
        try {
            const userToken = req.headers.authorization
            const { productId } = req.body
            const input: DeleteProductByIdInput = this.productsDTO.deleteProductByIdInput(userToken, productId)
            const output: DeleteProductByIdOutput = await this.productsBusiness.deleteProduct(input)
            res.status(200).send(output)
        }

        catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.send(error.message)
            }
            else { res.send("Um erro inesperado ocorreu.") }
        }
    }
}