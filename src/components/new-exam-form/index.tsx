import { Box, Button, createStyles, Grid, makeStyles, MenuItem, TextField, Theme, Typography } from "@material-ui/core";
import React from "react";

const institutions = [
    { name: 'Hemocentro', cnpj: '123456' },
    { name: 'Sabin', cnpj: '123456' },
    { name: 'Laboratórios Exame', cnpj: '123456' },
    { name: 'Laboratório Maria do Carmo', cnpj: '123456' },
    { name: 'Lab 1', cnpj: '123456' },
]

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

export default function NewExamForm() {

    const [institutionValue, setInstitutionValue] = React.useState('');
    const classes = useStyles();

    return (
        <form>
            <Box width="100%">
                <Typography variant="h6" className={classes.typographSpace}>Procedure Name:</Typography>
                <TextField className={classes.inputSpace} helperText="Procedure name" id="ProcedureName" name="procedureName" label="Procedure Name*: " variant="outlined" />
                <Typography variant="h6" className={classes.typographSpace}>Patient:</Typography>
                <Grid container>
                    <TextField className={classes.inputSpace} helperText="Patient's name" id="PatientName" name="patientName" label="Name*: " variant="outlined" />
                    <TextField className={classes.inputSpace} helperText="Patient's age" id="PatientAge" name="patientAge" label="Age*: " variant="outlined" />
                    <TextField
                        className={classes.inputSpace}
                        select
                        type="select"
                        helperText="Patient's Gender"
                        id="PatientGender"
                        name="patientGender"
                        label="Gender*: "
                        variant="outlined"
                        value={institutionValue}
                    >
                        <MenuItem value={''}><em>...</em></MenuItem>
                        <MenuItem value={1}>Male</MenuItem>
                        <MenuItem value={2}>Female</MenuItem>
                    </TextField>
                </Grid>
                <Typography variant="h6" className={classes.typographSpace}>Physician: </Typography>
                <Grid container>
                    <TextField className={classes.inputSpace} helperText="Physician's name" id="PhysicianName" name="physicianName" label="Physician Name*: " variant="outlined" />
                    <TextField className={classes.inputSpace} helperText="Physician's CRM" id="PhysicianCRM" name="physicianCRM" label="Physician CRM*: " variant="outlined" />
                </Grid>
                <Typography variant="h6" className={classes.typographSpace}>Healthcare Institution: </Typography>
                <TextField
                    className={classes.inputSpace}
                    select
                    type="select"
                    helperText="Institution"
                    id="healthcareInstitution"
                    name="healthcareInstitutionId"
                    label="Institution*: "
                    variant="outlined"
                    value={institutionValue}
                    onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                        const selectValue = event.target.value
                        setInstitutionValue(selectValue as string);
                    }}>
                    <MenuItem value={''}><em>...</em></MenuItem>
                    {institutions.map((institution, index) => {
                        return (
                            <MenuItem key={index} value={institution.name}>{institution.name}</MenuItem>
                        )
                    })}
                </TextField>
                <Box width="100%" className={classes.div}>
                    <Button>Save</Button>
                    <Button>Cancel</Button>
                </Box>  
            </Box>
        </form >
    );
};