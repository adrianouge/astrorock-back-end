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
exports.UsersController = void 0;
const BaseError_1 = require("../errors/BaseError");
class UsersController {
    constructor(usersDTO, usersBusiness) {
        this.usersDTO = usersDTO;
        this.usersBusiness = usersBusiness;
        this.createNewUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                const input = this.usersDTO.createNewUserInput(name, email, password);
                const output = yield this.usersBusiness.createNewUser(input);
                res.status(200).send(output);
            }
            catch (error) {
                console.log(error);
                if (error instanceof BaseError_1.BaseError) {
                    res.send(error.message);
                }
                else {
                    res.send("Um erro inesperado ocorreu.");
                }
            }
        });
        this.loginUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const input = this.usersDTO.loginUserInput(email, password);
                const output = yield this.usersBusiness.loginUser(input);
                res.status(200).send(output);
            }
            catch (error) {
                console.log(error);
                if (error instanceof BaseError_1.BaseError) {
                    res.send(error.message);
                }
                else {
                    res.send("Um erro inesperado ocorreu.");
                }
            }
        });
        this.getUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userToken = req.headers.authorization;
                const { userId } = req.body;
                const input = this.usersDTO.getUserByIdInput(userToken, userId);
                const output = yield this.usersBusiness.getUserById(input);
                res.status(200).send(output);
            }
            catch (error) {
                console.log(error);
                if (error instanceof BaseError_1.BaseError) {
                    res.send(error.message);
                }
                else {
                    res.send("Um erro inesperado ocorreu.");
                }
            }
        });
        this.changeUsersEmail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userToken = req.headers.authorization;
                const { newEmail } = req.body;
                const input = this.usersDTO.changeUsersEmailInput(userToken, newEmail);
                const output = yield this.usersBusiness.changeUsersEmail(input);
                res.status(200).send(output);
            }
            catch (error) {
                console.log(error);
                if (error instanceof BaseError_1.BaseError) {
                    res.send(error.message);
                }
                else {
                    res.send("Um erro inesperado ocorreu.");
                }
            }
        });
        this.changeUsersPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userToken = req.headers.authorization;
                const { newPassword } = req.body;
                const input = this.usersDTO.changeUsersPasswordInput(userToken, newPassword);
                const output = yield this.usersBusiness.changeUsersPassword(input);
                res.status(200).send(output);
            }
            catch (error) {
                console.log(error);
                if (error instanceof BaseError_1.BaseError) {
                    res.send(error.message);
                }
                else {
                    res.send("Um erro inesperado ocorreu.");
                }
            }
        });
        this.deleteUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userToken = req.headers.authorization;
                const input = this.usersDTO.deleteUserInput(userToken);
                const output = yield this.usersBusiness.deleteUser(input);
                res.status(200).send(output);
            }
            catch (error) {
                console.log(error);
                if (error instanceof BaseError_1.BaseError) {
                    res.send(error.message);
                }
                else {
                    res.send("Um erro inesperado ocorreu.");
                }
            }
        });
    }
}
exports.UsersController = UsersController;
//# sourceMappingURL=UsersController.js.map