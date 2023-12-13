

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import * as React from 'react';
import { fetchImportDSSVSinhVien } from "../../GetData"
import { toast } from "react-toastify";
const ImportSV = () => {
    let navigate = useNavigate();
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const [captaikhoan, SetCaptaikhoan] = useState('Tạo tài khoản')
    const [matkhau, SetMatkhau] = useState('')
    const [fileSV, SetFileSV] = useState('')
    const handleImportDSSV = async () => {
        const headers = { 'x-access-token': accessToken };
        if (!captaikhoan || !matkhau || !fileSV) {
            toast.error("Vui lòng nhập đầy đủ dữ liệu !")
            return
        }
        let value_dssv = new FormData();
        value_dssv.append("CapTaiKhoan", captaikhoan);
        value_dssv.append("MatKhauMacDinh", matkhau);
        value_dssv.append("FileExcel", fileSV);
        let res = await fetchImportDSSVSinhVien(headers, value_dssv)
        if (res.status === true) {
            toast.success(res.message)
            navigate("/admin/sinhvien")
            return;
        }
        if (res.status === false) {
            toast.error(res.message)
            return;
        }
    }

    const onChangeInputSL = (event, SetSL) => {
        let changeValue = event.target.value;
        SetSL(changeValue);
    }
    const onChangeFile = (event, setSL) => {
        const file = event.target.files[0];
        // console.log(file)
        // img.preview = URL.createObjectURL(img)
        setSL(file)
    }
    const onChangeSelect = (event, SetSelect) => {
        let changeValue = event.target.value;
        SetSelect(changeValue);
    }
    // check dữ liệu
    const [checkdulieuFile, SetCheckdulieuFile] = useState(true)
    const [checkdulieuMatkhau, SetCheckdulieuMatkhau] = useState(true)
    const checkdulieu = (value, SetDuLieu) => {
        value === '' ? SetDuLieu(false) : SetDuLieu(true)
    }

    return (
        <main className="main2">
            {/* <HeaderMain title={'Chuyên ngành'} /> */}
            <div className="head-title">
                <div className="left">
                    <h1>IMPORT DATA SINH VIÊN</h1>
                    <ul className="breadcrumb">
                        <li>
                            <Link>Dashboard</Link>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <Link>Sinh viên</Link>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <Link className="active" >Import file</Link>
                        </li>


                    </ul>
                </div>

            </div>
            <form className="form-edit">
                <div className="container-edit">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="inputGV" htmlFor="inputGioitinhGV">Tài khoản</label>
                            <select value={captaikhoan} onChange={(event) => onChangeSelect(event, SetCaptaikhoan)} id="inputGioitinhGV" className="form-control">
                                <option value='Tạo tài khoản'>Tạo tài khoản</option>
                                <option value='Không tạo tài khoản'>Không tạo tài khoản</option>
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="inputNganh" htmlFor="inputTen">Mật khẩu</label>
                            <input type="text" className="form-control" id="inputTen" placeholder="Điền mật khẩu ..." value={matkhau} onChange={(event) => onChangeInputSL(event, SetMatkhau)} onBlur={() => checkdulieu(matkhau, SetCheckdulieuMatkhau)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuMatkhau ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <div className="custom-file">
                                <label className="inputKL" htmlFor="inputDSDT">File sinh viên</label>
                                <input type="file" accept=".xlsx" className="form-control file" id="inputDSDT" onChange={(event) => onChangeFile(event, SetFileSV)} onBlur={() => checkdulieu(fileSV, SetCheckdulieuFile)} />
                            </div>
                            <div className="invalid-feedback" style={{ display: 'block', color: 'blue' }}>Chỉ chấp nhận các file có đuôi là .xlsx</div>
                            <div className="invalid-feedback" style={{ display: checkdulieuFile ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>

                        </div>
                    </div>
                    <button className="btn" type="button" onClick={() => handleImportDSSV()}>Lưu</button>
                </div>
            </form>
        </main >
    )
}
export default ImportSV;