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
exports.ProductsController = void 0;
const BaseError_1 = require("../errors/BaseError");
class ProductsController {
    constructor(productsDTO, productsBusiness) {
        this.productsDTO = productsDTO;
        this.productsBusiness = productsBusiness;
        this.registerNewProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userToken = req.headers.authorization;
                const { name, description, price, amountInStock } = req.body;
                const priceAsNumber = Number(price);
                const amountInStockAsNumber = Number(amountInStock);
                const input = this.productsDTO.registerNewProductInput(userToken, name, description, priceAsNumber, amountInStockAsNumber);
                const output = yield this.productsBusiness.registerNewProduct(input);
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
        this.getProductById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userToken = req.headers.authorization;
                const { productId } = req.body;
                const input = this.productsDTO
                    .getProductByIdInput(userToken, productId);
                const output = yield this.productsBusiness.getProductById(input);
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
        this.getAllProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const output = yield this.productsBusiness.getAllProducts();
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
        this.getProductsByNameLike = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { termSearched } = req.body;
                const input = this.productsDTO.getProductsByNameLikeInput(termSearched);
                const output = yield this.productsBusiness.getProductByNameLike(input);
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
        this.updateProductInfoById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userToken = req.headers.authorization;
                const { productId, productName, productDescription, productPrice, productAmountInStock, productCreatedAt } = req.body;
                const input = this.productsDTO
                    .updateProductInfoInput(userToken, productId, productName, productDescription, productPrice, productAmountInStock, productCreatedAt);
                const output = yield this.productsBusiness.updateProductInfo(input);
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
        this.deleteProductById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userToken = req.headers.authorization;
                const { productId } = req.body;
                const input = this.productsDTO
                    .deleteProductByIdInput(userToken, productId);
                const output = yield this.productsBusiness.deleteProduct(input);
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
exports.ProductsController = ProductsController;
//# sourceMappingURL=ProductsController.js.map