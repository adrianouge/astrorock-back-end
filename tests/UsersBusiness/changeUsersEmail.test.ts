import { UsersBusiness } from '../../src/business/UsersBusiness'
import { ChangeUsersEmailInput, ChangeUsersEmailOutput, UsersDTO } from '../../src/dtos/UsersDTO'
import { UsersDatabaseMock } from '../mocks/UsersDatabaseMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { HashManagerMock } from '../mocks/HashManagerMock'
import { TokenManagerNormalMock } from '../mocks/TokenManagerNormalMock'

describe("changeUsersEmail", () => {
    const usersBusiness = new UsersBusiness(
        new UsersDatabaseMock(),
        new UsersDTO(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new TokenManagerNormalMock()
    )
    test("deve retornar mensagem de sucesso de troca de e-mail", async () => {
        const userTokenMock = 'token-mock'
        const newEmailMock = 'mocknovo@teste.com'
        const inputMock: ChangeUsersEmailInput = {
            userToken: userTokenMock, newEmail: newEmailMock
        }
        const response: ChangeUsersEmailOutput = await usersBusiness.changeUsersEmail(inputMock)
        expect(response.message).toBe(`Usuário mock, o e-mail da sua conta foi atualizado para mocknovo@teste.com`)
    })
})