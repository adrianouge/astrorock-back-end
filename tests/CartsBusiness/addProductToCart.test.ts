import { CartsBusiness } from '../../src/business/CartsBusiness'
import { ProductsDatabaseMock } from '../mocks/ProductsDatabaseMock'
import { CartsDatabaseMock } from '../mocks/CartsDatabaseMock'
import { TokenManagerAdminMock } from '../mocks/TokenManagerAdminMock'
import { CartsDTO } from '../../src/dtos/CartsDTO'
import {
    AddProductToCartInput, AddProductToCartOutput
} from '../../src/dtos/CartsDTO'
describe("addProductToCart", () => {
    const cartsBusiness = new CartsBusiness(
        new ProductsDatabaseMock,
        new CartsDatabaseMock,
        new TokenManagerAdminMock,
        new CartsDTO
    )
    test("", async () => {
        const input: AddProductToCartInput = {
            userToken: "token-mock",
            productId: "produto-id-mock",
            productAmount: 'quantidade-mock'
        }
        const response: AddProductToCartOutput = await cartsBusiness.addProductToCart(input)
        expect(response.message).toBe(`quantidade-mock Produto mock foram adicionados ao seu carrinho com sucesso.`)
    })
})