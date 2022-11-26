import React, { useState } from 'react';
import Table from '../components/Table';
import { getCalender } from '../services';

const sampleData = [
    {
        "id": "1",
        "permalink": "",
        "title": "Check CharlieHR Request.",
        "date": "2022-11-14T10:00:00+05:30",
        "duration": 0.25,
        "selected": false
    },
    {
        "id": "2",
        "permalink": "",
        "title": "Development and Delivery meeting",
        "date": "2022-11-14T10:15:00+05:30",
        "duration": 0.75,
        "selected": false
    },
    {
        "id": "3",
        "permalink": "",
        "title": "Alderplay 2.0 Portal daily stand up",
        "date": "2022-11-14T11:00:00+05:30",
        "selected": false,
        "duration": 0.25
    },
    {
        "id": "4",
        "permalink": "",
        "title": "Weekly project Catch-up",
        "selected": false,
        "date": "2022-11-14T11:15:00+05:30",
        "duration": 0.5
    },
    {
        "id": "5",
        "permalink": "",
        "title": "Mediwave weekly huddle",
        "selected": false,
        "date": "2022-11-14T12:00:00+05:30",
        "duration": 1
    },
    {
        "id": "6",
        "permalink": "",
        "title": "MWF meeting",
        "selected": false,
        "date": "2022-11-14T14:30:00+05:30",
        "duration": 0.75
    },
    {
        "id": "7",
        "permalink": "",
        "selected": false,
        "title": "PD care - Resources",
        "date": "2022-11-14T15:30:00+05:30",
        "duration": 0.25
    },
    {
        "id": "8",
        "selected": false,
        "permalink": "",
        "title": "Triangle - daily stand-up",
        "date": "2022-11-14T16:15:00+05:30",
        "duration": 0.25
    },
    {
        "id": "9",
        "selected": false,
        "permalink": "",
        "title": "Check CharlieHR Request.",
        "date": "2022-11-15T10:00:00+05:30",
        "duration": 0.25
    },
    {
        "id": "10",
        "permalink": "",
        "selected": false,
        "title": "Alderplay 2.0 Portal daily stand up",
        "date": "2022-11-15T11:00:00+05:30",
        "duration": 0.25
    },
    {
        "id": "11",
        "permalink": "",
        "selected": false,
        "title": "Triangle - daily stand-up",
        "date": "2022-11-15T16:15:00+05:30",
        "duration": 0.25
    },
    {
        "id": "12",
        "permalink": "",
        "selected": false,
        "title": "Project Triangle- Catch up ahead of demo on 21st ",
        "date": "2022-11-15T18:00:00+05:30",
        "duration": 0.5
    },
    {
        "id": "13",
        "permalink": "",
        "selected": false,
        "title": "Clinican safety - Hazard Log - Alder Hey Session 1",
        "date": "2022-11-15T18:30:00+05:30",
        "duration": 0.5
    },
    {
        "id": "26",
        "permalink": "",
        "selected": false,
        "title": "Recruitment follow up",
        "date": "2022-11-15T18:45:00+05:30",
        "duration": 0.25
    },
    {
        "id": "14",
        "permalink": "",
        "title": "Check CharlieHR Request.",
        "selected": false,
        "date": "2022-11-16T10:00:00+05:30",
        "duration": 0.25
    },
    {
        "id": "15",
        "permalink": "",
        "selected": false,
        "title": "Alderplay 2.0 Portal daily stand up",
        "date": "2022-11-16T11:00:00+05:30",
        "duration": 0.25
    },
    {
        "id": "16",
        "permalink": "",
        "selected": false,
        "title": "Triangle - daily stand-up",
        "date": "2022-11-16T16:15:00+05:30",
        "duration": 0.25
    },
    {
        "id": "17",
        "selected": false,
        "permalink": "",
        "title": "Google Analytics - Monthly Review",
        "date": "2022-11-16T16:30:00+05:30",
        "duration": 1
    },
    {
        "id": "18",
        "permalink": "",
        "selected": false,
        "title": "Check CharlieHR Request.",
        "date": "2022-11-17T10:00:00+05:30",
        "duration": 0.25
    },
    {
        "id": "19",
        "permalink": "",
        "selected": false,
        "title": "Alderplay 2.0 Portal daily stand up",
        "date": "2022-11-17T11:00:00+05:30",
        "duration": 0.25
    },
    {
        "id": "20",
        "permalink": "",
        "selected": false,
        "title": "Triangle - daily stand-up",
        "date": "2022-11-17T16:15:00+05:30",
        "duration": 0.25
    },
    {
        "id": "21",
        "permalink": "",
        "title": "Triangle - mid sprint review call",
        "selected": false,
        "date": "2022-11-17T17:30:00+05:30",
        "duration": 0.5
    },
    {
        "id": "22",
        "permalink": "",
        "title": "Recruitment follow up",
        "selected": false,
        "date": "2022-11-17T18:45:00+05:30",
        "duration": 0.25
    },
    {
        "id": "23",
        "permalink": "",
        "title": "Check CharlieHR Request.",
        "selected": false,
        "date": "2022-11-18T10:00:00+05:30",
        "duration": 0.25
    },
    {
        "id": "24",
        "permalink": "",
        "title": "Alderplay 2.0 Portal daily stand up",
        "selected": false,
        "date": "2022-11-18T11:00:00+05:30",
        "duration": 0.25
    },
    {
        "id": "25",
        "permalink": "",
        "title": "PHR Dev Meet up",
        "selected": false,
        "date": "2022-11-18T12:15:00+05:30",
        "duration": 0.5
    }
];

export default ({
    date
}) => {
    const [data, setData] = useState(sampleData);
    const [selectAll, setSelectAll] = useState(false);

    const onGetCalender = async (startDate) => {
        try {
            const { data } = await getCalender(startDate);
            console.log(data.nonWrikeTask);
            setData(data.nonWrikeTask);
        } catch (err) {
            console.log(err);
        }
    };

    const onSelectAll = () => {
        setSelectAll(!selectAll);
        const value = data.map(item => ({
            ...item,
            selected: !selectAll
        }));
        setData(value);
    }

    const onSelect = (data) => {
        setData((prevState) => {
            const filteredValue = prevState.filter(item => item.id !== data.id);
            return [...filteredValue, data]
        });
    };

    React.useEffect(() => {
        onGetCalender(date);
    }, [date]);

    return <div>
        <Table
            columns={[{
                name: 'Title',
                field: 'title',
            }, {
                name: 'Duration',
                field: 'duration',
            }, {
                name: 'Date',
                field: 'date',
            },]}
            data={data}
            onSelectCheckBox={onSelect}
            onSelectAll={onSelectAll}
            selectAll={selectAll}
        />
    </div>
};
