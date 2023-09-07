import { UsersBusiness } from '../../src/business/UsersBusiness'
import {
    ChangeUsersEmailInput,
    ChangeUsersEmailOutput,
    UsersDTO
} from '../../src/dtos/UsersDTO'
import { UsersDatabaseMock } from '../mocks/UsersDatabaseMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { HashManagerMock } from '../mocks/HashManagerMock'
import { TokenManagerNormalMock } from '../mocks/TokenManagerNormalMock'
import { userDB } from '../../src/types'

describe("changeUsersEmail", () => {
    const usersBusiness = new UsersBusiness(
        new UsersDatabaseMock(),
        new UsersDTO(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new TokenManagerNormalMock()
    )
    test("deve retornar mensagem de sucesso de troca de e-mail do usuário",
        async () => {
            expect.assertions(2)
            const userTokenMock = 'token-mock'
            const newEmailMock = 'mocknovo@teste.com'
            const inputMock: ChangeUsersEmailInput = {
                userToken: userTokenMock,
                newEmail: newEmailMock
            }
            const userUpdatedMock: userDB = {
                id: "user-id-mock",
                name: "Usuário mock",
                email: "mocknovo@teste.com",
                password: "senhaMockada-hash",
                role: "mock",
                created_at: "data mockada",
                updated_at: new Date().toString()
            }
            const response: ChangeUsersEmailOutput = await usersBusiness.changeUsersEmail(inputMock)
            expect(response.message)
                .toBe(`O e-mail da conta foi atualizada com sucesso.`)
            expect(response.userUpdated)
                .toStrictEqual(userUpdatedMock)
        })
})