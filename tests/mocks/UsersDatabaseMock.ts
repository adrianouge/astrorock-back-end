import { userDB } from '../../src/types'

export class UsersDatabaseMock {
    public registerNewUser = async (newUserMock: userDB): Promise<string | undefined> => {
        if (newUserMock.name !== "" && newUserMock.createdAt !== "") {
            return `${newUserMock.name}, sua conta foi criada com sucesso em ${newUserMock.createdAt}`
        }
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
    public changeEmail = async (userMock: userDB, newEmailMock: string): Promise<userDB> => {
        const userMockUpdated: userDB = {
            id: userMock.id,
            name: userMock.name,
            email: newEmailMock,
            password: userMock.password,
            role: userMock.role,
            createdAt: userMock.createdAt,
            updatedAt: "data mock"
        }

        return userMockUpdated
    }
    public changePassword = async (userMock: userDB, newPassword: string): Promise<userDB> => {
        const userMockUpdated: userDB = {
            id: userMock.id,
            name: userMock.name,
            email: userMock.email,
            password: newPassword,
            role: userMock.role,
            createdAt: userMock.createdAt,
            updatedAt: "data mock"
        }

        return userMockUpdated
    }
    public deleteUser = async (idMock: string): Promise<string | undefined> => {
        if (idMock === "id-mock") {
            return "Usuário de id 'id-mock' foi deletado com sucesso."
        }
    }
}