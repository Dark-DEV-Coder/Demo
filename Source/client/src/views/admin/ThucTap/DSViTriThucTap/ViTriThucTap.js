import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as React from 'react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { useMemo } from 'react';
import { Box, Button } from '@mantine/core';
import { mkConfig, generateCsv, download } from 'export-to-csv'; //or use your library of choice here
import { IconButton } from '@mui/material';
import { Delete, Edit, Label, Visibility } from '@mui/icons-material';
import { fetchDeleteViTriCtyThucTap, fetchDetailCongTyThucTap } from "../../GetData"
import { toast } from "react-toastify";
const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
});
const ViTriThucTap = () => {
    const ctythuctap = useParams();
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    let navigate = useNavigate();
    const [TenCongTy, SetTenCongTy] = useState("")
    const [Website, SetWebsite] = useState("")
    const [SoDienThoai, SetSoDienThoai] = useState("")
    const [Email, SetEmail] = useState("")
    const [DiaChi, SetDiaChi] = useState("")
    const [HoNguoiLienHe, SetHoNguoiLienHe] = useState("")
    const [TenNguoiLienHe, SetTenNguoiLienHe] = useState("")
    const [data_vitri, setData_vitri] = useState("")

    // component didmount
    useEffect(() => {
        getDetailCongTyThucTap();
        // getDSSVThucTap();
    }, []);
    const getDetailCongTyThucTap = async () => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchDetailCongTyThucTap(headers, ctythuctap.MaDKTT, ctythuctap.id);
        if (res && res.data) {
            SetTenCongTy(res.data.TenCongTy)
            SetWebsite(res.data.Website)
            SetSoDienThoai(res.data.SoDienThoai)
            SetEmail(res.data.Email)
            SetDiaChi(res.data.DiaChi)
            SetHoNguoiLienHe(res.data.HoNguoiLienHe)
            SetTenNguoiLienHe(res.data.TenNguoiLienHe)
            setData_vitri(res.data.DangKy)
        }
    }
    const handleDeleteRows = async (row) => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchDeleteViTriCtyThucTap(headers, ctythuctap.MaDKTT, row.original.ViTri, Email)
        if (res.status === true) {
            toast.success(res.message)
            navigate(`/admin/thuctap/single/${ctythuctap.MaDKTT}`)
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
        const csv = generateCsv(csvConfig)(data_vitri);
        download(csvConfig)(csv);
    };
    const columns = useMemo(
        () => [
            {
                accessorKey: 'ViTri',
                header: 'Vị trí',
                size: 100,
                enableColumnOrdering: false,
                enableEditing: false, //disable editing on this column
                enableSorting: false,
            },
            {
                accessorKey: 'ToiDa',
                header: 'Tối đa',
                size: 100,
                enableEditing: false,
            },
            {
                accessorKey: 'DaDangKy',
                header: 'Đã đăng ký',
                size: 100,
                enableEditing: false,
            },
            {
                accessorKey: 'ConLai',
                header: 'Còn lại    ',
                size: 100,
                enableEditing: false,
            },
        ]
    );

    const table = useMantineReactTable({
        columns,
        data: data_vitri,
        enableRowSelection: true,
        columnFilterDisplayMode: 'popover',
        paginationDisplayMode: 'pages',
        positionToolbarAlertBanner: 'bottom',
        positionActionsColumn: 'last',
        enableColumnActions: true,
        enableRowActions: true,

        renderTopToolbarCustomActions: ({ row, table }) => (
            <Box
                sx={{
                    display: 'flex',
                    gap: '16px',
                    padding: '8px',
                    flexWrap: 'wrap',
                }}
            >
                <Link to={`/admin/thuctap/${ctythuctap.MaDKTT}/${ctythuctap.id}/new`}>
                    <Button>
                        Thêm vị trí công ty
                    </Button>
                </Link>
            </Box>

        ),

        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '0.3rem' }}>
                <Link onClick={() => table.setEditingRow(row)}>
                    <IconButton>
                        <Visibility fontSize="small" />
                    </IconButton>
                </Link>

                <IconButton onClick={() => handleDeleteRows(row)}>
                    <Delete fontSize="small" sx={{ color: 'red' }} />
                </IconButton>
            </Box >
        ),
    })
    return (
        <main className="main2">
            {/* <HeaderMain title={'Chuyên ngành'} /> */}
            <div className="head-title">
                <div className="left">
                    <h1>VỊ TRÍ THỰC TẬP</h1>
                    <ul className="breadcrumb">
                        <li>
                            <Link>Dashboard</Link>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <Link>Thực tập tốt nghiệp</Link>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <Link>{ctythuctap.TenCongTy}</Link>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <Link className="active" >Danh sách vị trí của {ctythuctap.TenCongTy}</Link>
                        </li>
                    </ul>
                </div>

            </div>
            <form className="form-edit">
                <div className="container-edit">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="inputGV" htmlFor="inputTen">Tên công ty</label>
                            <input type="text" className="form-control" id="inputTen" defaultValue={TenCongTy} disabled={true} />
                        </div>
                        <div className="form-group col-md-6">
                            <label className="inputGV" htmlFor="inputWebsite">Website</label>
                            <input type="text" className="form-control" id="inputWebsite" defaultValue={Website} disabled={true} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="inputGV" htmlFor="inputTen">Họ người liên hệ</label>
                            <input type="text" className="form-control" id="inputTen" defaultValue={HoNguoiLienHe} disabled={true} />
                        </div>
                        <div className="form-group col-md-6">
                            <label className="inputGV" htmlFor="inputWebsite">Tên người liên hệ</label>
                            <input type="text" className="form-control" id="inputWebsite" defaultValue={TenNguoiLienHe} disabled={true} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="inputGV" htmlFor="inputSoDienThoai">Số điện thoại</label>
                            <input type="text" className="form-control" id="inputSoDienThoai" defaultValue={SoDienThoai} disabled={true} />
                        </div>
                        <div className="form-group col-md-6">
                            <label className="inputGV" htmlFor="inputEmail">Email</label>
                            <input type="text" className="form-control" id="inputEmail" defaultValue={Email} disabled={true} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label className="inputGV" htmlFor="inputDiaChi">Địa chỉ</label>
                            <input type="text" className="form-control" id="inputDiaChi" defaultValue={DiaChi} disabled={true} />

                        </div>
                    </div>
                </div>
            </form>
            <div>
                <div className="card4">
                    <h6 className="card-header">Danh sách vị trí thực tập tại công ty</h6>
                </div>
                <MantineReactTable table={table} />
            </div>



        </main >
    )
}
export default ViTriThucTap