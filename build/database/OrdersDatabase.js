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
exports.OrdersDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class OrdersDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.dbConnection = BaseDatabase_1.BaseDatabase.connection;
    }
    createNewOrder(newOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this
                .dbConnection(OrdersDatabase.TABLE_ORDERS)
                .insert(newOrder);
        });
    }
    getOrderById(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [orderFound] = yield this
                .dbConnection(OrdersDatabase.TABLE_ORDERS)
                .where({ id: orderId });
            return orderFound;
        });
    }
    getOrdersByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const usersOrders = yield this
                .dbConnection(OrdersDatabase.TABLE_ORDERS)
                .where({ userId });
            return usersOrders;
        });
    }
    updateOrder(orderUpdated) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this
                .dbConnection(OrdersDatabase.TABLE_ORDERS)
                .update(orderUpdated)
                .where({ id: orderUpdated.id });
        });
    }
    deleteOrder(orderToDeleteId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this
                .dbConnection(OrdersDatabase.TABLE_ORDERS)
                .del()
                .where({ id: orderToDeleteId });
        });
    }
}
OrdersDatabase.TABLE_ORDERS = 'orders';
OrdersDatabase.TABLE_USERS = 'users';
OrdersDatabase.TABLE_PRODUCTS = 'products';
OrdersDatabase.TABLE_CARTS = 'carts';
exports.OrdersDatabase = OrdersDatabase;
//# sourceMappingURL=OrdersDatabase.js.map