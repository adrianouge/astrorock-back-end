"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = __importDefault(require("express"));
const ProductsController_1 = require("../controllers/ProductsController");
const ProductsDTO_1 = require("../dtos/ProductsDTO");
const ProductsBusiness_1 = require("../business/ProductsBusiness");
const ProductsDatabase_1 = require("../database/ProductsDatabase");
const TokenManager_1 = require("../services/TokenManager");
const IdGenerator_1 = require("../services/IdGenerator");
exports.productsRouter = express_1.default.Router();
const productsController = new ProductsController_1.ProductsController(new ProductsDTO_1.ProductsDTO(), new ProductsBusiness_1.ProductsBusiness(new ProductsDatabase_1.ProductsDatabase(), new ProductsDTO_1.ProductsDTO(), new TokenManager_1.TokenManager(), new IdGenerator_1.IdGenerator()));
exports.productsRouter.get('/', productsController.getAllProducts);
exports.productsRouter.post('/registernewproduct', productsController.registerNewProduct);
exports.productsRouter.post('/:id/editproduct', productsController.updateProductInfoById);
exports.productsRouter.delete('/:id/deleteproduct', productsController.deleteProductById);
exports.productsRouter.get('/:id', productsController.getProductById);
exports.productsRouter.get('/search?q=', productsController.getProductsByNameLike);
//# sourceMappingURL=ProductsRouter.js.map