export interface TokenPayLoad {
    id: string,
    name: string,
    role: string
}

export class TokenManagerMock {
    public createToken = (payload: TokenPayLoad): string => {
        return "token-mock"
    }

    public getPayload = (userTokenMock: string): TokenPayLoad | undefined => {
        if (userTokenMock === "token-mock") {
            const payLoadMock: TokenPayLoad = {
                id: "id-mock",
                name: "Nome-mock",
                role: "mock"
            }
            return payLoadMock
        }
    }
}