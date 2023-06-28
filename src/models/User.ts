export class User {

    constructor(
        public id: string,
        public name: string,
        public email: string,
        public password: string,
        public role: string,
        public createdAt: string,
        public updatedAt: string | undefined,
    ) {}
    
    public getUserId() {
        return this.id
    }
    
    public getUserName() {
        return this.name
    }
    
    public getUserEmail() {
        return this.email
    }
    
    public getUserPassword() {
        return this.password
    }
    
    public getUserRole() {
        return this.role
    }

    public getUserCreatedAt() {
        return this.createdAt
    }
    
    public getUserUpdatedAt() {
        return this.updatedAt
    }

    public setUserId(newId: string) {
        this.id = newId
    }    

    public setUserName(newName: string) {
        this.name = newName
    }    

    public setUserEmail(newEmail: string) {
        this.email = newEmail
    }    

    public setUserPassword(newPassword: string) {
        this.password = newPassword
    }    

    public setUserRole(newRole: string) {
        this.role = newRole
    }
    
    public setUserCreatedAt(newCreatedAt: string) {
        this.createdAt = newCreatedAt
    }    

    public setUserUpdatedAt(newUpdatedAt: string) {
        this.updatedAt = newUpdatedAt
    }    

}