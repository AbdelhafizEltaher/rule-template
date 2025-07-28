"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const actions_module_1 = require("./actions/actions.module");
const tickets_module_1 = require("./tickets/tickets.module");
const rules_module_1 = require("./rules/rules.module");
const email_module_1 = require("./email/email.module");
const config_1 = require("@nestjs/config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot("mongodb+srv://abdelhafizeltaher98:2cnbIrzeNA22vRWe@cluster0.4corqcq.mongodb.net/"),
            actions_module_1.ActionsModule,
            tickets_module_1.TicketsModule,
            rules_module_1.RulesModule,
            email_module_1.EmailModule,
            config_1.ConfigModule.forRoot(),
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map