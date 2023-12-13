
import TableTotNghiep from "./TableTotNghiep";
import { Link } from "react-router-dom";
import { useState } from 'react';
const TotNghiep = () => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    return (
        <>
            <main className="main2">
                {/* <HeaderMain title={'Chuyên ngành'} /> */}
                <div className="head-title">
                    <div className="left">
                        <h1>TỐT NGHIỆP</h1>
                        <ul className="breadcrumb">
                            <li>
                                <Link>Dashboard</Link>
                            </li>
                            <li><i className='bx bx-chevron-right'></i></li>
                            <li>
                                <Link className="active" >Tốt nghiệp</Link>
                            </li>
                        </ul>
                    </div>
                    <Link to={"/admin/totnghiep/new"} className="btn-download">
                        <i className='bx bxs-cloud-download'></i>
                        <span className="text">Tạo mới</span>
                    </Link>
                </div>

                <TableTotNghiep accessToken={accessToken} />
            </main >
        </>
    )
}
export default TotNghiep;