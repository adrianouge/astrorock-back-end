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
}