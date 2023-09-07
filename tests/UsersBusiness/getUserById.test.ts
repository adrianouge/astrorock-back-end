import { UsersBusiness } from '../../src/business/UsersBusiness'
import {
    GetUserByIdInput,
    GetUserByIdOutput,
    UsersDTO
} from '../../src/dtos/UsersDTO'
import { UsersDatabaseMock } from '../mocks/UsersDatabaseMock'
import { IdGeneratorMock } from '../mocks/IdGeneratorMock'
import { HashManagerMock } from '../mocks/HashManagerMock'
import { TokenManagerAdminMock } from '../mocks/TokenManagerAdminMock'

describe("getUserById", () => {
    const usersBusiness = new UsersBusiness(
        new UsersDatabaseMock(),
        new UsersDTO(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new TokenManagerAdminMock()
    )
    test("deve retornar mensagem com usuário encontrado por id",
        async () => {
            const userTokenMock = "token-mock"
            const userIdMock = "usuario-id-mock"
            const inputMock: GetUserByIdInput = {
                userToken: userTokenMock,
                idSearched: userIdMock
            }
            const response: GetUserByIdOutput = await usersBusiness.getUserById(inputMock)
            expect(response.message)
                .toBe(`Usuário encontrado: ${{
                    id: "user-id-mock",
                    name: "Usuário mock",
                    email: "mock@teste.com",
                    password: "senhaMockada-hash",
                    role: "Admin",
                    createdAt: "data mockada",
                    updatedAt: "nunca!"
                }}`)
        })
})