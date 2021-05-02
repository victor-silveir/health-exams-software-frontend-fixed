import { Container, Divider, Grid } from '@material-ui/core'
import {useStyles} from '../header/index'
import { ExamsTable } from '../table';
import InstitutionCard from '../insitution-card';
import React from 'react';

export default function Content() {
    const[institutionValue, setInstitutionValue] = React.useState('');
    const classes = useStyles()

    return(
        
        <Container className={classes.content}>
        <InstitutionCard setInstitution={setInstitutionValue}/>
        <Divider />
        <Grid>
        {institutionValue !== '' ? <ExamsTable/> : <div>ops</div>}
        </Grid>
        </Container>
    ) 
};
