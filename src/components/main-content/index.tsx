import { Button, Container, createStyles, Divider, Grid, makeStyles, Theme, Typography } from '@material-ui/core'
import { ExamsTable } from '../table';
import InstitutionCard from '../insitution-card';
import React, { useEffect } from 'react';
import NewExamForm from '../new-exam-form';
import { api } from '../../services/axios/api';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginTop: 80
    },
    InstitutionCard: {
        margin: theme.spacing(3, 0)
    },
    typography: {
      textAlign: 'center'
    }
  })
);

type HealthcareInstitution = {
  id: number,
  name: string,
  cnpj: string,
  pixeonCoins: number
}

export default function Content() {
    const[institutionValue, setInstitutionValue] = React.useState('');
    const[institutionsValues, setInstitutionsValues] = React.useState<HealthcareInstitution[]>([]);
    const[singleData, setSingleData] = React.useState({} as HealthcareInstitution);
    const[openForm, setOpenForm] = React.useState(false);
    
    React.useEffect(() => {
      api.get('healthcareinstitutions').then((response) => {
          setInstitutionsValues(response.data);
      });
  }, []);

    const handleOpenForm = () => {
      setOpenForm(true);
    }

    const handleCloseForm = () => {
      setOpenForm(false);
    }
    
    const classes = useStyles();

    useEffect(() => {
      if(institutionValue !== '') {
        api.get(`healthcareinstitutions/${institutionValue}`).then((response) => {
          setSingleData(response.data)
          console.log(singleData)
        });
      }
      }, [institutionValue])


    if(!singleData) {
      return(
        <InstitutionCard setInstitution={setInstitutionValue} institutions={institutionsValues}/> 
      );
    }

    return(
        
        <Container className={classes.content}>
        <InstitutionCard setInstitution={setInstitutionValue} institutions={institutionsValues}/>
        <Grid>
        {institutionValue !== '' ? <><ExamsTable healthcareInstitutions={singleData}/>
        <Button variant="contained" color="primary" className={classes.InstitutionCard} onClick={handleOpenForm}>New Exam</Button>
        </> : <Typography variant="h4" className={classes.typography}>Welcome to exams software! try to request or create new exams just selecting one Institution!</Typography>}
        </Grid>
        <Grid>
        {openForm? <NewExamForm closeForm={handleCloseForm} institutions={institutionsValues}/> : null}
        </Grid>
        </Container>
    ) 
};
