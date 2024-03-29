import "./TableKhoaLuan.scss"
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import React, { useMemo } from 'react';
import { Box, Button } from '@mantine/core';
import { IconDownload, IconUpload } from '@tabler/icons-react';
import { mkConfig, generateCsv, download } from 'export-to-csv'; //or use your library of choice here
import { Link } from "react-router-dom";
import moment from 'moment'
import { IconButton, } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import PushPinIcon from '@mui/icons-material/PushPin';
import { toast } from "react-toastify";
import { useState, useEffect } from 'react';
import { fetchAllKhoaLuan, fetchDeleteKhoaLuan, fetchUpdateKhoaLuan, fetchGhimKhoaLuan, fetchBoGhimKhoaLuan } from "../GetData"

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
});

const TableKhoaLuan = (props) => {
    const accessToken = props.accessToken;
    const [listData_khoaluan, SetListData_khoaluan] = useState([]);
    // component didmount
    useEffect(() => {
        getListKhoaLuan();
        getUpdateKhoaLuan();
    }, []);

    const getListKhoaLuan = async () => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchAllKhoaLuan(headers);
        if (res && res.data && res.data.DanhSach) {
            SetListData_khoaluan(res.data.DanhSach)
        }
    }

    const ghimKhoaLuan = async (row) => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchGhimKhoaLuan(headers, row.original.MaKLTN);
        if (res && res.status === true) {
            toast.success("Ghim khóa luận thành công !")
            setTimeout(() => {
                window.location.reload()
            }, [1500])
        }
    }

    const boghimKhoaLuan = async (row) => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchBoGhimKhoaLuan(headers, row.original.MaKLTN);
        if (res && res.status === true) {
            toast.success("Bỏ ghim khóa luận thành công !")
            setTimeout(() => {
                window.location.reload()
            }, [1500])
        }
    }

    const getUpdateKhoaLuan = async () => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchUpdateKhoaLuan(headers);
    }

    const [ma_xoa, setMa_xoa] = useState({})
    const [open, setOpen] = useState(false);
    const handleClickOpen = (row) => {
        setOpen(true);
        setMa_xoa(row)
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleDeleteRows = async (row) => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchDeleteKhoaLuan(headers, row.original.MaKLTN)
        if (res.status === true) {
            toast.success(res.message)
            getListKhoaLuan()
            setOpen(false);
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
        const csv = generateCsv(csvConfig)(listData_khoaluan);
        download(csvConfig)(csv);
    };
    const columns = useMemo(
        () => [
            {
                accessorKey: 'MaKLTN',
                header: 'Mã',
                size: 80,
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,

            },
            {
                accessorKey: 'Ten',
                header: 'Tên',
                size: 400,
                enableEditing: false,

            },
            {
                accessorKey: 'Khoa',
                header: 'Khóa',
                size: 150,
                enableEditing: false,

            },
        ]
    );

    const table = useMantineReactTable({
        columns,
        data: listData_khoaluan.reverse(),
        enableRowSelection: true,
        columnFilterDisplayMode: 'popover',
        paginationDisplayMode: 'pages',
        positionToolbarAlertBanner: 'bottom',
        positionActionsColumn: 'last',
        enableColumnActions: true,
        enableRowActions: true,



        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '0.3rem' }}>
                {row.original.TrangThaiCongBo === 'Không công bố' ?
                    <IconButton onClick={() => ghimKhoaLuan(row)}>
                        <PushPinIcon fontSize="small" />
                    </IconButton>
                    :
                    <IconButton onClick={() => boghimKhoaLuan(row)}>
                        <PushPinIcon fontSize="small" sx={{ color: 'red' }} />
                    </IconButton>
                }
                <Link to={"/admin/khoaluan/single/" + row.original.MaKLTN}>
                    <IconButton>
                        <Visibility fontSize="small" />
                    </IconButton>
                </Link>

                <Link to={"/admin/khoaluan/edit/" + row.original.MaKLTN}>
                    <IconButton  >
                        <Edit fontSize="small" />
                    </IconButton>
                </Link>

                <IconButton onClick={() => handleClickOpen(row)}>
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
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ color: 'red' }}>
                    {"Xóa dữ liệu"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Dữ liệu bị xóa sẽ không thể hồi phục lại.
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        Bạn có chắc chắn muốn xóa dữ liệu này ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} style={{ background: 'red' }}>Từ chối</Button>
                    <Button onClick={() => handleDeleteRows(ma_xoa)} autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )

};

export default TableKhoaLuan;