import { BaseDatabase } from '../../src/database/BaseDatabase'
import { userDB } from '../../src/types'

export class UsersDatabaseMock extends BaseDatabase {
    public static TABLE_USERS = "users"
    dbConnection = BaseDatabase.connection
    public registerNewUser = async (): Promise<void> => {
    }
    public getUserById = async (idMock: string): Promise<userDB | undefined> => {
        const userMock: userDB = {
            id: "user-id-mock",
            name: "Usuário mock",
            email: "mock@teste.com",
            password: "senhaMockada-hash",
            role: "mock",
            createdAt: "data mockada",
            updatedAt: "nunca!"
        }

        if (idMock === "user-id-mock") {
            return userMock
        }

        else {
            return undefined
        }
    }
    public getUserByEmail = async (emailMock: string): Promise<userDB | undefined> => {
        const userMock: userDB = {
            id: "user-id-mock",
            name: "Usuário mock",
            email: "mock@teste.com",
            password: "senhaMockada-hash",
            role: "mock",
            createdAt: "data mockada",
            updatedAt: "nunca!"
        }

        if (emailMock === "mock@teste.com") {
            return userMock
        }

        else {
            return undefined
        }
    }
    public loginUser = async (emailMock: string, passwordMock: string): Promise<userDB | undefined> => {
        const userMock: userDB = {
            id: "user-id-mock",
            name: "Usuário mock",
            email: "mock@teste.com",
            password: "senhaMockada-hash",
            role: "mock",
            createdAt: "data mockada",
            updatedAt: "nunca!"
        }

        if (emailMock === "mock@teste.com" && passwordMock === "senhaMockada-hash") {
            return userMock
        }

        else {
            return undefined
        }
    }
    public changeEmail = async (userMock: userDB, newEmailMock: string): Promise<void> => {
    }
    public changePassword = async (userMock: userDB, newPassword: string): Promise<void> => {
    }
    public deleteUser = async (userToDeleteMock: userDB): Promise<void> => {
    }
}