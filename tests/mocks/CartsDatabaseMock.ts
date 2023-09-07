import { BaseDatabase } from '../../src/database/BaseDatabase'
import { cartDB } from '../../src/types'

export class CartsDatabaseMock extends BaseDatabase {
    public static TABLE_USERS = "users"
    public static TABLE_PRODUCTS = "products"
    public static TABLE_CARTS = "carts"
    dbConnection = BaseDatabase.connection

    public getCartByOwner = async (ownerIdMock: string): Promise<cartDB[] | undefined[]> => {
        let cartFoundMock: cartDB[] = [{
            cartOwner: 'usuario-id-mock',
            productId: 'produto-id-mock',
            productsAmount: 'quantidade-mock'
        }]
        if (ownerIdMock === "usuario-id-mock") {
            return cartFoundMock
        }
        else {
            let cartFoundMock: undefined[] = []
            return cartFoundMock
        }
    }
    public addProductToCart = async (cartWithProductAddedMock: cartDB): Promise<void> => {
    }
    public updateCart = async (updatedCartMock: cartDB): Promise<void> => {
    }
    public deductProductFromCart = async(
        ownerIdMock: string,
        productIdMock: string
        ): Promise<void> => {
    }
}