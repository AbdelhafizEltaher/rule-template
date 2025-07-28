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
exports.RulesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const rule_schema_1 = require("./schemas/rule.schema");
const actions_service_1 = require("../actions/actions.service");
const tickets_service_1 = require("../tickets/tickets.service");
let RulesService = class RulesService {
    ruleModel;
    actionsService;
    ticketsService;
    constructor(ruleModel, actionsService, ticketsService) {
        this.ruleModel = ruleModel;
        this.actionsService = actionsService;
        this.ticketsService = ticketsService;
    }
    async create(ruleData) {
        const processActions = (actions) => {
            return actions.map((action) => ({
                ...action,
                id: new mongoose_2.Types.ObjectId(),
                responses: action.responses
                    ? Object.fromEntries(Object.entries(action.responses).map(([key, actions]) => [
                        key,
                        processActions(actions),
                    ]))
                    : {},
            }));
        };
        const ruleToCreate = {
            ...ruleData,
            id: new mongoose_2.Types.ObjectId(),
            thenConditions: ruleData.thenConditions
                ? processActions(ruleData.thenConditions)
                : [],
            elseConditions: ruleData.elseConditions
                ? processActions(ruleData.elseConditions)
                : [],
        };
        const createdRule = new this.ruleModel(ruleToCreate);
        const savedRule = await createdRule.save();
        return savedRule;
    }
    findActionsByRuleId(ruleId) {
        return this.actionsService.findByRuleId(ruleId);
    }
    async findAll() {
        return this.ruleModel.find().exec();
    }
    async findOne(id) {
        return this.ruleModel.findOne({ id }).exec();
    }
    async deleteAll() {
        const result = await this.ruleModel.deleteMany({}).exec();
        return { deletedCount: result.deletedCount };
    }
};
exports.RulesService = RulesService;
exports.RulesService = RulesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(rule_schema_1.Rule.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        actions_service_1.ActionsService,
        tickets_service_1.TicketsService])
], RulesService);
//# sourceMappingURL=rules.service.js.map