import { ProductsBusiness } from '../../src/business/ProductsBusiness'
import {
    GetProductsByNameLikeInput, GetProductsByNameLikeOutput,
    ProductsDTO
} from '../../src/dtos/ProductsDTO'
import { ProductsDatabaseMock } from '../mocks/ProductsDatabaseMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { TokenManagerAdminMock } from '../mocks/TokenManagerAdminMock'

describe("getProductsByNameLike", () => {
    const productsBusiness = new ProductsBusiness(
        new ProductsDatabaseMock(),
        new ProductsDTO(),
        new TokenManagerAdminMock(),
        new IdGeneratorMock()
    )
    test("deve retornar mensagem com produtos encontrados", async () => {
        expect.assertions(2)
        const termSearched = "mock"
        const input: GetProductsByNameLikeInput = { termSearched }
        const response: GetProductsByNameLikeOutput = await productsBusiness.getProductByNameLike(input)
        const productExpected = [{
            id: 'product-id-mock',
            name: 'Produto mock',
            description: 'Descrição mock',
            price: 1,
            amount_in_stock: 1,
            created_at: 'Data mock',
            updated_at: 'Data mock'
        }]
        expect(response.message).toBe(`Produto encontrado:`)
        expect(response.productsFound).toStrictEqual(productExpected)
    }
    )
})
