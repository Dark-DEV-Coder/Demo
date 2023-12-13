import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as React from 'react';
import "./EditNganh.scss"
import TableChuyenNganh from "../ChiTietNganh/TableChuyenNganh/TableChuyenNganh";
import { fetchDetailNganh, fetchEditNganh } from "../../GetData"
import { toast } from "react-toastify";
const EditNganh = () => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const nganh = useParams();
    let navigate = useNavigate();

    // get chi tiết ngành 
    const [detailNganh, SetDetailNganh] = useState({});
    const [chuyennganh, SetChuyennganh] = useState([]);
    const [MaNganh, SetMaNganh] = useState("");
    const [TenNganh, SetTenNganh] = useState("");

    // component didmount
    useEffect(() => {
        getDetailNganh();

    }, []);

    const getDetailNganh = async () => {
        const headers = { 'x-access-token': accessToken };

        let res = await fetchDetailNganh(headers, nganh.MaNganh);
        if (res && res.data && res.data.Nganh) {
            SetDetailNganh(res.data.Nganh)
            SetChuyennganh(res.data.ChuyenNganh)
            SetMaNganh(res.data.Nganh.MaNganh)
            SetTenNganh(res.data.Nganh.TenNganh)
        }
    }
    const handleEditNganh = async () => {
        const headers = { 'x-access-token': accessToken };
        if (!MaNganh || !TenNganh) {
            toast.error("Vui lòng điền đầy đủ dữ liệu !")
            return
        }
        let res = await fetchEditNganh(headers, MaNganh, TenNganh)
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
                    <h1>CHỈNH SỬA</h1>
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
                            <Link className="active" >{TenNganh}</Link>
                        </li>


                    </ul>
                </div>

            </div>


            <form className="form-edit">
                <div className="container-edit">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="inputNganh" htmlFor="inputMa">Mã ngành</label>
                            <input type="text" className="form-control" id="inputMa" value={MaNganh} onChange={(event) => onChangeInputSL(event, SetMaNganh)} onBlur={(event) => checkdulieu(MaNganh, SetCheckdulieuMa)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuMa ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="inputNganh" htmlFor="inputTen">Tên ngành</label>
                            <input type="text" className="form-control" id="inputTen" value={TenNganh} onChange={(event) => onChangeInputSL(event, SetTenNganh)} onBlur={(event) => checkdulieu(TenNganh, SetCheckdulieuTen)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuTen ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                    </div>
                    <TableChuyenNganh listData_chuyennganh={chuyennganh} />

                    <button className="btn" type="button" onClick={() => handleEditNganh()}>Lưu</button>
                </div>



            </form>



        </main >
    )
}
export default EditNganh;