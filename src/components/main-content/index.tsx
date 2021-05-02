import { Container } from '@material-ui/core'
import {useStyles} from '../header/index'
import clsx from 'clsx';

export default function Content() {

    const classes = useStyles()

    return(
        <Container className={clsx(classes.content && classes.contentShift)}>
        <h1>Content works</h1>
        </Container>
    ) 
};
