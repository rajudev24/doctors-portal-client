import * as React from 'react';
import Grid from '@mui/material/Grid';
import Calendar from '../../Shared/Calendar/Calendar';
import Appointments from '../Appointments/Appointments';

const DashboardHome = () => {
    return (
        <Grid item xs={12} sm={7}>
            <Appointments ></Appointments>
        </Grid>

    );
};

export default DashboardHome;