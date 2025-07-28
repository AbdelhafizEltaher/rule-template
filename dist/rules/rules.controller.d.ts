import { RulesService } from './rules.service';
import { Rule } from './schemas/rule.schema';
export declare class RulesController {
    private readonly rulesService;
    constructor(rulesService: RulesService);
    create(rule: Rule): Promise<Rule>;
    findAll(): Promise<Rule[]>;
    findOne(id: string): Promise<Rule | null>;
    deleteAll(): Promise<{
        deletedCount: number;
    }>;
}
