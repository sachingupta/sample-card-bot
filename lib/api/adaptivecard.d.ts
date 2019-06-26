export declare const adaptiveCardBody: string;
export interface IPatient {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    patientNumber: string;
    emergencyContact: string;
    doctor: string;
    bloodType: string;
    admissionDate: string;
    diagnosis: string;
}
export declare const createAdaptiveCard: (patient: IPatient) => {
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
