
import "./KhoaLuanCacNam.scss"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchDetailKhoaLuan, fetchKhoaLuanCacNam, fetchDetailKhoaLuanCacNam } from "../../../GetData_client"
import moment from "moment";
const KhoaLuanCacNam = () => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const [khoaluan, setKhoaluan] = useState({})
    const [detai, setKDetai] = useState([])

    const [dsKLCongBo, setDsKLCongBo] = useState([])
    const [maKLTN, setMaKLTN] = useState("")
    // component didmount
    useEffect(() => {
        getDSKhoaLuanCongBo();
    }, []);
    const getDSKhoaLuanCongBo = async () => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchKhoaLuanCacNam(headers);
        if (res && res.data) {
            setDsKLCongBo(res.data)
            setMaKLTN(res.data[0].MaKLTN)
            let res2 = await fetchDetailKhoaLuanCacNam(headers, res.data[0].MaKLTN);
            if (res2 && res.data) {
                setKDetai(res2.data.DSDeTai)
            }
        }
    }
    const onChangeSelect = async (event, SetSelect) => {
        let changeValue = event.target.value;
        SetSelect(changeValue);

        const headers = { 'x-access-token': accessToken };
        let res = await fetchDetailKhoaLuanCacNam(headers, changeValue);
        if (res && res.data) {
            setKDetai(res.data.DSDeTai)
        }

    }

    const isEmpty = (v) => {
        return Object.keys(v).length === 0;
    };
    if (!isEmpty(dsKLCongBo)) {
        return (
            <div className="container-khoaluan">
                <ol className="breadcrumb" >
                    <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                    <li className="breadcrumb-item">Khóa luận tốt nghiệp</li>
                    <li className="breadcrumb-item active">Danh sách khóa luận được công bố các năm</li>
                </ol>
                <div className="container-tb-update">
                    <h3>Danh sách khóa luận được công bố qua các năm</h3>
                    <select value={dsKLCongBo && dsKLCongBo.length > 0 ? maKLTN : ""} className="select-btnn" onChange={(event) => onChangeSelect(event, setMaKLTN)}>
                        {dsKLCongBo && dsKLCongBo.length > 0 && dsKLCongBo.map((item, index) => {
                            return (
                                <option value={item.MaKLTN}>{item.Ten}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="container-dky">
                    <h5>Danh sách đề tài được công bố</h5>
                </div>

                <div className="content-table">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col" rowSpan="2">#</th>
                                <th scope="col" colSpan="2">Sinh viên thực hiện đề tài</th>
                                {/* <th scope="col" rowSpan="2">Số tín chỉ tích lỹ</th>
                                <th scope="col" rowSpan="2">Điểm TB tích lỹ hệ 4</th>
                                <th scope="col" rowSpan="2" className="th-email">Email</th>
                                <th scope="col" rowSpan="2">Điện thoại</th> */}
                                <th scope="col" rowSpan="2">Tên đề tài</th>
                                <th scope="col" colSpan="2">Giảng viên hướng dẫn</th>
                                <th scope="col" colSpan="3">Kết quả</th>
                            </tr>
                            <tr>
                                <th scope="col">Họ tên sinh viên</th>
                                <th scope="col">Mã số sinh viên</th>

                                <th scope="col">Họ tên</th>
                                <th scope="col">Đơn vị công tác</th>

                                <th scope="col">Điểm</th>
                                <th scope="col">Ngày chấm</th>
                                <th scope="col">Ghi chú</th>
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
                                                    {/* <td>{item.SVChinhThuc[0].TinChiTL}</td>
                                                    <td>{item.SVChinhThuc[0].DTBTL}</td>
                                                    <td>{item.SVChinhThuc[0].Email}</td>
                                                    <td>{item.SVChinhThuc[0].SoDienThoai}</td> */}
                                                    <td rowSpan="2">{item.TenDeTai}</td>
                                                    <td rowSpan="2">{item.GVHD.HoGV + " " + item.GVHD.TenGV}</td>
                                                    <td rowSpan="2">{item.GVHD.DonViCongTac}</td>

                                                    <td rowSpan="2">9</td>
                                                    <td rowSpan="2">12-01-2024</td>
                                                    <td rowSpan="2"></td>
                                                </tr>
                                                <tr>
                                                    <td>{item.SVChinhThuc[1].HoSV + " " + item.SVChinhThuc[1].TenSV}</td>
                                                    <td> {item.SVChinhThuc[1].MaSV}</td>
                                                    {/* <td>{item.SVChinhThuc[1].TinChiTL}</td>
                                                    <td>{item.SVChinhThuc[1].DTBTL}</td>
                                                    <td>{item.SVChinhThuc[1].Email}</td>
                                                    <td>{item.SVChinhThuc[1].SoDienThoai}</td> */}
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
                                                    {/* <td>{item.SVChinhThuc[0].TinChiTL}</td>
                                                    <td>{item.SVChinhThuc[0].DTBTL}</td>
                                                    <td>{item.SVChinhThuc[0].Email}</td>
                                                    <td>{item.SVChinhThuc[0].SoDienThoai}</td> */}
                                                    <td rowSpan="2">{item.TenDeTai}</td>
                                                    <td rowSpan="2">{item.GVHD.HoGV + " " + item.GVHD.TenGV}</td>
                                                    <td rowSpan="2">{item.GVHD.DonViCongTac}</td>

                                                    <td rowSpan="2">9.5</td>
                                                    <td rowSpan="2">12-01-2024</td>
                                                    <td rowSpan="2"></td>
                                                </tr>
                                                <tr>
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
                                                    <td rowSpan="2">{item.TenDeTai}</td>
                                                    <td rowSpan="2">{item.GVHD.HoGV + " " + item.GVHD.TenGV}</td>
                                                    <td rowSpan="2">{item.GVHD.DonViCongTac}</td>
                                                </tr>
                                                <tr>
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
                    <li className="breadcrumb-item active">Danh sách khóa luận được công bố các năm</li>
                </ol>
                {/* Thông tin đợt DKCN */}
                <div className="container-tb-update">
                    <h3>Danh sách khóa luận được công bố các năm rỗng</h3>
                </div>
            </div >
        )

}
export default KhoaLuanCacNam