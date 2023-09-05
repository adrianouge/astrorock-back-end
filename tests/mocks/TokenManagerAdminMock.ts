export interface TokenPayLoad {
    id: string,
    name: string,
    role: string
}

export class TokenManagerAdminMock {
    public createToken = (payload: TokenPayLoad): string => {
        return "token-mock"
    }

    public getPayload = (userTokenMock: string): TokenPayLoad | null => {
        try {
            const payLoadMock: TokenPayLoad = {
                id: "usuario-id-mock",
                name: "Usuário admin mock",
                role: "Admin"
            }
            return payLoadMock
        }
        catch (error) {
            return null
        }
    }
}