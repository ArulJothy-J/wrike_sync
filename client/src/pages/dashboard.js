import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Logout from '../components/Logout';
import ListControl from '../components/ListControl';
import TabControl from '../components/TabControl';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { getCalender, getCategories } from '../services';

function Dashboard() {
    const [category, setCategory] = React.useState('');
    const [calender, setCalender] = React.useState([]);
    const [categories, setCategories] = React.useState([]);

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    const getCalenderDetails = async () => {
        try {
            const { data } = await getCalender();
            setCalender(data.task);
        } catch (err) {
            console.log(err);
        }
    };

    const getCategory = async () => {
        try {
            const { data } = await getCategories();
            setCategories(data.data);
        } catch (err) {
            console.log(err);
        }
    };

    React.useEffect(() => {
        getCalenderDetails();
        getCategory();
    }, []);

    return <div>
        <Paper>
            <Grid container spacing={2}>
                <Grid item>
                    <ListControl calenders={calender} />
                </Grid>
                <Grid item xs={4} sm container spacing={2}>
                    <Grid item xs={2} spacing={2}>
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
                    <Grid item xs={10} spacing={2}>
                        <TabControl />
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
        <br />
        <Logout />
    </div>
}

export default Dashboard;
