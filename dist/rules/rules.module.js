"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RulesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const rule_schema_1 = require("./schemas/rule.schema");
const rules_service_1 = require("./rules.service");
const rules_controller_1 = require("./rules.controller");
const actions_module_1 = require("../actions/actions.module");
const tickets_module_1 = require("../tickets/tickets.module");
let RulesModule = class RulesModule {
};
exports.RulesModule = RulesModule;
exports.RulesModule = RulesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: rule_schema_1.Rule.name, schema: rule_schema_1.RuleSchema }]),
            actions_module_1.ActionsModule,
            tickets_module_1.TicketsModule,
        ],
        controllers: [rules_controller_1.RulesController],
        providers: [rules_service_1.RulesService],
        exports: [rules_service_1.RulesService],
    })
], RulesModule);
//# sourceMappingURL=rules.module.js.map