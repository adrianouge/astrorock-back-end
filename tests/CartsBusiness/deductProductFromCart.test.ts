import { CartsBusiness } from '../../src/business/CartsBusiness'
import { ProductsDatabaseMock } from '../mocks/ProductsDatabaseMock'
import { CartsDatabaseMock } from '../mocks/CartsDatabaseMock'
import { TokenManagerAdminMock } from '../mocks/TokenManagerAdminMock'
import { CartsDTO } from '../../src/dtos/CartsDTO'
import {
    DeductProductFromCartInput,
    DeductProductFromCartOutput
} from '../../src/dtos/CartsDTO'
describe("deductProductFromCart", () => {
    const cartsBusiness = new CartsBusiness(
        new ProductsDatabaseMock,
        new CartsDatabaseMock,
        new TokenManagerAdminMock,
        new CartsDTO
    )
    test("deve retornar mensagem de dedução bem sucedida de produto do carrinho", async () => {
        expect.assertions(2)
        const input: DeductProductFromCartInput = {
            userToken: "token-mock",
            productId: "produto-id-mock"
        }
        const response: DeductProductFromCartOutput = await cartsBusiness.deductProductFromCart(input)
        expect(response.message)
            .toBe(`O produto foi removido do seu carrinho.`)
        expect(response.removedProduct)
            .toBe('Produto mock')
    })
})