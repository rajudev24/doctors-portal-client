import { Grid } from '@mui/material';
import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import BookingModal from '../BookingModal/BookingModal';

const Booking = ({ booking, date, setBookingSuccess }) => {
    const {email,specialist, name, fee, experince, startDate, endDate, startTime, endTime,  } = booking;
    const [openBooking, setBookingOpen] = React.useState(false);
    const handleBookingOpen = () => setBookingOpen(true);
    const handleBookingClose = () => setBookingOpen(false);
    return (
        <>
            <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} sx={{ py: 5 }}>
                    <Typography sx={{ color: 'info.main', fontWeight: 600 }} variant="h5" gutterBottom component="div">
                        {name}
                    </Typography>
                    <Typography sx={{ color: 'info.main', fontWeight: 600 }} variant="h6" gutterBottom component="div">
                        {specialist}
                    </Typography>
                    <Typography variant="h6" gutterBottom component="div">
                        {startTime} - {endTime}
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                        Consulting Fee ${fee}
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                        {experince} Years of Experince
                    </Typography>
                    <Button onClick={handleBookingOpen} variant="contained">BOOK APPOINTMENT</Button>
                </Paper>
            </Grid>
            <BookingModal
                date={date}
                booking={booking}
                doctorEmail = {email}
                openBooking={openBooking}
                handleBookingClose={handleBookingClose}
                setBookingSuccess={setBookingSuccess}
            ></BookingModal>
        </>
    );
};

export default Booking;