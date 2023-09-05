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
exports.ProductsDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class ProductsDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.dbConnection = BaseDatabase_1.BaseDatabase.connection;
    }
    registerNewProduct(newProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dbConnection.insert(newProduct).into(ProductsDatabase.TABLE_PRODUCTS);
        });
    }
    getProductById(idSearched) {
        return __awaiter(this, void 0, void 0, function* () {
            const [productFound] = yield this.dbConnection(ProductsDatabase.TABLE_PRODUCTS).where({ id: idSearched });
            return productFound;
        });
    }
    getProductByName(nameSearched) {
        return __awaiter(this, void 0, void 0, function* () {
            const [productsFound] = yield this.dbConnection(ProductsDatabase.TABLE_PRODUCTS)
                .where({ name: nameSearched });
            return productsFound;
        });
    }
    getProductByNameLike(nameSearched) {
        return __awaiter(this, void 0, void 0, function* () {
            const [productsFound] = yield this.dbConnection(ProductsDatabase.TABLE_PRODUCTS)
                .where("name", "LIKE", `${nameSearched}`);
            return productsFound;
        });
    }
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const allProducts = yield this.dbConnection(ProductsDatabase.TABLE_PRODUCTS);
            return allProducts;
        });
    }
    updateProductInfo(productUpdatedInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dbConnection(ProductsDatabase.TABLE_PRODUCTS)
                .update(productUpdatedInfo)
                .where(productUpdatedInfo.id);
        });
    }
    deleteProductById(idToDelete) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dbConnection(ProductsDatabase.TABLE_PRODUCTS).del().where({ id: idToDelete });
        });
    }
}
ProductsDatabase.TABLE_PRODUCTS = "products";
ProductsDatabase.CARTS_PRODUCTS = "carts";
exports.ProductsDatabase = ProductsDatabase;
//# sourceMappingURL=ProductsDatabase.js.map