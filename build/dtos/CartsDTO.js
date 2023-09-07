"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartsDTO = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
class CartsDTO {
    addProductToCartInput(userToken, productId, productAmount) {
        if (typeof userToken !== "string") {
            throw new BadRequestError_1.BadRequestError("O token do usuário deve ser do tipo string.");
        }
        if (typeof productId !== "string") {
            throw new BadRequestError_1.BadRequestError("O id do produto deve ser do tipo string.");
        }
        if (typeof productAmount !== "string") {
            throw new BadRequestError_1.BadRequestError("A quantidade do produto deve ser do tipo string.");
        }
        const dto = {
            userToken,
            productId,
            productAmount
        };
        return dto;
    }
    addProductToCartOutput(productName, productAmount) {
        const dto = {
            message: `Produto adicionado ao seu carrinho com sucesso.`,
            productName,
            productAmount
        };
        return dto;
    }
    updateProductAmountInput(userToken, productId, newProductAmount) {
        if (typeof userToken !== "string") {
            throw new BadRequestError_1.BadRequestError("O token do usuário deve ser do tipo string.");
        }
        if (typeof productId !== "string") {
            throw new BadRequestError_1.BadRequestError("O id do produto deve ser do tipo string.");
        }
        if (typeof newProductAmount !== "string") {
            throw new BadRequestError_1.BadRequestError("A quantidade do produto deve ser do tipo string.");
        }
        const dto = {
            userToken,
            productId,
            newProductAmount
        };
        return dto;
    }
    updateProductAmountOutput(productName, newProductAmount) {
        const dto = {
            message: `A quantidade de produtos no carrinho foi atualizada.`,
            productName,
            newProductAmount
        };
        return dto;
    }
    getCartByUserInput(userToken) {
        if (typeof userToken !== "string") {
            throw new BadRequestError_1.BadRequestError("O token do usuário para pegar carrinho deve ser do tipo 'string'.");
        }
        const dto = { userToken };
        return dto;
    }
    getCartByUserOutput(userCart) {
        const dto = {
            message: `Carrinho do usuário encontrado.`,
            userCart
        };
        return dto;
    }
    deductProductFromCartInput(userToken, productId) {
        if (typeof userToken !== "string") {
            throw new BadRequestError_1.BadRequestError("O token do usuário deve ser do tipo string.");
        }
        if (typeof productId !== "string") {
            throw new BadRequestError_1.BadRequestError("O id do produto deve ser do tipo string.");
        }
        const dto = {
            userToken,
            productId
        };
        return dto;
    }
    deductProductFromCartOutput(productName) {
        const dto = {
            message: `O produto foi removido do seu carrinho.`,
            removedProduct: productName
        };
        return dto;
    }
}
exports.CartsDTO = CartsDTO;
//# sourceMappingURL=CartsDTO.js.map