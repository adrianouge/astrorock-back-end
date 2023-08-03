import { BadRequestError } from "../errors/BadRequestError";
import { orderDB } from "../types";

export interface CreateNewOrderInput {
    userToken: string,
    productsId: string,
    productsAmount: number
}

export interface CreateNewOrderOutput {
    message: string
}

export interface GetOrderByIdInput {
    userToken: string,
    orderId: string
}

export interface GetOrderByIdOutput {
    message: string
}

export interface GetOrdersByUserInput {
    userToken: string
}

export interface GetOrdersByUserOutput {
    message: string
}

export interface UpdateOrderInput {
    orderId: string
    paidStatus: number
}

export interface UpdateOrderOutput {
    message: string
}

export interface DeleteOrderInput {
    userToken: string,
    orderToDeleteId: string
}

export interface DeleteOrderOutput {
    message: string
}

export class OrdersDTO {

    public createNewOrderInput(userToken: unknown, productsId: unknown, productsAmount: unknown): CreateNewOrderInput {
        if (typeof userToken !== "string") {
            throw new BadRequestError("O token do usuário para registrar nova compra deve ser do tipo 'string'.")
        }

        if (typeof productsId !== "string") {
            throw new BadRequestError("O id dos produtos da nova compra deve ser do tipo array de 'string'.")
        }

        if (typeof productsAmount !== "number") {
            throw new BadRequestError("A quantidade dos produtos da nova compra devem ser do tipo array de 'number'")
        }

        const dto: CreateNewOrderInput = { userToken, productsId, productsAmount }
        return dto
    }

    public createNewOrderOutput(orderRegistered: orderDB): CreateNewOrderOutput {

        const dto: CreateNewOrderOutput = {
            message: `Compra de id ${orderRegistered.id} foi registrada com sucesso.`
        }

        return dto
    }

    public getOrderByIdInput(userToken: unknown, orderId: unknown): GetOrderByIdInput {

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
            message: `Compra com id ${orderFound.id} encontrada: ${orderFound}`
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
            message: `Aqui estão as compras encontradas efetuadas pelo usuário: ${userOrders}`
        }

        return dto
    }

    public updateOrderInput(orderId: unknown, paidStatus: unknown): UpdateOrderInput {

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
            message: `A compra foi atualizada com sucesso: ${orderUpdated}`
        }

        return dto
    }

    public deleteOrderInput(userToken: unknown, orderToDeleteId: unknown): DeleteOrderInput {

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
            message: `A compra de id ${orderDeleted.id} foi deletada com sucesso.`
        }
        return dto
    }
}