import { UsersBusiness } from '../../src/business/UsersBusiness'
import { LoginUserInput, LoginUserOutput, UsersDTO } from '../../src/dtos/UsersDTO'
import { UsersDatabaseMock } from '../mocks/UsersDatabaseMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { HashManagerMock } from '../mocks/HashManagerMock'
import { TokenManagerNormalMock } from '../mocks/TokenManagerNormalMock'

describe("loginUserInput", () => {
    const usersBusiness = new UsersBusiness(
        new UsersDatabaseMock(),
        new UsersDTO(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new TokenManagerNormalMock()
    )

    test("deve retornar mensagem e token do usuário", async () => {
        expect.assertions(2)
        const email = "mock@teste.com"
        const password = "senhaMockada-hash"
        const inputMock: LoginUserInput = {
            email,
            password
        }
        const response: LoginUserOutput = await usersBusiness.loginUser(inputMock)
        expect(response.message).toBe(`Bom te ver novamente, Usuário mock.`)
        expect(response.userToken).toBe(`token-mock`)
    })
})