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
exports.OrdersController = void 0;
const BaseError_1 = require("../errors/BaseError");
class OrdersController {
    constructor(ordersDTO, ordersBusiness) {
        this.ordersDTO = ordersDTO;
        this.ordersBusiness = ordersBusiness;
        this.createNewOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userToken = req.headers.authorization;
                const { productsId, productsAmount } = req.body;
                const input = this.ordersDTO.createNewOrderInput(userToken, productsId, productsAmount);
                const output = yield this.ordersBusiness.createNewOrder(input);
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
        this.getOrderById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userToken = req.headers.authorization;
                const { orderId } = req.body;
                const input = this.ordersDTO.getOrderByIdInput(userToken, orderId);
                const output = yield this.ordersBusiness.getOrderById(input);
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
        this.getOrderByUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userToken = req.headers.authorization;
                const input = this.ordersDTO.getOrdersByUserInput(userToken);
                const output = yield this.ordersBusiness.getOrdersByUser(input);
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
        this.updateOrderById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { orderId, paidStatus } = req.body;
                const input = this.ordersDTO.updateOrderInput(orderId, paidStatus);
                const output = yield this.ordersBusiness.updateOrderById(input);
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
        this.deleteOrderById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userToken = req.headers.authorization;
                const { orderId } = req.body;
                const input = this.ordersDTO.deleteOrderInput(userToken, orderId);
                const output = yield this.ordersBusiness.deleteOrderById(input);
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
exports.OrdersController = OrdersController;
//# sourceMappingURL=OrdersController.js.map