"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartsRouter = void 0;
const express_1 = __importDefault(require("express"));
const CartsController_1 = require("../controllers/CartsController");
const CartsDTO_1 = require("../dtos/CartsDTO");
const CartsBusiness_1 = require("../business/CartsBusiness");
const CartsDatabase_1 = require("../database/CartsDatabase");
const ProductsDatabase_1 = require("../database/ProductsDatabase");
const TokenManager_1 = require("../services/TokenManager");
exports.cartsRouter = express_1.default.Router();
const cartsController = new CartsController_1.CartsController(new CartsDTO_1.CartsDTO(), new CartsBusiness_1.CartsBusiness(new ProductsDatabase_1.ProductsDatabase(), new CartsDatabase_1.CartsDatabase(), new TokenManager_1.TokenManager(), new CartsDTO_1.CartsDTO()));
exports.cartsRouter.get('/', cartsController.getCartByUser);
exports.cartsRouter.post('/', cartsController.addProductToCart);
exports.cartsRouter.post('/updatecart', cartsController.updateProductAmountInCart);
exports.cartsRouter.delete('/deductproduct', cartsController.deductProductFromCart);
//# sourceMappingURL=CartsRouter.js.map