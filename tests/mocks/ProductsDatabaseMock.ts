import { BaseDatabase } from "../../src/database/BaseDatabase";
import { productDB } from "../../src/types";

export class ProductsDatabaseMock extends BaseDatabase {
    public static TABLE_PRODUCTS = 'products'
    dbConnection = BaseDatabase.connection
    public registerNewProduct = async (newProduct: productDB): Promise<void> => {
    }
    public getProductById = async (productIdMock: string): Promise<productDB | undefined> => {
        const productFoundMock: productDB = {
            id: "produto-id-mock",
            name: "Produto mock",
            description: "Descrição mock",
            price: 1,
            amount_in_stock: 1,
            created_at: "data-mock",
            updated_at: "nunca"
        }
        if (productIdMock === "produto-id-mock") {
            return productFoundMock
        }
    }
    public getProductByName = async (nameSearched: string): Promise<productDB | undefined> => {
        const productsFound: productDB = {
            id: 'product-id-mock',
            name: 'Produto mock',
            description: 'Descrição mock',
            price: 1,
            amount_in_stock: 1,
            created_at: 'Data mock',
            updated_at: 'Data mock'
        }
        if (productsFound.name === nameSearched) {
            return productsFound
        }
    }
    public getProductByNameLike = async (nameSearched: string): Promise<productDB | undefined> => {
        const productsFound: productDB = {
            id: 'product-id-mock',
            name: 'Produto mock',
            description: 'Descrição mock',
            price: 1,
            amount_in_stock: 1,
            created_at: 'Data mock',
            updated_at: 'Data mock'
        }
        if (productsFound.name.includes(nameSearched)) {
            return productsFound
        }
    }
    public getAllProducts = async (): Promise<productDB[]> => {
        const allProductsMock: productDB[] = [{
            id: "id-mock",
            name: "Nome mock",
            description: "Descrição mock",
            price: 1,
            amount_in_stock: 1,
            created_at: "data-mock",
            updated_at: "nunca"
        },
        {
            id: "id1-mock",
            name: "Nome1 mock",
            description: "Descrição mock",
            price: 1,
            amount_in_stock: 1,
            created_at: "data-mock",
            updated_at: "nunca"
        }]
        return allProductsMock
    }
    public updateProductInfo = async (updatedProductMock: productDB): Promise<void> => {
    }
    public deleteProductById = async (idToDelete: string,): Promise<void> => {
    }
}