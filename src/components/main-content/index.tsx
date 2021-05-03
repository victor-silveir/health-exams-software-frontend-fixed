import { Container, createStyles, Divider, Grid, makeStyles, Theme } from '@material-ui/core'
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
        marginBottom: theme.spacing(3, 0)
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
    const[singleData, setSingleData] = React.useState({} as HealthcareInstitution);
    
    const classes = useStyles();

    useEffect(() => {
      api.get(`healthcareinstitutions/${institutionValue}`).then((response) => {
        setSingleData(response.data)
      });
    }, [institutionValue])


    if(!singleData) {
      return(
        <InstitutionCard setInstitution={setInstitutionValue}/> 
      );
    }

    return(
        
        <Container className={classes.content}>
        <InstitutionCard setInstitution={setInstitutionValue}/>
        <Grid>
        {institutionValue !== '' ? <ExamsTable healthcareInstitutions={singleData}/> : <div>ops</div>}
        </Grid>
        <NewExamForm />
        </Container>
    ) 
};
