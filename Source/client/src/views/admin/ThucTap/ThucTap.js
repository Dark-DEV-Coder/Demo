import TableThucTap from "./TableThucTap";
import "./ThucTap.scss"
import { Link } from "react-router-dom";
import { useState } from 'react';
const ThucTap = () => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    return (
        <>
            <main className="main2" style={{ height: '800px' }}>
                {/* <HeaderMain title={'Chuyên ngành'} /> */}
                <div className="head-title">
                    <div className="left">
                        <h1>THỰC TẬP TỐT NGHIỆP</h1>
                        <ul className="breadcrumb">
                            <li>
                                <Link>Dashboard</Link>
                            </li>
                            <li><i className='bx bx-chevron-right'></i></li>
                            <li>
                                <Link className="active" >Thực tập tốt nghiệp</Link>
                            </li>
                        </ul>
                    </div>
                    <Link to={"/admin/thuctap/new"} className="btn-download">
                        <i className='bx bxs-cloud-download'></i>
                        <span className="text">Tạo mới</span>
                    </Link>
                </div>

                <TableThucTap accessToken={accessToken} />
            </main >
        </>
    )
}
export default ThucTap;