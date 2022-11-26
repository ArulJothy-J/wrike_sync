import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import WrikeWithTask from '../pages/WrikeWithTask';
import WrikeWithOutTask from '../pages/WrikeWithOutTask';

export default function LabTabs({
    date,
    selectedTask
}) {
    const [value, setValue] = React.useState('0');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="Data" centered>
                    <Tab label="Call with wrike task" value="0" />
                    <Tab label="Call without wrike task" value="1" />
                </TabList>
            </Box>
            <TabPanel value="0">
                <WrikeWithTask date={date} selectedTask={selectedTask} />
            </TabPanel>
            <TabPanel value="1">
                <WrikeWithOutTask date={date} />
            </TabPanel>
        </TabContext>
    );
}
