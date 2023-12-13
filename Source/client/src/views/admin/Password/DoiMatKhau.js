import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import * as React from 'react';
import { fetchEditMatKhau } from "../GetData"
import { toast } from "react-toastify";
const DoiMatKhau = () => {

    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    let navigate = useNavigate();
    const MaGV = localStorage.getItem("MaGV")
    const [mkcu, SetMkcu] = useState('')
    const [mkmoi, SetMkmoi] = useState('')
    const [nhaplaimkmoi, SetNhaplaimkmoi] = useState('')
    const handleEditMK = async () => {
        const headers = { 'x-access-token': accessToken };
        if (!headers || !mkcu || !mkmoi || !nhaplaimkmoi) {
            toast.error("Vui lòng nhập đầy đủ dữ liệu !")
            return;
        }
        if (mkmoi !== nhaplaimkmoi) {
            toast.error("Nhập lại mật khẩu không giống mật khẩu mới !")
            return;
        }
        let res = await fetchEditMatKhau(headers, MaGV, mkcu, mkmoi, nhaplaimkmoi)
        if (res.status === true) {
            window.localStorage.clear();
            navigate("/admin/login")
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

    // check dữ liệu
    const [checkdulieuMkcu, SetCheckdulieuMkcu] = useState(true)
    const [checkdulieuMkmoi, SetCheckdulieuMkmoi] = useState(true)
    const [checkdulieuMkmoi2, SetCheckdulieuMkmoi2] = useState(true)
    const checkdulieu = (value, SetDuLieu) => {
        value === '' ? SetDuLieu(false) : SetDuLieu(true)
    }

    return (
        <main className="main2">
            {/* <HeaderMain title={'Chuyên ngành'} /> */}
            <div className="head-title">
                <div className="left">
                    <h1>CHỈNH SỬA</h1>
                    <ul className="breadcrumb">
                        <li>
                            <Link>Dashboard</Link>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <Link>Tài khoản</Link>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <Link className="active" >Đổi mật khẩu</Link>
                        </li>


                    </ul>
                </div>

            </div>


            <form className="form-edit">
                <div className="container-edit">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="inputNganh" htmlFor="inputMa">Mã giảng viên</label>
                            <input type="text" className="form-control" id="inputMa" defaultValue={MaGV} disabled={true} />
                        </div>
                        <div className="form-group col-md-6">
                            <label className="inputNganh" htmlFor="inputTen">Mật khẩu cũ</label>
                            <input type="text" className="form-control" id="inputTen" value={mkcu} placeholder="Điền mật khẩu cũ ..." onChange={(event) => onChangeInputSL(event, SetMkcu)} onBlur={() => checkdulieu(mkcu, SetCheckdulieuMkcu)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuMkcu ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="inputNganh" htmlFor="inputMa">Mật khẩu mới</label>
                            <input type="text" className="form-control" id="inputMa" value={mkmoi} placeholder="Điền mật khẩu mới ..." onChange={(event) => onChangeInputSL(event, SetMkmoi)} onBlur={() => checkdulieu(mkmoi, SetCheckdulieuMkmoi)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuMkmoi ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="inputNganh" htmlFor="inputTen">Nhập lại mật khẩu mới</label>
                            <input type="text" className="form-control" id="inputTen" value={nhaplaimkmoi} placeholder="Điền lại mật khẩu mới ..." onChange={(event) => onChangeInputSL(event, SetNhaplaimkmoi)} onBlur={() => checkdulieu(nhaplaimkmoi, SetCheckdulieuMkmoi2)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuMkmoi2 ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                    </div>
                    <button className="btn" type="button" onClick={() => handleEditMK()}>Lưu</button>
                </div>
            </form>
        </main >
    )
}
export default DoiMatKhau;