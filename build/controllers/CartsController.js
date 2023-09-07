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
exports.CartsController = void 0;
const BaseError_1 = require("../errors/BaseError");
class CartsController {
    constructor(cartsDTO, cartsBusiness) {
        this.cartsDTO = cartsDTO;
        this.cartsBusiness = cartsBusiness;
        this.addProductToCart = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userToken = req.headers.authorization;
                const { productId, productAmount } = req.body;
                const input = this.cartsDTO
                    .addProductToCartInput(userToken, productId, productAmount);
                const output = yield this.cartsBusiness.addProductToCart(input);
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
        this.updateProductAmountInCart = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userToken = req.headers.authorization;
                const { productId, newProductAmount } = req.body;
                const input = this.cartsDTO
                    .updateProductAmountInput(userToken, productId, newProductAmount);
                const output = yield this.cartsBusiness.updateProductAmountInCart(input);
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
        this.getCartByUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userToken = req.headers.authorization;
                const input = this.cartsDTO.getCartByUserInput(userToken);
                const output = yield this.cartsBusiness.getCartByUser(input);
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
        this.deductProductFromCart = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userToken = req.headers.authorization;
                const { productId } = req.body;
                const input = this.cartsDTO
                    .deductProductFromCartInput(userToken, productId);
                const output = yield this.cartsBusiness.deductProductFromCart(input);
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
exports.CartsController = CartsController;
//# sourceMappingURL=CartsController.js.map