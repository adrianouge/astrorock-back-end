import { ProductsBusiness } from '../../src/business/ProductsBusiness'
import {
    DeleteProductByIdInput,
    DeleteProductByIdOutput,
    ProductsDTO
} from '../../src/dtos/ProductsDTO'
import { ProductsDatabaseMock } from '../mocks/ProductsDatabaseMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { TokenManagerAdminMock } from '../mocks/TokenManagerAdminMock'

describe("deleteProductById", () => {
    const productsBusiness = new ProductsBusiness(
        new ProductsDatabaseMock(),
        new ProductsDTO(),
        new TokenManagerAdminMock(),
        new IdGeneratorMock()
    )
    test("deve retornar mensagem confirmando sucesso de deleção do produto",
        async () => {
            const userToken = 'token-mock'
            const productId = 'produto-id-mock'
            const input: DeleteProductByIdInput = {
                userToken,
                idToDelete: productId
            }
            const response: DeleteProductByIdOutput = await productsBusiness.deleteProduct(input)
            expect(response.message)
                .toBe(`O produto Produto mock foi deletado com sucesso.`)
        }
    )
})