import {
    OrdersDTO,
    GetOrderByIdInput,
    GetOrderByIdOutput
} from '../../src/dtos/OrdersDTO'
import { OrdersBusiness } from '../../src/business/OrdersBusiness'
import { OrdersDatabaseMock } from '../mocks/OrdersDatabaseMock'
import { CartsDatabaseMock } from '../mocks/CartsDatabaseMock'
import { TokenManagerNormalMock } from '../mocks/TokenManagerNormalMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { orderDB } from '../../src/types'

describe("getOrderById", () => {
    const ordersBusiness = new OrdersBusiness(
        new OrdersDatabaseMock,
        new CartsDatabaseMock,
        new TokenManagerNormalMock,
        new IdGeneratorMock,
        new OrdersDTO
    )
    test("deve retornar mensagem de compra bem sucedida", async () => {
        expect.assertions(2)
        const input: GetOrderByIdInput = {
            userToken: "token-mock",
            orderId: "order-id-mock"
        }
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
        const response: GetOrderByIdOutput = await ordersBusiness.getOrderById(input)
        expect(response.message)
            .toBe(`Compra encontrada.`)
        expect(response.orderFound)
            .toStrictEqual(foundOrderMock)
    })
})