import { CartsBusiness } from '../../src/business/CartsBusiness'
import { CartsDatabaseMock } from '../mocks/CartsDatabaseMock'
import { ProductsDatabaseMock } from '../mocks/ProductsDatabaseMock'
import { TokenManagerAdminMock } from '../mocks/TokenManagerAdminMock'
import { CartsDTO } from '../../src/dtos/CartsDTO'
import {
    UpdateProductAmountInCartInput, UpdateProductAmountInCartOutput
} from '../../src/dtos/CartsDTO'
import { cartDB } from '../../src/types'

describe("updateProductAmountInCart", () => {
    const cartsBusiness = new CartsBusiness(
        new ProductsDatabaseMock,
        new CartsDatabaseMock,
        new TokenManagerAdminMock,
        new CartsDTO
    )
    test("deve retornar mensagem com carrinho do usuário", async () => {
        const input: UpdateProductAmountInCartInput = {
            userToken: "token-mock",
            productId: "produto-id-mock",
            newProductAmount: "nova-quantidade-mock"
        }
        const response: UpdateProductAmountInCartOutput = await cartsBusiness.updateProductAmountInCart(input)
        
        expect(response.message).toBe(`A quantidade de Produto mock no carrinho foi alterada para nova-quantidade-mock`)
    })
})