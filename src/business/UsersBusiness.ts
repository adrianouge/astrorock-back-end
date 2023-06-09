import { UsersDatabase } from "../database/UsersDatabase";
import {
    UsersDTO,
    CreateNewUserInput, CreateNewUserOutput,
    LoginUserInput, LoginUserOutput,
    GetUserByIdInput, GetUserByIdOutput,
    ChangeUsersEmailInput, ChangeUsersEmailOutput,
    ChangeUsersPasswordInput, ChangeUsersPasswordOutput,
    DeleteUserInput, DeleteUserOutput
} from "../dtos/UsersDTO";
import { userDB } from "../types";
import { User } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { TokenManager, TokenPayLoad } from "../services/TokenManager";
import { BadRequestError } from "../errors/BadRequestError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnexpectedError } from "../errors/UnexpectedError";


export class UsersBusiness {

    constructor(
        private usersDatabase: UsersDatabase,
        private usersDTO: UsersDTO,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private tokenManager: TokenManager
    ) { }

    public createNewUser = async (input: CreateNewUserInput) => {
        const { name, email, password } = input

        const emailAlreadyInUse = await this.usersDatabase.getUserByEmail(email)
        if (emailAlreadyInUse) {
            throw new BadRequestError("Já existe uma conta registrada com a conta informada.")
        }

        const hashedPassword = await this.hashManager.hash(password)

        const newUser: userDB = {
            id: this.idGenerator.generate(),
            name,
            email,
            password: hashedPassword,
            role: "Normal",
            createdAt: new Date().toISOString(),
            updatedAt: "Never"
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

        const { email, password } = input

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
        const userLoggedIn: User = new User(
            userInfoMatched.id,
            userInfoMatched.name,
            userInfoMatched.email,
            userInfoMatched.password,
            userInfoMatched.role,
            userInfoMatched.createdAt,
            userInfoMatched.updatedAt,
        )

        const output: LoginUserOutput = this.usersDTO.loginUserOutput(userLoggedIn, userToken)
        return output
    }

    public getUserById = async (input: GetUserByIdInput) => {
        const { userToken, idSearched } = input

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
        const { userToken, newEmail } = input

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

        await this.usersDatabase.changeEmail(userToUpdate, newEmail)

        const updatedUser = await this.usersDatabase.getUserByEmail(newEmail)

        if (!updatedUser) {
            throw new UnexpectedError("Houve um erro inesperado, e-mail não foi atualizado.")
        }

        const output: ChangeUsersPasswordOutput = this.usersDTO.changeUsersEmailOutput(updatedUser)
        return output
    }

    public changeUsersPassword = async (input: ChangeUsersPasswordInput) => {
        const { userToken, newPassword } = input

        const getPayload = this.tokenManager.getPayload(userToken)

        if (!getPayload) {
            throw new BadRequestError("Token inválido.")
        }

        const userChangingPassword = await this.usersDatabase.getUserById(getPayload.id)

        if (!userChangingPassword) {
            throw new NotFoundError("Informações do usuário trocando de senha não encontradas.")
        }

        await this.usersDatabase.changePassword(userChangingPassword, newPassword)

        const userUpdated = await this.usersDatabase.loginUser(userChangingPassword.email, newPassword)

        if (!userUpdated) {
            throw new UnexpectedError("Ocorreu um erro inesperado e a senha não foi trocada.")
        }

        const output: ChangeUsersPasswordOutput = this.usersDTO.changeUsersPasswordOutput(userUpdated)
        return output
    }

    public deleteUser = async (input: DeleteUserInput) => {
        const { userToken } = input

        const getPayload = this.tokenManager.getPayload(userToken)

        if(!getPayload) {
            throw new BadRequestError("Token do usuário inválido.")
        }

        const userToDelete = await this.usersDatabase.getUserById(getPayload.id)

        if(!userToDelete) {
            throw new NotFoundError("Conta do usuário a ser deletada não foi encontrada.")
        }

        await this.usersDatabase.deleteUser(userToDelete)

        const output: DeleteUserOutput = this.usersDTO.deleteUserOutput(userToDelete)
        return output
    }
}  