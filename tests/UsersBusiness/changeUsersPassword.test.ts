import { UsersBusiness } from '../../src/business/UsersBusiness'
import { ChangeUsersPasswordInput, ChangeUsersPasswordOutput, UsersDTO } from '../../src/dtos/UsersDTO'
import { UsersDatabaseMock } from '../mocks/UsersDatabaseMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { HashManagerMock } from '../mocks/HashManagerMock'
import { TokenManagerNormalMock } from '../mocks/TokenManagerNormalMock'

describe("changeUsersPassword", () => {
    const usersBusiness = new UsersBusiness(
        new UsersDatabaseMock(),
        new UsersDTO(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new TokenManagerNormalMock()
    )
    test("deve retornar mensagem de sucesso de troca de password", async () => {
        const userTokenMock = 'token-mock'
        const newPasswordMock = 'senhaNovaMock'
        const inputMock: ChangeUsersPasswordInput = {
            userToken: userTokenMock,
            newPassword: newPasswordMock
        }
        const response: ChangeUsersPasswordOutput = await usersBusiness.changeUsersPassword(inputMock)
        expect(response.message).toBe(`Usuário mock, sua senha foi atualizada com sucesso.`)
    })
})