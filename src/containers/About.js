import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';


const About = () => {
    return (
        <Container component="main" maxWidth="sm">
            <Grid container>
                <Typography variant="body1">
                    WhereDidITravel is service that lets you to place add markers to your map. The markers represent countries that you visited or planning to visit.
                    You can add ratings to your trip, which will be visible on the map as well. Currently, the map with all your trips is only available to you. 
                </Typography>
                {/* If you wish, you can actually share a public map with all your trips for anyone to see. */}
            </Grid>
        </Container>
    )
}

export default About;