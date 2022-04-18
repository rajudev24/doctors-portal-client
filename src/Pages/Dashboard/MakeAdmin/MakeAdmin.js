import { Button, TextField, Alert } from '@mui/material';
import React, { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import useAuth from './../../../hooks/useAuth';
import TimePicker from 'react-time-picker';
const MakeAdmin = () => {
    const [info, setInfo] = useState({});
    const [success, setSuccess] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [startTime, onChange] = useState('10:00');
    const [endTime, onChanges] = useState('8:00');
    const { user } = useAuth();

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate)
    }

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection'
    }


    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = {...info };
        newInfo[field] = value;
        setInfo(newInfo);
        console.log(newInfo);
        
    }
    const handleSubmit = e => {
        const doctorInfo = {
            ...info,
            startDate: startDate.toLocaleDateString(),
            endDate: endDate.toLocaleDateString(),
            startTime: startTime,
            endTime: endTime,
            name: user.displayName,
            email: user.email

        }
        fetch('https://hidden-ravine-37030.herokuapp.com/availabledoctor', {
            method: 'POST',
            headers: {
                // 'authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(doctorInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    console.log(data);
                    setSuccess(true);
                }
            })

        e.preventDefault()
    }
    return (
        <div>
            <h2>Set Availability</h2>
            <DateRangePicker
                ranges={[selectionRange]}
                minDate={new Date()}
                rangeColors={['#FD5B61']}
                onChange={handleSelect}

            />
            
            <div style={{margin: 10}}>
                <label htmlFor="">Start Time</label>
                <TimePicker onChange={onChange} value={startTime} />
            </div>
            <div >
                <label htmlFor="">End Time</label>
                <TimePicker onChange={onChanges} value={endTime} />
            </div>
            <form onSubmit={handleSubmit}>
                <TextField
                    sx={{ width: '50%' }}
                    label="Specialist In"
                    name="specialist"
                    onBlur={handleOnBlur}
                    variant="standard" /> <br />
                <TextField
                    sx={{ width: '50%' }}
                    label="Put Years of Experince"
                    name="experince"
                    onBlur={handleOnBlur}
                    variant="standard" /> <br />
                <TextField
                    sx={{ width: '50%' }}
                    label="Consulting  Fee"
                    name="fee"
                    onBlur={handleOnBlur}
                    variant="standard" /> <br />
                    <div style={{margin: 10}}>
                    <Button  type="submit" variant="contained">Submit</Button>
                    </div>
                
            </form>
            {success && <Alert severity="success">Submitted successfully!</Alert>}
        </div>
    );
};

export default MakeAdmin;