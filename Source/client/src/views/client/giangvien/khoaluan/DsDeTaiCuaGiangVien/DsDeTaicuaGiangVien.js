
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { fetchDetailKhoaLuan, fetchDSDeTaiCuaGV, fetchDeleteDeTai } from "../../../GetData_client"
import moment from "moment";
const DsDeTaicuaGiangVien = () => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const [khoaluan, setKhoaluan] = useState({})
    const [detai, setKDetai] = useState([])
    const [thongtin, setthongtin] = useState({})
    // component didmount
    useEffect(() => {
        getDetailKhoaLuan();
    }, []);
    const getDetailKhoaLuan = async () => {
        let thongtin = JSON.parse(localStorage.getItem("ThongTin"))
        setthongtin(thongtin)
        const headers = { 'x-access-token': accessToken };
        let res = await fetchDetailKhoaLuan(headers);
        // console.log(res)
        if (res && res.data) {
            setKhoaluan(res.data)
            let res2 = await fetchDSDeTaiCuaGV(headers, res.data.MaKLTN, thongtin.MaSo)
            if (res2 && res2.data) {
                setKDetai(res2.data)
            }
        }
    }

    const handleDeleteDeTai = async (TenDeTai) => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchDeleteDeTai(headers, khoaluan.MaKLTN, TenDeTai, thongtin.MaSo)
        // console.log(res)
        if (res.status === true) {
            toast.success(res.message)
            getDetailKhoaLuan()
            return;
        }
        if (res.success === false) {
            toast.error(res.message)
            return;
        }
    }
    const isEmpty = (v) => {
        return Object.keys(v).length === 0;
    };
    if (!isEmpty(khoaluan)) {
        return (
            <div className="container-khoaluan">
                <ol className="breadcrumb" >
                    <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                    <li className="breadcrumb-item">Khóa luận tốt nghiệp</li>
                    <li className="breadcrumb-item active">{khoaluan.Ten}</li>
                </ol>
                <div className="container-tb-update">
                    <h3>{khoaluan.Ten}</h3>
                    <h6>Ngày cập nhật : {moment(khoaluan.updatedAt).format("DD/MM/YYYY")}</h6>
                    <h6 className="time-line">Thời gian đăng ký : [{moment(khoaluan.ThoiGianBD).format("DD/MM/YYYY")} - {moment(khoaluan.ThoiGianKT).format("DD/MM/YYYY")} ] </h6>
                </div>
                <div className="container-dky">
                    <h5>Danh sách đề tài được công bố</h5>
                    <Link to="/khoaluan/taomoi">
                        <button type="button" style={{ marginLeft: '0.5rem' }} className="btn btn-outline-primary">Thêm đề tài</button>
                    </Link>

                </div>

                <div className="content-table">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col" rowSpan="2">#</th>
                                <th scope="col" colSpan="2">Sinh viên thực hiện đề tài</th>
                                <th scope="col" rowSpan="2">Số tín chỉ tích lỹ</th>
                                <th scope="col" rowSpan="2">Điểm TB tích lỹ hệ 4</th>
                                <th scope="col" rowSpan="2" className="th-email">Email</th>
                                <th scope="col" rowSpan="2">Điện thoại</th>
                                <th scope="col" rowSpan="2">Tên đề tài</th>
                                <th scope="col" colSpan="2" rowSpan="2">Hành động</th>
                            </tr>
                            <tr>
                                <th scope="col">Họ tên sinh viên</th>
                                <th scope="col">Mã số sinh viên</th>


                            </tr>
                        </thead>
                        <tbody>
                            {detai && detai.length > 0 &&
                                detai.map((item, index) => {
                                    // Khi đề tài đủ 2 SV đăng ký
                                    if (item.SVChinhThuc.length > 1) {
                                        return (
                                            <>
                                                <tr >
                                                    <th scope="row" rowSpan="2">{index + 1}</th>
                                                    <td>{item.SVChinhThuc[0].HoSV + " " + item.SVChinhThuc[0].TenSV}</td>
                                                    <td> {item.SVChinhThuc[0].MaSV}</td>
                                                    <td>{item.SVChinhThuc[0].TinChiTL}</td>
                                                    <td>{item.SVChinhThuc[0].DTBTL}</td>
                                                    <td>{item.SVChinhThuc[0].Email}</td>
                                                    <td>{item.SVChinhThuc[0].SoDienThoai}</td>
                                                    <td rowSpan="2">{item.TenDeTai}</td>
                                                    <td rowSpan="2" colSpan="2">
                                                        <div style={{ display: 'flex' }}>
                                                            <Link to={"/khoaluan/chinhsua-detai/" + item.TenDeTai}>
                                                                <button type="button" style={{ marginLeft: '0.5rem' }} className="btn btn-outline-success">Sửa</button>
                                                            </Link>
                                                            <button type="button" style={{ marginLeft: '0.5rem' }} className="btn btn-outline-danger" onClick={() => handleDeleteDeTai(item.TenDeTai)}>Xóa</button>
                                                        </div>
                                                    </td>
                                                </tr >
                                                <tr>
                                                    <td>{item.SVChinhThuc[1].HoSV + " " + item.SVChinhThuc[1].TenSV}</td>
                                                    <td> {item.SVChinhThuc[1].MaSV}</td>
                                                    <td>{item.SVChinhThuc[1].TinChiTL}</td>
                                                    <td>{item.SVChinhThuc[1].DTBTL}</td>
                                                    <td>{item.SVChinhThuc[1].Email}</td>
                                                    <td>{item.SVChinhThuc[1].SoDienThoai}</td>
                                                </tr></>
                                        )
                                    }

                                    //Khi đề tài chỉ 1 SV đăng ký
                                    if (item.SVChinhThuc.length === 1) {
                                        return (
                                            <>
                                                <tr key={item.TenDeTai}>
                                                    <th scope="row" rowSpan="2">{index + 1}</th>
                                                    <td>{item.SVChinhThuc[0].HoSV + " " + item.SVChinhThuc[0].TenSV}</td>
                                                    <td> {item.SVChinhThuc[0].MaSV}</td>
                                                    <td>{item.SVChinhThuc[0].TinChiTL}</td>
                                                    <td>{item.SVChinhThuc[0].DTBTL}</td>
                                                    <td>{item.SVChinhThuc[0].Email}</td>
                                                    <td>{item.SVChinhThuc[0].SoDienThoai}</td>
                                                    <td rowSpan="2">{item.TenDeTai}</td>
                                                    <td rowSpan="2" colSpan="2">
                                                        <div style={{ display: 'flex' }}>
                                                            <Link to={"/khoaluan/chinhsua-detai/" + item.TenDeTai}>
                                                                <button type="button" style={{ marginLeft: '0.5rem' }} className="btn btn-outline-success">Sửa</button>
                                                            </Link>
                                                            <button type="button" style={{ marginLeft: '0.5rem' }} className="btn btn-outline-danger" onClick={() => handleDeleteDeTai(item.TenDeTai)}>Xóa</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            </>

                                        )
                                    }

                                    //Khi đề tài không có SV đăng ký
                                    if (!item.SVChinhThuc.length) {
                                        return (
                                            <>
                                                <tr key={item.TenDeTai}>
                                                    <th scope="row" rowSpan="2">{index + 1}</th>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td rowSpan="2">{item.TenDeTai}</td>
                                                    <td rowSpan="2" colSpan="2">
                                                        <div style={{ display: 'flex' }}>
                                                            <Link to={"/khoaluan/chinhsua-detai/" + item.TenDeTai}>
                                                                <button type="button" style={{ marginLeft: '0.5rem' }} className="btn btn-outline-success">Sửa</button>
                                                            </Link>
                                                            <button type="button" style={{ marginLeft: '0.5rem' }} className="btn btn-outline-danger" onClick={() => handleDeleteDeTai(item.TenDeTai)}>Xóa</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            </>
                                        )
                                    }

                                })
                            }

                        </tbody>
                    </table>
                    <h6>Ghi chú: mỗi số thứ tự là 2 sinh viên chung một đề tài</h6>
                </div>
            </div >
        )
    }
    else
        return (
            <div className="container-taikhoan">
                <ol className="breadcrumb" >
                    <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                    <li className="breadcrumb-item">Khóa luận tốt nghiệp</li>
                </ol>
                {/* Thông tin đợt DKCN */}
                <div className="container-tb-update">
                    <h3>Hiện tại không có đợt đăng ký khóa luận tốt nghiệp nào được mở</h3>
                </div>
            </div >
        )

}
export default DsDeTaicuaGiangVien