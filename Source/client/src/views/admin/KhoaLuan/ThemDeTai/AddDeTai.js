import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from 'moment';
import * as React from 'react';
import { fetchAddDeTai } from "../../GetData"
import { toast } from "react-toastify";
const AddDeTai = () => {

    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    let navigate = useNavigate();
    const maKLTN = useParams();
    const [MaGV, setMaGV] = useState("")
    const [TenDeTai, setTenDeTai] = useState("")

    const handleAddKhoaLuan = async () => {
        const headers = { 'x-access-token': accessToken };
        if (!headers || !MaGV || !TenDeTai) {
            toast.error("Vui lòng điền đầy đủ dữ liệu")
            return
        }
        let res = await fetchAddDeTai(headers, maKLTN.MaKLTN, TenDeTai, MaGV)
        if (res.status === true) {
            toast.success(res.message)
            navigate(`/admin/khoaluan/single/${maKLTN.MaKLTN}`)
            return;
        }
        if (res.status === false) {
            toast.error(res.message)
            return;
        }
    }



    const onChangeInputSL = (event, setSL) => {
        let changeValue = event.target.value;
        setSL(changeValue);
    }
    // check dữ liệu
    const [checkdulieuMaGV, setCheckdulieuMaGV] = useState(true)
    const [checkdulieuTenDeTai, setCheckdulieuTenDeTai] = useState(true)
    const checkdulieu = (value, setDuLieu) => {
        value === '' ? setDuLieu(false) : setDuLieu(true)
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
                            <Link>Khóa luận</Link>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <Link>Đề tài</Link>
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
                            <label className="inputKL" htmlFor="inputTen">Tên đề tài</label>
                            <input type="text" className="form-control" id="inputTen" value={TenDeTai} placeholder="Điền tên đề tài ..." onChange={(event) => onChangeInputSL(event, setTenDeTai)} onBlur={() => checkdulieu(TenDeTai, setCheckdulieuTenDeTai)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuTenDeTai ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="inputKL" htmlFor="inputTen">Mã giảng viên</label>
                            <input type="text" className="form-control" id="inputTen" value={MaGV} placeholder="Điền mã giảng viên ..." onChange={(event) => onChangeInputSL(event, setMaGV)} onBlur={() => checkdulieu(MaGV, setCheckdulieuMaGV)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuMaGV ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                    </div>
                    <button className="btn" type="button" onClick={() => handleAddKhoaLuan()}>Lưu</button>
                </div>



            </form>



        </main >
    )
}
export default AddDeTai;