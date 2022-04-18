import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import Service from './../Service/Service';
import fluoride from '../../../images/fluoride.png';
import cavity from '../../../images/cavity.png';
import whitening from '../../../images/whitening.png';

const services = [
    {
        name: 'Fluoride Treatment',
        description: 'Fluoride treatments are typically professional treatments containing a high concentration of fluoride that a dentist or hygienist will apply to a person teeth to improve health and reduce the risk of cavities.',
        img: fluoride
    },
    {
        name: 'Cavity Filling',
        description: 'While patients report slight discomfort during a filling, it is uncommon to experience severe, intolerable pain. As previously mentioned, this is a very common procedure for dentists to perform and modern dentistry has alleviated much of the pain once associated with getting a filling.',
        img: cavity
    },
    {
        name: 'Teeth Whitening',
        description: 'Hydrogen peroxide, which is a natural bleaching agent, can be used to whiten teeth. Bleaching is a chemical process that uses the oxidative chemical to break down color-causing molecules and change or remove those bonds. You may experience tooth sensitivity and gum inflammation',
        img: whitening
    }
]


const Services = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Container>
                <Typography sx={{ fontWeight: 500, m: 2, color: 'success.main' }} variant="h6" component="div">
                    OUR SERVICES
                </Typography>
                <Typography sx={{ fontWeight: 600, m: 5 }} variant="h4" component="div">
                    Services We Provide
                </Typography>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {
                        services.map(service => <Service
                            key={service.name}
                            service={service}
                        ></Service>)
                    }
                </Grid>
            </Container>
        </Box>
    );
};

export default Services;