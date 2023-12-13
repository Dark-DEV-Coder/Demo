import "./TableDSSV.scss"
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import React, { useCallback, useMemo, useState } from 'react';
import { Box, Button } from '@mantine/core';
import { IconDownload, IconUpload } from '@tabler/icons-react';
import { mkConfig, generateCsv, download } from 'export-to-csv'; //or use your library of choice here
const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
});

const TableDSSV = (props) => {
    const { listData } = props;
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
                accessorKey: 'MaSV',
                header: 'Mã',
                size: 100,
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,

            },
            {
                accessorKey: 'HoSV',
                header: 'Họ lót',
                size: 200,
                enableEditing: false,

            },
            {
                accessorKey: 'TenSV',
                header: 'Tên',
                size: 100,
                enableEditing: false,
            },
            {

                accessorKey: 'ChuyenNganh',
                header: 'Chuyên ngành',
                size: 100,
                enableEditing: false,
            },
        ]
    );

    const table = useMantineReactTable({
        columns,
        data: listData,
        enableRowNumbers: true,
        columnFilterDisplayMode: 'popover',
        paginationDisplayMode: 'pages',
        positionToolbarAlertBanner: 'bottom',
        enableColumnActions: true,
    });

    return (
        <>

            <MantineReactTable table={table} />

        </>
    )

};

export default TableDSSV;