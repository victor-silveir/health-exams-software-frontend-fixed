import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, createStyles, Grid, makeStyles, MenuItem, TextField, Theme, Typography } from "@material-ui/core";
import React, { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { api } from "../../services/axios/api";
import { ExamSchema } from "../../services/validation/YupSchemas";

const institutions = [
    { name: 'Hemocentro', cnpj: '123456' },
    { name: 'Sabin', cnpj: '123456' },
    { name: 'Laboratórios Exame', cnpj: '123456' },
    { name: 'Laboratório Maria do Carmo', cnpj: '123456' },
    { name: 'Lab 1', cnpj: '123456' },
]
type HealthcareInstitution = {
    id: number,
    name: string,
    cnpj: string,
    pixeonCoins: number
  }

const useStyles = makeStyles((theme: Theme) => createStyles({
    inputSpace: {
        width: 500,
        margin: theme.spacing(1, 2)
    },
    div: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    typographSpace: {
        margin: theme.spacing(3, 0)
    }
}),
);

const inicialValues = {
    procedureName: '',
    patientName: '',
    patientAge: 0,
    patientGender: '',
    physicianName: '',
    physicianCRM: '',
    healthcareInstitutionId: ''
}

type NewExamProps = {
    closeForm: Dispatch<SetStateAction<string>>,
    institutions: HealthcareInstitution[]
}

export default function NewExamForm(props: NewExamProps) {

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: inicialValues,
        resolver: yupResolver(ExamSchema)
    });
    const classes = useStyles();

    return (
        <form onSubmit={handleSubmit((values) => {console.log(values)
            api.post(`exams`, {data: values}).then(() => {
            alert('Congratulations! New Exam was saved!')
            window.location.reload(false);
        }).catch(() => {
            alert('Oops, something went wrong, try again later!')
        })})}>
            <Box width="100%">
                <Typography variant="h6" className={classes.typographSpace}>Procedure Name:</Typography>
                <Controller
                    name="procedureName"
                    control={control}
                    render={({field}) => <TextField
                        error={errors.procedureName? true : false}
                        className={classes.inputSpace}
                        helperText={errors.procedureName?.message}
                        id="ProcedureName"
                        label="Procedure Name*: "
                        variant="outlined"
                        {...field} />}
                />
                
                <Typography variant="h6" className={classes.typographSpace}>Patient:</Typography>
                <Grid container>
                <Controller
                        name="patientName"
                        control={control}
                    render={({field}) =>
                    <TextField
                    error={errors.patientName? true : false}
                        className={classes.inputSpace}
                        helperText={errors.patientName?.message}
                        id="PatientName"
                        label="Name*: "
                        variant="outlined" 
                        {...field}
                        />}
                        />
                    <Controller
                        name="patientAge"
                        control={control}
                    render={({field}) =>
                    <TextField
                    error={errors.patientAge? true : false}
                        className={classes.inputSpace}
                        helperText={errors.patientAge?.message}
                        id="PatientAge"
                        label="Age*: "
                        variant="outlined" 
                        {...field}/>}
                        />
                    <Controller
                        name="patientGender"
                        control={control}
                    render={({field}) =>
                    <TextField
                    error={errors.patientGender? true : false}
                        className={classes.inputSpace}
                        select
                        type="select"
                        helperText={errors.patientGender?.message}
                        id="PatientGender"
                        label="Gender*: "
                        variant="outlined"
                        {...field}>
                        <MenuItem value={-1}><em>...</em></MenuItem>
                        <MenuItem value={0}>Male</MenuItem>
                        <MenuItem value={1}>Female</MenuItem>
                    </TextField>}
                    />
                </Grid>
                <Typography variant="h6" className={classes.typographSpace}>Physician: </Typography>
                <Grid container>
                <Controller
                        name="physicianName"
                        control={control}
                    render={({field}) =>
                    <TextField
                    error={errors.physicianName? true : false}
                        className={classes.inputSpace}
                        helperText={errors.physicianName?.message}
                        id="PhysicianName"
                        label="Physician Name*: "
                        variant="outlined" 
                        {...field}/>}
                        />
                        <Controller
                        name="physicianCRM"
                        control={control}
                    render={({field}) =>
                    <TextField
                    error={errors.physicianCRM? true : false}
                        className={classes.inputSpace}
                        helperText={errors.physicianCRM?.message}
                        id="PhysicianCRM"
                        label="Physician CRM*: "
                        variant="outlined" 
                        {...field}/>}
                        />
                </Grid>
                <Typography variant="h6" className={classes.typographSpace}>Healthcare Institution: </Typography>
                <Controller
                    name="healthcareInstitutionId"
                    control={control}
                    render={({field}) =>
                <TextField
                error={errors.healthcareInstitutionId? true : false}
                    className={classes.inputSpace}
                    select
                    type="select"
                    helperText={errors.healthcareInstitutionId?.message}
                    id="healthcareInstitution"
                    label="Institution*: "
                    variant="outlined"
                    {...field}>
                    <MenuItem value={''}><em>...</em></MenuItem>
                    {props.institutions.map((institution, index) => {
                        return (
                            <MenuItem key={index} value={institution.id}>{institution.name}</MenuItem>
                        )
                    })}
                </TextField>}
                />
                <Box width="100%" className={classes.div}>
                    <Button type="submit">Save</Button>
                    <Button onClick={() => props.closeForm}>Cancel</Button>
                </Box>
            </Box>
        </form >
    );
};