import { orderDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class OrdersDatabase extends BaseDatabase {
    public static TABLE_ORDERS = 'orders'
    public static TABLE_USERS = 'users'
    public static TABLE_PRODUCTS = 'products'
    public static TABLE_CARTS = 'carts'
    dbConnection = BaseDatabase.connection
    public async createNewOrder(newOrder: orderDB): Promise<void> {
        await this
            .dbConnection(OrdersDatabase.TABLE_ORDERS)
            .insert(newOrder)
    }
    public async getOrderById(orderId: string): Promise<orderDB | undefined> {
        const [orderFound] = await this
            .dbConnection(OrdersDatabase.TABLE_ORDERS)
            .where({ id: orderId })
        return orderFound
    }
    public async getOrdersByUser(userId: string): Promise<orderDB[] | undefined[]> {
        const usersOrders = await this
            .dbConnection(OrdersDatabase.TABLE_ORDERS)
            .where({ userId })
        return usersOrders
    }
    public async updateOrder(orderUpdated: orderDB): Promise<void> {
        await this
            .dbConnection(OrdersDatabase.TABLE_ORDERS)
            .update(orderUpdated)
            .where({ id: orderUpdated.id })
    }
    public async deleteOrder(orderToDeleteId: string): Promise<void> {
        await this
            .dbConnection(OrdersDatabase.TABLE_ORDERS)
            .del()
            .where({ id: orderToDeleteId })
    }
}