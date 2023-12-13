
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import * as React from 'react';
import { fetchPhucHoiMatKhau } from "../GetData"
import { toast } from "react-toastify";
const PhucHoiMatKhau = () => {

    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    let navigate = useNavigate();
    const MaGV = localStorage.getItem("MaGV")
    const [mkmoi, SetMkmoi] = useState('')
    const handleEditMK = async () => {
        const headers = { 'x-access-token': accessToken };
        if (!headers || !mkmoi) {
            toast.error("Vui lòng nhập đầy đủ dữ liệu !")
            return;
        }
        let res = await fetchPhucHoiMatKhau(headers, MaGV, mkmoi)
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
    // const [checkdulieuMkcu, SetCheckdulieuMkcu] = useState(true)
    const [checkdulieuMkmoi, SetCheckdulieuMkmoi] = useState(true)
    // const [checkdulieuMkmoi2, SetCheckdulieuMkmoi2] = useState(true)
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
                            <Link className="active" >Phục hồi mật khẩu</Link>
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
                            <label className="inputNganh" htmlFor="inputTen">Mật khẩu khôi phục</label>
                            <input type="text" className="form-control" id="inputTen" value={mkmoi} placeholder="Điền mật khẩu khôi phục ..." onChange={(event) => onChangeInputSL(event, SetMkmoi)} onBlur={() => checkdulieu(mkmoi, SetCheckdulieuMkmoi)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuMkmoi ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                    </div>

                    <button className="btn" type="button" onClick={() => handleEditMK()}>Lưu</button>
                </div>
            </form>
        </main >
    )
}
export default PhucHoiMatKhau;