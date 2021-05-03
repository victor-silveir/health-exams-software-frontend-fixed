import { FormControl, Grid, Theme, makeStyles, TextField, createStyles, Button, Box } from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";

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
        defaultValues: inicialValues
    });
    const classes = useStyles();

    return (
        <form onSubmit={handleSubmit((values) => {
            console.log(values)
        })}>
            <Box width="100%" className={classes.div}>
                <Grid container>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => <TextField
                            className={classes.inputSpace}
                            helperText="Institution's name"
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
                                className={classes.inputSpace}
                                helperText="Institution's cnpj"
                                id="institutionCnpj"
                                label="CNPJ*: "
                                variant="outlined"
                                {...field} />}
                    />
                </Grid>
            </Box>
            <Box width="100%" className={classes.div}>
                <Button type="submit">Save</Button>
                <Button>Cancel</Button>
            </Box>
        </form>
    );
};