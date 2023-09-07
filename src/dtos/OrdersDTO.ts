import { BadRequestError } from "../errors/BadRequestError";
import { orderDB } from "../types";

export interface CreateNewOrderInput {
    userToken: string,
    productsId: string,
    productsAmount: string
}
export interface CreateNewOrderOutput {
    message: string,
    orderRegistered: orderDB
}
export interface GetOrderByIdInput {
    userToken: string,
    orderId: string
}
export interface GetOrderByIdOutput {
    message: string,
    orderFound: orderDB
}
export interface GetOrdersByUserInput {
    userToken: string
}
export interface GetOrdersByUserOutput {
    message: string,
    userOrders: orderDB[]
}
export interface UpdateOrderInput {
    orderId: string
    paidStatus: number
}
export interface UpdateOrderOutput {
    message: string,
    orderUpdated: orderDB
}
export interface DeleteOrderInput {
    userToken: string,
    orderToDeleteId: string
}
export interface DeleteOrderOutput {
    message: string,
    orderDeleted: orderDB
}

export class OrdersDTO {
    public createNewOrderInput(
        userToken: unknown,
        productsId: unknown,
        productsAmount: unknown
        ): CreateNewOrderInput {
        if (typeof userToken !== "string") {
            throw new BadRequestError("O token do usuário para registrar nova compra deve ser do tipo 'string'.")
        }
        if (typeof productsId !== "string") {
            throw new BadRequestError("O id dos produtos da nova compra deve ser do tipo array de 'string'.")
        }
        if (typeof productsAmount !== "string") {
            throw new BadRequestError("A quantidade dos produtos da nova compra devem ser do tipo array de 'string'")
        }
        const dto: CreateNewOrderInput = {
            userToken,
            productsId,
            productsAmount
        }
        return dto
    }
    public createNewOrderOutput(orderRegistered: orderDB): CreateNewOrderOutput {
        const dto: CreateNewOrderOutput = {
            message: `Compra registrada com sucesso.`,
            orderRegistered
        }
        return dto
    }
    public getOrderByIdInput(
        userToken: unknown,
        orderId: unknown
        ): GetOrderByIdInput {
        if (typeof userToken !== "string") {
            throw new BadRequestError("O token do usuário para buscar compra deve ser do tipo 'string'.")
        }
        if (typeof orderId !== "string") {
            throw new BadRequestError("O id para buscar por compra deve ser do tipo 'string'.")
        }
        const dto: GetOrderByIdInput = {
            userToken,
            orderId
        }
        return dto
    }
    public getOrderByIdOutput(orderFound: orderDB): GetOrderByIdOutput {
        const dto: GetOrderByIdOutput = {
            message: `Compra encontrada.`,
            orderFound
        }
        return dto
    }
    public getOrdersByUserInput(userToken: unknown): GetOrdersByUserInput {
        if (typeof userToken !== "string") {
            throw new BadRequestError("O token do usuário deve ser do tipo 'string' para buscar por compras feitas pelo mesmo.")
        }
        const dto: GetOrdersByUserInput = { userToken }
        return dto
    }
    public getOrdersByUserOutput(userOrders: orderDB[]): GetOrdersByUserOutput {
        const dto: GetOrdersByUserOutput = {
            message: `Aqui estão as compras encontradas efetuadas pelo usuário.`,
            userOrders
        }
        return dto
    }
    public updateOrderInput(
        orderId: unknown,
        paidStatus: unknown
        ): UpdateOrderInput {
        if (typeof orderId !== "string") {
            throw new BadRequestError("O id da compra para atualização das informações da mesma deve mser do tipo 'string'")
        }
        if (typeof paidStatus !== "number") {
            throw new BadRequestError("O status do pagamento deve do tipo 'number' para atualizar a propriedade 'paid' da conta.")
        }
        const dto: UpdateOrderInput = {
            orderId,
            paidStatus
        }
        return dto
    }
    public updateOrderOutput(orderUpdated: orderDB) {
        const dto: UpdateOrderOutput = {
            message: `As informações da compra foram atualizadas com sucesso.`,
            orderUpdated
        }
        return dto
    }
    public deleteOrderInput(
        userToken: unknown,
        orderToDeleteId: unknown
        ): DeleteOrderInput {
        if (typeof userToken !== "string") {
            throw new BadRequestError("O token do usuário deve ser do tipo 'string' para deletar compra.")
        }
        if (typeof orderToDeleteId !== "string") {
            throw new BadRequestError("O id da compra a ser deletada deve ser do tipo 'string'.")
        }
        const dto: DeleteOrderInput = {
            userToken,
            orderToDeleteId
        }
        return dto
    }
    public deleteOrderOutput(orderDeleted: orderDB): DeleteOrderOutput {
        const dto: DeleteOrderOutput = {
            message: `A compra foi deletada com sucesso.`,
            orderDeleted
        }
        return dto
    }
}