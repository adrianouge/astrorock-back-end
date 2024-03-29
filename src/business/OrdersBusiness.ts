import { CartsDatabase } from "../database/CartsDatabase";
import { OrdersDatabase } from "../database/OrdersDatabase";
import {
    CreateNewOrderInput,
    CreateNewOrderOutput,
    DeleteOrderInput,
    DeleteOrderOutput,
    GetOrderByIdInput,
    GetOrdersByUserInput,
    OrdersDTO,
    UpdateOrderInput,
    UpdateOrderOutput
} from "../dtos/OrdersDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager, TokenPayLoad } from "../services/TokenManager";
import { cartDB, orderDB } from "../types";

export class OrdersBusiness {
    constructor(
        private ordersDatabase: OrdersDatabase,
        private cartsDatabase: CartsDatabase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator,
        private ordersDTO: OrdersDTO
    ) { }
    public createNewOrder = async (input: CreateNewOrderInput) => {
        const { userToken } = input
        const userPayload: TokenPayLoad | null = this.tokenManager.getPayload(userToken)
        if (!userPayload) {
            throw new BadRequestError("Token do usuário inválido para registrar nova compra.")
        }
        let userCart: undefined[] | cartDB[] = await this.cartsDatabase.getCartByOwner(userPayload.id)
        let cartOwner = ``
        let productsInCart: string = ""
        let productsAmount: string = ""
        userCart.forEach(function (i) {
            if (i === undefined) {
                throw new NotFoundError("Nenhum produto foi adicionado pelo usuário ao carrinho para finalizar a compra.")
            }
            else {
                cartOwner = i.cart_owner
                productsInCart = `${productsInCart}` + `${i.product_id}`
                productsAmount = `${productsAmount}` + `${i.product_amount}`
            }
        })
        if (cartOwner === ``) {
            throw new NotFoundError("Nenhum produto foi adicionado pelo usuário ao carrinho para finalizar a compra.")
        }
        const newOrder: orderDB = {
            id: this.idGenerator.generate(),
            status: "Em processo",
            buyer_id: cartOwner,
            products_purchased: productsInCart,
            products_amount: productsAmount,
            purchase_date: new Date().toString(),
            paid: 0,
            payment_date: "Aguardando pagamento"
        }
        await this.ordersDatabase.createNewOrder(newOrder)
        const output: CreateNewOrderOutput = this.ordersDTO.createNewOrderOutput(newOrder)
        return output
    }
    public getOrderById = async (input: GetOrderByIdInput) => {
        const {
            userToken,
            orderId
        } = input
        const userPayload = this.tokenManager.getPayload(userToken)
        if (!userPayload) {
            throw new BadRequestError("Token do usuário inválido para buscar compra por id.")
        }
        const orderFound = await this.ordersDatabase.getOrderById(orderId)
        if (!orderFound) {
            throw new NotFoundError("Compra pesquisada por id não encontrada.")
        }
        const output = this.ordersDTO.getOrderByIdOutput(orderFound)
        return output
    }
    public getOrdersByUser = async (input: GetOrdersByUserInput) => {
        const { userToken } = input
        const userPayload = this.tokenManager.getPayload(userToken)
        if (!userPayload) {
            throw new BadRequestError("Token do usuário inválido para buscar compras por usuário.")
        }
        const getUserOrders = await this.ordersDatabase.getOrdersByUser(userPayload.id)
        const userOrdersFound: orderDB[] = []
        getUserOrders.forEach(function (i) {
            if (i === undefined) {
                throw new BadRequestError("")
            }
            else { userOrdersFound.push(i) }
        })
        const output = this.ordersDTO.getOrdersByUserOutput(userOrdersFound)
        return output
    }
    public updateOrderById = async (input: UpdateOrderInput) => {
        const {
            orderId,
            paidStatus
        } = input
        const orderToUpdate = await this.ordersDatabase.getOrderById(orderId)
        if (!orderToUpdate) {
            throw new NotFoundError("")
        }
        const orderUpdated: orderDB = {
            id: orderToUpdate.id,
            status: "Pago",
            buyer_id: orderToUpdate.buyer_id,
            products_purchased: orderToUpdate.products_purchased,
            products_amount: orderToUpdate.products_amount,
            purchase_date: orderToUpdate.purchase_date,
            paid: paidStatus,
            payment_date: new Date().toString()
        }
        await this.ordersDatabase.updateOrder(orderUpdated)
        const output: UpdateOrderOutput = this.ordersDTO.updateOrderOutput(orderUpdated)
        return output
    }
    public deleteOrderById = async (input: DeleteOrderInput) => {
        const {
            userToken,
            orderToDeleteId
        } = input
        const userPayload = this.tokenManager.getPayload(userToken)
        if (!userPayload) {
            throw new BadRequestError("Token do usuário inválido para deletar compra.")
        }
        const orderToDelete = await this.ordersDatabase.getOrderById(orderToDeleteId)
        if (!orderToDelete) {
            throw new NotFoundError("Compra para ser deletada não foi encontrada.")
        }
        if (userPayload.id !== orderToDelete.buyer_id) {
            throw new UnauthorizedError("Apenas o usuário quem finalizou a compra pode deleta-la.")
        }
        await this.ordersDatabase.deleteOrder(orderToDelete.id)
        const output: DeleteOrderOutput = this.ordersDTO.deleteOrderOutput(orderToDelete)
        return output
    }
}