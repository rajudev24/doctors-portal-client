import React, { useState, useEffect } from 'react';
import useAuth from './../../../hooks/useAuth';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Appointments = () => {
    const { user, doctor, token } = useAuth();
    const [appointments, setAppointments] = useState([])
    const [scheduled, setScheduled] = useState([])

    useEffect(() => {
        const url = `https://hidden-ravine-37030.herokuapp.com/appointments?email=${user.email}`
        fetch(url,{
            headers:{
                'authorization' : `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setAppointments(data));
    }, [])

    useEffect(() => {
        const url = `https://hidden-ravine-37030.herokuapp.com/appointments/${user.email}`
        fetch(url,{
            headers:{
                'authorization' : `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setScheduled(data));
    }, [])
    console.log(scheduled);


    const handleCancel = (id) => {
        const url = `https://hidden-ravine-37030.herokuapp.com/appointments/${id}`
        console.log(url);
        fetch(url, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    alert('Successfully Cancel Orders! ');
                    const remainingAppointments = appointments.filter(appointment => appointment._id !== id)
                    
                    if(doctor){
                        setScheduled(remainingAppointments)
                    }else{
                        setAppointments(remainingAppointments) 
                    }
                }
            })
    }

    return (
        <div>
            {
                !doctor && <>
                    <h2>Appointments: {appointments.length}</h2>
                    <TableContainer component={Paper}>
                        <Table sx={{}} aria-label="Appointments table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Date</TableCell>
                                    <TableCell align="right">Time</TableCell>
                                    <TableCell align="right">Service</TableCell>
                                    <TableCell align="right">Fee</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {appointments.map((row) => (
                                    <TableRow
                                        key={row._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.patientName}
                                        </TableCell>
                                        <TableCell align="right">{row.date}</TableCell>
                                        <TableCell align="right">{row.startTime}AM</TableCell>
                                        <TableCell align="right">{row.serviceName}</TableCell>
                                        <TableCell align="right">${row.fee}</TableCell>
                                        <TableCell align="right"><button
                                            onClick={() => handleCancel(row._id)}
                                        >Cancel</button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            }
            {
                doctor && <>
                    <h2>Scheduled Appointments: {scheduled.length}</h2>
                    <TableContainer component={Paper}>
                        <Table sx={{}} aria-label="Appointments table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Date</TableCell>
                                    <TableCell align="right">Time</TableCell>
                                    <TableCell align="right">Service</TableCell>
                                    <TableCell align="right">Phone</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {scheduled.map((row) => (
                                    <TableRow
                                        key={row._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.patientName}
                                        </TableCell>
                                        <TableCell align="right">{row.date}</TableCell>
                                        <TableCell align="right">{row.startTime}AM</TableCell>
                                        <TableCell align="right">{row.serviceName}</TableCell>
                                        <TableCell align="right">{row.phone}</TableCell>
                                        <TableCell align="right"><button
                                            onClick={() => handleCancel(row._id)}
                                        >Cancel</button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            }
        </div>
    );
};

export default Appointments;