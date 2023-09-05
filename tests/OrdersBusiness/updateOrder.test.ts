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
    test("deve retornar mensagem de compra bem sucedida", async () => {
        const input: UpdateOrderInput = {
            orderId: "order-id-mock",
            paidStatus: 1
        }
        const orderUpdated: orderDB = {
            id: 'order-id-mock',
            status: 'status-mock',
            userId: 'id-mock',
            productsId: 'produto-id-mock, produto2-id-mock',
            productsAmount: '1, 1',
            purchaseDate: 'data-mock',
            paid: 1,
            paymentDate: 'nunca'
        }
        const response: UpdateOrderOutput = await ordersBusiness.updateOrderById(input)
        expect(response.message).toBe(`A compra foi atualizada com sucesso: ${orderUpdated}`)
    })
})