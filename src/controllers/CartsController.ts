import { Request, Response } from 'express'
import {
    CartsDTO,
    AddProductToCartInput, AddProductToCartOutput,
    DeductProductFromCartInput, DeductProductFromCartOutput,
    GetCartByUserInput, GetCartByUserOutput,
    UpdateProductAmountInCartInput, UpdateProductAmountInCartOutput
} from '../dtos/CartsDTO'
import { CartsBusiness } from '../business/CartsBusiness'
import { BaseError } from '../errors/BaseError'

export class CartsController {

    constructor(
        private cartsDTO: CartsDTO,
        private cartsBusiness: CartsBusiness
    ) { }

    public addProductToCart = async (req: Request, res: Response) => {
        try {
            const userToken = req.headers.authorization
            const { productId, productAmount } = req.body
            const input: AddProductToCartInput = this.cartsDTO.addProductToCartInput(userToken, productId, productAmount)
            const output: AddProductToCartOutput = await this.cartsBusiness.addProductToCart(input)
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

    public updateProductAmountInCart = async (req: Request, res: Response) => {
        try {
            const userToken = req.headers.authorization
            const { productId, newProductAmount } = req.body
            const input: UpdateProductAmountInCartInput = this.cartsDTO.updateProductAmountInput(userToken, productId, newProductAmount)
            const output: UpdateProductAmountInCartOutput = await this.cartsBusiness.updateProductAmountInCart(input)
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

    public getCartByUser = async (req: Request, res: Response) => {
        try {
            const userToken = req.headers.authorization
            const input: GetCartByUserInput = this.cartsDTO.getCartByUserInput(userToken)
            const output: GetCartByUserOutput = await this.cartsBusiness.getCartByUser(input)
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

    public deductProductFromCart = async (req: Request, res: Response) => {
        try {
            const userToken = req.headers.authorization
            const { productId } = req.body
            const input: DeductProductFromCartInput = this.cartsDTO.deductProductFromCartInput(userToken, productId)
            const output: DeductProductFromCartOutput = await this.cartsBusiness.deductProductFromCart(input)
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