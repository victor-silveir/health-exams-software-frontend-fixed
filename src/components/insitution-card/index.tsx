import { Button, Card, createStyles, FormControl, InputLabel, makeStyles, MenuItem, Select, Typography, Theme, Grid, Box, Divider } from "@material-ui/core";
import React, { Dispatch, SetStateAction } from "react";
import { api, GetAll } from "../../services/axios/api";
import NewInstitutionForm from "../new-institution-form";

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
        margin: theme.spacing(2, 0)
    },

})
);

type HealthcareInstitution = {
    id?: number,
    name: string,
    cnpj: string,
    pixeonCoins?: number
}

type CardProps = {
    setInstitutionValue: Dispatch<SetStateAction<number>>,
    setInstitution: Dispatch<SetStateAction<any>>,
    institutions: HealthcareInstitution[]
}

export default function InstitutionCard(props: CardProps) {
    const [data, setData] = React.useState<HealthcareInstitution[]>([]);
    const [singleData, setSingleData] = React.useState<HealthcareInstitution>({} as HealthcareInstitution)
    const [isInstitutionEmpty, updateInstitutionValue] = React.useState(0);
    
    React.useEffect(() => {
        setData(props.institutions);
    });
    
    const [openForm, setOpenForm] = React.useState(false);
    
    const classes = useStyles();

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
                    props.setInstitutionValue(selectValue as number);
                    updateInstitutionValue(selectValue as number);
                    api.get(`healthcareinstitutions/${selectValue}`).then((response) => {
                        setSingleData(response.data);
                        props.setInstitution(response.data);
                    })
                }}>
                    <MenuItem value={0}><em>...</em></MenuItem>
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
            <Button variant="contained" color="primary" className={classes.institutionButton} onClick={handleOpenForm}>
                <Typography variant="button">
                    New Institution
                </Typography>
            </Button>
        </Box>

            </Grid>
        {isInstitutionEmpty? 
        <Grid item xs={12} sm={7} container direction="row" alignItems="center" spacing={1}>
            <Grid container direction="column" item xs={12} sm={6}>
                <Typography variant="h5">
                    Institution: <span>{singleData.name}</span>
                </Typography>
                <Typography>
                    CNPJ: <span>{singleData.cnpj}</span>
                </Typography>
            </Grid>
            <Grid container direction="row" item xs={12} sm={6}>
                <Typography>
                    Pixeon Coins: <span>{singleData.pixeonCoins}</span>
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