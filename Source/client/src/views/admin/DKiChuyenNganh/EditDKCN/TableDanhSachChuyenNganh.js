import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import React, { useMemo } from 'react';
import { Box, Button } from '@mantine/core';
import { IconDownload, IconUpload } from '@tabler/icons-react';
import { mkConfig, generateCsv, download } from 'export-to-csv'; //or use your library of choice here
import { Link, useNavigate } from "react-router-dom";
import { IconButton } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { fetchDeleteChuyenNganhDK } from "../../GetData"
import { toast } from "react-toastify";
import { useState, useEffect } from 'react';
const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
});

const TableDSChuyenNganh = (props) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    let navigate = useNavigate();
    const list_data = props.list_data
    const MaDKCN = props.MaDKCN

    const handleDeleteRows = async (row) => {
        // console.log(row.original.ChuyenNganh.MaChuyenNganh)
        const headers = { 'x-access-token': accessToken };
        let res = await fetchDeleteChuyenNganhDK(headers, MaDKCN, row.original.Nganh.MaNganh, row.original.ChuyenNganh.MaChuyenNganh)
        // console.log(res)
        if (res.status === true) {
            // window.location.reload();
            // navigate("/admin/dkychuyennganh")
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
        const csv = generateCsv(csvConfig)(list_data);
        download(csvConfig)(csv);
    };
    const columns = useMemo(
        () => [
            {
                accessorKey: 'chuyennganh',
                header: 'Tên chuyên ngành',
                size: 100,
                accessorFn: (dataRow) => dataRow.ChuyenNganh.TenChuyenNganh,
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,

            },
            {
                accessorKey: 'nganh',
                header: 'Tên ngành',
                accessorFn: (dataRow) => dataRow.Nganh.TenNganh,
                size: 200,
                enableEditing: false,
            },
            {
                accessorKey: 'toida',
                header: 'Số lượng tối đa',
                accessorFn: (dataRow) => dataRow.DaDangKy + "/" + dataRow.ToiDa,
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
        positionActionsColumn: 'last',
        enableColumnActions: true,
        enableRowActions: true,

        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '0.3rem' }}>

                <IconButton onClick={() => table.setEditingRow(row)}>
                    <Visibility fontSize="small" />
                </IconButton>

                <Link to={`/admin/dkychuyennganh/${MaDKCN}/chinh-sua-chuyen-nganh/${row.original.Nganh.MaNganh}/${row.original.ChuyenNganh.MaChuyenNganh}/${row.original.ToiDa}`}>
                    <IconButton  >
                        <Edit fontSize="small" />
                    </IconButton>
                </Link>
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
                <Link to={`/admin/dkychuyennganh/${MaDKCN}/them-chuyen-nganh`}>
                    <Button
                        color="lightblue"
                        //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                        // onClick={handleExportData}
                        // leftIcon={<Add />}
                        variant="filled"
                    >
                        + Thêm chuyên ngành cho đợt đăng ký
                    </Button>
                </Link>

            </Box>

        ),
    });
    return (
        <MantineReactTable table={table} />
    )
};

export default TableDSChuyenNganh;