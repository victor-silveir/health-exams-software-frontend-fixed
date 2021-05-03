import { Button, Card, createStyles, FormControl, InputLabel, makeStyles, MenuItem, Select, Typography, Theme, Grid, Box, Divider } from "@material-ui/core";
import React, { Dispatch, SetStateAction } from "react";
import { GetAll } from "../../services/axios/api";
import NewInstitutionForm from "../new-institution-form";

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

type HealthcareInstitution = {
    id: number,
    name: string,
    cnpj: string,
    pixeonCoins: number
}

type CardProps = {
    setInstitution: Dispatch<SetStateAction<string>>
}

export default function InstitutionCard(props: CardProps) {
    const [isInstitutionEmpty, setInstitutionEmpty] = React.useState('');
    const [openForm, setOpenForm] = React.useState(false);
    const {data} = GetAll<HealthcareInstitution[]>('healthcareinstitutions');
    const {data: singledata} = GetAll<HealthcareInstitution>(`healthcareinstitutions/${isInstitutionEmpty}`)
    const classes = useStyles();

    if(!data || !singledata) {
        return(<></>);
    }

    const handleOpenForm = () => {
        setOpenForm(!openForm);
    }

    return (
        <>
        <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12} sm={5} container alignItems="center">          
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
                    {data.map((institution, index) => {
                        return (
                            <MenuItem key={index} value={institution.id}>{institution.name}</MenuItem>
                            )
                        })}
                </Select>
            </FormControl>
            <Typography variant="h6">
                Or Create a new institution!
            </Typography>
            <Button variant="contained" className={classes.institutionButton} onClick={handleOpenForm}>
                <Typography variant="button">
                    New Institution
                </Typography>
            </Button>
        </Box>

            </Grid>
        {isInstitutionEmpty !== '' ? 
        <Grid item xs={12} sm={7} container direction="row" alignItems="center" spacing={1}>
            <Grid container direction="column" item xs={12} sm={6}>
                <Typography variant="h5">
                    Institution: <span>{singledata.name}</span>
                </Typography>
                <Typography>
                    CNPJ: <span>{singledata.cnpj}</span>
                </Typography>
            </Grid>
            <Grid container direction="row" item xs={12} sm={6}>
                <Typography>
                    Pixeon Coins: <span>{singledata.pixeonCoins}</span>
                </Typography>
            </Grid>
        </Grid> : <></>
    }
        </Grid>
        {openForm? <NewInstitutionForm /> : <></>}
        <Divider className={classes.root}/>
        </>
    )
}