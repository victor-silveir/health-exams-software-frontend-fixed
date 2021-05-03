import { FormControl, Grid, Theme, makeStyles, TextField, createStyles, Button, Box } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import { HealthcareInstitutionSchema } from "../../services/validation/YupSchemas";
import { api } from "../../services/axios/api";

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
}),
);

const inicialValues = {
    name: '',
    cnpj: ''
}

export default function NewInstitutionForm() {

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: inicialValues,
        resolver: yupResolver(HealthcareInstitutionSchema)

    });
    const classes = useStyles();

    return (
        <form onSubmit={handleSubmit((values) => {
            api.post('healthcareinstitutions', {data: values}).then(() => {
                alert("Congratulations! The Healthcare Institution was saved")
            }).catch(() => {
                alert("Oops! Something went wrong, try again later!")
            })
        })}>
            <Box width="100%" className={classes.div}>
                <Grid container>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => <TextField
                            error={errors.name? true : false}
                            className={classes.inputSpace}
                            helperText={errors.name?.message}
                            id="institutionName"
                            label="Name*: "
                            variant="outlined"
                            {...field} />}
                    />
                    <Controller
                        name="cnpj"
                        control={control}
                        render={({ field }) =>
                            <TextField
                                error={errors.cnpj? true : false}
                                helperText={errors.cnpj?.message}
                                className={classes.inputSpace}
                                id="institutionCnpj"
                                label="CNPJ*: "
                                variant="outlined"
                                {...field} />}
                    />
                </Grid>
            </Box>
            <Box width="100%" className={classes.div}>
                <Button variant="contained" color="primary" size="large" type="submit">Save</Button>
            </Box>
        </form>
    );
};