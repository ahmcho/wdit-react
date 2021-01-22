import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const NotFound = () => {
    return (
        <Container component="main" maxWidth="sm">
            <Grid container>
                <Grid item xs={12} align="center">
                    <Typography variant="h3" color="secondary">
                        404  | Page not found
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <Link variant="body2" component={RouterLink} to="/">
                        Go back
                    </Link>
                </Grid>
            </Grid>
        </Container>
    )
}

export default NotFound;