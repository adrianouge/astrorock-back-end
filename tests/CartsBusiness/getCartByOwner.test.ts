import { CartsBusiness } from '../../src/business/CartsBusiness'
import { CartsDatabaseMock } from '../mocks/CartsDatabaseMock'
import { ProductsDatabaseMock } from '../mocks/ProductsDatabaseMock'
import { TokenManagerAdminMock } from '../mocks/TokenManagerAdminMock'
import { CartsDTO } from '../../src/dtos/CartsDTO'
import {
    GetCartByUserInput,
    GetCartByUserOutput
} from '../../src/dtos/CartsDTO'
import { cartDB } from '../../src/types'
describe("getCartByOwner", () => {
    const cartsBusiness = new CartsBusiness(
        new ProductsDatabaseMock,
        new CartsDatabaseMock,
        new TokenManagerAdminMock,
        new CartsDTO
    )
    test("deve retornar mensagem com carrinho do usuário", async () => {
        expect.assertions(2)
        const input: GetCartByUserInput = { userToken: "token-mock" }
        const response: GetCartByUserOutput = await cartsBusiness.getCartByUser(input)
        const cartFoundMock: cartDB = {
            cartOwner: 'usuario-id-mock',
            productId: 'produto-id-mock',
            productsAmount: 'quantidade-mock'
        }
        expect(response.message)
            .toBe(`Carrinho do usuário encontrado.`)
        expect(response.userCart)
            .toStrictEqual(cartFoundMock)
    })
})