import { BaseDatabase } from "./BaseDatabase"
import { cartDB } from "../types"

export class CartsDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"
    public static TABLE_PRODUCTS = "products"
    public static TABLE_CARTS = "carts"
    dbConnection = BaseDatabase.connection
    public async getCartByOwner(ownerId: string): Promise<undefined[] | cartDB[]> {
        const cartFound = await this
            .dbConnection(CartsDatabase.TABLE_CARTS)
            .where({ cart_owner: ownerId })
        return cartFound
    }
    public async addProductToCart(usersCartProductAdded: cartDB): Promise<void> {
        await this
            .dbConnection(CartsDatabase.TABLE_CARTS)
            .insert(usersCartProductAdded)
    }
    public async updateCart(newCart: cartDB): Promise<void> {
        await this
            .dbConnection(CartsDatabase.TABLE_CARTS)
            .update({ newCart })
            .where({
                cart_owner: newCart.cartOwner,
                product_id: newCart.productId
            })

    }
    public async deductProductFromCart(cartOwnerId: string, productId: string): Promise<void> {
        await this
            .dbConnection(CartsDatabase.TABLE_CARTS)
            .del()
            .where({
                cart_owner: cartOwnerId,
                product_id: productId
            })
    }
}