import { ActionsService } from './actions.service';
import { Action } from './schemas/action.schema';
export declare class ActionsController {
    private readonly actionsService;
    constructor(actionsService: ActionsService);
    create(action: Action): Promise<Action>;
    createMany(actions: Action[]): Promise<Action[]>;
    findAll(): Promise<Action[]>;
    findOne(id: string): Promise<Action | null>;
    deleteAll(): Promise<{
        deletedCount: number;
    }>;
}
