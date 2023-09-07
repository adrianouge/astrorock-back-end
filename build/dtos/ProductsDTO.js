"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsDTO = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
class ProductsDTO {
    registerNewProductInput(userToken, name, description, price, amountInStock) {
        if (typeof userToken !== "string") {
            throw new BadRequestError_1.BadRequestError("O token do usuário deve ser do tipo 'string'.");
        }
        if (typeof name !== "string") {
            throw new BadRequestError_1.BadRequestError("O nome do novo produto deve ser do tipo 'string'.");
        }
        if (typeof description !== "string") {
            throw new BadRequestError_1.BadRequestError("A descrição do novo produto deve ser do tipo 'string'.");
        }
        if (typeof price !== "number") {
            throw new BadRequestError_1.BadRequestError("O preço do novo produto deve ser do tipo 'number'.");
        }
        if (typeof amountInStock !== "number") {
            throw new BadRequestError_1.BadRequestError("O preço do novo produto deve ser do tipo 'number'.");
        }
        const dto = {
            userToken,
            name,
            description,
            price,
            amountInStock
        };
        return dto;
    }
    registerNewProductOutput(newProduct) {
        const dto = {
            message: `O produto ${newProduct.name} foi registrado com sucesso.`,
            productRegistered: newProduct
        };
        return dto;
    }
    getProductByIdInput(userToken, idSearched) {
        if (typeof userToken !== "string") {
            throw new BadRequestError_1.BadRequestError("O token do usuário deve ser do tipo 'string'.");
        }
        if (typeof idSearched !== "string") {
            throw new BadRequestError_1.BadRequestError("O id do produto pesquisado deve ser do tipo 'string'.");
        }
        const dto = {
            userToken,
            idSearched
        };
        return dto;
    }
    getProductByIdOutput(productFound) {
        const dto = {
            message: "Produto encontrado:",
            productFound
        };
        return dto;
    }
    getProductsByNameLikeInput(termSearched) {
        if (typeof termSearched !== "string") {
            throw new BadRequestError_1.BadRequestError("O termo para pesquisa de produto deve ser do tipo 'string'.");
        }
        const dto = { termSearched };
        return dto;
    }
    getProductsByNameLikeOutput(productsFound) {
        let message = "";
        if (productsFound.length > 1) {
            message = `Produtos encontrados:`;
        }
        if (productsFound.length === 1) {
            message = `Produto encontrado:`;
        }
        const dto = {
            message,
            productsFound
        };
        return dto;
    }
    getAllProductsOutput(allProducts) {
        const dto = {
            message: `Aqui estão todos os produtos:`,
            allProducts
        };
        return dto;
    }
    updateProductInfoInput(userToken, productId, productName, productDescription, productPrice, productAmountInStock, productCreatedAt) {
        if (typeof userToken !== "string") {
            throw new BadRequestError_1.BadRequestError("O token do usuário deve ser do tipo 'string'.");
        }
        if (typeof productId !== "string") {
            throw new BadRequestError_1.BadRequestError("O id do produto deve ser do tipo 'string'.");
        }
        if (typeof productName !== "string") {
            throw new BadRequestError_1.BadRequestError("O nome do produto deve ser do tipo 'string'.");
        }
        if (typeof productDescription !== "string") {
            throw new BadRequestError_1.BadRequestError("A descrição do produto deve ser do tipo 'string'.");
        }
        if (typeof productPrice !== "number") {
            throw new BadRequestError_1.BadRequestError("O preço do produto deve ser do tipo 'number'.");
        }
        if (typeof productAmountInStock !== "number") {
            throw new BadRequestError_1.BadRequestError("A quantidade do produto em estoque deve ser do tipo 'number'.");
        }
        if (typeof productCreatedAt !== "string") {
            throw new BadRequestError_1.BadRequestError("A data em que o produto foi criado deve ser do tipo 'string'.");
        }
        const dto = {
            userToken,
            productId,
            productName,
            productDescription,
            productPrice,
            productAmountInStock,
            productCreatedAt
        };
        return dto;
    }
    updateProductInfoOutput(updatedProduct) {
        const dto = {
            message: `O produto foi atualizado com sucesso em ${updatedProduct.updated_at}`,
            updatedProduct
        };
        return dto;
    }
    deleteProductByIdInput(userToken, idToDelete) {
        if (typeof userToken !== "string") {
            throw new BadRequestError_1.BadRequestError("O token do usuário deve ser do tipo 'string'.");
        }
        if (typeof idToDelete !== "string") {
            throw new BadRequestError_1.BadRequestError("O id do produto informado para deleção deve ser do tipo 'string'.");
        }
        const dto = {
            userToken,
            idToDelete
        };
        return dto;
    }
    deleteProductByIdOutput(deletedProduct) {
        const dto = {
            message: `O produto ${deletedProduct.name} foi deletado com sucesso.`,
            deletedProduct
        };
        return dto;
    }
}
exports.ProductsDTO = ProductsDTO;
//# sourceMappingURL=ProductsDTO.js.map