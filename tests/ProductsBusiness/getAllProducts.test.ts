import { ProductsBusiness } from '../../src/business/ProductsBusiness'
import {
    GetAllProductsOutput,
    ProductsDTO
} from '../../src/dtos/ProductsDTO'
import { ProductsDatabaseMock } from '../mocks/ProductsDatabaseMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { TokenManagerAdminMock } from '../mocks/TokenManagerAdminMock'

describe("getAllProducts", () => {
    const productsBusiness = new ProductsBusiness(
        new ProductsDatabaseMock(),
        new ProductsDTO(),
        new TokenManagerAdminMock(),
        new IdGeneratorMock()
    )
    test("deve retornar mensagem com produtos encontrados", async () => {
        expect.assertions(2)
        const response: GetAllProductsOutput = await productsBusiness.getAllProducts()
        const allProductsExpected = [{
            id: "id-mock",
            name: "Nome mock",
            description: "Descrição mock",
            price: 1,
            amount_in_stock: 1,
            created_at: "data-mock",
            updated_at: "nunca"
        },
        {
            id: "id1-mock",
            name: "Nome1 mock",
            description: "Descrição mock",
            price: 1,
            amount_in_stock: 1,
            created_at: "data-mock",
            updated_at: "nunca"
        }]
        expect(response.message)
            .toBe(`Aqui estão todos os produtos:`)
        expect(response.allProducts)
            .toStrictEqual(allProductsExpected)
    }
    )
})