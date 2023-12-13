

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as React from 'react';
import "./ChiTietNganh.scss"
import TableChuyenNganh from "./TableChuyenNganh/TableChuyenNganh";
import { fetchDetailNganh } from "../../GetData"
const ChiTietNganh = () => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const nganh = useParams();

    // get chi tiết ngành 
    const [detailNganh, SetDetailNganh] = useState({});
    const [chuyennganh, SetChuyennganh] = useState([]);
    const [manganh, SetManganh] = useState("");
    const [tennganh, SetTennganh] = useState("");

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
            SetManganh(res.data.Nganh.MaNganh)
            SetTennganh(res.data.Nganh.TenNganh)
        }
    }



    const onChangeInputSL = (event, SetSL) => {
        let changeValue = event.target.value;
        SetSL(changeValue);
    }
    return (
        <main className="main2">
            {/* <HeaderMain title={'Chuyên ngành'} /> */}
            <div className="head-title">
                <div className="left">
                    <h1>THÔNG TIN CHI TIẾT</h1>
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
                            <Link className="active" >{tennganh}</Link>
                        </li>
                    </ul>
                </div>

            </div>


            <form className="form-edit">
                <div className="container-edit">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="inputNganh" htmlFor="inputMa">Mã ngành</label>
                            <input type="text" className="form-control" id="inputMa" value={manganh} disabled />
                        </div>
                        <div className="form-group col-md-6">
                            <label className="inputNganh" htmlFor="inputTen">Tên ngành</label>
                            <input type="text" className="form-control" id="inputTen" value={tennganh} disabled />
                        </div>
                    </div>

                    <TableChuyenNganh listData_chuyennganh={chuyennganh} />
                    {/* <button className="btn" type="submit">Submit form</button> */}
                </div>
            </form>
        </main >
    )
}
export default ChiTietNganh;