import { BaseError } from "./BaseError";
export class NotFoundError extends BaseError {
    constructor(
        message: string = "Nenhuma informação foi encontrada."
    ) {
        super(
            404,
            message
        )
    }
}