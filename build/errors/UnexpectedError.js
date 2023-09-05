"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnexpectedError = void 0;
const BaseError_1 = require("./BaseError");
class UnexpectedError extends BaseError_1.BaseError {
    constructor(message = "Erro inesperado ocorreu..") {
        super(500, message);
    }
}
exports.UnexpectedError = UnexpectedError;
//# sourceMappingURL=UnexpectedError.js.map