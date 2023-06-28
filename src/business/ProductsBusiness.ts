import { ProductsDatabase } from "../database/ProductsDatabase";
import {
    ProductsDTO,
    DeleteProductByIdInput, DeleteProductByIdOutput,
    GetAllProductsOutput,
    GetProductByIdInput, GetProductByIdOutput,
    GetProductsByNameLikeInput, GetProductsByNameLikeOutput,
    RegisterNewProductInput, RegisterNewProductOutput,
    UpdateProductInfoInput, UpdateProductInfoOutput
} from "../dtos/ProductsDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { UnexpectedError } from "../errors/UnexpectedError";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { productDB } from "../types";


export class ProductsBusiness {

    constructor(
        private productsDatabase: ProductsDatabase,
        private productsDTO: ProductsDTO,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator
    ) { }

    public registerNewProduct = async (userToken: string, input: RegisterNewProductInput): Promise<RegisterNewProductOutput> => {

        const { name, description, price, amountInStock } = input

        const getPayload = this.tokenManager.getPayload(userToken)
        if (!getPayload) {
            throw new BadRequestError("Token do usuário inválido.")
        }
        if (getPayload.role !== "Admin") {
            throw new UnauthorizedError("Apenas usuários admins podem registrar produtos.")
        }

        const nameAlreadyRegistered = await this.productsDatabase.getProductByName(name)
        if (nameAlreadyRegistered) {
            throw new BadRequestError("Já existe um produto com o nome informado.")
        }

        const newProduct: productDB = {
            id: this.idGenerator.generate(),
            name,
            description,
            price,
            amountInStock,
            createdAt: new Date().toISOString(),
            updatedAt: "Never"
        }
        await this.productsDatabase.registerNewProduct(newProduct)

        const productRegistered = await this.productsDatabase.getProductByName(name)
        if (!productRegistered) {
            throw new UnexpectedError("Houve um erro inesperado e o produto não foi registrado.")
        }

        const output: RegisterNewProductOutput = this.productsDTO.registerNewProductOutput(productRegistered)
        return output
    }

    public getProductById = async (userToken: string, input: GetProductByIdInput): Promise<GetProductByIdOutput> => {
        const { idSearched } = input

        const getPayload = this.tokenManager.getPayload(userToken)
        if (!getPayload) {
            throw new BadRequestError("Token do usuário inválido.")
        }
        if (getPayload.role !== "Admin") {
            throw new UnauthorizedError("Apenas usuários admins podem pesquisar produtos por id.")
        }

        const productFound = await this.productsDatabase.getProductById(idSearched)
        if (!productFound) {
            throw new NotFoundError("Nenhum produto foi encontrado com este id.")
        }

        const output: GetProductByIdOutput = this.productsDTO.getProductByIdOutput(productFound)
        return output
    }

    public getProductByNameLike = async (input: GetProductsByNameLikeInput): Promise<GetProductsByNameLikeOutput> => {
        const { termSearched } = input

        const productsFound = await this.productsDatabase.getProductByNameLike(termSearched)
        if (productsFound === undefined) {
            throw new NotFoundError("Nenhum produto encontrado com o termo pesquisado.")
        }
        const productsFoundInArray = [productsFound]

        const output: GetProductsByNameLikeOutput = this.productsDTO.getProductsByNameLikeOutput(productsFoundInArray)
        return output
    }

    public getAllProducts = async (): Promise<GetAllProductsOutput> => {

        const [allProducts] = await this.productsDatabase.getAllProducts()

        if (allProducts === undefined) {
            throw new NotFoundError("Nenhum produto registrado foi encontrado.")
        }

        const allProductsInArray = [allProducts]

        const output: GetAllProductsOutput = this.productsDTO.getAllProductsOutput(allProductsInArray)
        return output
    }

    public updateProductInfo = async (input: UpdateProductInfoInput): Promise<UpdateProductInfoOutput> => {
        const { userToken,
            productId,
            productName,
            productDescription,
            productPrice,
            productAmountInStock,
            productCreatedAt } = input

        const getPayload = this.tokenManager.getPayload(userToken)
        if (!getPayload) {
            throw new BadRequestError("Token do usuário inválido.")
        }

        const productUpdatedInfo: productDB = {
            id: productId,
            name: productName,
            description: productDescription,
            price: productPrice,
            amountInStock: productAmountInStock,
            createdAt: productCreatedAt,
            updatedAt: new Date().toISOString()
        }
        await this.productsDatabase.updateProductInfo(productUpdatedInfo)

        const output: UpdateProductInfoOutput = this.productsDTO.updateProductInfoOutput(productUpdatedInfo)
        return output
    }

    public deleteProduct = async (input: DeleteProductByIdInput): Promise<DeleteProductByIdOutput> => {
        const { userToken, idToDelete } = input

        const getPayload = this.tokenManager.getPayload(userToken)
        if (!getPayload) {
            throw new BadRequestError("Token do usuário inválido.")
        }
        if (getPayload.role !== "Admin") {
            throw new UnauthorizedError("Apenas usuários admins podem deletar produtos do banco de dados.")
        }

        const findProductToDelete = await this.productsDatabase.getProductById(idToDelete)
        if (!findProductToDelete) {
            throw new NotFoundError("Produto para deleção não encontrado.")
        }
        await this.productsDatabase.deleteProductById(idToDelete, findProductToDelete.id)
        const productDeleted = findProductToDelete

        const output = this.productsDTO.deleteProductByIdOutput(productDeleted)
        return output
    }
}