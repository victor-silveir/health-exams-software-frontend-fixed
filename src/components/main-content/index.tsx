import { Container, createStyles, Divider, Grid, makeStyles, Theme } from '@material-ui/core'
import { ExamsTable } from '../table';
import InstitutionCard from '../insitution-card';
import React from 'react';
import NewExamForm from '../new-exam-form';

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

export default function Content() {
    const[institutionValue, setInstitutionValue] = React.useState('');
    const classes = useStyles()

    return(
        
        <Container className={classes.content}>
        <InstitutionCard setInstitution={setInstitutionValue}/>
        <Grid>
        {institutionValue !== '' ? <ExamsTable/> : <div>ops</div>}
        </Grid>
        <NewExamForm />
        </Container>
    ) 
};
