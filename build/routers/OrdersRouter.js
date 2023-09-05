"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersRouter = void 0;
const express_1 = __importDefault(require("express"));
const OrdersController_1 = require("../controllers/OrdersController");
const OrdersDTO_1 = require("../dtos/OrdersDTO");
const OrdersBusiness_1 = require("../business/OrdersBusiness");
const OrdersDatabase_1 = require("../database/OrdersDatabase");
const TokenManager_1 = require("../services/TokenManager");
const IdGenerator_1 = require("../services/IdGenerator");
const CartsDatabase_1 = require("../database/CartsDatabase");
exports.ordersRouter = express_1.default.Router();
const ordersController = new OrdersController_1.OrdersController(new OrdersDTO_1.OrdersDTO(), new OrdersBusiness_1.OrdersBusiness(new OrdersDatabase_1.OrdersDatabase(), new CartsDatabase_1.CartsDatabase(), new TokenManager_1.TokenManager(), new IdGenerator_1.IdGenerator(), new OrdersDTO_1.OrdersDTO()));
exports.ordersRouter.post('/', ordersController.createNewOrder);
exports.ordersRouter.post('/:id', ordersController.updateOrderById);
exports.ordersRouter.get('/:id', ordersController.getOrderById);
exports.ordersRouter.get('/user/:id', ordersController.getOrderById);
exports.ordersRouter.delete('/:id', ordersController.deleteOrderById);
//# sourceMappingURL=OrdersRouter.js.map