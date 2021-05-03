export type UpdateExamType = {
    id: number,
    procedureName: string,
    patientName: string,
    patientAge: number,
    patientGender: number,
    physicianName: string,
    physicianCRM: string,
};

export type PostExamType = {
    id: number,
    procedureName: string,
    patientName: string,
    patientAge: number,
    patientGender: number,
    physicianName: string,
    physicianCRM: string,
    healthcareInstitutionId: number
};

export type GetExamdataType = {
    id: number,
    procedureName: string,
    patientName: string,
    patientAge: number,
    patientGender: string,
    physicianName: string,
    physicianCRM: string,
    requested: boolean
};

export type GetExamdataByInstitutionType = {
    id: number,
    procedureName: string,
    patientName: string,
    requested: boolean,
};