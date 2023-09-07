import { BaseError } from "./BaseError";
export class UnauthorizedError extends BaseError {
    constructor(
        message: string = "Usuário desautorizado."
    ) {
        super(
            401,
            message
            )
    }
}