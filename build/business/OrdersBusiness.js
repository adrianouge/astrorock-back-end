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
exports.OrdersBusiness = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
const NotFoundError_1 = require("../errors/NotFoundError");
const UnauthorizedError_1 = require("../errors/UnauthorizedError");
class OrdersBusiness {
    constructor(ordersDatabase, cartsDatabase, tokenManager, idGenerator, ordersDTO) {
        this.ordersDatabase = ordersDatabase;
        this.cartsDatabase = cartsDatabase;
        this.tokenManager = tokenManager;
        this.idGenerator = idGenerator;
        this.ordersDTO = ordersDTO;
        this.createNewOrder = (input) => __awaiter(this, void 0, void 0, function* () {
            const { userToken } = input;
            const userPayload = this.tokenManager.getPayload(userToken);
            if (!userPayload) {
                throw new BadRequestError_1.BadRequestError("Token do usuário inválido para registrar nova compra.");
            }
            let userCart = yield this.cartsDatabase.getCartByOwner(userPayload.id);
            let cartOwner = ``;
            let productsInCart = "";
            let productsAmount = "";
            userCart.forEach(function (i) {
                if (i === undefined) {
                    throw new NotFoundError_1.NotFoundError("Nenhum produto foi adicionado pelo usuário ao carrinho para finalizar a compra.");
                }
                else {
                    cartOwner = i.cartOwner;
                    productsInCart = `${productsInCart}` + `${i.productId}`;
                    productsAmount = `${productsAmount}` + `${i.productsAmount}`;
                }
            });
            if (cartOwner === ``) {
                throw new NotFoundError_1.NotFoundError("Nenhum produto foi adicionado pelo usuário ao carrinho para finalizar a compra.");
            }
            const newOrder = {
                id: this.idGenerator.generate(),
                status: "Em processo",
                userId: cartOwner,
                productsId: productsInCart,
                productsAmount,
                purchaseDate: new Date().toString(),
                paid: 0,
                paymentDate: "Aguardando pagamento"
            };
            yield this.ordersDatabase.createNewOrder(newOrder);
            const output = this.ordersDTO.createNewOrderOutput(newOrder);
            return output;
        });
        this.getOrderById = (input) => __awaiter(this, void 0, void 0, function* () {
            const { userToken, orderId } = input;
            const userPayload = this.tokenManager.getPayload(userToken);
            if (!userPayload) {
                throw new BadRequestError_1.BadRequestError("Token do usuário inválido para buscar compra por id.");
            }
            const orderFound = yield this.ordersDatabase.getOrderById(orderId);
            if (!orderFound) {
                throw new NotFoundError_1.NotFoundError("Compra pesquisada por id não encontrada.");
            }
            const output = this.ordersDTO.getOrderByIdOutput(orderFound);
            return output;
        });
        this.getOrdersByUser = (input) => __awaiter(this, void 0, void 0, function* () {
            const { userToken } = input;
            const userPayload = this.tokenManager.getPayload(userToken);
            if (!userPayload) {
                throw new BadRequestError_1.BadRequestError("Token do usuário inválido para buscar compras por usuário.");
            }
            const getUserOrders = yield this.ordersDatabase.getOrdersByUser(userPayload.id);
            const userOrdersFound = [];
            getUserOrders.forEach(function (i) {
                if (i === undefined) {
                    throw new BadRequestError_1.BadRequestError("");
                }
                else {
                    userOrdersFound.push(i);
                }
            });
            const output = this.ordersDTO.getOrdersByUserOutput(userOrdersFound);
            return output;
        });
        this.updateOrderById = (input) => __awaiter(this, void 0, void 0, function* () {
            const { orderId, paidStatus } = input;
            const orderToUpdate = yield this.ordersDatabase.getOrderById(orderId);
            if (!orderToUpdate) {
                throw new NotFoundError_1.NotFoundError("");
            }
            const orderUpdated = {
                id: orderToUpdate.id,
                status: "Pago",
                userId: orderToUpdate.userId,
                productsId: orderToUpdate.productsId,
                productsAmount: orderToUpdate.productsAmount,
                purchaseDate: orderToUpdate.purchaseDate,
                paid: paidStatus,
                paymentDate: new Date().toString()
            };
            yield this.ordersDatabase.updateOrder(orderUpdated);
            const output = this.ordersDTO.updateOrderOutput(orderUpdated);
            return output;
        });
        this.deleteOrderById = (input) => __awaiter(this, void 0, void 0, function* () {
            const { userToken, orderToDeleteId } = input;
            const userPayload = this.tokenManager.getPayload(userToken);
            if (!userPayload) {
                throw new BadRequestError_1.BadRequestError("Token do usuário inválido para deletar compra.");
            }
            const orderToDelete = yield this.ordersDatabase.getOrderById(orderToDeleteId);
            if (!orderToDelete) {
                throw new NotFoundError_1.NotFoundError("Compra para ser deletada não foi encontrada.");
            }
            if (userPayload.id !== orderToDelete.userId) {
                throw new UnauthorizedError_1.UnauthorizedError("Apenas o usuário quem finalizou a compra pode deleta-la.");
            }
            yield this.ordersDatabase.deleteOrder(orderToDelete.id);
            const output = this.ordersDTO.deleteOrderOutput(orderToDelete);
            return output;
        });
    }
}
exports.OrdersBusiness = OrdersBusiness;
//# sourceMappingURL=OrdersBusiness.js.map