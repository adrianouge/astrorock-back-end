import { BaseDatabase } from "./BaseDatabase";
import { cartDB, orderDB, userDB } from "../types";


export class UsersDatabase extends BaseDatabase {

    public static TABLE_USERS = "users"

    public static TABLE_CARTS = "carts"

    public static TABLE_ORDERS = "orders"

    dbConnection = BaseDatabase.connection


    public async registerNewUser(newUser: userDB): Promise<void> {

        await this.dbConnection(UsersDatabase.TABLE_USERS).insert(newUser)
    }


    public async getUserById(userId: string): Promise<undefined | userDB> {

        const [userFoundById] = await this.dbConnection(UsersDatabase.TABLE_USERS).where({ id: userId })

        return userFoundById
    }

    
    public async getUserByEmail(userEmail: string): Promise<undefined | userDB> {

        const [userFoundByEmail] = await this.dbConnection(UsersDatabase.TABLE_USERS).where({ email: userEmail })

        return userFoundByEmail
    }


    public async loginUser(userEmail: string, userPassword: string): Promise<undefined | userDB> {

        const [userToLogin] = await this.dbConnection(UsersDatabase.TABLE_USERS)
            .where(
                {
                    email: userEmail,
                    password: userPassword
                }
            )

        return userToLogin
    }


    public async changeEmail(userToUpdate: userDB, newEmail: string): Promise<void> {

        await this.dbConnection(UsersDatabase.TABLE_USERS)
            .update({ email: newEmail })
            .where({ id: userToUpdate.id })
    }


    public async changePassword(userToUpdate: userDB, newPassword: string): Promise<void> {

        await this.dbConnection(UsersDatabase.TABLE_USERS)
            .update({ password: newPassword })
            .where({ id: userToUpdate.id })
    }


    public async deleteUser(userToDelete: userDB): Promise<void> {

        await this.dbConnection(UsersDatabase.TABLE_USERS)
            .del()
            .where({ id: userToDelete.id })

    }
    
    
    public async createNewCart(newCart: cartDB): Promise<void> {

        await this.dbConnection(UsersDatabase.TABLE_CARTS).insert({ newCart })

    }

    
    public async getCartByOwner(ownerId: string): Promise<undefined | cartDB> {

        const [cartFound] = await this.dbConnection(UsersDatabase.TABLE_CARTS)
            .where({ cart_owner: ownerId })

        return cartFound

    }


    public async updateCart(newCart: cartDB): Promise<void> {

        await this.dbConnection(UsersDatabase.TABLE_CARTS)
            .update({ newCart })
            .where({ cart_owner: newCart.cartOwner })

    }


    public async deleteCart(cartOwnerId: string): Promise<void> {
        await this.dbConnection(UsersDatabase.TABLE_CARTS).del().where({ cart_owner: cartOwnerId })

    }


    public async createNewOrder(newOrder: orderDB): Promise<void> {

        await this.dbConnection(UsersDatabase.TABLE_ORDERS).insert({ newOrder })

    }


    public async getOrderById(orderId: string): Promise<undefined | orderDB> {
        const [orderFound] = await this.dbConnection(UsersDatabase.TABLE_ORDERS).where({ id: orderId })

        return orderFound
        
    }


    public async updateOrder(updatedOrder: orderDB): Promise<void> {
        await this.dbConnection(UsersDatabase.TABLE_ORDERS)
            .update({ updatedOrder })
            .where({ id: updatedOrder.id })
    }


    public async deleteOrder(orderToDelete: orderDB): Promise<void> {
        await this.dbConnection(UsersDatabase.TABLE_ORDERS).del().where({ id: orderToDelete.id })
    }
    
}