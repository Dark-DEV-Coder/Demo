
import "./ChiTietDeTai.scss"
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDetailKhoaLuan } from "../../GetData"
const ChiTietDeTai = () => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const detai = useParams();

    const [Detai, setDetai] = useState({})
    const [GiangVien, setGiangVien] = useState({})
    const [SinhVienCT1, setSinhVienCT1] = useState({})
    const [SinhVienCT2, setSinhVienCT2] = useState({})

    const [mssvsinhvien1, SetMssvsinhvien1] = useState("")
    const [hosinhvien1, SetHosinhvien1] = useState("")
    const [tensinhvien1, SetTensinhvien1] = useState("")
    const [emailsinhvien1, SetEmailsinhvien1] = useState("")
    const [sdtsinhvien1, SetSdtsinhvien1] = useState("")
    const [stcsinhvien1, SetStcsinhvien1] = useState("")
    const [dtlsinhvien1, SetDtlsinhvien1] = useState("")

    const [mssvsinhvien2, SetMssvsinhvien2] = useState("")
    const [hosinhvien2, SetHosinhvien2] = useState("")
    const [tensinhvien2, SetTensinhvien2] = useState("")
    const [emailsinhvien2, SetEmailsinhvien2] = useState("")
    const [sdtsinhvien2, SetSdtsinhvien2] = useState("")
    const [stcsinhvien2, SetStcsinhvien2] = useState("")
    const [dtlsinhvien2, SetDtlsinhvien2] = useState("")

    // component didmount
    useEffect(() => {
        getDetailKhoaLuan();
    }, []);
    const getDetailKhoaLuan = async () => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchDetailKhoaLuan(headers, detai.MaKLTN);
        if (res && res.data) {
            const dt = res.data.DSDeTai.filter(item => item.TenDeTai === detai.TenDeTai)
            if (dt) {
                setDetai(dt[0])
                setGiangVien(dt[0].GVHD)
                if (dt[0].SVChinhThuc[0]) {
                    SetMssvsinhvien1(dt[0].SVChinhThuc[0].MaSV)
                    SetHosinhvien1(dt[0].SVChinhThuc[0].HoSV)
                    SetTensinhvien1(dt[0].SVChinhThuc[0].TenSV)
                    SetEmailsinhvien1(dt[0].SVChinhThuc[0].Email)
                    SetSdtsinhvien1(dt[0].SVChinhThuc[0].SoDienThoai)
                    SetStcsinhvien1(dt[0].SVChinhThuc[0].TinChiTL)
                    SetDtlsinhvien1(dt[0].SVChinhThuc[0].DTBTL)
                }

                if (dt[0].SVChinhThuc[1]) {
                    SetMssvsinhvien2(dt[0].SVChinhThuc[1].MaSV)
                    SetHosinhvien2(dt[0].SVChinhThuc[1].HoSV)
                    SetTensinhvien2(dt[0].SVChinhThuc[1].TenSV)
                    SetEmailsinhvien2(dt[0].SVChinhThuc[1].Email)
                    SetSdtsinhvien2(dt[0].SVChinhThuc[1].SoDienThoai)
                    SetStcsinhvien2(dt[0].SVChinhThuc[1].TinChiTL)
                    SetDtlsinhvien2(dt[0].SVChinhThuc[1].DTBTL)
                }
            }

        }
    }


    const onChangeInput = (event, SetState) => {
        let changeValue = event.target.value;
        SetState(changeValue);
    }
    const onChangeSelect = (event, SetSelect) => {
        let changeValue = event.target.value;
        SetSelect(changeValue);
    }

    return (
        <main className="main2">
            <div className="head-title">
                <div className="left">
                    <h1>CHI TIẾT ĐỀ TÀI</h1>
                    <ul className="breadcrumb">
                        <li>
                            <Link>Dashboard</Link>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <Link>Khóa luận</Link>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <Link>Đề tài</Link>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <Link className="active" >{detai.TenDeTai}</Link>
                        </li>
                    </ul>

                </div>


            </div>
            <form className="form-edit">
                <div className="container-edit">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="inputDT" htmlFor="inputTenDT">Tên đề tài</label>
                            <input type="text" className="form-control" id="inputTenDT" value={Detai.TenDeTai} disabled />
                        </div>
                        <div className="form-group col-md-6">
                            <label className="inputDT" htmlFor="inputGiangvienhuongdan">Giảng viên hướng dẫn</label>
                            <input type="text" className="form-control" id="inputGiangvienhuongdan" value={GiangVien.HoGV + " " + GiangVien.TenGV} disabled />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <label className="inputDT" htmlFor="inputSDTSV1">Mã số SV1</label>
                            <input type="text" className="form-control" id="inputSDTSV1" value={mssvsinhvien1} disabled />
                        </div>
                        <div className="form-group col-md-3">
                            <label className="inputDT" htmlFor="inputSV1">Họ Sinh viên 1</label>
                            <input type="text" className="form-control" id="inputSV1" value={hosinhvien1} disabled />
                        </div>
                        <div className="form-group col-md-3">
                            <label className="inputDT" htmlFor="inputSV1">Tên Sinh viên 1</label>
                            <input type="text" className="form-control" id="inputSV1" value={tensinhvien1} disabled />
                        </div>
                    </div>
                    <div className="form-row" >
                        <div className="form-group col-md-3">
                            <label className="inputDT" htmlFor="inputEmailSV1">Email</label>
                            <input type="text" className="form-control" id="inputEmailSV1" value={emailsinhvien1} disabled />
                        </div>
                        <div className="form-group col-md-3">
                            <label className="inputDT" htmlFor="inputEmailSV1">Số điện thoại</label>
                            <input type="text" className="form-control" id="inputEmailSV1" value={sdtsinhvien1} disabled />
                        </div>
                        <div className="form-group col-md-3">
                            <label className="inputDT" htmlFor="inputSTCSV1">Số tín chỉ tích lũy</label>
                            <input type="text" className="form-control" id="inputSTCSV1" value={stcsinhvien1} disabled />
                        </div>
                        <div className="form-group col-md-3">
                            <label className="inputDT" htmlFor="inputDTB1">Điểm TB tích lũy hệ 4</label>
                            <input type="text" className="form-control" id="inputDTB1" value={dtlsinhvien1} disabled />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <label className="inputDT" htmlFor="inputSDTSV2">Mã số SV2</label>
                            <input type="text" className="form-control" id="inputSDTSV2" value={mssvsinhvien2} disabled />
                        </div>
                        <div className="form-group col-md-3">
                            <label className="inputDT" htmlFor="inputSV2">Họ sinh viên 2</label>
                            <input type="text" className="form-control" id="inputSV2" value={hosinhvien2} disabled />
                        </div>
                        <div className="form-group col-md-3">
                            <label className="inputDT" htmlFor="inputSV2">Tên sinh viên 2</label>
                            <input type="text" className="form-control" id="inputSV2" value={tensinhvien2} disabled />
                        </div>

                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <label className="inputDT" htmlFor="inputEmailSV2">Email</label>
                            <input type="text" className="form-control" id="inputEmailSV2" value={emailsinhvien2} disabled />
                        </div>
                        <div className="form-group col-md-3">
                            <label className="inputDT" htmlFor="inputEmailSV1">Số điện thoại</label>
                            <input type="text" className="form-control" id="inputEmailSV1" value={sdtsinhvien2} disabled />
                        </div>
                        <div className="form-group col-md-3">
                            <label className="inputDT" htmlFor="inputSTCSV2">Số tín chỉ tích lũy</label>
                            <input type="text" className="form-control" id="inputSTCSV2" value={stcsinhvien2} disabled />
                        </div>
                        <div className="form-group col-md-3">
                            <label className="inputDT" htmlFor="inputDTB2">Điểm TB tích lũy hệ 4</label>
                            <input type="text" className="form-control" id="inputDTB2" value={dtlsinhvien2} disabled />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label className="inputDT" htmlFor="inputTenDT">Trạng thái đề tài</label>
                            <input type="text" className="form-control" id="inputTenDT" value={Detai.TrangThaiDeTai} disabled />
                        </div>
                    </div>




                    {/* <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="inputDT" htmlFor="inputGioitinhGV">Giới tính</label>
                            <select value={gioitinh} onChange={(event) => onChangeSelect(event, SetGioitinh)} id="inputGioitinhGV" className="form-control">
                                <option value='Nam'>Nam</option>
                                <option value='Nữ'>Nữ</option>
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="inputDT" htmlFor="inputNgaysinh">Ngày sinh</label>
                            <input type="date" className="form-control" id="inputNgaysinh" value={ngaysinh} onChange={(event) => onChangeInput(event, SetNgaysinh)} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label className="inputDT" htmlFor="inputTrinhdo">Trình độ</label>
                            <input type="text" className="form-control" id="inputTrinhdo" value={trinhdo} onChange={(event) => onChangeInput(event, SetTrinhdo)} />
                        </div>

                    </div> */}
                    {/* <button className="btn" type="submit">Submit form</button> */}
                </div>



            </form>
        </main>
    )
}
export default ChiTietDeTai;