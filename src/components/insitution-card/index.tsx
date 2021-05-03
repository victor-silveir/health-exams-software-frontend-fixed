import { Button, Card, createStyles, FormControl, InputLabel, makeStyles, MenuItem, Select, Typography, Theme, Grid, Box } from "@material-ui/core";
import React, { Dispatch, SetStateAction } from "react";

const institutions = [
    { name: 'Hemocentro', cnpj: '123456' },
    { name: 'Sabin', cnpj: '123456' },
    { name: 'Laboratórios Exame', cnpj: '123456' },
    { name: 'Laboratório Maria do Carmo', cnpj: '123456' },
    { name: 'Lab 1', cnpj: '123456' },
]

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        margin: theme.spacing(2, 0)
    },
    formControl: {
        margin: theme.spacing(2, 0),
        minWidth: 120,
    },
    institutionSelect: {
        width: 200,
    },
    institutionButton: {
        backgroundColor: 'red',
        margin: theme.spacing(2, 0)
    },

})
);

type CardProps = {
    setInstitution: Dispatch<SetStateAction<string>>
}

export default function InstitutionCard(props: CardProps) {
    const [isInstitutionEmpty, setInstitutionEmpty] = React.useState('');
    const classes = useStyles();

    return (
        <Grid container spacing={3} className={classes.root}>

        <Grid xs={12} sm={6} container alignItems="center">          
        <Box>
            <Typography>
                Select a Healthcare Institution:
        </Typography>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="institution">Institution</InputLabel>
                <Select id="institution" className={classes.institutionSelect} value={isInstitutionEmpty} label="Institution" onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                    const selectValue = event.target.value
                    setInstitutionEmpty(selectValue as string);
                    props.setInstitution(selectValue as string);
                }}>
                    <MenuItem value={''}><em>...</em></MenuItem>
                    {institutions.map((institution, index) => {
                        return (
                            <MenuItem key={index} value={institution.name}>{institution.name}</MenuItem>
                            )
                        })}
                </Select>
            </FormControl>
            <Typography variant="h6">
                Or Create a new institution!
            </Typography>
            <Button variant="contained" className={classes.institutionButton}>
                <Typography variant="button">
                    New Institution
                </Typography>
            </Button>
        </Box>

            </Grid>
        {isInstitutionEmpty !== '' ? 
        <Grid xs={12} sm={6} container direction="row" alignItems="center" spacing={1}>
            <Grid container direction="column" item xs={12} sm={6}>
                <Typography variant="h5">
                    Institution: <span>Sabin</span>
                </Typography>
                <Typography>
                    CNPJ: <span>2389109381</span>
                </Typography>
            </Grid>
            <Grid container direction="row" item xs={12} sm={6}>
                <Typography>
                    Pixeon Coins: <span>20</span>
                </Typography>
            </Grid>
        </Grid> : <></>
    }
        </Grid>
    )
}