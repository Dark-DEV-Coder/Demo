
import "./TableDSSinhVienThucTap.scss";
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

const csvConfig = mkConfig({
    filename: 'Danh-sach-sinh-vien-tham-gia-thuc-tap',
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
});

const TableDSSinhVienThucTap = (props) => {
    const DSSVThucTap = props.DSSVThucTap;
    const MaDKTT = props.MaDKTT
    const [trangthaiCty, SetTrangthaiCty] = useState(1)
    const onChangeSelect = (event, SetSelect) => {
        let changeValue = event.target.value;
        SetSelect(changeValue);
    }
    const handleExportRows = (rows) => {
        const rowData = rows.map((row) => row.original);
        const csv = generateCsv(csvConfig)(rowData);
        download(csvConfig)(csv);
    };

    const handleExportData = () => {
        const csv = generateCsv(csvConfig)(DSSVThucTap);
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
                accessorKey: 'Ho',
                header: 'Họ',
                size: 150,
                enableEditing: false,
            },
            {
                accessorKey: 'Ten',
                header: 'Tên',
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
                accessorKey: 'Cty',
                header: 'Cơ sở thực tập',
                size: 200,
                enableEditing: false,
            },
            {
                accessorKey: 'Web',
                header: 'Website',
                size: 100,
                enableEditing: false,
            },
            {
                accessorKey: 'DienThoai',
                header: 'Điện thoại',
                size: 100,
                enableEditing: false,
            },
            {
                accessorKey: 'Email',
                header: 'Email',
                size: 130,
                enableEditing: false,
            },

            {
                accessorKey: 'DiaChi',
                header: 'Địa chỉ',
                size: 250,
                enableEditing: false,
            },

        ]
    );

    const table = useMantineReactTable({
        columns,
        data: DSSVThucTap,
        enableRowSelection: true,
        columnFilterDisplayMode: 'popover',
        paginationDisplayMode: 'pages',
        positionToolbarAlertBanner: 'bottom',
        positionActionsColumn: 'last',
        enableColumnActions: true,
        enableRowActions: true,



        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '0.3rem' }}>
                <Link onClick={() => table.setEditingRow(row)}>
                    <IconButton>
                        <Visibility fontSize="small" />
                    </IconButton>
                </Link>
                {/* <Link to={"/admin/thuctap/edit/sinhvien/" + row.original.masv}>
                    <IconButton onClick={() => table.setEditingRow(row)}>
                        <Edit fontSize="small" />
                    </IconButton>
                </Link> */}

                <IconButton onClick={() => console.log(row.original.name)}>
                    <Delete fontSize="small" sx={{ color: 'red' }} />
                </IconButton>
            </Box >

        ),



        renderTopToolbarCustomActions: ({ row, table }) => (
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
                {/* < Button
                    //only export selected rows
                    // onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                    leftIcon={< IconDownload />}
                    variant="filled"
                >
                    Import Data
                </ Button > */}
            </Box >

        ),
    });

    return (
        <>
            <MantineReactTable table={table} />
        </>
    )
}

export default TableDSSinhVienThucTap