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
import { orderDB } from '../../src/types'

describe("createNewOrder", () => {
    const ordersBusiness = new OrdersBusiness(
        new OrdersDatabaseMock,
        new CartsDatabaseMock,
        new TokenManagerNormalMock,
        new IdGeneratorMock,
        new OrdersDTO
    )
    test("deve retornar mensagem de compra bem sucedida", async () => {
        expect.assertions(2)
        const input: CreateNewOrderInput = {
            userToken: "token-mock",
            productsId: "produto-id-mock",
            productsAmount: "quantidade-mock"
        }
        const orderRegisteredMock: orderDB = {
            id: 'id-mock',
            status: 'Em processo',
            userId: 'usuario-id-mock',
            productsId: 'produto-id-mock',
            productsAmount: 'quantidade-mock',
            purchaseDate: new Date().toString(),
            paid: 0,
            paymentDate: 'Aguardando pagamento'
        }
        const response: CreateNewOrderOutput = await ordersBusiness.createNewOrder(input)
        expect(response.message)
            .toBe(`Compra registrada com sucesso.`)
        expect(response.orderRegistered)
            .toStrictEqual(orderRegisteredMock)
    })
})