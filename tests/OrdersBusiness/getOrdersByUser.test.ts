import {
    OrdersDTO,
    GetOrdersByUserInput,
    GetOrdersByUserOutput
} from '../../src/dtos/OrdersDTO'
import { OrdersBusiness } from '../../src/business/OrdersBusiness'
import { OrdersDatabaseMock } from '../mocks/OrdersDatabaseMock'
import { CartsDatabaseMock } from '../mocks/CartsDatabaseMock'
import { TokenManagerNormalMock } from '../mocks/TokenManagerNormalMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { orderDB } from '../../src/types'

describe("GetOrdersByUser", () => {
    const ordersBusiness = new OrdersBusiness(
        new OrdersDatabaseMock,
        new CartsDatabaseMock,
        new TokenManagerNormalMock,
        new IdGeneratorMock,
        new OrdersDTO
    )
    test("deve retornar mensagem de compra bem sucedida", async () => {
        expect.assertions(2)
        const input: GetOrdersByUserInput = {
            userToken: "token-mock"
        }
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
        const ordersFoundByUserMock: orderDB[] = [foundOrderMock, foundOrder2Mock]
        const response: GetOrdersByUserOutput = await ordersBusiness.getOrdersByUser(input)
        expect(response.message)
            .toBe(`Aqui estão as compras encontradas efetuadas pelo usuário.`)
        expect(response.userOrders)
            .toStrictEqual(ordersFoundByUserMock)
    })
})