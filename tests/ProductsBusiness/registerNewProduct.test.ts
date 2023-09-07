import { ProductsBusiness } from '../../src/business/ProductsBusiness'
import {
    RegisterNewProductInput,
    RegisterNewProductOutput,
    ProductsDTO
} from '../../src/dtos/ProductsDTO'
import { ProductsDatabaseMock } from '../mocks/ProductsDatabaseMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { TokenManagerAdminMock } from '../mocks/TokenManagerAdminMock'

describe("registerNewProduct", () => {
    const productsBusiness = new ProductsBusiness(
        new ProductsDatabaseMock(),
        new ProductsDTO(),
        new TokenManagerAdminMock(),
        new IdGeneratorMock()
    )
    test("deve retornar mensagem de registro de produto bem-sucedido",
        async () => {
            const userToken = 'token-mock'
            const name = 'Produto novo mock'
            const description = 'Descrição mock'
            const price = 1
            const amountInStock = 1
            const input: RegisterNewProductInput = {
                userToken,
                name,
                description,
                price,
                amountInStock
            }
            const response: RegisterNewProductOutput = await productsBusiness.registerNewProduct(input)
            expect(response.message)
                .toBe(`O produto Produto novo mock foi registrado com sucesso.`)
        })
})