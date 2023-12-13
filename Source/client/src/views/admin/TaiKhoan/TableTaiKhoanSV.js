

import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import React, { useMemo } from 'react';
import { Box, Button } from '@mantine/core';
import { IconDownload, IconUpload } from '@tabler/icons-react';
import { mkConfig, generateCsv, download } from 'export-to-csv'; //or use your library of choice here
import { Link } from "react-router-dom";
import { IconButton } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { toast } from "react-toastify";
import { useState, useEffect } from 'react';
import { fetchAllTaiKhoanSV, fetchDeleteTaiKhoan, fetchAcceptTaiKhoan } from "../GetData"
const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
});



const TableTaiKhoanSV = (props) => {
    const accessToken = props.accessToken;
    const [listData_TKSV, setListData_TKSV] = useState([]);
    const [listData, setListData] = useState([]);
    const [trangthaiTK, setTrangthaiTK] = useState('Đã kích hoạt')

    // component didmount
    useEffect(() => {
        getListTaiKhoanSV();
    }, []);

    const getListTaiKhoanSV = async () => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchAllTaiKhoanSV(headers);
        if (res && res.data && res.data.DanhSach) {
            setListData_TKSV(res.data.DanhSach)
            setListData(res.data.DanhSach.filter(item => item.TrangThai === 'Đã kích hoạt'))
        }
    }
    const handleAcceptRows = async (row) => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchAcceptTaiKhoan(headers, row.original.MaTK)
        // console.log("Đồng ý: ", res)
        if (res.status === true) {
            toast.success(res.message)
            window.location.reload()
            return;
        }
        if (res.success === false) {
            toast.error(res.message)
            return;
        }
    }

    const handleDeleteRows = async (row) => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchDeleteTaiKhoan(headers, row.original.MaTK)
        // console.log("Từ chối: ", res)
        if (res.status === true) {
            toast.success(res.message)
            getListTaiKhoanSV()
            return;
        }
        if (res.success === false) {
            toast.error(res.message)
            return;
        }
    }



    const onChangeSelect = (event, setSelect) => {
        let changeValue = event.target.value;
        setSelect(changeValue);
        changeValue === 'Đã kích hoạt' ? setListData(listData_TKSV.filter(item => item.TrangThai === 'Đã kích hoạt')) : setListData(listData_TKSV.filter(item => item.TrangThai === 'Chưa kích hoạt'))
    }

    const handleExportRows = (rows) => {
        const rowData = rows.map((row) => row.original);
        const csv = generateCsv(csvConfig)(rowData);
        download(csvConfig)(csv);
    };

    const handleExportData = () => {
        const csv = generateCsv(csvConfig)(listData);
        download(csvConfig)(csv);
    };
    const columns = useMemo(
        () => [
            {
                accessorKey: 'MaTK',
                header: 'Mã tài khoản',
                size: 100,
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,

            },
            {
                accessorKey: 'TenDangNhap',
                header: 'Tên đăng nhập',
                size: 100,
                enableEditing: false,

            },
            {
                accessorKey: 'HoTen',
                header: 'Họ tên người dùng',
                size: 200,
                enableEditing: false,
            },
        ]
    );

    const table = useMantineReactTable({
        columns,
        data: listData,
        enableRowSelection: true,
        columnFilterDisplayMode: 'popover',
        paginationDisplayMode: 'pages',
        positionToolbarAlertBanner: 'bottom',
        positionActionsColumn: 'last',
        enableColumnActions: true,
        enableRowActions: true,



        renderRowActions: ({ row, table }) => (
            trangthaiTK === 'Đã kích hoạt' ?
                <Box sx={{ display: 'flex', gap: '0.3rem' }}>
                    <Link to={"/admin/taikhoan/single/" + row.original.MaTK}>
                        <IconButton>
                            <Visibility fontSize="small" />
                        </IconButton>
                    </Link>

                    <Link to={"/admin/taikhoan/edit/" + row.original.MaTK}>
                        <IconButton  >
                            <Edit fontSize="small" />
                        </IconButton>
                    </Link>

                    <IconButton onClick={() => handleDeleteRows(row)}>
                        <Delete fontSize="small" sx={{ color: 'red' }} />
                    </IconButton>
                </Box >
                :
                <Box sx={{ display: 'flex', gap: '0.3rem' }}>
                    <button type="button" className="btn btn-outline-success" onClick={() => handleAcceptRows(row)}>Chấp nhận</button>
                    <button type="button" className="btn btn-outline-danger" onClick={() => handleDeleteRows(row)}>Từ chối</button>
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
                <select value={trangthaiTK} className="select-btn" onChange={(event) => onChangeSelect(event, setTrangthaiTK)} >
                    <option value='Đã kích hoạt'>Đã kích hoạt</option>
                    <option value='Chưa kích hoạt'>Chưa kích hoạt</option>
                </select>
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

                {/* <Button
                    //only export selected rows
                    // onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                    leftIcon={<IconDownload />}
                    variant="filled"
                >
                    Import Data
                </Button> */}
            </Box >

        ),
    });
    return (
        <>

            <MantineReactTable table={table} />

        </>
    )

};

export default TableTaiKhoanSV;