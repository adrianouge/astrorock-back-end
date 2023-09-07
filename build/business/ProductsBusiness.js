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
exports.ProductsBusiness = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
const NotFoundError_1 = require("../errors/NotFoundError");
const UnauthorizedError_1 = require("../errors/UnauthorizedError");
class ProductsBusiness {
    constructor(productsDatabase, productsDTO, tokenManager, idGenerator) {
        this.productsDatabase = productsDatabase;
        this.productsDTO = productsDTO;
        this.tokenManager = tokenManager;
        this.idGenerator = idGenerator;
        this.registerNewProduct = (input) => __awaiter(this, void 0, void 0, function* () {
            const { userToken, name, description, price, amountInStock } = input;
            const getPayload = this.tokenManager.getPayload(userToken);
            if (!getPayload) {
                throw new BadRequestError_1.BadRequestError("Token do usuário inválido.");
            }
            if (getPayload.role !== "Admin") {
                throw new UnauthorizedError_1.UnauthorizedError("Apenas usuários admins podem registrar produtos.");
            }
            const nameAlreadyRegistered = yield this.productsDatabase.getProductByName(name);
            if (nameAlreadyRegistered) {
                throw new BadRequestError_1.BadRequestError("Já existe um produto com o nome informado.");
            }
            const newProduct = {
                id: this.idGenerator.generate(),
                name,
                description,
                price,
                amount_in_stock: amountInStock,
                created_at: new Date().toISOString(),
                updated_at: "Never"
            };
            yield this.productsDatabase.registerNewProduct(newProduct);
            const output = this.productsDTO.registerNewProductOutput(newProduct);
            return output;
        });
        this.getProductById = (input) => __awaiter(this, void 0, void 0, function* () {
            const { userToken, idSearched } = input;
            const getPayload = this.tokenManager.getPayload(userToken);
            if (!getPayload) {
                throw new BadRequestError_1.BadRequestError("Token do usuário inválido.");
            }
            if (getPayload.role !== "Admin") {
                throw new UnauthorizedError_1.UnauthorizedError("Apenas usuários admins podem pesquisar produtos por id.");
            }
            const productFound = yield this.productsDatabase.getProductById(idSearched);
            if (!productFound) {
                throw new NotFoundError_1.NotFoundError("Nenhum produto foi encontrado com este id.");
            }
            const output = this.productsDTO.getProductByIdOutput(productFound);
            return output;
        });
        this.getProductByNameLike = (input) => __awaiter(this, void 0, void 0, function* () {
            const { termSearched } = input;
            const productsFound = yield this.productsDatabase.getProductByNameLike(termSearched);
            if (productsFound === undefined) {
                throw new NotFoundError_1.NotFoundError("Nenhum produto encontrado com o termo pesquisado.");
            }
            const productsFoundInArray = [productsFound];
            const output = this.productsDTO.getProductsByNameLikeOutput(productsFoundInArray);
            return output;
        });
        this.getAllProducts = () => __awaiter(this, void 0, void 0, function* () {
            const allProductsInArray = yield this.productsDatabase.getAllProducts();
            const output = this.productsDTO.getAllProductsOutput(allProductsInArray);
            return output;
        });
        this.updateProductInfo = (input) => __awaiter(this, void 0, void 0, function* () {
            const { userToken, productId, productName, productDescription, productPrice, productAmountInStock, productCreatedAt } = input;
            const getPayload = this.tokenManager.getPayload(userToken);
            if (!getPayload) {
                throw new BadRequestError_1.BadRequestError("Token do usuário inválido.");
            }
            const productUpdatedInfo = {
                id: productId,
                name: productName,
                description: productDescription,
                price: productPrice,
                amount_in_stock: productAmountInStock,
                created_at: productCreatedAt,
                updated_at: new Date().toISOString()
            };
            yield this.productsDatabase.updateProductInfo(productUpdatedInfo);
            const output = this.productsDTO.updateProductInfoOutput(productUpdatedInfo);
            return output;
        });
        this.deleteProduct = (input) => __awaiter(this, void 0, void 0, function* () {
            const { userToken, idToDelete } = input;
            const getPayload = this.tokenManager.getPayload(userToken);
            if (!getPayload) {
                throw new BadRequestError_1.BadRequestError("Token do usuário inválido.");
            }
            if (getPayload.role !== "Admin") {
                throw new UnauthorizedError_1.UnauthorizedError("Apenas usuários admins podem deletar produtos do banco de dados.");
            }
            const findProductToDelete = yield this.productsDatabase.getProductById(idToDelete);
            if (!findProductToDelete) {
                throw new NotFoundError_1.NotFoundError("Produto para deleção não encontrado.");
            }
            yield this.productsDatabase.deleteProductById(idToDelete);
            const productDeleted = findProductToDelete;
            const output = this.productsDTO.deleteProductByIdOutput(productDeleted);
            return output;
        });
    }
}
exports.ProductsBusiness = ProductsBusiness;
//# sourceMappingURL=ProductsBusiness.js.map