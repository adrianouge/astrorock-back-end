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
exports.CartsBusiness = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
const NotFoundError_1 = require("../errors/NotFoundError");
class CartsBusiness {
    constructor(productsDatabase, cartsDatabase, tokenManager, cartsDTO) {
        this.productsDatabase = productsDatabase;
        this.cartsDatabase = cartsDatabase;
        this.tokenManager = tokenManager;
        this.cartsDTO = cartsDTO;
        this.addProductToCart = (input) => __awaiter(this, void 0, void 0, function* () {
            const { userToken, productId, productAmount } = input;
            const userPayload = this.tokenManager.getPayload(userToken);
            if (!userPayload) {
                throw new BadRequestError_1.BadRequestError("Token do usuário inválido.");
            }
            const productToAdd = yield this.productsDatabase.getProductById(productId);
            if (!productToAdd) {
                throw new NotFoundError_1.NotFoundError("Produto para adicionar ao carrinho não foi encontrado.");
            }
            const usersCartProductAdded = {
                cartOwner: userPayload.id,
                productId,
                productsAmount: productAmount
            };
            yield this.cartsDatabase.addProductToCart(usersCartProductAdded);
            const output = this.cartsDTO.addProductToCartOutput(productToAdd.name, productAmount);
            return output;
        });
        this.updateProductAmountInCart = (input) => __awaiter(this, void 0, void 0, function* () {
            const { userToken, productId, newProductAmount } = input;
            const userPayload = this.tokenManager.getPayload(userToken);
            if (!userPayload) {
                throw new BadRequestError_1.BadRequestError("Token do usuário inválido para atualizar o carrinho.");
            }
            const productToUpdateAmount = yield this.productsDatabase.getProductById(productId);
            if (!productToUpdateAmount) {
                throw new NotFoundError_1.NotFoundError("Produto para atualizar quantidade não encontrado.");
            }
            const newProductAmountInCart = {
                cartOwner: userPayload.id,
                productId: productToUpdateAmount.id,
                productsAmount: newProductAmount.toString()
            };
            yield this.cartsDatabase.updateCart(newProductAmountInCart);
            const output = this.cartsDTO.updateProductAmountOutput(productToUpdateAmount.name, newProductAmount);
            return output;
        });
        this.getCartByUser = (input) => __awaiter(this, void 0, void 0, function* () {
            const { userToken } = input;
            const userPayload = this.tokenManager.getPayload(userToken);
            if (!userPayload) {
                throw new BadRequestError_1.BadRequestError("Token inválido para pegar o carrinho do usuário.");
            }
            const [usersCart] = yield this.cartsDatabase.getCartByOwner(userPayload.id);
            if (!usersCart) {
                throw new NotFoundError_1.NotFoundError("Usuário ainda não adicionou produtos ao carrinho.");
            }
            const output = this.cartsDTO.getCartByUserOutput(usersCart);
            return output;
        });
        this.deductProductFromCart = (input) => __awaiter(this, void 0, void 0, function* () {
            const { userToken, productId } = input;
            const userPayload = this.tokenManager.getPayload(userToken);
            if (!userPayload) {
                throw new BadRequestError_1.BadRequestError("Token do usuário inválido para atualizar o carrinho.");
            }
            const productToDeduct = yield this.productsDatabase.getProductById(productId);
            if (!productToDeduct) {
                throw new NotFoundError_1.NotFoundError("Produto para retirar do carrinho não foi encontrado.");
            }
            yield this.cartsDatabase.deductProductFromCart(userPayload.id, productToDeduct.id);
            const output = this.cartsDTO.deductProductFromCartOutput(productToDeduct.name);
            return output;
        });
    }
}
exports.CartsBusiness = CartsBusiness;
//# sourceMappingURL=CartsBusiness.js.map