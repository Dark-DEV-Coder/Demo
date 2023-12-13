import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import React, { useMemo } from 'react';
import { Box } from '@mantine/core';
const TableCtyThucTap = (props) => {
    const listcty = props.list_data;
    const columns = useMemo(
        () => [
            {
                accessorKey: 'TenCongTy',
                header: 'Tên công ty',
                size: 200,
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,

            },
            {
                accessorKey: 'Website',
                header: 'Website',
                size: 100,
                enableEditing: false,

            },
            {
                accessorKey: 'HoNguoiLienHe',
                header: 'Họ người liên hệ',
                size: 100,
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,
            },
            {
                accessorKey: 'TenNguoiLienHe',
                header: 'Tên người liên hệ',
                size: 100,
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,
            },
            {
                accessorKey: 'SoDienThoai',
                header: 'Số điện thoại',
                size: 100,
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,

            },
            {
                accessorKey: 'Email',
                header: 'Email',
                size: 100,
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,

            },
            {
                accessorKey: 'DiaChi',
                header: 'Địa chỉ',
                size: 300,
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,

            },
        ]
    );

    const table = useMantineReactTable({
        columns,
        data: listcty,
        enableRowSelection: true,
        columnFilterDisplayMode: 'popover',
        paginationDisplayMode: 'pages',
        positionToolbarAlertBanner: 'bottom',
        enableColumnActions: false,
        enableRowActions: false,

        renderTopToolbarCustomActions: ({ table }) => (
            <Box
                sx={{
                    display: 'flex',
                    gap: '16px',
                    padding: '8px',
                    flexWrap: 'wrap',
                }}
            >
                <h6 className='SV-CT'>Danh sách công ty thực tập</h6>
            </Box>

        ),
    });
    return (
        <MantineReactTable table={table} />
    )
}
export default TableCtyThucTap 