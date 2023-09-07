import { ProductsBusiness } from '../../src/business/ProductsBusiness'
import {
    UpdateProductInfoInput,
    UpdateProductInfoOutput,
    ProductsDTO
} from '../../src/dtos/ProductsDTO'
import { ProductsDatabaseMock } from '../mocks/ProductsDatabaseMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { TokenManagerAdminMock } from '../mocks/TokenManagerAdminMock'

describe("updateProductInfo", () => {
    const productsBusiness = new ProductsBusiness(
        new ProductsDatabaseMock(),
        new ProductsDTO(),
        new TokenManagerAdminMock(),
        new IdGeneratorMock()
    )
    test("deve retornar mensagem confirmando sucesso de atualização de informações do produto",
    async () => {
        expect.assertions(2)
        const userToken = 'token-mock'
        const productId = 'product-id-mock'
        const productName = 'Produto mock'
        const productDescription = 'Descrição mock'
        const productPrice = 1
        const productAmountInStock = 2
        const productCreatedAt = 'Data mock'
        const input: UpdateProductInfoInput = {
            userToken,
            productId,
            productName,
            productDescription,
            productPrice,
            productAmountInStock,
            productCreatedAt
        }
        const response: UpdateProductInfoOutput = await productsBusiness.updateProductInfo(input)
        const updatedProduct = response.updatedProduct
        expect(response.message)
        .toBe(`O produto foi atualizado com sucesso em ${updatedProduct.updated_at}`)
        expect(response.updatedProduct)
        .toStrictEqual(updatedProduct)
    }
    )
})