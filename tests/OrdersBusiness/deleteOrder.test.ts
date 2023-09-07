import {
    OrdersDTO,
    DeleteOrderInput,
    DeleteOrderOutput
} from '../../src/dtos/OrdersDTO'
import { OrdersBusiness } from '../../src/business/OrdersBusiness'
import { OrdersDatabaseMock } from '../mocks/OrdersDatabaseMock'
import { CartsDatabaseMock } from '../mocks/CartsDatabaseMock'
import { TokenManagerNormalMock } from '../mocks/TokenManagerNormalMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'

describe("deleteOrder", () => {
    const ordersBusiness = new OrdersBusiness(
        new OrdersDatabaseMock,
        new CartsDatabaseMock,
        new TokenManagerNormalMock,
        new IdGeneratorMock,
        new OrdersDTO
    )
    test("deve retornar mensagem de compra bem sucedida", async () => {
        expect.assertions(2)
        const input: DeleteOrderInput = {
            userToken: "token-mock",
            orderToDeleteId: "order-id-mock"
        }
        const orderDeletedMock = {
            id: 'order-id-mock',
            status: 'status-mock',
            userId: 'usuario-id-mock',
            productsId: 'produto-id-mock, produto2-id-mock',
            productsAmount: '1, 1',
            purchaseDate: 'data-mock',
            paid: 0,
            paymentDate: 'nunca'
        }
        const response: DeleteOrderOutput = await ordersBusiness.deleteOrderById(input)
        expect(response.message)
            .toBe(`A compra foi deletada com sucesso.`)
        expect(response.orderDeleted)
            .toStrictEqual(orderDeletedMock)
    })
})