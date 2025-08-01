"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RulesController = void 0;
const common_1 = require("@nestjs/common");
const rules_service_1 = require("./rules.service");
const rule_schema_1 = require("./schemas/rule.schema");
let RulesController = class RulesController {
    rulesService;
    constructor(rulesService) {
        this.rulesService = rulesService;
    }
    create(rule) {
        return this.rulesService.create(rule);
    }
    findAll() {
        return this.rulesService.findAll();
    }
    findOne(id) {
        return this.rulesService.findOne(id);
    }
    deleteAll() {
        return this.rulesService.deleteAll();
    }
};
exports.RulesController = RulesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [rule_schema_1.Rule]),
    __metadata("design:returntype", void 0)
], RulesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RulesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RulesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RulesController.prototype, "deleteAll", null);
exports.RulesController = RulesController = __decorate([
    (0, common_1.Controller)('rules'),
    __metadata("design:paramtypes", [rules_service_1.RulesService])
], RulesController);
//# sourceMappingURL=rules.controller.js.map