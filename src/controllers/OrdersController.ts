import { Request, Response } from 'express'
import {
    CreateNewOrderInput,
    CreateNewOrderOutput,
    DeleteOrderInput,
    DeleteOrderOutput,
    GetOrderByIdInput,
    GetOrderByIdOutput,
    GetOrdersByUserInput,
    GetOrdersByUserOutput,
    OrdersDTO,
    UpdateOrderInput,
    UpdateOrderOutput
} from '../dtos/OrdersDTO'
import { OrdersBusiness } from '../business/OrdersBusiness'
import { BaseError } from '../errors/BaseError'

export class OrdersController {
    constructor(
        private ordersDTO: OrdersDTO,
        private ordersBusiness: OrdersBusiness
    ) { }
    public createNewOrder = async (req: Request, res: Response) => {
        try {
            const userToken = req.headers.authorization
            const {
                productsId,
                productsAmount
            } = req.body
            const input: CreateNewOrderInput = this.ordersDTO
                .createNewOrderInput(
                    userToken,
                    productsId,
                    productsAmount
                )
            const output: CreateNewOrderOutput = await this.ordersBusiness.createNewOrder(input)
            res.status(200).send(output)
        }
        catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.send(error.message)
            }
            else { res.send("Um erro inesperado ocorreu.") }
        }
    }
    public getOrderById = async (req: Request, res: Response) => {
        try {
            const userToken = req.headers.authorization
            const { orderId } = req.body
            const input: GetOrderByIdInput = this.ordersDTO
                .getOrderByIdInput(
                    userToken,
                    orderId
                )
            const output: GetOrderByIdOutput = await this.ordersBusiness.getOrderById(input)
            res.status(200).send(output)
        }
        catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.send(error.message)
            }
            else { res.send("Um erro inesperado ocorreu.") }
        }
    }
    public getOrderByUser = async (req: Request, res: Response) => {
        try {
            const userToken = req.headers.authorization
            const input: GetOrdersByUserInput = this.ordersDTO.getOrdersByUserInput(userToken)
            const output: GetOrdersByUserOutput = await this.ordersBusiness.getOrdersByUser(input)
            res.status(200).send(output)
        }
        catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.send(error.message)
            }
            else { res.send("Um erro inesperado ocorreu.") }
        }
    }
    public updateOrderById = async (req: Request, res: Response) => {
        try {
            const {
                orderId,
                paidStatus
            } = req.body
            const input: UpdateOrderInput = this.ordersDTO
                .updateOrderInput(
                    orderId,
                    paidStatus
                )
            const output: UpdateOrderOutput = await this.ordersBusiness.updateOrderById(input)
            res.status(200).send(output)
        }
        catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.send(error.message)
            }
            else { res.send("Um erro inesperado ocorreu.") }
        }
    }
    public deleteOrderById = async (req: Request, res: Response) => {
        try {
            const userToken = req.headers.authorization
            const { orderId } = req.body
            const input: DeleteOrderInput = this.ordersDTO
                .deleteOrderInput(
                    userToken,
                    orderId
                )
            const output: DeleteOrderOutput = await this.ordersBusiness.deleteOrderById(input)
            res.status(200).send(output)
        }
        catch (error) {
            console.log(error)
            if (error instanceof BaseError) {
                res.send(error.message)
            }
            else { res.send("Um erro inesperado ocorreu.") }
        }
    }
}