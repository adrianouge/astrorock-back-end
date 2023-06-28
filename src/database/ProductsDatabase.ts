import { BaseDatabase } from "./BaseDatabase";
import { productDB } from "../types";


export class ProductsDatabase extends BaseDatabase {

    public static TABLE_PRODUCTS = "products"
    public static CARTS_PRODUCTS = "carts"
    dbConnection = BaseDatabase.connection


    public async registerNewProduct(newProduct: productDB): Promise<void> {
        await this.dbConnection.insert(newProduct).into(ProductsDatabase.TABLE_PRODUCTS)
    }

    public async getProductById(idSearched: string): Promise<productDB | undefined> {
        const [productFound] = await this.dbConnection(ProductsDatabase.TABLE_PRODUCTS).where({ id: idSearched })

        return productFound
    }

    public async getProductByName(nameSearched: string): Promise<productDB | undefined> {
        const [productsFound] = await this.dbConnection(ProductsDatabase.TABLE_PRODUCTS)
            .where({ name: nameSearched })

        return productsFound
    }

    public async getProductByNameLike(nameSearched: string): Promise<productDB | undefined> {
        const [productsFound] = await this.dbConnection(ProductsDatabase.TABLE_PRODUCTS)
            .where("name", "LIKE", `${nameSearched}`)

        return productsFound
    }

    public async getAllProducts(): Promise<productDB[] | undefined[]> {
        const allProducts = await this.dbConnection(ProductsDatabase.TABLE_PRODUCTS)

        return allProducts
    }

    public async updateProductInfo(productUpdatedInfo: productDB): Promise<void> {
        await this.dbConnection(ProductsDatabase.TABLE_PRODUCTS)
            .update(productUpdatedInfo)
            .where(productUpdatedInfo.id)
    }

    public async deleteProductById(idToDelete: string, columnName: string): Promise<void> {
        await this.dbConnection(ProductsDatabase.TABLE_PRODUCTS).del().where({ id: idToDelete })
    }
}