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
        const input: DeleteOrderInput = {
            userToken: "token-mock",
            orderToDeleteId: "order-id-mock"
        }
        const response: DeleteOrderOutput = await ordersBusiness.deleteOrderById(input)
        expect(response.message).toBe(`A compra de id order-id-mock foi deletada com sucesso.`)
    })
})