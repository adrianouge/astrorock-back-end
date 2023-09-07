import {
    OrdersDTO,
    UpdateOrderInput,
    UpdateOrderOutput
} from '../../src/dtos/OrdersDTO'
import { OrdersBusiness } from '../../src/business/OrdersBusiness'
import { OrdersDatabaseMock } from '../mocks/OrdersDatabaseMock'
import { CartsDatabaseMock } from '../mocks/CartsDatabaseMock'
import { TokenManagerAdminMock } from '../mocks/TokenManagerAdminMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { orderDB } from '../../src/types'

describe("updateOrder", () => {
    const ordersBusiness = new OrdersBusiness(
        new OrdersDatabaseMock,
        new CartsDatabaseMock,
        new TokenManagerAdminMock,
        new IdGeneratorMock,
        new OrdersDTO
    )
    test("deve retornar mensagem de atualização de informações da compra bem sucedida", async () => {
        expect.assertions(2)
        const input: UpdateOrderInput = {
            orderId: "order-id-mock",
            paidStatus: 1
        }
        const orderUpdatedMock: orderDB = {
            id: 'order-id-mock',
            status: 'Pago',
            userId: 'usuario-id-mock',
            productsId: 'produto-id-mock, produto2-id-mock',
            productsAmount: '1, 1',
            purchaseDate: 'data-mock',
            paid: 1,
            paymentDate: new Date().toString()
        }
        const response: UpdateOrderOutput = await ordersBusiness.updateOrderById(input)
        expect(response.message)
            .toBe(`As informações da compra foram atualizadas com sucesso.`)
        expect(response.orderUpdated)
            .toStrictEqual(orderUpdatedMock)
    })
})