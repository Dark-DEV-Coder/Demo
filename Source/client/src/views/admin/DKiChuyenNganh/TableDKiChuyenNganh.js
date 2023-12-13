import "./TableDKiChuyenNganh.scss"
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import React, { useMemo } from 'react';
import { Box, Button } from '@mantine/core';
import { IconDownload, IconUpload } from '@tabler/icons-react';
import { mkConfig, generateCsv, download } from 'export-to-csv'; //or use your library of choice here
import { Link } from "react-router-dom";
import { IconButton } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import moment from "moment";
import { toast } from "react-toastify";
import { useEffect, useState } from 'react';
import { fetchAllDangKyCN, fetchDeleteDangKyCN, fetchUpdateDangKyCN } from "../GetData"

const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
});

const TableDKiChuyenNganh = (props) => {
    const accessToken = props.accessToken;
    const [listData_dkchuyennganh, SetListData_dkchuyennganh] = useState([]);
    // component didmount
    useEffect(() => {
        getUpdateDangKyChuyenNganh();
        getListDangKyChuyenNganh();
    }, []);
    const getUpdateDangKyChuyenNganh = async () => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchUpdateDangKyCN(headers);
        // console.log(res)
    }

    const getListDangKyChuyenNganh = async () => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchAllDangKyCN(headers);
        if (res && res.data && res.data.DanhSach) {
            SetListData_dkchuyennganh(res.data.DanhSach)
        }
    }
    const handleDeleteRows = async (row) => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchDeleteDangKyCN(headers, row.original.MaDKCN)
        if (res.status === true) {
            toast.success(res.message)
            getListDangKyChuyenNganh()
            return;
        }
        if (res.success === false) {
            toast.error(res.message)
            return;
        }
    }

    const handleExportRows = (rows) => {
        const rowData = rows.map((row) => row.original);
        const csv = generateCsv(csvConfig)(rowData);
        download(csvConfig)(csv);
    };

    const handleExportData = () => {
        const csv = generateCsv(csvConfig)(listData_dkchuyennganh);
        download(csvConfig)(csv);
    };
    const columns = useMemo(
        () => [
            {
                accessorKey: 'MaDKCN',
                header: 'Mã',
                size: 100,
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,

            },
            {
                accessorKey: 'Ten',
                header: 'Tên đợt đăng ký',
                size: 200,
                enableEditing: false,

            },
            {
                accessorKey: 'Khoa',
                header: 'Khóa học',
                size: 100,
                enableEditing: false,
            },
            {

                accessorKey: 'ThoiGianBD',
                accessorFn: (dataRow) => moment(dataRow.ThoiGianBD).format("DD-MM-YYYY"),
                header: 'Bắt đầu',
                size: 100,
                enableEditing: false,


            },
            {
                accessorKey: 'ThoiGianKT',
                accessorFn: (dataRow) => moment(dataRow.ThoiGianKT).format("DD-MM-YYYY"),
                header: 'Kết thúc',
                size: 100,
                enableEditing: false,
            },
        ]
    );

    const table = useMantineReactTable({
        columns,
        data: listData_dkchuyennganh.reverse(),
        enableRowSelection: true,
        columnFilterDisplayMode: 'popover',
        paginationDisplayMode: 'pages',
        positionToolbarAlertBanner: 'bottom',
        positionActionsColumn: 'last',
        enableColumnActions: true,
        enableRowActions: true,



        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '0.3rem' }}>
                <Link to={"/admin/dkychuyennganh/single/" + row.original.MaDKCN}>
                    <IconButton>
                        <Visibility fontSize="small" />
                    </IconButton>
                </Link>

                <Link to={"/admin/dkychuyennganh/edit/" + row.original.MaDKCN}>
                    <IconButton  >
                        <Edit fontSize="small" />
                    </IconButton>
                </Link>

                <IconButton onClick={() => handleDeleteRows(row)}>
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

};

export default TableDKiChuyenNganh;