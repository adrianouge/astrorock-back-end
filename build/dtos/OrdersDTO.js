"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersDTO = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
class OrdersDTO {
    createNewOrderInput(userToken, productsId, productsAmount) {
        if (typeof userToken !== "string") {
            throw new BadRequestError_1.BadRequestError("O token do usuário para registrar nova compra deve ser do tipo 'string'.");
        }
        if (typeof productsId !== "string") {
            throw new BadRequestError_1.BadRequestError("O id dos produtos da nova compra deve ser do tipo array de 'string'.");
        }
        if (typeof productsAmount !== "string") {
            throw new BadRequestError_1.BadRequestError("A quantidade dos produtos da nova compra devem ser do tipo array de 'string'");
        }
        const dto = {
            userToken,
            productsId,
            productsAmount
        };
        return dto;
    }
    createNewOrderOutput(orderRegistered) {
        const dto = {
            message: `Compra registrada com sucesso.`,
            orderRegistered
        };
        return dto;
    }
    getOrderByIdInput(userToken, orderId) {
        if (typeof userToken !== "string") {
            throw new BadRequestError_1.BadRequestError("O token do usuário para buscar compra deve ser do tipo 'string'.");
        }
        if (typeof orderId !== "string") {
            throw new BadRequestError_1.BadRequestError("O id para buscar por compra deve ser do tipo 'string'.");
        }
        const dto = {
            userToken,
            orderId
        };
        return dto;
    }
    getOrderByIdOutput(orderFound) {
        const dto = {
            message: `Compra encontrada.`,
            orderFound
        };
        return dto;
    }
    getOrdersByUserInput(userToken) {
        if (typeof userToken !== "string") {
            throw new BadRequestError_1.BadRequestError("O token do usuário deve ser do tipo 'string' para buscar por compras feitas pelo mesmo.");
        }
        const dto = { userToken };
        return dto;
    }
    getOrdersByUserOutput(userOrders) {
        const dto = {
            message: `Aqui estão as compras encontradas efetuadas pelo usuário.`,
            userOrders
        };
        return dto;
    }
    updateOrderInput(orderId, paidStatus) {
        if (typeof orderId !== "string") {
            throw new BadRequestError_1.BadRequestError("O id da compra para atualização das informações da mesma deve mser do tipo 'string'");
        }
        if (typeof paidStatus !== "number") {
            throw new BadRequestError_1.BadRequestError("O status do pagamento deve do tipo 'number' para atualizar a propriedade 'paid' da conta.");
        }
        const dto = {
            orderId,
            paidStatus
        };
        return dto;
    }
    updateOrderOutput(orderUpdated) {
        const dto = {
            message: `As informações da compra foram atualizadas com sucesso.`,
            orderUpdated
        };
        return dto;
    }
    deleteOrderInput(userToken, orderToDeleteId) {
        if (typeof userToken !== "string") {
            throw new BadRequestError_1.BadRequestError("O token do usuário deve ser do tipo 'string' para deletar compra.");
        }
        if (typeof orderToDeleteId !== "string") {
            throw new BadRequestError_1.BadRequestError("O id da compra a ser deletada deve ser do tipo 'string'.");
        }
        const dto = {
            userToken,
            orderToDeleteId
        };
        return dto;
    }
    deleteOrderOutput(orderDeleted) {
        const dto = {
            message: `A compra foi deletada com sucesso.`,
            orderDeleted
        };
        return dto;
    }
}
exports.OrdersDTO = OrdersDTO;
//# sourceMappingURL=OrdersDTO.js.map