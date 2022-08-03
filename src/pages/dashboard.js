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

function Dashboard() {
    const [category, setCategory] = React.useState('');

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    return <div>
        <Paper        >
            <Grid container spacing={2}>
                <Grid item>
                    <ListControl />
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
                                <MenuItem value='category1'>Category 1</MenuItem>
                                <MenuItem value='category2'>Category 2</MenuItem>
                                <MenuItem value='category3'>Category 3</MenuItem>
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
