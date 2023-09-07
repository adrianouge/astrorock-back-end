import { BadRequestError } from "../errors/BadRequestError";
import { userDB } from "../types";

export interface CreateNewUserInput {
    name: string,
    email: string,
    password: string
}
export interface CreateNewUserOutput {
    message: string,
    userToken: string
}
export interface LoginUserInput {
    email: string,
    password: string
}
export interface LoginUserOutput {
    message: string,
    userToken: string
}
export interface GetUserByIdInput {
    userToken: string,
    idSearched: string
}
export interface GetUserByIdOutput {
    message: string,
    userFound: userDB
}
export interface ChangeUsersEmailInput {
    userToken: string,
    newEmail: string
}
export interface ChangeUsersEmailOutput {
    message: string,
    userUpdated: userDB
}
export interface ChangeUsersPasswordInput {
    userToken: string,
    newPassword: string
}
export interface ChangeUsersPasswordOutput {
    message: string,
    userUpdated: userDB
}
export interface DeleteUserInput {
    userToken: string
}
export interface DeleteUserOutput {
    message: string,
    userDeleted: userDB
}

export class UsersDTO {
    public createNewUserInput(
        name: unknown,
        email: unknown,
        password: unknown
    ): CreateNewUserInput {
        if (typeof name !== "string") {
            throw new BadRequestError("Nome do usuário deve ser do tipo string.")
        }
        if (typeof email !== "string") {
            throw new BadRequestError("Email do usuário deve ser do tipo string.")
        }
        if (typeof password !== "string") {
            throw new BadRequestError("Password do usuário deve ser do tipo string.")
        }
        const dto: CreateNewUserInput = {
            name,
            email,
            password
        }
        return dto
    }
    public createNewUserOutput(
        newUser: userDB,
        userToken: string
    ) {
        const dto: CreateNewUserOutput = {
            message: `Olá, ${newUser.name}! Sua conta foi criada com sucesso.`,
            userToken
        }
        return dto
    }
    public loginUserInput(
        email: unknown,
        password: unknown
    ): LoginUserInput {
        if (typeof email !== "string") {
            throw new BadRequestError("O email deve ser do tipo string.")
        }
        if (typeof password !== "string") {
            throw new BadRequestError("O password deve ser do tipo string.")
        }
        const dto: LoginUserInput = {
            email,
            password
        }
        return dto
    }
    public loginUserOutput(
        userLoggedIn: userDB,
        userToken: string
    ): LoginUserOutput {
        const dto: LoginUserOutput = {
            message: `Bom te ver novamente, ${userLoggedIn.name}.`,
            userToken
        }
        return dto
    }
    public getUserByIdInput(
        userToken: unknown,
        idSearched: unknown
    ): GetUserByIdInput {
        if (typeof userToken !== "string") {
            throw new BadRequestError("O token do usuário deve ser do tipo string.")
        }
        if (typeof idSearched !== "string") {
            throw new BadRequestError("O 'id' pesquisado deve ser do tipo string.")
        }
        const dto: GetUserByIdInput = {
            userToken,
            idSearched
        }
        return dto
    }
    public getUserByIdOutput(userFound: userDB): GetUserByIdOutput {
        const dto: GetUserByIdOutput = {
            message: `Usuário encontrado: ${userFound}`,
            userFound
        }
        return dto
    }
    public changeUsersEmailInput(
        userToken: unknown,
        newEmail: unknown
    ): ChangeUsersEmailInput {
        if (typeof userToken !== "string") {
            throw new BadRequestError("Token do usuário deve ser do tipo string.")
        }
        if (typeof newEmail !== "string") {
            throw new BadRequestError("Novo e-mail do usuário deve ser do tipo string.")
        }
        const dto: ChangeUsersEmailInput = {
            userToken,
            newEmail
        }
        return dto
    }
    public changeUsersEmailOutput(userUpdated: userDB): ChangeUsersEmailOutput {
        const dto: ChangeUsersEmailOutput = {
            message: `O e-mail da conta foi atualizada com sucesso.`,
            userUpdated
        }
        return dto
    }
    public changeUsersPasswordInput(
        userToken: unknown,
        newPassword: unknown
    ): ChangeUsersPasswordInput {
        if (typeof userToken !== "string") {
            throw new BadRequestError("Token do usuário deve ser do tipo string.")
        }
        if (typeof newPassword !== "string") {
            throw new BadRequestError("Nova senha do usuário deve ser do tipo string.")
        }
        const dto: ChangeUsersPasswordInput = {
            userToken,
            newPassword
        }
        return dto
    }
    public changeUsersPasswordOutput(userUpdated: userDB): ChangeUsersPasswordOutput {
        const dto: ChangeUsersPasswordOutput = {
            message: `A senha da conta foi atualizada com sucesso.`,
            userUpdated
        }
        return dto
    }
    public deleteUserInput(userToken: unknown): DeleteUserInput {
        if (typeof userToken !== "string") {
            throw new BadRequestError("O token do usuário deve ser do tipo string.")
        }
        const dto: DeleteUserInput = { userToken }
        return dto
    }
    public deleteUserOutput(userDeleted: userDB): DeleteUserOutput {
        const dto: DeleteUserOutput = {
            message: `A conta foi deletada com sucesso.`,
            userDeleted
        }
        return dto
    }
}