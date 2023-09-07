import { BadRequestError } from "../errors/BadRequestError"
import { cartDB } from "../types"

export interface AddProductToCartInput {
    userToken: string,
    productId: string,
    productAmount: string
}
export interface AddProductToCartOutput {
    message: string,
    productName: string,
    productAmount: string
}
export interface UpdateProductAmountInCartInput {
    userToken: string,
    productId: string,
    newProductAmount: string
}
export interface UpdateProductAmountInCartOutput {
    message: string,
    productName: string,
    newProductAmount: string
}
export interface GetCartByUserInput {
    userToken: string
}
export interface GetCartByUserOutput {
    message: string,
    userCart: cartDB
}
export interface DeductProductFromCartInput {
    userToken: string,
    productId: string
}
export interface DeductProductFromCartOutput {
    message: string,
    removedProduct: string
}

export class CartsDTO {
    public addProductToCartInput(
        userToken: unknown,
        productId: unknown,
        productAmount: unknown
    ): AddProductToCartInput {
        if (typeof userToken !== "string") {
            throw new BadRequestError("O token do usuário deve ser do tipo string.")
        }
        if (typeof productId !== "string") {
            throw new BadRequestError("O id do produto deve ser do tipo string.")
        }
        if (typeof productAmount !== "string") {
            throw new BadRequestError("A quantidade do produto deve ser do tipo string.")
        }
        const dto: AddProductToCartInput = {
            userToken,
            productId,
            productAmount
        }
        return dto
    }
    public addProductToCartOutput(
        productName: string,
        productAmount: string
    ): AddProductToCartOutput {
        const dto: AddProductToCartOutput = {
            message: `Produto adicionado ao seu carrinho com sucesso.`,
            productName,
            productAmount
        }
        return dto
    }
    public updateProductAmountInput(
        userToken: unknown,
        productId: unknown,
        newProductAmount: unknown
    ): UpdateProductAmountInCartInput {
        if (typeof userToken !== "string") {
            throw new BadRequestError("O token do usuário deve ser do tipo string.")
        }
        if (typeof productId !== "string") {
            throw new BadRequestError("O id do produto deve ser do tipo string.")
        }
        if (typeof newProductAmount !== "string") {
            throw new BadRequestError("A quantidade do produto deve ser do tipo string.")
        }
        const dto: UpdateProductAmountInCartInput = {
            userToken,
            productId,
            newProductAmount
        }
        return dto
    }
    public updateProductAmountOutput(
        productName: string,
        newProductAmount: string
        ): UpdateProductAmountInCartOutput {
        const dto: UpdateProductAmountInCartOutput = {
            message: `A quantidade de produtos no carrinho foi atualizada.`,
            productName,
            newProductAmount
        }
        return dto
    }
    public getCartByUserInput(userToken: unknown): GetCartByUserInput {
        if (typeof userToken !== "string") {
            throw new BadRequestError("O token do usuário para pegar carrinho deve ser do tipo 'string'.")
        }
        const dto: GetCartByUserInput = { userToken }
        return dto
    }
    public getCartByUserOutput(userCart: cartDB): GetCartByUserOutput {
        const dto: GetCartByUserOutput = {
            message: `Carrinho do usuário encontrado.`,
            userCart
        }
        return dto
    }
    public deductProductFromCartInput(
        userToken: unknown,
        productId: unknown
        ): DeductProductFromCartInput {
        if (typeof userToken !== "string") {
            throw new BadRequestError("O token do usuário deve ser do tipo string.")
        }
        if (typeof productId !== "string") {
            throw new BadRequestError("O id do produto deve ser do tipo string.")
        }
        const dto: DeductProductFromCartInput = {
            userToken,
            productId
        }
        return dto
    }
    public deductProductFromCartOutput(productName: string): DeductProductFromCartOutput {
        const dto: DeductProductFromCartOutput = {
            message: `O produto foi removido do seu carrinho.`,
            removedProduct: productName
        }
        return dto
    }
}