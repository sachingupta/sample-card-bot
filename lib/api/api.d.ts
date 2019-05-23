import { Attachment } from 'botbuilder';
import * as teams from 'botbuilder-teams';
export declare const handleQuery: (searchtext: string) => any[];
export declare const createPreviewList: (items: any[], heroCard: any) => any[];
export declare const getCustomAdaptiveCard: (body: string) => Attachment;
export declare const getAdaptiveCard: () => Attachment;
export declare const taskModuleResponse: (query: any, done: boolean) => teams.TaskModuleResponseBase;
export declare const taskModuleResponseCard: (data: any, textValue?: string) => Attachment;
