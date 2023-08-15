import { UsersBusiness } from '../../src/business/UsersBusiness'
import { DeleteUserInput, DeleteUserOutput, UsersDTO } from '../../src/dtos/UsersDTO'
import { UsersDatabaseMock } from '../mocks/UsersDatabaseMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { HashManagerMock } from '../mocks/HashManagerMock'
import { TokenManagerAdminMock } from '../mocks/TokenManagerAdminMock'

describe("deleteUser", () => {
    const usersBusiness = new UsersBusiness(
        new UsersDatabaseMock(),
        new UsersDTO(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new TokenManagerAdminMock()
    )
    test("deve retornar de sucesso de deleção", async() => {
        const userTokenMock = 'token-mock'
        const input: DeleteUserInput = {userToken: userTokenMock}
        const response: DeleteUserOutput = await usersBusiness.deleteUser(input)
        expect(response.message).toBe(`Usuário mock, sua conta foi deletada com sucesso.`)
    })
})