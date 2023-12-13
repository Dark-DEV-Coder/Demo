import { useEffect, useState } from "react";
import { fetchDetailThucTap } from "../../../GetData_client"
import moment from "moment";
import TableCtyThucTap from "./TableCtyThucTap";
const ThongTinDotThucTap = () => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const [thuctap, setThuctap] = useState({})
    const [listcty, setListcty] = useState([])

    useEffect(() => {
        getDetailThucTap()
    }, [])

    const getDetailThucTap = async () => {
        const headers = { 'x-access-token': accessToken };
        let ress = await fetchDetailThucTap(headers)
        // console.log("DetailThucTap ", ress)
        if (ress && ress.data) {
            setThuctap(ress.data)
            setListcty(ress.data.CongTyTrongDS)
        }
    }
    const isEmpty = (v) => {
        return Object.keys(v).length === 0;
    };
    if (!isEmpty(thuctap)) {
        return (
            <div className="container-taikhoan">
                <ol className="breadcrumb" >
                    <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                    <li className="breadcrumb-item">Thực tập tốt nghiệp</li>
                    <li className="breadcrumb-item active">{thuctap.Ten}</li>
                </ol>
                {/* Thông tin đợt DKCN */}
                <div className="container-tb-update">
                    <h3>{thuctap.Ten}</h3>
                    <h6>Ngày cập nhật : {moment(thuctap.updatedAt).format("DD/MM/YYYY")}</h6>
                    <h6 className="time-line">Thời gian đăng ký : [{moment(thuctap.ThoiGianBD).format("hh:mm:ss DD/MM/YYYY")} - {moment(thuctap.ThoiGianKT).format("hh:mm:ss DD/MM/YYYY")} ] </h6>
                </div>

                <div className="content-dkythuctap">
                    <div className="container-form">
                        <TableCtyThucTap list_data={listcty} />
                    </div>
                </div >
            </div >
        )
    }
    else
        return (
            <div className="container-taikhoan">
                <ol className="breadcrumb" >
                    <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                    <li className="breadcrumb-item">Đăng ký thực tập</li>
                </ol>
                {/* Thông tin đợt DKCN */}
                <div className="container-tb-update">
                    <h3>Hiện tại không có đợt đăng ký thực tập nào được mở</h3>
                </div>
            </div >
        )


}
export default ThongTinDotThucTap