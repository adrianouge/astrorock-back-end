import { UsersBusiness } from '../../src/business/UsersBusiness'
import {
    ChangeUsersPasswordInput,
    ChangeUsersPasswordOutput,
    UsersDTO
} from '../../src/dtos/UsersDTO'
import { UsersDatabaseMock } from '../mocks/UsersDatabaseMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { HashManagerMock } from '../mocks/HashManagerMock'
import { TokenManagerNormalMock } from '../mocks/TokenManagerNormalMock'
import { userDB } from '../../src/types'

describe("changeUsersPassword", () => {
    const usersBusiness = new UsersBusiness(
        new UsersDatabaseMock(),
        new UsersDTO(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new TokenManagerNormalMock()
    )
    test("deve retornar mensagem de sucesso de troca de senha do usuário",
        async () => {
            expect.assertions(2)
            const userTokenMock = 'token-mock'
            const newPasswordMock = 'senhaNovaMock'
            const inputMock: ChangeUsersPasswordInput = {
                userToken: userTokenMock,
                newPassword: newPasswordMock
            }
            const userUpdatedMock: userDB = {
                id: "user-id-mock",
                name: "Usuário mock",
                email: "mock@teste.com",
                password: "senhaNovaMock",
                role: "mock",
                created_at: "data mockada",
                updated_at: new Date().toString()
            }
            const response: ChangeUsersPasswordOutput = await usersBusiness.changeUsersPassword(inputMock)
            expect(response.message)
                .toBe(`A senha da conta foi atualizada com sucesso.`)
            expect(response.userUpdated)
                .toStrictEqual(userUpdatedMock)
        })
})