import { UsersBusiness } from '../../src/business/UsersBusiness'
import { CreateNewUserInput, CreateNewUserOutput, UsersDTO } from '../../src/dtos/UsersDTO'
import { UsersDatabaseMock } from '../mocks/UsersDatabaseMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { HashManagerMock } from '../mocks/HashManagerMock'
import { TokenManagerNormalMock } from '../mocks/TokenManagerNormalMock'

describe("createNewUser", () => {
    const usersBusiness = new UsersBusiness(
        new UsersDatabaseMock(),
        new UsersDTO(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new TokenManagerNormalMock()
    )
    test("deve retornar mensagem e token do usuário", async () => {
        expect.assertions(2)
        const name = "Usuário mock"
        const email = "mocknovo@teste.com"
        const password = "senhaMockada"
        const input: CreateNewUserInput = {name, email, password}
        const response: CreateNewUserOutput = await usersBusiness.createNewUser(input)
        expect(response.message).toBe(`Olá, Usuário mock! Sua conta foi criada com sucesso.`)
        expect(response.userToken).toBe(`token-mock`)
    })
})