
import "./TableCanhBaoHocTap.scss";
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import React, { useMemo } from 'react';
import { Box, Button } from '@mantine/core';
import { IconDownload, IconUpload } from '@tabler/icons-react';
import { mkConfig, generateCsv, download } from 'export-to-csv'; //or use your library of choice here
import { Link } from "react-router-dom";
import {
    IconButton,
} from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { toast } from "react-toastify";
import { useState, useEffect } from 'react';
import { fetchAllCanhBao_DHT, fetchAllCanhBao_DRL, fetchDeleteCanhBao } from "../GetData"

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { locale } from "moment";

const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
});

const TableCanhBaoHocTap = (props) => {
    const accessToken = props.accessToken;
    const [kieuCanhBao, setKieuCanhBao] = useState("Điểm học tập");
    const [listData_canhbao_DHT, SetListData_canhbao_DHT] = useState([]);
    const [listData_canhbao_DRL, SetListData_canhbao_DRL] = useState([]);
    const [listData_canhbao, SetListData_canhbao] = useState([]);
    // component didmount
    useEffect(() => {
        getListCanhBao_DHT();
        getListCanhBao_DRL();

    }, []);

    const getListCanhBao_DHT = async () => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchAllCanhBao_DHT(headers);
        if (res && res.data && res.data.DanhSach) {
            SetListData_canhbao_DHT(res.data.DanhSach)
            SetListData_canhbao(res.data.DanhSach)
        }
    }
    const getListCanhBao_DRL = async () => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchAllCanhBao_DRL(headers);
        if (res && res.data && res.data.DanhSach) {
            SetListData_canhbao_DRL(res.data.DanhSach)
        }
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
        let res = await fetchDeleteCanhBao(headers, row.original.MaCBHT)
        if (res.status === true) {
            setOpen(false);
            toast.success(res.message)
            setTimeout(() => {
                window.location.reload()
            }, [1000])
            return;
        }
        if (res.success === false) {
            toast.error(res.message)
            return;
        }
    }

    const onChangeSelect = (event, SetSelect) => {
        let changeValue = event.target.value;
        SetSelect(changeValue);
        if (changeValue === "Điểm học tập") {
            SetListData_canhbao(listData_canhbao_DHT)
            return
        }
        if (changeValue === "Điểm rèn luyện") {
            SetListData_canhbao(listData_canhbao_DRL)
            return
        }
    }


    const handleExportRows = (rows) => {
        const rowData = rows.map((row) => row.original);
        const csv = generateCsv(csvConfig)(rowData);
        download(csvConfig)(csv);
    };

    const handleExportData = () => {
        const csv = generateCsv(csvConfig)(listData_canhbao);
        download(csvConfig)(csv);
    };
    const columns = useMemo(
        () => [
            {
                accessorKey: 'MaCBHT',
                header: 'Mã',
                size: 100,
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,
            },
            {
                accessorKey: 'Ten',
                header: 'Tên',
                size: 300,
                enableEditing: false,


            },
            {

                accessorKey: 'NienKhoa',
                header: 'Niên khóa',
                size: 100,
                enableEditing: false,


            },

        ]
    );

    const table = useMantineReactTable({
        columns,
        data: listData_canhbao.reverse(),
        enableRowSelection: true,
        columnFilterDisplayMode: 'popover',
        paginationDisplayMode: 'pages',
        positionToolbarAlertBanner: 'bottom',
        positionActionsColumn: 'last',
        enableColumnActions: true,
        enableRowActions: true,



        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '0.3rem' }}>
                <Link to={"/admin/canhbaohoctap/single/" + row.original.MaCBHT}>
                    <IconButton>
                        <Visibility fontSize="small" />
                    </IconButton>
                </Link>


                <Link to={"/admin/canhbaohoctap/edit/" + row.original.MaCBHT}>
                    <IconButton onClick={() => table.setEditingRow(row)}>
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
                <select value={kieuCanhBao} className="select-btn" onChange={(event) => onChangeSelect(event, setKieuCanhBao)} >
                    <option value='Điểm học tập'>Điểm học tập</option>
                    <option value='Điểm rèn luyện'>Điểm rèn luyện</option>
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
}

export default TableCanhBaoHocTap