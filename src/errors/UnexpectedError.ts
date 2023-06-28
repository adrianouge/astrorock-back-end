import { BaseError } from "./BaseError";


export class UnexpectedError extends BaseError {
    constructor(
        message: string = "Erro inesperado ocorreu.."
    ) {
        super(500, message)
    }
}