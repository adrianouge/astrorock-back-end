import { BaseDatabase } from "../../src/database/BaseDatabase";
import { productDB } from "../../src/types";

export class ProductsDatabase extends BaseDatabase{
    public static TABLE_PRODUCTS = 'products'
    dbConnection = BaseDatabase.connection
    public registerNewProduct = (newProduct: productDB): String => {
        return `${newProduct.name} foi registrado no banco de dados com sucesso em ${newProduct.createdAt}.`
    }
    public getProductById = (productIdMock: string): productDB | undefined => {
        const productFoundMock: productDB = {
            id: "id-mock",
            name: "Nome mock",
            description: "Descrição mock",
            price: 1,
            amountInStock: 1,
            createdAt: "data-mock",
            updatedAt: "nunca"
        }
        if (productIdMock === "id-mock") {
            return productFoundMock
        }
    }
    public getAllProducts = (): productDB[] => {
        const productFoundMock: productDB = {
            id: "id-mock",
            name: "Nome mock",
            description: "Descrição mock",
            price: 1,
            amountInStock: 1,
            createdAt: "data-mock",
            updatedAt: "nunca"
        }
        const productFoundMock2: productDB = {
            id: "id-mock",
            name: "Nome mock",
            description: "Descrição mock",
            price: 1,
            amountInStock: 1,
            createdAt: "data-mock",
            updatedAt: "nunca"
        }
        const allProductsMock = [productFoundMock, productFoundMock2]
        return allProductsMock
    }
    public updateProductById = (updatedProductMock: productDB): string => {
        return `${updatedProductMock.name} foi atualizado com sucesso em ${updatedProductMock.updatedAt}`
    }
    public deleteProductById = (productToDelete: productDB): string => {
        return `${productToDelete.name}, de id '${productToDelete.id}, foi deletado com sucesso.`
    }
}