
import "./TableGiangVien.scss";
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { useMemo } from 'react';
import { Box, Button } from '@mantine/core';
import { IconDownload, IconUpload } from '@tabler/icons-react';
import { mkConfig, generateCsv, download } from 'export-to-csv'; //or use your library of choice here
import { Link } from "react-router-dom";
import { IconButton } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { fetchAllGiangVien, fetchDeleteGiangVien } from "../GetData"
import { toast } from "react-toastify";
import { useState, useEffect } from 'react';
import moment from "moment";
const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
});

const TableGiangVien = (props) => {
    const accessToken = props.accessToken;
    const [listData_giangvien, SetListData_giangvien] = useState([]);

    // component didmount
    useEffect(() => {
        getListGiangVien();
    }, []);

    const getListGiangVien = async () => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchAllGiangVien(headers);
        if (res && res.data && res.data.DanhSach) {
            SetListData_giangvien(res.data.DanhSach)

        }
    }

    const handleDeleteRows = async (row) => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchDeleteGiangVien(headers, row.original.MaGV)
        if (res.status === true) {
            toast.success(res.message)
            getListGiangVien()
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
        const csv = generateCsv(csvConfig)(listData_giangvien);
        download(csvConfig)(csv);
    };
    const columns = useMemo(
        () => [
            {
                accessorKey: 'MaGV',
                header: 'Mã',
                size: 100,
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,
            },
            {
                accessorKey: 'HoGV',
                header: 'Họ',
                size: 150,
                enableEditing: false,


            },
            {
                accessorKey: 'TenGV',
                header: 'Tên',
                size: 100,
                enableEditing: false,
            },
            {

                accessorKey: 'Email',
                header: 'Email',
                size: 160,
                enableEditing: false,


            },
            {
                accessorKey: 'SoDienThoai',
                header: 'Số điện thoại',
                size: 100,
                enableEditing: false,
            },
            {
                accessorKey: 'GioiTinh',
                header: 'Giới Tính',
                size: 100,
                enableEditing: false,
            },
            {

                accessorKey: 'NgaySinh',
                header: 'Ngày sinh',
                accessorFn: (dataRow) => moment(dataRow.NgaySinh).format("DD-MM-YYYY"),
                size: 100,
                enableEditing: false,
            },
            {
                accessorKey: 'DonViCongTac',
                header: 'Đơn vị công tác',
                size: 150,
                enableEditing: false,
            },
            {

                accessorKey: 'ChuyenNganh',
                header: 'Chuyên ngành',
                size: 150,
                enableEditing: false,


            },
            {
                accessorKey: 'TrinhDo',
                header: 'Trình độ',
                size: 150,
                enableEditing: false,
            },
        ]
    );

    const table = useMantineReactTable({
        columns,
        data: listData_giangvien,
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


                <Link to={"/admin/giangvien/edit/" + row.original.MaGV}>
                    <IconButton onClick={() => table.setEditingRow(row)}>
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
}

export default TableGiangVien