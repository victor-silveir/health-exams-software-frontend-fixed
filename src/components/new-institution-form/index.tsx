import { FormControl, Grid, Theme, makeStyles, TextField, createStyles, Button, Box } from "@material-ui/core";
import React from "react";

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

export default function NewInstitutionForm() {

    const classes = useStyles();

    return(
        <form>
            <Box width="100%" className={classes.div}>
        <Grid container>            
        <TextField className={classes.inputSpace} helperText="Institution's name" id="institutionName" name="name" label="Name*: " variant="outlined"/>
        <TextField className={classes.inputSpace} helperText="Institution's cnpj" id="institutionCnpj" name="cnpj" label="CNPJ*: " variant="outlined"/>
        </Grid>
            </Box>
        <Box width="100%" className={classes.div}>
            <Button>Save</Button>
            <Button>Cancel</Button>
        </Box>
        </form>
    );
};