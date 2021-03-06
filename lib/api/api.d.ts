import { Attachment } from 'botbuilder';
import * as teams from 'botbuilder-teams';
import { IPatient } from './adaptivecard';
export declare const handleQuery: (searchtext: string) => {
    preview: Attachment;
    contentType: string;
    contentUrl?: string;
    content?: any;
    name?: string;
    thumbnailUrl?: string;
}[];
export declare const createPreviewList: (items: IPatient[]) => {
    preview: Attachment;
    contentType: string;
    contentUrl?: string;
    content?: any;
    name?: string;
    thumbnailUrl?: string;
}[];
export declare const getCustomAdaptiveCard: (body: string) => Attachment;
export declare const getCustomAdaptiveCard2: (body: string) => Attachment;
export declare const getAdaptiveCard: () => Attachment;
export declare const taskModuleResponse: (query: any, done: boolean) => teams.TaskModuleResponseBase;
export declare const taskModuleResponseCard: (data: any, textValue?: string) => Attachment;
