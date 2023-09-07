"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersBusiness = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
const UnauthorizedError_1 = require("../errors/UnauthorizedError");
const NotFoundError_1 = require("../errors/NotFoundError");
class UsersBusiness {
    constructor(usersDatabase, usersDTO, idGenerator, hashManager, tokenManager) {
        this.usersDatabase = usersDatabase;
        this.usersDTO = usersDTO;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.tokenManager = tokenManager;
        this.createNewUser = (input) => __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = input;
            const emailAlreadyInUse = yield this.usersDatabase.getUserByEmail(email);
            if (emailAlreadyInUse) {
                throw new BadRequestError_1.BadRequestError("Já existe uma conta registrada com a conta informada.");
            }
            const hashedPassword = yield this.hashManager.hash(password);
            const newUser = {
                id: this.idGenerator.generate(),
                name,
                email,
                password: hashedPassword,
                role: "Admin",
                created_at: new Date().toISOString(),
                updated_at: "Never"
            };
            yield this.usersDatabase.registerNewUser(newUser);
            const userToken = this.tokenManager.createToken({
                id: newUser.id,
                name: newUser.name,
                role: newUser.role
            });
            const output = this.usersDTO.createNewUserOutput(newUser, userToken);
            return output;
        });
        this.loginUser = (input) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = input;
            const userInfoMatched = yield this.usersDatabase.loginUser(email, password);
            if (!userInfoMatched) {
                throw new BadRequestError_1.BadRequestError("Não há usuários registrados com o email e senha informados.");
            }
            const payload = {
                id: userInfoMatched.id,
                name: userInfoMatched.name,
                role: userInfoMatched.role
            };
            const userToken = this.tokenManager.createToken(payload);
            const userLoggedIn = {
                id: userInfoMatched.id,
                name: userInfoMatched.name,
                email: userInfoMatched.email,
                password: userInfoMatched.password,
                role: userInfoMatched.role,
                created_at: userInfoMatched.created_at,
                updated_at: userInfoMatched.updated_at
            };
            const output = this.usersDTO.loginUserOutput(userLoggedIn, userToken);
            return output;
        });
        this.getUserById = (input) => __awaiter(this, void 0, void 0, function* () {
            const { userToken, idSearched } = input;
            const getPayload = this.tokenManager.getPayload(userToken);
            if (!getPayload) {
                throw new NotFoundError_1.NotFoundError("Token inválido.");
            }
            if (getPayload.role !== "Admin") {
                throw new UnauthorizedError_1.UnauthorizedError("Apenas admins podem fazer essa pesquisa.");
            }
            const foundUser = yield this.usersDatabase.getUserById(idSearched);
            if (!foundUser) {
                throw new NotFoundError_1.NotFoundError("Nenhum usuário foi encontrado com 'id' informado.");
            }
            const output = this.usersDTO.getUserByIdOutput(foundUser);
            return output;
        });
        this.changeUsersEmail = (input) => __awaiter(this, void 0, void 0, function* () {
            const { userToken, newEmail } = input;
            const getPayload = this.tokenManager.getPayload(userToken);
            if (!getPayload) {
                throw new NotFoundError_1.NotFoundError("Token inválido.");
            }
            const userToUpdate = yield this.usersDatabase.getUserById(getPayload.id);
            if (!userToUpdate) {
                throw new NotFoundError_1.NotFoundError("Usuário para atualizar e-mail não encontrado.");
            }
            const emailAlreadyRegistered = yield this.usersDatabase.getUserByEmail(newEmail);
            if (emailAlreadyRegistered) {
                throw new BadRequestError_1.BadRequestError("Já existe uma conta registrada com o e-mail informado.");
            }
            const newUpdatedAt = new Date().toString();
            yield this.usersDatabase.changeEmail(userToUpdate, newEmail, newUpdatedAt);
            const updatedUser = {
                id: userToUpdate.id,
                name: userToUpdate.name,
                email: newEmail,
                password: userToUpdate.password,
                role: userToUpdate.role,
                created_at: userToUpdate.created_at,
                updated_at: newUpdatedAt
            };
            const output = this.usersDTO.changeUsersEmailOutput(updatedUser);
            return output;
        });
        this.changeUsersPassword = (input) => __awaiter(this, void 0, void 0, function* () {
            const { userToken, newPassword } = input;
            const getPayload = this.tokenManager.getPayload(userToken);
            if (!getPayload) {
                throw new BadRequestError_1.BadRequestError("Token inválido.");
            }
            const userChangingPassword = yield this.usersDatabase.getUserById(getPayload.id);
            if (!userChangingPassword) {
                throw new NotFoundError_1.NotFoundError("Informações do usuário trocando de senha não encontradas.");
            }
            const newUpdatedAt = new Date().toString();
            yield this.usersDatabase.changePassword(userChangingPassword, newPassword, newUpdatedAt);
            const updatedUser = {
                id: userChangingPassword.id,
                name: userChangingPassword.name,
                email: userChangingPassword.email,
                password: newPassword,
                role: userChangingPassword.role,
                created_at: userChangingPassword.created_at,
                updated_at: newUpdatedAt
            };
            const output = this.usersDTO.changeUsersPasswordOutput(updatedUser);
            return output;
        });
        this.deleteUser = (input) => __awaiter(this, void 0, void 0, function* () {
            const { userToken } = input;
            const getPayload = this.tokenManager.getPayload(userToken);
            if (!getPayload) {
                throw new BadRequestError_1.BadRequestError("Token do usuário inválido.");
            }
            const userToDelete = yield this.usersDatabase.getUserById(getPayload.id);
            if (!userToDelete) {
                throw new NotFoundError_1.NotFoundError("Conta do usuário a ser deletada não foi encontrada.");
            }
            yield this.usersDatabase.deleteUser(userToDelete);
            const output = this.usersDTO.deleteUserOutput(userToDelete);
            return output;
        });
    }
}
exports.UsersBusiness = UsersBusiness;
//# sourceMappingURL=UsersBusiness.js.map