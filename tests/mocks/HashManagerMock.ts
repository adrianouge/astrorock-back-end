export class HashManagerMock {
    public hash = async(plaintext: string): Promise<string> => {
        return `${plaintext}-hashed`
    }
    public compare = async(hashedPassword: string): Promise<boolean> => {
        return hashedPassword.includes("-hashed")
    }
}