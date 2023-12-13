
import "./SingleTaiKhoan.scss"
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDetailTaiKhoan, fetchAllQuyenTK } from "../../GetData"
import { toast } from "react-toastify";
const SingleTaiKhoan = () => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const taikhoan = useParams();
    let navigate = useNavigate();
    const [MaTK, setMaTK] = useState("")
    const [TenDangNhap, setTenDangNhap] = useState("")
    const [MatKhau, setMatKhau] = useState("")
    const [QuyenTK, setQuyenTK] = useState("SINHVIEN")
    const [listQuyenTK, setListQuyenTK] = useState([]);
    // component didmount
    useEffect(() => {
        getDetailTaiKhoan();
        getListQuyenTK();
    }, []);

    const getDetailTaiKhoan = async () => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchDetailTaiKhoan(headers, taikhoan.MaTK);
        if (res && res.data) {
            setMaTK(res.data.MaTK)
            setTenDangNhap(res.data.TenDangNhap)
            setMatKhau(res.data.MatKhau)
            setQuyenTK(res.data.MaQTK.MaQTK)
        }
    }
    const getListQuyenTK = async () => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchAllQuyenTK(headers);
        if (res && res.data && res.data.DanhSach) {
            setListQuyenTK(res.data.DanhSach)
        }
    }
    return (
        <>
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
                                <Link  >Tài khoản</Link>
                            </li>
                            <li><i className='bx bx-chevron-right'></i></li>
                            <li>
                                <Link className="active" >{taikhoan.MaTK}</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <form className="form-new">
                    <div className="container-edit">
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label className="inputTK" htmlFor="inputTenDN">Tên đăng nhập</label>
                                <input type="text" className="form-control" id="inputTenDN" value={TenDangNhap} disabled />
                            </div>
                            {/* <div className="form-group col-md-6">
                                <label className="inputTK" htmlFor="inputTenGV">Mật khẩu</label>
                                <input type="text" className="form-control" id="inputTenDN" value={dulieutest.MatKhau} disabled />
                            </div> */}
                        </div>
                        <div className="form-row" >
                            <div className="form-group col-md-12">
                                <label className="inputDT" htmlFor="inputTrangthai">Quyền tài khoản </label>
                                <select value={QuyenTK} id="inputTrangthai" className="form-control" disabled >
                                    {listQuyenTK && listQuyenTK.length > 0 &&
                                        listQuyenTK.map((item, index) => {
                                            return (
                                                <option value={item.MaQTK} key={item.MaQTK}>{item.TenQuyenTK}</option>
                                            )
                                        })
                                    }

                                </select>
                            </div>

                        </div>
                    </div>
                </form>


            </main >
        </>
    )
}
export default SingleTaiKhoan;