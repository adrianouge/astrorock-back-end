import {
    OrdersDTO,
    CreateNewOrderInput,
    CreateNewOrderOutput
} from '../../src/dtos/OrdersDTO'
import { OrdersBusiness } from '../../src/business/OrdersBusiness'
import { OrdersDatabaseMock } from '../mocks/OrdersDatabaseMock'
import { CartsDatabaseMock } from '../mocks/CartsDatabaseMock'
import { TokenManagerNormalMock } from '../mocks/TokenManagerNormalMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'

describe("createNewOrder", () => {
    const ordersBusiness = new OrdersBusiness(
        new OrdersDatabaseMock,
        new CartsDatabaseMock,
        new TokenManagerNormalMock,
        new IdGeneratorMock,
        new OrdersDTO
    )
    test("deve retornar mensagem de compra bem sucedida", async () => {
        const input: CreateNewOrderInput = {
            userToken: "token-mock",
            productsId: "produto-id-mock",
            productsAmount: "quantidade-mock"
        }
        const response: CreateNewOrderOutput = await ordersBusiness.createNewOrder(input)
        expect(response.message).toBe(`Compra de id id-mock foi registrada com sucesso.`)
    })
})