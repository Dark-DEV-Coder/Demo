import "./TableCTDKCN.scss"
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

const TableCTDKCN = (props) => {
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
                size: 100,
                enableEditing: false,

            },
            {
                accessorKey: 'TenSV',
                header: 'Tên',
                size: 100,
                enableEditing: false,
            },
            {

                accessorKey: 'Diem',
                header: 'Điểm',
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
        enableRowSelection: true,
        columnFilterDisplayMode: 'popover',
        paginationDisplayMode: 'pages',
        positionToolbarAlertBanner: 'bottom',
        enableColumnActions: true,
        renderTopToolbarCustomActions: ({ table }) => (
            <Box
                sx={{
                    display: 'flex',
                    gap: '16px',
                    padding: '8px',
                    flexWrap: 'wrap',
                }}
            >
                {/* <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Tất cả
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item dd ">Đăng ký</a>
                        <a className="dropdown-item dd">Chưa đăng ký</a>

                    </div>
                </div> */}

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
            </Box>

        ),
    });

    return (
        <>

            <MantineReactTable table={table} />

        </>
    )

};

export default TableCTDKCN;