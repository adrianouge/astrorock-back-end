import { CartsDatabase } from "../database/CartsDatabase"
import { ProductsDatabase } from "../database/ProductsDatabase"
import {
    AddProductToCartInput, AddProductToCartOutput,
    CartsDTO,
    DeductProductFromCartInput, DeductProductFromCartOutput,
    GetCartByUserInput, GetCartByUserOutput,
    UpdateProductAmountInCartInput, UpdateProductAmountInCartOutput
} from "../dtos/CartsDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { TokenManager } from "../services/TokenManager"
import { cartDB } from "../types"

export class CartsBusiness {

    constructor(
        private productsDatabase: ProductsDatabase,
        private cartsDatabase: CartsDatabase,
        private tokenManager: TokenManager,
        private cartsDTO: CartsDTO
    ) { }

    public addProductToCart = async (input: AddProductToCartInput) => {
        const { userToken, productId, productAmount } = input

        const userPayload = this.tokenManager.getPayload(userToken)

        if (!userPayload) {
            throw new BadRequestError("Token do usuário inválido.")
        }

        const productToAdd = await this.productsDatabase.getProductById(productId)

        if (!productToAdd) {
            throw new NotFoundError("Produto para adicionar ao carrinho não foi encontrado.")
        }

        const usersCartProductAdded: cartDB = {
            cartOwner: userPayload.id,
            productId,
            productAmount
        }

        await this.cartsDatabase.addProductToCart(usersCartProductAdded)

        const output: AddProductToCartOutput = this.cartsDTO.addProductToCartOutput(productToAdd.name, productAmount)
        return output
    }

    public updateProductAmountInCart = async (input: UpdateProductAmountInCartInput) => {
        const { userToken, productId, newProductAmount } = input

        const userPayload = this.tokenManager.getPayload(userToken)
        if (!userPayload) {
            throw new BadRequestError("Token do usuário inválido para atualizar o carrinho.")
        }

        const productToUpdateAmount = await this.productsDatabase.getProductById(productId)
        if (!productToUpdateAmount) {
            throw new NotFoundError("Produto para atualizar quantidade não encontrado.")
        }

        const newProductAmountInCart: cartDB = {
            cartOwner: userPayload.id,
            productId: productToUpdateAmount.id,
            productAmount: newProductAmount
        }

        await this.cartsDatabase.updateCart(newProductAmountInCart)


        const output: UpdateProductAmountInCartOutput = this.cartsDTO.updateProductAmountOutput(productToUpdateAmount.name, newProductAmount)
        return output
    }

    public getCartByUser = async (input: GetCartByUserInput) => {
        const { userToken } = input

        const userPayload = this.tokenManager.getPayload(userToken)

        if (!userPayload) {
            throw new BadRequestError("Token inválido para pegar o carrinho do usuário.")
        }

        const [usersCart] = await this.cartsDatabase.getCartByOwner(userPayload.id)

        if (!usersCart) {
            throw new NotFoundError("Usuário ainda não adicionou produtos ao carrinho.")
        }

        const output: GetCartByUserOutput = this.cartsDTO.getCartByUserOutput(usersCart)

        return output
    }

    public deductProductFromCart = async (input: DeductProductFromCartInput) => {

        const { userToken, productId } = input

        const userPayload = this.tokenManager.getPayload(userToken)
        if (!userPayload) {
            throw new BadRequestError("Token do usuário inválido para atualizar o carrinho.")
        }

        const productToDeduct = await this.productsDatabase.getProductById(productId)

        if (!productToDeduct) {
            throw new NotFoundError("Produto para retirar do carrinho não foi encontrado.")
        }

        await this.cartsDatabase.deductProductFromCart(userPayload.id, productToDeduct.id)

        const output: DeductProductFromCartOutput = this.cartsDTO.deductProductFromCartOutput(productToDeduct.name)
        return output
    }
}