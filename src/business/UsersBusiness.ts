import { UsersDatabase } from "../database/UsersDatabase";
import {
    UsersDTO,
    CreateNewUserInput,
    CreateNewUserOutput,
    LoginUserInput,
    LoginUserOutput,
    GetUserByIdInput,
    GetUserByIdOutput,
    ChangeUsersEmailInput,
    ChangeUsersEmailOutput,
    ChangeUsersPasswordInput,
    ChangeUsersPasswordOutput,
    DeleteUserInput,
    DeleteUserOutput
} from "../dtos/UsersDTO";
import { userDB } from "../types";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { TokenManager, TokenPayLoad } from "../services/TokenManager";
import { BadRequestError } from "../errors/BadRequestError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { NotFoundError } from "../errors/NotFoundError";

export class UsersBusiness {
    constructor(
        private usersDatabase: UsersDatabase,
        private usersDTO: UsersDTO,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private tokenManager: TokenManager
    ) { }
    public createNewUser = async (input: CreateNewUserInput) => {
        const {
            name,
            email,
            password
        } = input
        const emailAlreadyInUse = await this.usersDatabase.getUserByEmail(email)
        if (emailAlreadyInUse) {
            throw new BadRequestError("Já existe uma conta registrada com o e-mail informado.")
        }
        const hashedPassword = await this.hashManager.hash(password)
        const newUser: userDB = {
            id: this.idGenerator.generate(),
            name,
            email,
            password: hashedPassword,
            role: "Normal",
            created_at: new Date().toISOString(),
            updated_at: "Never"
        }
        await this.usersDatabase.registerNewUser(newUser)
        const userToken = this.tokenManager.createToken({
            id: newUser.id,
            name: newUser.name,
            role: newUser.role
        })
        const output: CreateNewUserOutput = this.usersDTO.createNewUserOutput(newUser, userToken)
        return output
    }
    public loginUser = async (input: LoginUserInput) => {
        const {
            email,
            password
        } = input
        const userInfoMatched = await this.usersDatabase.loginUser(email, password)
        if (!userInfoMatched) {
            throw new BadRequestError("Não há usuários registrados com o email e senha informados.")
        }
        const payload: TokenPayLoad = {
            id: userInfoMatched.id,
            name: userInfoMatched.name,
            role: userInfoMatched.role
        }
        const userToken = this.tokenManager.createToken(payload)
        const userLoggedIn: userDB = {
            id: userInfoMatched.id,
            name: userInfoMatched.name,
            email: userInfoMatched.email,
            password: userInfoMatched.password,
            role: userInfoMatched.role,
            created_at: userInfoMatched.created_at,
            updated_at: userInfoMatched.updated_at
        }
        const output: LoginUserOutput = this.usersDTO.loginUserOutput(userLoggedIn, userToken)
        return output
    }
    public getUserById = async (input: GetUserByIdInput) => {
        const {
            userToken,
            idSearched
        } = input
        const getPayload = this.tokenManager.getPayload(userToken)
        if (!getPayload) {
            throw new NotFoundError("Token inválido.")
        }
        if (getPayload.role !== "Admin") {
            throw new UnauthorizedError("Apenas admins podem fazer essa pesquisa.")
        }
        const foundUser = await this.usersDatabase.getUserById(idSearched)
        if (!foundUser) {
            throw new NotFoundError("Nenhum usuário foi encontrado com 'id' informado.")
        }
        const output: GetUserByIdOutput = this.usersDTO.getUserByIdOutput(foundUser)
        return output
    }
    public changeUsersEmail = async (input: ChangeUsersEmailInput) => {
        const {
            userToken,
            newEmail
        } = input
        const getPayload = this.tokenManager.getPayload(userToken)
        if (!getPayload) {
            throw new NotFoundError("Token inválido.")
        }
        const userToUpdate = await this.usersDatabase.getUserById(getPayload.id)
        if (!userToUpdate) {
            throw new NotFoundError("Usuário para atualizar e-mail não encontrado.")
        }
        const emailAlreadyRegistered = await this.usersDatabase.getUserByEmail(newEmail)
        if (emailAlreadyRegistered) {
            throw new BadRequestError("Já existe uma conta registrada com o e-mail informado.")
        }
        const newUpdatedAt = new Date().toString()
        await this.usersDatabase.changeEmail(
            userToUpdate,
            newEmail,
            newUpdatedAt)
        const updatedUser: userDB = {
            id: userToUpdate.id,
            name: userToUpdate.name,
            email: newEmail,
            password: userToUpdate.password,
            role: userToUpdate.role,
            created_at: userToUpdate.created_at,
            updated_at: newUpdatedAt
        }
        const output: ChangeUsersEmailOutput = this.usersDTO.changeUsersEmailOutput(updatedUser)
        return output
    }
    public changeUsersPassword = async (input: ChangeUsersPasswordInput) => {
        const {
            userToken,
            newPassword
        } = input
        const getPayload = this.tokenManager.getPayload(userToken)
        if (!getPayload) {
            throw new BadRequestError("Token inválido.")
        }
        const userChangingPassword = await this.usersDatabase.getUserById(getPayload.id)
        if (!userChangingPassword) {
            throw new NotFoundError("Informações do usuário trocando de senha não encontradas.")
        }
        const newUpdatedAt = new Date().toString()
        await this.usersDatabase.changePassword(
            userChangingPassword,
            newPassword,
            newUpdatedAt
        )
        const updatedUser: userDB = {
            id: userChangingPassword.id,
            name: userChangingPassword.name,
            email: userChangingPassword.email,
            password: newPassword,
            role: userChangingPassword.role,
            created_at: userChangingPassword.created_at,
            updated_at: newUpdatedAt
        }
        const output: ChangeUsersPasswordOutput = this.usersDTO.changeUsersPasswordOutput(updatedUser)
        return output
    }
    public deleteUser = async (input: DeleteUserInput) => {
        const { userToken } = input
        const getPayload = this.tokenManager.getPayload(userToken)
        if (!getPayload) {
            throw new BadRequestError("Token do usuário inválido.")
        }
        const userToDelete = await this.usersDatabase.getUserById(getPayload.id)
        if (!userToDelete) {
            throw new NotFoundError("Conta do usuário a ser deletada não foi encontrada.")
        }
        await this.usersDatabase.deleteUser(userToDelete)
        const output: DeleteUserOutput = this.usersDTO.deleteUserOutput(userToDelete)
        return output
    }
}  