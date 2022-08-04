import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function LabTabs() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="Data" centered>
                    <Tab label="ALL" value="0" />
                    <Tab label="D1" value="1" />
                    <Tab label="D2" value="2" />
                    <Tab label="D3" value="3" />
                </TabList>
            </Box>
            <TabPanel value="0">All Data</TabPanel>
            <TabPanel value="1">Data 1</TabPanel>
            <TabPanel value="2">Data 2</TabPanel>
            <TabPanel value="3">Data 3</TabPanel>
        </TabContext>
    );
}
