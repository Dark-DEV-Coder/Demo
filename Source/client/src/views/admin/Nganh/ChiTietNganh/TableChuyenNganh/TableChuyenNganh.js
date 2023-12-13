import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import React, { useMemo, useState } from 'react';
import { Box } from '@mantine/core';
import { mkConfig, generateCsv, download } from 'export-to-csv'; //or use your library of choice here
import { Link } from "react-router-dom";
import {
    IconButton,
} from '@mui/material';
import { Delete, Edit, Label, Visibility } from '@mui/icons-material';
import "./TableChuyenNganh.scss"

const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
});

const TableChuyenNganh = (props) => {
    const listData_chuyennganh = props.listData_chuyennganh;
    const handleExportRows = (rows) => {
        const rowData = rows.map((row) => row.original);
        const csv = generateCsv(csvConfig)(rowData);
        download(csvConfig)(csv);
    };

    const handleExportData = () => {
        const csv = generateCsv(csvConfig)(listData_chuyennganh);
        download(csvConfig)(csv);
    };
    const columns = useMemo(
        () => [
            {
                accessorKey: 'MaChuyenNganh',
                header: 'Mã chuyên ngành',
                size: 100,
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,
            },
            {
                accessorKey: 'TenChuyenNganh',
                header: 'Tên chuyên ngành',
                size: 100,
                enableEditing: false,
            },
        ]
    );

    const table = useMantineReactTable({
        columns,
        data: listData_chuyennganh,
        enableRowSelection: false,
        columnFilterDisplayMode: 'popover',
        paginationDisplayMode: 'pages',
        positionToolbarAlertBanner: 'bottom',
        positionActionsColumn: 'last',
        // enableColumnActions: true,
        // enableRowActions: true,

        renderTopToolbarCustomActions: ({ table }) => (
            <label className="ds-cn" htmlFor="inputTen">Danh sách chuyên ngành</label>

        ),

        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '0.3rem' }}>
                {/* <Link onClick={() => table.setEditingRow(row)}>
                    <IconButton>
                        <Visibility fontSize="small" />
                    </IconButton>
                </Link> */}
                {/* <Link to={"/admin/sinhvien/edit/" + row.original.masv}>
                    <IconButton onClick={() => table.setEditingRow(row)}>
                        <Edit fontSize="small" />
                    </IconButton>
                </Link> */}

                {/* <IconButton onClick={() => console.log(row.original.name)}>
                    <Delete fontSize="small" sx={{ color: 'red' }} />
                </IconButton> */}
            </Box >

        ),

    })
    return (
        <>
            <MantineReactTable table={table} />
        </>
    )
}

export default TableChuyenNganh