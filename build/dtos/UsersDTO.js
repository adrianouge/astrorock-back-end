"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersDTO = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
class UsersDTO {
    createNewUserInput(name, email, password) {
        if (typeof name !== "string") {
            throw new BadRequestError_1.BadRequestError("Nome do usuário deve ser do tipo string.");
        }
        if (typeof email !== "string") {
            throw new BadRequestError_1.BadRequestError("Email do usuário deve ser do tipo string.");
        }
        if (typeof password !== "string") {
            throw new BadRequestError_1.BadRequestError("Password do usuário deve ser do tipo string.");
        }
        const dto = {
            name,
            email,
            password
        };
        return dto;
    }
    createNewUserOutput(newUser, userToken) {
        const dto = {
            message: `Olá, ${newUser.name}! Sua conta foi criada com sucesso.`,
            userToken
        };
        return dto;
    }
    loginUserInput(email, password) {
        if (typeof email !== "string") {
            throw new BadRequestError_1.BadRequestError("O email deve ser do tipo string.");
        }
        if (typeof password !== "string") {
            throw new BadRequestError_1.BadRequestError("O password deve ser do tipo string.");
        }
        const dto = {
            email,
            password
        };
        return dto;
    }
    loginUserOutput(userLoggedIn, userToken) {
        const dto = {
            message: `Bom te ver novamente, ${userLoggedIn.name}.`,
            userToken
        };
        return dto;
    }
    getUserByIdInput(userToken, idSearched) {
        if (typeof userToken !== "string") {
            throw new BadRequestError_1.BadRequestError("O token do usuário deve ser do tipo string.");
        }
        if (typeof idSearched !== "string") {
            throw new BadRequestError_1.BadRequestError("O 'id' pesquisado deve ser do tipo string.");
        }
        const dto = {
            userToken,
            idSearched
        };
        return dto;
    }
    getUserByIdOutput(userFound) {
        const dto = {
            message: `Usuário encontrado: ${userFound}`,
            userFound
        };
        return dto;
    }
    changeUsersEmailInput(userToken, newEmail) {
        if (typeof userToken !== "string") {
            throw new BadRequestError_1.BadRequestError("Token do usuário deve ser do tipo string.");
        }
        if (typeof newEmail !== "string") {
            throw new BadRequestError_1.BadRequestError("Novo e-mail do usuário deve ser do tipo string.");
        }
        const dto = {
            userToken,
            newEmail
        };
        return dto;
    }
    changeUsersEmailOutput(userUpdated) {
        const dto = {
            message: `O e-mail da conta foi atualizada com sucesso.`,
            userUpdated
        };
        return dto;
    }
    changeUsersPasswordInput(userToken, newPassword) {
        if (typeof userToken !== "string") {
            throw new BadRequestError_1.BadRequestError("Token do usuário deve ser do tipo string.");
        }
        if (typeof newPassword !== "string") {
            throw new BadRequestError_1.BadRequestError("Nova senha do usuário deve ser do tipo string.");
        }
        const dto = {
            userToken,
            newPassword
        };
        return dto;
    }
    changeUsersPasswordOutput(userUpdated) {
        const dto = {
            message: `A senha da conta foi atualizada com sucesso.`,
            userUpdated
        };
        return dto;
    }
    deleteUserInput(userToken) {
        if (typeof userToken !== "string") {
            throw new BadRequestError_1.BadRequestError("O token do usuário deve ser do tipo string.");
        }
        const dto = { userToken };
        return dto;
    }
    deleteUserOutput(userDeleted) {
        const dto = {
            message: `A conta foi deletada com sucesso.`,
            userDeleted
        };
        return dto;
    }
}
exports.UsersDTO = UsersDTO;
//# sourceMappingURL=UsersDTO.js.map