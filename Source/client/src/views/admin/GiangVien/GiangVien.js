
import "./GiangVien.scss"
import TableGiangVien from "./TableGiangVien";
import { Link } from "react-router-dom";
import { useState } from 'react';
const GiangVien = () => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    return (
        <>
            <main className="main2">
                {/* <HeaderMain title={'Chuyên ngành'} /> */}
                <div className="head-title">
                    <div className="left">
                        <h1>GIẢNG VIÊN</h1>
                        <ul className="breadcrumb">
                            <li>
                                <Link>Dashboard</Link>
                            </li>
                            <li><i className='bx bx-chevron-right'></i></li>
                            <li>
                                <Link className="active" >Giảng viên</Link>
                            </li>
                        </ul>
                    </div>
                    <Link to={"/admin/giangvien/new"} className="btn-download">
                        <i className='bx bxs-cloud-download'></i>
                        <span className="text">Tạo mới</span>
                    </Link>
                </div>
                <TableGiangVien accessToken={accessToken} />

            </main >
        </>
    )
}
export default GiangVien;