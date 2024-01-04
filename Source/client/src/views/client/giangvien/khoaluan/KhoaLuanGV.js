import "./KhoaLuanGV.scss"
import { Link, useNavigate } from "react-router-dom";
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import { data_khoaluan } from "../../data"
import { useState, useEffect } from "react";
import { fetchDetailKhoaLuan, fetchDSDeTaiCuaGVChuaDK, fetchDeleteSVDuKien, fetchAcceptSVDangKy } from "../../GetData_client"
import { toast } from "react-toastify";
import moment from "moment";
const KhoaLuanGV = () => {
    let navigate = useNavigate();
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const [khoaluan, setKhoaluan] = useState({})
    const [detai, setDetai] = useState([])
    const [search, SetSearch] = useState('')
    const [thongtin, setThongtin] = useState({})

    // component didmount
    useEffect(() => {
        getDetailKhoaLuan();
    }, []);
    const getDetailKhoaLuan = async (MaSo) => {
        let thongtin = JSON.parse(localStorage.getItem("ThongTin"))
        setThongtin(thongtin)
        const headers = { 'x-access-token': accessToken };
        let res = await fetchDetailKhoaLuan(headers);
        console.log(res)
        if (res && res.data) {
            setKhoaluan(res.data)
            let res2 = await fetchDSDeTaiCuaGVChuaDK(headers, res.data.MaKLTN, thongtin.MaSo);
            // console.log(res2)
            setDetai(res2.data)
        }
    }

    const handleAcceptSVDuKien = async (value_SV, value_TenDeTai) => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchAcceptSVDangKy(headers, khoaluan.MaKLTN, value_TenDeTai, thongtin.MaSo, value_SV.MaSV, value_SV.HoSV, value_SV.TenSV, value_SV.Email, value_SV.SoDienThoai, value_SV.DTBTL, value_SV.TinChiTL)
        // console.log(res)
        if (res.status === true) {
            window.location.reload()
            return;
        }
        if (res.success === false) {
            toast.error(res.message)
            return;
        }
    }

    const handleDeleteSVDuKien = async (value_MaSV, value_TenDeTai) => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchDeleteSVDuKien(headers, khoaluan.MaKLTN, value_TenDeTai, thongtin.MaSo, value_MaSV)
        // console.log(res)
        if (res.status === true) {
            window.location.reload()
            return;
        }
        if (res.success === false) {
            toast.error(res.message)
            return;
        }
    }

    const onChangSearch = (event) => {
        let result = event.target.value;
        SetSearch(result);
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
                    <h6 className="time-line">Thời gian đăng ký : [{moment(khoaluan.ThoiGianBD).format("hh:mm:ss DD/MM/YYYY")} - {moment(khoaluan.ThoiGianKT).format("hh:mm:ss DD/MM/YYYY")} ] </h6>
                </div>
                <div className="container-dky">
                    <h5>Danh sách sinh viên đăng ký đề tài</h5>
                    <div className="col-md-4">
                        <input type="text" className="form-control" id="validationCustom02" placeholder="Tìm kiếm ..." onChange={(event) => onChangSearch(event)} />
                    </div>
                </div>

                <div className="content-table">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col" rowSpan="2">#</th>
                                <th scope="col" colSpan="2">Sinh viên đăng ký đề tài</th>
                                <th scope="col" rowSpan="2">Số tín chỉ tích lỹ</th>
                                <th scope="col" rowSpan="2">Điểm TB tích lỹ hệ 4</th>
                                <th scope="col" rowSpan="2" className="th-email">Email</th>
                                <th scope="col" rowSpan="2">Điện thoại</th>
                                <th scope="col" rowSpan="2">Tên đề tài</th>
                                <th scope="col" colSpan="2">Giảng viên hướng dẫn</th>
                            </tr>
                            <tr>
                                <th scope="col">Họ tên sinh viên</th>
                                <th scope="col">Mã số sinh viên</th>

                                <th scope="col" colSpan="2">
                                    <button type="button" className="btn btn-outline-dark">Xóa tất cả</button>
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {detai && detai.length > 0 &&
                                detai.filter((item) => {
                                    return search.toLocaleLowerCase() === '' ? item : item.TenDeTai.toLocaleLowerCase().includes(search)
                                }).map((item, index) => {
                                    // console.log(item)
                                    return (
                                        item.SVDuKien && item.SVDuKien.length > 0 && item.SVDuKien.map((item2, index2) => {
                                            return (
                                                <tr tr key={index2} >
                                                    <th scope="row">{index2 + 1}</th>
                                                    <td>{item2.HoSV + " " + item2.TenSV}</td>
                                                    <td>{item2.MaSV}</td>
                                                    <td>{item2.TinChiTL}</td>
                                                    <td>{item2.DTBTL}</td>
                                                    <td>{item2.Email}</td>
                                                    <td>{item2.SoDienThoai}</td>
                                                    <td >{item.TenDeTai}</td>
                                                    <td ><button type="button" className="btn btn-outline-success" onClick={() => handleAcceptSVDuKien(item2, item.TenDeTai)}>Chấp nhận</button></td>
                                                    <td ><button type="button" className="btn btn-outline-danger" onClick={() => handleDeleteSVDuKien(item2.MaSV, item.TenDeTai)}>Từ chối</button></td>
                                                </tr>
                                            )
                                        })

                                    )

                                })
                            }

                            {/* {khoaluan && khoaluan.length > 0 &&
                                khoaluan.filter((item) => {
                                    return search.toLocaleLowerCase() === '' ? item : item.ten.toLocaleLowerCase().includes(search)
                                }).map((item, index) => {
                                    return (
                                        <>
                                            <tr key={index}>
                                                <th scope="row" rowSpan="2">{index + 1}</th>
                                                <td>{item.sinhvien1}</td>
                                                <td>{item.MSSV1}</td>
                                                <td>{item.TC1}</td>
                                                <td>{item.TB1}</td>
                                                <td>{item.Email1}</td>
                                                <td>{item.Sdt1}</td>
                                                <td rowSpan="2">{item.ten}</td>
                                                <td rowSpan="2"><button type="button" className="btn btn-outline-success">Chấp nhận</button></td>
                                                <td rowSpan="2"><button type="button" className="btn btn-outline-danger">Từ chối</button></td>
                                            </tr>
                                            <tr>
                                                <td>{item.sinhvien2}</td>
                                                <td>{item.MSSV2}</td>
                                                <td>{item.TC2}</td>
                                                <td>{item.TB2}</td>
                                                <td>{item.Email2}</td>
                                                <td>{item.Sdt2}</td>
                                            </tr></>
                                    )
                                })
                            } */}
                        </tbody >
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
export default KhoaLuanGV