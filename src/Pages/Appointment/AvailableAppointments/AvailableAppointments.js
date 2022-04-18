import { Container, Grid, Typography, Alert } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Booking from '../Booking/Booking';

const AvailableAppointments = ({ date }) => {
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [doctors, setDoctors] = useState([])
    useEffect(()=>{
        fetch(`https://hidden-ravine-37030.herokuapp.com/availabledoctor?date=${date}`)
        .then(res => res.json())
        .then(data => setDoctors(data))
    },[date])
    console.log(doctors);
    return (
        <Container>
            <Typography variant="h4" sx={{ color: 'info.main', mb: 3 }}>Available Appointments on {date.toDateString()}</Typography>
            {bookingSuccess && <Alert severity="success">Appointment Booked successfully!</Alert>}
            <Grid container spacing={2}>
                {
                    doctors.map(booking => <Booking
                        key={booking._id}
                        booking={booking}
                        date={date}
                        setBookingSuccess={setBookingSuccess}
                    >
                    </Booking>)
                }
            </Grid>
        </Container>
    );
};

export default AvailableAppointments;