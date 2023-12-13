import "./TableDSSVCanhBao.scss";
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import React, { useCallback, useMemo, useState } from 'react';
import { Box, Button } from '@mantine/core';
import { IconDownload, IconUpload } from '@tabler/icons-react';
import { mkConfig, generateCsv, download } from 'export-to-csv'; //or use your library of choice here
import { Link } from "react-router-dom";
import {
    IconButton,
} from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import moment from "moment";
const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
});

const TableDSSVCanhBao = (props) => {
    const list_data = props.list_data;
    const handleExportRows = (rows) => {
        const rowData = rows.map((row) => row.original);
        const csv = generateCsv(csvConfig)(rowData);
        download(csvConfig)(csv);
    };

    const handleExportData = () => {
        const csv = generateCsv(csvConfig)(list_data);
        download(csvConfig)(csv);
    };
    const columns = useMemo(
        () => [
            {
                accessorKey: 'MaSV',
                header: 'Mã',
                size: 100,
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,
            },
            {
                accessorKey: 'HoSV',
                header: 'Họ',
                size: 150,
                enableEditing: false,


            },
            {
                accessorKey: 'TenSV',
                header: 'Tên',
                size: 100,
                enableEditing: false,
            },
            {

                accessorKey: 'NgaySinh',
                accessorFn: (dataRow) => moment(dataRow.NgaySinh).format("DD-MM-YYYY"),
                header: 'Ngày sinh',
                size: 100,
                enableEditing: false,

            },
            {
                accessorKey: 'ChuyenNganh',
                header: 'Chuyên ngành',
                size: 100,
                enableEditing: false,
            },
            {

                accessorKey: 'Lop',
                header: 'Lớp',
                size: 100,
                enableEditing: false,


            },
            {
                accessorKey: 'NamThu',
                header: 'Năm thứ',
                size: 100,
                enableEditing: false,
            },
            {

                accessorKey: 'HocKyThu',
                header: 'HK thứ',
                size: 100,
                enableEditing: false,


            },
            {
                accessorKey: 'SoLanCBLienTiep',
                header: 'Số lần CB',
                size: 100,
                enableEditing: false,
            },
            {

                accessorKey: 'TongSoLanCB',
                header: 'Tổng số lần CB',
                size: 150,
                enableEditing: false,

            },
            {
                accessorKey: 'DTBCHK',
                header: 'ĐTB cả HK',
                size: 100,
                enableEditing: false,
            },
            {

                accessorKey: 'DTBCTL',
                header: 'ĐTB tích lũy',
                size: 100,
                enableEditing: false,


            },
            {
                accessorKey: 'KQ',
                header: 'Kết quả',
                size: 100,
                enableEditing: false,
            },

        ]
    );

    const table = useMantineReactTable({
        columns,
        data: list_data,
        enableRowSelection: true,
        columnFilterDisplayMode: 'popover',
        paginationDisplayMode: 'pages',
        positionToolbarAlertBanner: 'bottom',

        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '0.3rem' }}>
                <Link to={"/admin/canhbaohoctap/single/" + row.original.MaCBHT}>
                    <IconButton>
                        <Visibility fontSize="small" />
                    </IconButton>
                </Link>


                <Link to={"/canhbaohoctap/sinhvien/edit/" + row.original.masv}>
                    <IconButton onClick={() => table.setEditingRow(row)}>
                        <Edit fontSize="small" />
                    </IconButton>
                </Link>

                <IconButton onClick={() => console.log(row.original.name)}>
                    <Delete fontSize="small" sx={{ color: 'red' }} />
                </IconButton>
            </Box >

        ),



        renderTopToolbarCustomActions: ({ table }) => (
            <Box
                sx={{
                    display: 'flex',
                    gap: '16px',
                    padding: '8px',
                    flexWrap: 'wrap',
                }}
            >
                <Button
                    color="lightblue"
                    //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                    onClick={handleExportData}
                    leftIcon={<IconUpload />}
                    variant="filled"
                >
                    Export All Data
                </Button>
                {/* <Button
                            disabled={table.getPrePaginationRowModel().rows.length === 0}
                            //export all rows, including from the next page, (still respects filtering and sorting)
                            onClick={() =>
                                handleExportRows(table.getPrePaginationRowModel().rows)
                            }
                            leftIcon={<IconDownload />}
                            variant="filled"
                        >
                            Export All Rows
                        </Button> */}
                {/* <Button
                            disabled={table.getRowModel().rows.length === 0}
                            //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
                            onClick={() => handleExportRows(table.getRowModel().rows)}
                            leftIcon={<IconDownload />}
                            variant="filled"
                        >
                            Export Page Rows
                        </Button> */}
                <Button
                    disabled={
                        !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                    }
                    //only export selected rows
                    onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                    leftIcon={<IconUpload />}
                    variant="filled"
                >
                    Export Selected Rows
                </Button>

                {/* <Button
                    //only export selected rows
                    // onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                    leftIcon={<IconDownload />}
                    variant="filled"
                >
                    Import Data
                </Button> */}
                {/* <Button
                            sx={{ backgroundColor: 'green' }}
                            //only export selected rows
                            // onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                            leftIcon={<IconDownload />}
                            variant="filled"
                        >
                            Create Data
                        </Button> */}
            </Box>

        ),
    });

    return (
        <>
            <MantineReactTable table={table} />
        </>
    )
}

export default TableDSSVCanhBao