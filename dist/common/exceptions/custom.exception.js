"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessException = void 0;
const common_1 = require("@nestjs/common");
class BusinessException extends common_1.HttpException {
    details;
    issues;
    constructor(message, details, issues, statusCode = common_1.HttpStatus.BAD_REQUEST) {
        super({
            message,
            details,
            issues,
        }, statusCode);
        this.details = details;
        this.issues = issues;
    }
}
exports.BusinessException = BusinessException;
//# sourceMappingURL=custom.exception.js.map