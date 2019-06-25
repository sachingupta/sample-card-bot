import { Attachment } from 'botbuilder';
import * as teams from 'botbuilder-teams';
import { IPatient } from './adaptivecard';
export declare const handleQuery: (searchtext: string) => {
    content: {
        "type": string;
        "body": ({
            "type": string;
            "items": ({
                "type": string;
                "size": string;
                "weight": string;
                "text": string;
                "columns"?: undefined;
            } | {
                "type": string;
                "columns": ({
                    "type": string;
                    "items": {
                        "type": string;
                        "style": string;
                        "url": string;
                        "size": string;
                    }[];
                    "width": string;
                } | {
                    "type": string;
                    "items": ({
                        "type": string;
                        "weight": string;
                        "text": string;
                        "wrap": boolean;
                        "spacing"?: undefined;
                        "isSubtle"?: undefined;
                    } | {
                        "type": string;
                        "spacing": string;
                        "text": string;
                        "isSubtle": boolean;
                        "wrap": boolean;
                        "weight"?: undefined;
                    })[];
                    "width": string;
                })[];
                "size"?: undefined;
                "weight"?: undefined;
                "text"?: undefined;
            })[];
        } | {
            "type": string;
            "items": ({
                "type": string;
                "text": string;
                "wrap": boolean;
                "facts"?: undefined;
            } | {
                "type": string;
                "facts": {
                    "title": string;
                    "value": string;
                }[];
                "text"?: undefined;
                "wrap"?: undefined;
            })[];
        })[];
        "actions": {
            "type": string;
            "title": string;
            "url": string;
        }[];
        "$schema": string;
        "version": string;
    };
    contentType: string;
    preview: Attachment;
}[];
export declare const createPreviewList: (items: IPatient[]) => {
    content: {
        "type": string;
        "body": ({
            "type": string;
            "items": ({
                "type": string;
                "size": string;
                "weight": string;
                "text": string;
                "columns"?: undefined;
            } | {
                "type": string;
                "columns": ({
                    "type": string;
                    "items": {
                        "type": string;
                        "style": string;
                        "url": string;
                        "size": string;
                    }[];
                    "width": string;
                } | {
                    "type": string;
                    "items": ({
                        "type": string;
                        "weight": string;
                        "text": string;
                        "wrap": boolean;
                        "spacing"?: undefined;
                        "isSubtle"?: undefined;
                    } | {
                        "type": string;
                        "spacing": string;
                        "text": string;
                        "isSubtle": boolean;
                        "wrap": boolean;
                        "weight"?: undefined;
                    })[];
                    "width": string;
                })[];
                "size"?: undefined;
                "weight"?: undefined;
                "text"?: undefined;
            })[];
        } | {
            "type": string;
            "items": ({
                "type": string;
                "text": string;
                "wrap": boolean;
                "facts"?: undefined;
            } | {
                "type": string;
                "facts": {
                    "title": string;
                    "value": string;
                }[];
                "text"?: undefined;
                "wrap"?: undefined;
            })[];
        })[];
        "actions": {
            "type": string;
            "title": string;
            "url": string;
        }[];
        "$schema": string;
        "version": string;
    };
    contentType: string;
    preview: Attachment;
}[];
export declare const getCustomAdaptiveCard: (body: string) => Attachment;
export declare const getCustomAdaptiveCard2: (body: string) => Attachment;
export declare const getAdaptiveCard: () => Attachment;
export declare const taskModuleResponse: (query: any, done: boolean) => teams.TaskModuleResponseBase;
export declare const taskModuleResponseCard: (data: any, textValue?: string) => Attachment;
