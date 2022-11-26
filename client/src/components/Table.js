import * as React from 'react';
import Table from '@mui/material/Table';
import Checkbox from '@mui/material/Checkbox';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function DenseTable({
    columns,
    data,
    onSelectCheckBox,
    selectAll,
    onSelectAll
}) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <Checkbox
                            color="primary"
                            checked={selectAll}
                            onChange={onSelectAll}
                        />
                        {columns.map((item) => <TableCell key={item.field}>{item.name}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    checked={row.selected}
                                    onChange={() => {
                                        onSelectCheckBox({
                                            ...row,
                                            selected: !row.selected
                                        });
                                    }}
                                />
                            </TableCell>
                            {columns.map(item => <TableCell >{row[item.field] || ''}</TableCell>)}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}