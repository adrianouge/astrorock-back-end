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
exports.UsersDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class UsersDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.dbConnection = BaseDatabase_1.BaseDatabase.connection;
    }
    registerNewUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dbConnection(UsersDatabase.TABLE_USERS).insert(newUser);
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [userFoundById] = yield this.dbConnection(UsersDatabase.TABLE_USERS).where({ id: userId });
            return userFoundById;
        });
    }
    getUserByEmail(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const [userFoundByEmail] = yield this.dbConnection(UsersDatabase.TABLE_USERS).where({ email: userEmail });
            return userFoundByEmail;
        });
    }
    loginUser(userEmail, userPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const [userToLogin] = yield this.dbConnection(UsersDatabase.TABLE_USERS)
                .where({
                email: userEmail,
                password: userPassword
            });
            return userToLogin;
        });
    }
    changeEmail(userToUpdate, newEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dbConnection(UsersDatabase.TABLE_USERS)
                .update({ email: newEmail })
                .where({ id: userToUpdate.id });
        });
    }
    changePassword(userToUpdate, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dbConnection(UsersDatabase.TABLE_USERS)
                .update({ password: newPassword })
                .where({ id: userToUpdate.id });
        });
    }
    deleteUser(userToDelete) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dbConnection(UsersDatabase.TABLE_USERS)
                .del()
                .where({ id: userToDelete.id });
        });
    }
}
UsersDatabase.TABLE_USERS = "users";
UsersDatabase.TABLE_CARTS = "carts";
UsersDatabase.TABLE_ORDERS = "orders";
exports.UsersDatabase = UsersDatabase;
//# sourceMappingURL=UsersDatabase.js.map