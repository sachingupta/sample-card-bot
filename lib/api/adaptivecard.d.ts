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
    status: string;
    appointmentDate: string;
}
export declare const getCustomAdaptiveCardPatient: (patient: IPatient) => import("botframework-schema").Attachment;
