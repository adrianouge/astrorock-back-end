import { ProductsBusiness } from '../../src/business/ProductsBusiness'
import {
    GetProductByIdInput, GetProductByIdOutput,
    ProductsDTO
} from '../../src/dtos/ProductsDTO'
import { ProductsDatabaseMock } from '../mocks/ProductsDatabaseMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { TokenManagerAdminMock } from '../mocks/TokenManagerAdminMock'

describe("getProductById", () => {
    const productsBusiness = new ProductsBusiness(
        new ProductsDatabaseMock(),
        new ProductsDTO(),
        new TokenManagerAdminMock(),
        new IdGeneratorMock()
    )
    test("deve retornar mensagem com produto encontrado", async () => {
        expect.assertions(2)
        const userToken = 'token-mock'
        const idSearched = 'produto-id-mock'
        const input: GetProductByIdInput = {
            userToken,
            idSearched
        }
        const response: GetProductByIdOutput = await productsBusiness.getProductById(input)
        expect(response.message).toBe(`Produto encontrado:`)
        expect(response.productFound).toStrictEqual({
            id: "produto-id-mock",
            name: "Produto mock",
            description: "Descrição mock",
            price: 1,
            amount_in_stock: 1,
            created_at: "data-mock",
            updated_at: "nunca"
        })
    })
})