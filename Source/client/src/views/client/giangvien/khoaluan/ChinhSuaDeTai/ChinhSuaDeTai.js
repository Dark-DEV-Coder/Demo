
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDetailDeTai, fetchDetailKhoaLuan, fetchAddDeTai, fetchEditDeTai } from "../../../GetData_client"
import { toast } from "react-toastify";
import moment from "moment";
import TableSVDKyCT from "./TableSVDKyCT";
import TableSVDKyDK from "./TableSVDKyDK";

const ChinhSuaDeTai = () => {
    const paramTenDeTai = useParams()
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const [khoaluan, setKhoaluan] = useState({})
    let navigate = useNavigate();
    const [thongtin, SetThongtin] = useState({})
    const [tendetai, SetTendetai] = useState("")
    const [SinhVienCT, setSinhVienCT] = useState([])
    const [SinhVienDK, setSinhVienDK] = useState([])

    // component didmount
    useEffect(() => {
        getDetailKhoaLuan();
    }, []);
    const getDetailKhoaLuan = async (MaSo) => {
        let thongtin = JSON.parse(localStorage.getItem("ThongTin"))
        SetThongtin(thongtin)
        const headers = { 'x-access-token': accessToken };
        let res = await fetchDetailKhoaLuan(headers);
        // console.log(res)
        if (res && res.data) {
            setKhoaluan(res.data)
            let res2 = await fetchDetailDeTai(headers, res.data.MaKLTN, paramTenDeTai.TenDeTai, thongtin.MaSo);
            if (res2 && res2.data) {
                SetTendetai(res2.data.TenDeTai)
                setSinhVienCT(res2.data.SVChinhThuc)
                setSinhVienDK(res2.data.SVDuKien)
            }
        }
    }

    const onChangeInput = (event, SetState) => {
        let changeValue = event.target.value;
        SetState(changeValue);
    }

    const handleEditDeTai = async () => {
        const headers = { 'x-access-token': accessToken };
        if (!headers || !tendetai) {
            toast.error("Vui lòng nhập đầy đủ dữ liệu !")
            return;
        }
        let res = await fetchEditDeTai(headers, khoaluan.MaKLTN, paramTenDeTai.TenDeTai, tendetai, thongtin.MaSo)
        if (res.status === true) {
            toast.success(res.message)
            navigate("/khoaluan")
            return;
        }
        if (res.status === false) {
            toast.error(res.message)
            return;
        }
    }


    // check dữ liệu
    // const [checktendangnhap, SetChecktendangnhap] = useState(true)
    const [checktendetai, SetChecktendetai] = useState(true)
    const checkdulieu = (value, SetDuLieu) => {
        value === '' ? SetDuLieu(false) : SetDuLieu(true)
    }
    return (
        <div className="container-taikhoan">
            <ol className="breadcrumb" >
                <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                <li className="breadcrumb-item">Khóa luận</li>
                <li className="breadcrumb-item active">{paramTenDeTai.TenDeTai}</li>
            </ol>
            <div className="container-tb-update">
                <h3>CHỈNH SỬA ĐỀ TÀI</h3>
            </div>
            {/* <div className="container-dky">
                <h5 className="them-dt">THÊM ĐỀ TÀI</h5>
            </div> */}
            {/* <h3>Điền đầy đủ thông tin sau</h3> */}
            <div className="content-dkythuctap">
                <div className="container-form">
                    <form className="form-edit">
                        <div className="container-edit">
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label className="inputDK" htmlFor="inputTrinhdo">Mã giảng viên</label>
                                    <input type="text" className="form-control" id="inputTrinhdo" defaultValue={thongtin.MaSo} disabled />
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="inputDK" htmlFor="inputTrinhdo">Tên đề tài</label>
                                    <input type="text" className="form-control" id="inputTrinhdo" value={tendetai} placeholder="Điền tên đề tài ..." onChange={(event) => onChangeInput(event, SetTendetai)} onBlur={() => checkdulieu(tendetai, SetChecktendetai)} />
                                    <div className="invalid-feedback" style={{ display: checktendetai ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                                </div>
                            </div>
                            <button type="button" className="btntk btn btn-secondary" onClick={() => handleEditDeTai()} >Lưu</button>
                            <TableSVDKyCT list_data={SinhVienCT} title="Sinh viên chính thức" MaKLTN={khoaluan.MaKLTN} TenDeTai={paramTenDeTai.TenDeTai} MaGV={thongtin.MaSo} />
                            {/* <div className="form-row">
                                <div className="form-group col-md-6">
                                    <TableSVDKyCT list_data={SinhVienCT} title="Sinh viên chính thức" />
                                </div>
                                <div className="form-group col-md-6">
                                    <TableSVDKyDK list_data={SinhVienDK} title="Sinh viên dự kiến" />
                                </div>
                            </div> */}
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}
export default ChinhSuaDeTai    