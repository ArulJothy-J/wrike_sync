import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Logout from '../components/Logout';
import TabControl from '../components/TabControl';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { getCategories, updateTimelog } from '../services';

const convertTimeSpentToHours = (value) => {
    if (value.includes('h')) {
        return parseFloat(value.replace('h', ''))
    } else if (value.includes('m')) {
        const parsedValue = parseInt(value.replace('m', ''));
        return parsedValue / 60;
    }
    return null;
};

function Dashboard() {
    const [category, setCategory] = React.useState('');
    const [categories, setCategories] = React.useState([]);
    const [startDate, setStateDate] = useState(null);
    const [selectedTaskValue, setSelectedTaskValue] = useState([]);
    const [comment, setComment] = useState('');
    const [timespent, setTimespent] = useState('');
    const [trackDate, setTrackDate] = useState(new Date());
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    const onChangeDate = (value) => {
        setStateDate(value);
    }

    const onChangeTrackDate = (value) => {
        setTrackDate(value);
    }

    const getCategory = async () => {
        try {
            const { data } = await getCategories();
            setCategories(data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const onChangeComment = (event) => {
        const { value } = event.target;
        setComment(value);
    };

    const onChangeTimeSpent = (event) => {
        const { value } = event.target;
        setTimespent(value);
    };

    const onSubmit = async () => {
        try {
            setLoading(true);
            const hours = convertTimeSpentToHours(timespent);
            const filteredValue = selectedTaskValue.filter(item => item.selected);
            if (hours && category && comment && filteredValue.length > 0) {
                const result = filteredValue.map(item => ({
                    comment,
                    trackedDate: trackDate,
                    categoryId: category,
                    hours,
                    id: item.id
                }));
                updateTimelog({
                    timelogs: result
                });
            } else {
                console.log('Completed all required fields');
            }
        } catch (err) {
            console.log('Error', err);
        } finally {
            setLoading(false);
        }
    };

    const selectedValue = (data) => {
        setSelectedTaskValue(data);
    };

    React.useEffect(() => {
        getCategory();
    }, []);

    return <div>
        <Paper>
            <Grid container spacing={2}>
                <Grid item xs={4} sm container spacing={2}>
                    <Grid item xs={2} >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={category}
                                label="Select Category"
                                onChange={handleChange}
                            >
                                {categories.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2} >
                        <DesktopDatePicker
                            label="Start date"
                            inputFormat="MM/DD/YYYY"
                            value={startDate}
                            onChange={onChangeDate}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <Divider orientation='vertical' />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField id="standard-basic" onChange={onChangeTimeSpent} label="Time spent" placeholder='Eg: 2m, 2h' variant="standard" />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField id="standard-basic" onChange={onChangeComment} label="Comments" variant="standard" />
                    </Grid>
                    <Grid item xs={2} >
                        <DesktopDatePicker
                            label="Start date"
                            inputFormat="MM/DD/YYYY"
                            value={trackDate}
                            onChange={onChangeTrackDate}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                    <Grid item xs={1} >
                        <Button variant="contained" disabled={loading} onClick={onSubmit}>Submit</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <TabControl date={startDate} selectedTask={selectedValue} />
            </Grid>
        </Paper>
        <br />
        <Logout />
    </div >
}

export default Dashboard;
