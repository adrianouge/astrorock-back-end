import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { productDB } from "../types";


export interface RegisterNewProductInput {
    userToken: string,
    name: string,
    description: string,
    price: number
    amountInStock: number
}
export interface RegisterNewProductOutput {
    message: string
}
export interface GetProductByIdInput {
    userToken: string,
    idSearched: string
}
export interface GetProductByIdOutput {
    message: string,
    productFound: productDB
}
export interface GetProductsByNameLikeInput {
    termSearched: string
}
export interface GetProductsByNameLikeOutput {
    message: string,
    productsFound: productDB[]
}
export interface GetAllProductsOutput {
    message: string,
    allProducts: productDB[] | undefined []
}
export interface UpdateProductInfoInput {
    userToken: string,
    productId: string,
    productName: string,
    productDescription: string,
    productPrice: number,
    productAmountInStock: number,
    productCreatedAt: string
}
export interface UpdateProductInfoOutput {
    message: string,
    updatedProduct: productDB
}
export interface DeleteProductByIdInput {
    userToken: string,
    idToDelete: string
}
export interface DeleteProductByIdOutput {
    message: string
}
export class ProductsDTO {
    public registerNewProductInput(
        userToken: unknown,
        name: unknown,
        description: unknown,
        price: unknown,
        amountInStock: unknown): RegisterNewProductInput {
        if (typeof userToken !== "string") {
            throw new BadRequestError("O token do usuário deve ser do tipo 'string'.")
        }
        if (typeof name !== "string") {
            throw new BadRequestError("O nome do novo produto deve ser do tipo 'string'.")
        }
        if (typeof description !== "string") {
            throw new BadRequestError("A descrição do novo produto deve ser do tipo 'string'.")
        }
        if (typeof price !== "number") {
            throw new BadRequestError("O preço do novo produto deve ser do tipo 'number'.")
        }
        if (typeof amountInStock !== "number") {
            throw new BadRequestError("O preço do novo produto deve ser do tipo 'number'.")
        }
        const dto: RegisterNewProductInput = {
            userToken,
            name, description, price, amountInStock
        }
        return dto
    }
    public registerNewProductOutput(newProduct: productDB): RegisterNewProductOutput {
        const dto: RegisterNewProductOutput = {
            message: `O produto ${newProduct.name} foi registrado com sucesso.`
        }
        return dto
    }
    public getProductByIdInput(userToken: unknown, idSearched: unknown): GetProductByIdInput {
        if (typeof userToken !== "string") {
            throw new BadRequestError("O token do usuário deve ser do tipo 'string'.")
        }
        if (typeof idSearched !== "string") {
            throw new BadRequestError("O id do produto pesquisado deve ser do tipo 'string'.")
        }
        const dto: GetProductByIdInput = {
            userToken, idSearched
        }
        return dto
    }
    public getProductByIdOutput(productFound: productDB): GetProductByIdOutput {
        const dto: GetProductByIdOutput = {
            message: "Produto encontrado:",
            productFound
        }
        return dto
    }
    public getProductsByNameLikeInput(termSearched: unknown): GetProductsByNameLikeInput {

        if (typeof termSearched !== "string") {
            throw new BadRequestError("O termo para pesquisa de produto deve ser do tipo 'string'.")
        }

        const dto: GetProductsByNameLikeInput = {
            termSearched
        }
        return dto
    }
    public getProductsByNameLikeOutput(productsFound: productDB[]): GetProductsByNameLikeOutput {
        let message = ""
        if (productsFound.length > 1) {
            message = `Produtos encontrados:`
        }
        if (productsFound.length === 1) {
            message = `Produto encontrado:`
        }
        const dto: GetProductsByNameLikeOutput = {
            message,
            productsFound
        }
        return dto
    }
    public getAllProductsOutput(allProducts: productDB[] | undefined[]): GetAllProductsOutput {
        const dto: GetAllProductsOutput = {
            message: `Aqui estão todos os produtos:`,
            allProducts
        }
        return dto
    }
    public updateProductInfoInput(userToken: unknown,
        productId: unknown,
        productName: unknown,
        productDescription: unknown,
        productPrice: unknown,
        productAmountInStock: unknown,
        productCreatedAt: unknown): UpdateProductInfoInput {
        if (typeof userToken !== "string") {
            throw new BadRequestError("O token do usuário deve ser do tipo 'string'.")
        }
        if (typeof productId !== "string") {
            throw new BadRequestError("O id do produto deve ser do tipo 'string'.")
        }
        if (typeof productName !== "string") {
            throw new BadRequestError("O nome do produto deve ser do tipo 'string'.")
        }
        if (typeof productDescription !== "string") {
            throw new BadRequestError("A descrição do produto deve ser do tipo 'string'.")
        }
        if (typeof productPrice !== "number") {
            throw new BadRequestError("O preço do produto deve ser do tipo 'number'.")
        }
        if (typeof productAmountInStock !== "number") {
            throw new BadRequestError("A quantidade do produto em estoque deve ser do tipo 'number'.")
        }
        if (typeof productCreatedAt !== "string") {
            throw new BadRequestError("A data em que o produto foi criado deve ser do tipo 'string'.")
        }
        const dto: UpdateProductInfoInput = {
            userToken,
            productId,
            productName,
            productDescription,
            productPrice,
            productAmountInStock,
            productCreatedAt
        }
        return dto
    }
    public updateProductInfoOutput(updatedProduct: productDB): UpdateProductInfoOutput {
        const dto: UpdateProductInfoOutput = {
            message: `O produto foi atualizado com sucesso em ${updatedProduct.updated_at}`,
            updatedProduct
        }
        return dto
    }
    public deleteProductByIdInput(userToken: unknown, idToDelete: unknown): DeleteProductByIdInput {

        if (typeof userToken !== "string") {
            throw new BadRequestError("O token do usuário deve ser do tipo 'string'.")
        }

        if (typeof idToDelete !== "string") {
            throw new BadRequestError("O id do produto informado para deleção deve ser do tipo 'string'.")
        }

        const dto: DeleteProductByIdInput = {
            userToken, idToDelete
        }
        return dto
    }
    public deleteProductByIdOutput(deletedProduct: productDB): DeleteProductByIdOutput {
        const dto: DeleteProductByIdOutput = {
            message: `O produto ${deletedProduct.name} foi deletado com sucesso.`
        }
        return dto
    }
}