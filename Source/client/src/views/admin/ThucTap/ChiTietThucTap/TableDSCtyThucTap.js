

import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import React, { useMemo } from 'react';
import { Box, Button } from '@mantine/core';
import { IconDownload, IconUpload } from '@tabler/icons-react';
import { mkConfig, generateCsv, download } from 'export-to-csv'; //or use your library of choice here
import { Link, useNavigate } from "react-router-dom";
import exportFromJSON from 'export-from-json'
// import { CSVLink } from 'react-csv';
import {
    IconButton,
} from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { fetchAllThucTap, fetchDeleteCtyThucTap } from "../../GetData"
import { toast } from "react-toastify";

const csvConfig = mkConfig({
    filename: 'DanhsachCongTy',
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
});

const TableDSCtyThucTap = (props) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    let navigate = useNavigate();
    const MaDKTT = props.MaDKTT;
    const CongTyNgoaiDS = props.CongTyNgoaiDS;
    const CongTyTrongDS = props.CongTyTrongDS;
    const [listData, setListData] = useState(CongTyTrongDS)
    const [trangthaiCty, SetTrangthaiCty] = useState('CongTyTrongDS')
    const [exportData, setExportData] = useState([])

    const handleDeleteRows = async (row) => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchDeleteCtyThucTap(headers, MaDKTT, row.original.Email)
        if (res.status === true) {
            toast.success(res.message)
            navigate("/admin/thuctap")
            // navigate(`/admin/thuctap/single/${MaDKTT}`)
            return;
        }
        if (res.success === false) {
            toast.error(res.message)
            return;
        }
    }
    const onChangeSelect = (event) => {
        let changeValue = event.target.value;
        SetTrangthaiCty(changeValue)
        changeValue === 'CongTyTrongDS' ? setListData(CongTyTrongDS) : setListData(CongTyNgoaiDS)

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
                accessorKey: '_id',
                header: 'ID công ty',
                size: 0,
            },
            {
                accessorKey: 'TenCongTy',
                header: 'Tên công ty',
                size: 220,
                enableEditing: false, //disable editing on this column
                enableSorting: false,
            },
            {
                accessorKey: 'Website',
                header: 'Website',
                size: 150,
                enableEditing: false,


            },
            {
                accessorKey: 'SoDienThoai',
                header: 'Số điện thoại',
                size: 100,
                enableEditing: false,
            },
            {

                accessorKey: 'Email',
                header: 'Email',
                size: 120,
                enableEditing: false,

            },
            {
                accessorKey: 'DiaChi',
                header: 'Địa chỉ',
                size: 300,
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
        enableHiding: true,

        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '0.3rem' }}>

                <Link to={`/admin/thuctap/${MaDKTT}/single/${row.original._id}/${row.original.TenCongTy}`}>
                    <IconButton>
                        <Visibility fontSize="small" />
                    </IconButton>
                </Link>

                <Link to={`/admin/thuctap/${MaDKTT}/edit/${row.original._id}/${row.original.TenCongTy}`}>
                    <IconButton onClick={() => table.setEditingRow(row)}>
                        <Edit fontSize="small" />
                    </IconButton>
                </Link>

                <IconButton onClick={() => handleDeleteRows(row)}>
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
                <select value={trangthaiCty} className="select-btn" onChange={(event) => onChangeSelect(event, SetTrangthaiCty)} >
                    <option value='CongTyTrongDS'>Trong danh sách</option>
                    <option value='CongTyNgoaiDS'>Ngoài danh sách</option>
                </select>
                <Link to={`/admin/thuctap/${MaDKTT}/new/`}>
                    <Button>
                        Thêm công ty
                    </Button>
                </Link>

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

export default TableDSCtyThucTap