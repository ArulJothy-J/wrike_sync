import React, { useEffect, useState } from 'react';
import Table from '../components/Table';
import { getCalender } from '../services';

const sampleData = [
    {
        "permalink": "1004809021",
        "title": "POC",
        "date": "2022-11-14T14:00:00+05:30",
        "id": "IEACCV7DKQ56IKZ5",
        "duration": 0.5,
        "selected": false
    },
    {
        "permalink": "980432273",
        "title": "poc",
        "date": "2022-11-15T12:00:00+05:30",
        "id": "IEACCV7DKQ5HANMR",
        "duration": 0.25,
        "selected": false
    },
    {
        "permalink": "952072025",
        "title": "MSI LARC Final view / Vas planning call",
        "date": "2022-11-16T14:00:00+05:30",
        "id": "IEACCV7DKQ4L652Z",
        "duration": 1,
        "selected": false
    }
];

export default ({
    date,
    selectedTask
}) => {
    const [data, setData] = useState(sampleData);
    const [selectAll, setSelectAll] = useState(false);

    const onGetCalender = async (startDate) => {
        try {
            const { data } = await getCalender(startDate);
            console.log(data.wrikeTask);
            setData(data.wrikeTask.map(item => ({
                ...item,
                selected: false
            })));
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

    useEffect(() => {
        onGetCalender(date);
    }, [date]);

    useEffect(() => {
        selectedTask(data);
    }, [data]);

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
