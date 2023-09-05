"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = __importDefault(require("express"));
const UsersController_1 = require("../controllers/UsersController");
const UsersDTO_1 = require("../dtos/UsersDTO");
const UsersBusiness_1 = require("../business/UsersBusiness");
const UsersDatabase_1 = require("../database/UsersDatabase");
const HashManager_1 = require("../services/HashManager");
const TokenManager_1 = require("../services/TokenManager");
const IdGenerator_1 = require("../services/IdGenerator");
exports.usersRouter = express_1.default.Router();
const usersController = new UsersController_1.UsersController(new UsersDTO_1.UsersDTO(), new UsersBusiness_1.UsersBusiness(new UsersDatabase_1.UsersDatabase(), new UsersDTO_1.UsersDTO(), new IdGenerator_1.IdGenerator(), new HashManager_1.HashManager(), new TokenManager_1.TokenManager()));
exports.usersRouter.post('/signup', usersController.createNewUser);
exports.usersRouter.post('/login', usersController.loginUser);
exports.usersRouter.post('/changeemail', usersController.changeUsersEmail);
exports.usersRouter.post('/changepassword', usersController.changeUsersPassword);
exports.usersRouter.get('/:id', usersController.getUserById);
exports.usersRouter.delete('/:id', usersController.deleteUserById);
//# sourceMappingURL=UsersRouter.js.map