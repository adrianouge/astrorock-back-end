import { BaseDatabase } from "../../src/database/BaseDatabase";
import { orderDB } from "../../src/types";

export class OrdersDatabaseMock extends BaseDatabase {
    public static TABLE_ORDERS = 'orders'
    public static TABLE_USERS = 'users'
    public static TABLE_PRODUCTS = 'products'
    public static TABLE_CARTS = 'carts'

    dbConnection = BaseDatabase.connection
    public createNewOrder = async (newOrderMock: orderDB): Promise<void> => {
    }

    public getOrderById = async (orderIdMock: string): Promise<orderDB | undefined> => {
        const foundOrderMock: orderDB = {
            id: 'order-id-mock',
            status: 'status-mock',
            userId: 'usuario-id-mock',
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

    public getOrdersByUser = async (userIdMock: string): Promise<orderDB[] | undefined[]> => {
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
        if (userIdMock === 'usuario-id-mock') {
            return ordersFoundByUser
        }
        else {
            let noOrders: undefined[] = []
            return noOrders
        }
    }

    public updateOrder = async (updatedOrderMock: orderDB): Promise<void> => {
    }

    public deleteOrder = async (orderToDeleteMock: string): Promise<void> => {
    }
} 