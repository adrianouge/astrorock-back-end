import { orderDB } from "../../src/types";

export class OrdersDatabaseMock {
    public createNewOrder = (newOrderMock: orderDB) => {
        return `A compra feita pelo usuário de id '${newOrderMock.userId}' foi efetuada com sucesso em ${newOrderMock.purchaseDate}. Nela, contém: ${newOrderMock.productsAmount}, respectivamente, dos produtos de id ${newOrderMock.productsId}.`
    }

    public getOrderById = (orderIdMock: string): orderDB | undefined => {
        const foundOrderMock: orderDB = {
            id: 'order-id-mock',
            status: 'status-mock',
            userId: 'id-mock',
            productsId: 'produto-id-mock, produto2-id-mock',
            productsAmount: '1, 1',
            purchaseDate: 'data-mock',
            paid: 0,
            paymentDate: 'nunca'
        }

        if (orderIdMock === 'order-id-mock') {
            return foundOrderMock
        }
    }

    public getOrdersByUser = (userIdMock: string): orderDB[] | undefined => {
        const foundOrderMock: orderDB = {
            id: 'order-id-mock',
            status: 'status-mock',
            userId: 'id-mock',
            productsId: 'produto-id-mock, produto2-id-mock',
            productsAmount: '1, 1',
            purchaseDate: 'data-mock',
            paid: 0,
            paymentDate: 'nunca'
        }
        const foundOrder2Mock: orderDB = {
            id: 'order-id-mock',
            status: 'status-mock',
            userId: 'id-mock',
            productsId: 'produto-id',
            productsAmount: '1',
            purchaseDate: 'data-mock',
            paid: 1,
            paymentDate: 'data-mock'
        }
        const ordersFoundByUser: orderDB[] = [foundOrderMock, foundOrder2Mock]
        if (userIdMock === 'id-mock') {
            return ordersFoundByUser
        }
    }

    public updateOrder = (updatedOrderMock: orderDB): string => {
        return `A compra de id '${updatedOrderMock.id}' foi atualizada com sucesso.`
    }

    public deleteOrder = (orderToDeleteMock: string): string => {
        return `A compra de id '${orderToDeleteMock}' foi deletada com sucesso.`
    }
} 