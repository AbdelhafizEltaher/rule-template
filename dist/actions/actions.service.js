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
exports.ActionsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const action_schema_1 = require("./schemas/action.schema");
let ActionsService = class ActionsService {
    actionModel;
    constructor(actionModel) {
        this.actionModel = actionModel;
    }
    async create(action) {
        const createdAction = new this.actionModel(action);
        return createdAction.save();
    }
    async findAll() {
        return this.actionModel.find().exec();
    }
    async findOne(id) {
        return this.actionModel.findOne({ id }).exec();
    }
    async deleteAll() {
        const result = await this.actionModel.deleteMany({}).exec();
        return { deletedCount: result.deletedCount };
    }
    async createMany(actions) {
        return this.actionModel.insertMany(actions);
    }
    async findByRuleId(ruleId) {
        return this.actionModel.find({ ruleId }).exec();
    }
};
exports.ActionsService = ActionsService;
exports.ActionsService = ActionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(action_schema_1.Action.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ActionsService);
//# sourceMappingURL=actions.service.js.map