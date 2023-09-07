"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const UsersRouter_1 = require("./routers/UsersRouter");
const ProductsRouter_1 = require("./routers/ProductsRouter");
const OrdersRouter_1 = require("./routers/OrdersRouter");
const CartsRouter_1 = require("./routers/CartsRouter");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.listen(Number(process.env.PORT), () => {
    console.log(`Server running on port ${Number(process.env.PORT)}`);
});
app.use('/users', UsersRouter_1.usersRouter);
app.use('/products', ProductsRouter_1.productsRouter);
app.use('/orders', OrdersRouter_1.ordersRouter);
app.use('/carts', CartsRouter_1.cartsRouter);
//# sourceMappingURL=index.js.map