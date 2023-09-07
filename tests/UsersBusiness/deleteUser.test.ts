import { UsersBusiness } from '../../src/business/UsersBusiness'
import {
    DeleteUserInput,
    DeleteUserOutput,
    UsersDTO
} from '../../src/dtos/UsersDTO'
import { UsersDatabaseMock } from '../mocks/UsersDatabaseMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { HashManagerMock } from '../mocks/HashManagerMock'
import { TokenManagerAdminMock } from '../mocks/TokenManagerAdminMock'
import { userDB } from '../../src/types'

describe("deleteUser", () => {
    const usersBusiness = new UsersBusiness(
        new UsersDatabaseMock(),
        new UsersDTO(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new TokenManagerAdminMock()
    )
    test("deve retornar de sucesso de deleção da conta do usuário",
        async () => {
            const userTokenMock = 'token-mock'
            const input: DeleteUserInput = { userToken: userTokenMock }
            const response: DeleteUserOutput = await usersBusiness.deleteUser(input)
            const userDeletedMock: userDB = {
                id: "user-id-mock",
                name: "Usuário mock",
                email: "mock@teste.com",
                password: "senhaMockada-hash",
                role: "mock",
                created_at: "data mockada",
                updated_at: "nunca!"
            }
            expect(response.message)
                .toBe(`A conta foi deletada com sucesso.`)
            expect(response.userDeleted)
                .toStrictEqual(userDeletedMock)
        })
})