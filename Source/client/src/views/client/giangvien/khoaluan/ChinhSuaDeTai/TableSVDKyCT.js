
import "./ChinhSuaDeTai.scss"
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import React, { useMemo } from 'react';
import { Box, Button } from '@mantine/core';
import { IconDownload, IconUpload } from '@tabler/icons-react';
import { mkConfig, generateCsv, download } from 'export-to-csv'; //or use your library of choice here
import { IconButton } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDeleteSVChinhThuc } from "../../../GetData_client"
import { toast } from "react-toastify";
const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
});
const TableSVDKyCT = (props) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const title = props.title;
    const data_SV = props.list_data;

    const MaKLTN = props.MaKLTN;
    const TenDeTai = props.TenDeTai;
    const MaGV = props.MaGV;
    // const handleExportRows = (rows) => {
    //     const rowData = rows.map((row) => row.original);
    //     const csv = generateCsv(csvConfig)(rowData);
    //     download(csvConfig)(csv);
    // };

    // const handleExportData = () => {
    //     const csv = generateCsv(csvConfig)(SinhVienCT);
    //     download(csvConfig)(csv);
    // };

    const handleDeleteRows = async (row) => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchDeleteSVChinhThuc(headers, MaKLTN, TenDeTai, MaGV, row.original.MaSV)
        // console.log(res)
        if (res.status === true) {
            window.location.reload()
            return;
        }
        if (res.success === false) {
            toast.error(res.message)
            return;
        }
    }

    const columns = useMemo(
        () => [
            {
                accessorKey: 'MaSV',
                header: 'Mã sinh viên',
                size: 100,
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,

            },
            {
                accessorKey: 'HoSV',
                header: 'Họ sinh viên',
                size: 100,
                enableEditing: false,

            },
            {
                accessorKey: 'TenSV',
                header: 'Tên sinh viên',
                size: 100,
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,

            },
        ]
    );

    const table = useMantineReactTable({
        columns,
        data: data_SV,
        enableRowSelection: true,
        columnFilterDisplayMode: 'popover',
        paginationDisplayMode: 'pages',
        positionToolbarAlertBanner: 'bottom',
        positionActionsColumn: 'last',
        enableColumnActions: true,
        enableRowActions: true,
        enablePagination: false,

        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '0.3rem' }}>
                {/* <Link to={"/admin/nganhhoc/single/" + row.original.MaNganh}>
                    <IconButton onClick={() => table.setEditingRow(row)}>
                        <Visibility fontSize="small" />
                    </IconButton>
                </Link>
                <Link to={"/admin/nganhhoc/edit/" + row.original.MaNganh}>
                    <IconButton  >
                        <Edit fontSize="small" />
                    </IconButton>
                </Link> */}
                <IconButton onClick={() => handleDeleteRows(row)} >
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
                <h6 className='SV-CT'>{title}</h6>
            </Box>

        ),
    });
    return (
        <MantineReactTable table={table} />
    )
}
export default TableSVDKyCT 