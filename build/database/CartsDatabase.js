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
exports.CartsDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class CartsDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.dbConnection = BaseDatabase_1.BaseDatabase.connection;
    }
    getCartByOwner(ownerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartFound = yield this
                .dbConnection(CartsDatabase.TABLE_CARTS)
                .where({ cart_owner: ownerId });
            return cartFound;
        });
    }
    addProductToCart(usersCartProductAdded) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this
                .dbConnection(CartsDatabase.TABLE_CARTS)
                .insert(usersCartProductAdded);
        });
    }
    updateCart(newCart) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this
                .dbConnection(CartsDatabase.TABLE_CARTS)
                .update({ newCart })
                .where({
                cart_owner: newCart.cartOwner,
                product_id: newCart.productId
            });
        });
    }
    deductProductFromCart(cartOwnerId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this
                .dbConnection(CartsDatabase.TABLE_CARTS)
                .del()
                .where({
                cart_owner: cartOwnerId,
                product_id: productId
            });
        });
    }
}
CartsDatabase.TABLE_USERS = "users";
CartsDatabase.TABLE_PRODUCTS = "products";
CartsDatabase.TABLE_CARTS = "carts";
exports.CartsDatabase = CartsDatabase;
//# sourceMappingURL=CartsDatabase.js.map