import * as Yup from 'yup'
import { string } from 'yup/lib/locale'

export const HealthcareInstitutionSchema = Yup.object().shape({
    name: Yup.string().required("Institution's name is required!"),
    cnpj: Yup.string().required("Institution's cnpj is required")
});

export const ExamSchema = Yup.object().shape({
    procedureName: Yup.string().required("Procedure name is required!").min(3, 'At least 3 characters is required!').max(100, 'Maximum of 100 characters'),
    patientName: Yup.string().required("Patient's name is required!").min(3, 'At least 3 characters is required!').max(100, 'Maximum of 100 characters'),
    patientAge: Yup.number().required("Patient's age is required"),
    patientGender: Yup.number().required("Patient's gender is required"),
    physicianName: Yup.string().required("Physician's name is required!").min(3, 'At least 3 characters is required!').max(100, 'Maximum of 100 characters'),
    physicianCRM: Yup.string().required("Physician's CRM is required!"),
    healthcareInstitutionId: Yup.number().required("Healthcare Institution is Required")
})