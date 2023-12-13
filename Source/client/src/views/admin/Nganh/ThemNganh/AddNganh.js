import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import * as React from 'react';
import "./AddNganh.scss"
import { fetchAddNganh } from "../../GetData"
import { toast } from "react-toastify";
const AddNganh = () => {

    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    let navigate = useNavigate();
    const [Manganh, SetMaNganh] = useState('')
    const [TenNganh, SetTenNganh] = useState('')
    const handleAddNganh = async () => {
        const headers = { 'x-access-token': accessToken };
        if (!Manganh || !TenNganh) {
            toast.error("Vui lòng nhập đầy đủ dữ liệu !")
            return
        }
        let res = await fetchAddNganh(headers, Manganh, TenNganh)
        if (res.status === true) {
            toast.success(res.message)
            navigate("/admin/nganhhoc")
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
    const [checkdulieuMa, SetCheckdulieuMa] = useState(true)
    const [checkdulieuTen, SetCheckdulieuTen] = useState(true)
    const checkdulieu = (value, SetDuLieu) => {
        value === '' ? SetDuLieu(false) : SetDuLieu(true)
    }

    return (
        <main className="main2">
            {/* <HeaderMain title={'Chuyên ngành'} /> */}
            <div className="head-title">
                <div className="left">
                    <h1>TẠO MỚI</h1>
                    <ul className="breadcrumb">
                        <li>
                            <Link>Dashboard</Link>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <Link>Ngành</Link>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <Link className="active" >Tạo mới</Link>
                        </li>


                    </ul>
                </div>

            </div>


            <form className="form-edit">
                <div className="container-edit">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="inputNganh" htmlFor="inputMa">Mã ngành</label>
                            <input type="text" className="form-control" id="inputMa" placeholder="Điền mã ngành ..." onChange={(event) => onChangeInputSL(event, SetMaNganh)} onBlur={() => checkdulieu(Manganh, SetCheckdulieuMa)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuMa ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="inputNganh" htmlFor="inputTen">Tên ngành</label>
                            <input type="text" className="form-control" id="inputTen" placeholder="Điền tên ngành ..." onChange={(event) => onChangeInputSL(event, SetTenNganh)} onBlur={() => checkdulieu(TenNganh, SetCheckdulieuTen)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuTen ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                    </div>


                    <button className="btn" type="button" onClick={() => handleAddNganh()}>Lưu</button>
                </div>
            </form>
        </main >
    )
}
export default AddNganh;