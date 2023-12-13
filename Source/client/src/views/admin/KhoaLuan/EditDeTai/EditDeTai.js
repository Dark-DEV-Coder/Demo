
import "./EditDeTai.scss"
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Button } from '@mantine/core';
import { fetchDetailKhoaLuan, fetchEditDeTai, fetchAddSinhVienDangKyKL, fetchEditSinhVienDangKyKL, fetchDeleteSinhVienDangKyKL } from "../../GetData"
import { toast } from "react-toastify";
const EditDeTai = () => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const detai = useParams();
    let navigate = useNavigate();
    const [Detai, setDetai] = useState({})
    const [GiangVien, setGiangVien] = useState({})

    const [TenDeTai, SetTenDeTai] = useState("")
    const [GiangVienHuongDan, SetGiangVienHuongDan] = useState("")

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
    // const [trangthai, SetTrangthai] = useState("")



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
                SetTenDeTai(dt[0].TenDeTai)
                SetGiangVienHuongDan(dt[0].GVHD.MaGV)
                setGiangVien(dt[0].GVHD)
                if (dt[0].SVChinhThuc[0]) {
                    setSinhVienCT1(dt[0].SVChinhThuc[0])
                    SetMssvsinhvien1(dt[0].SVChinhThuc[0].MaSV)
                    SetHosinhvien1(dt[0].SVChinhThuc[0].HoSV)
                    SetTensinhvien1(dt[0].SVChinhThuc[0].TenSV)
                    SetEmailsinhvien1(dt[0].SVChinhThuc[0].Email)
                    SetSdtsinhvien1(dt[0].SVChinhThuc[0].SoDienThoai)
                    SetStcsinhvien1(dt[0].SVChinhThuc[0].TinChiTL)
                    SetDtlsinhvien1(dt[0].SVChinhThuc[0].DTBTL)
                }

                if (dt[0].SVChinhThuc[1]) {
                    setSinhVienCT2(dt[0].SVChinhThuc[1])
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

    const handleEditDeTai = async () => {
        const headers = { 'x-access-token': accessToken };
        if (!headers || !TenDeTai || !GiangVienHuongDan) {
            toast.error("Vui lòng điền đầy đủ dữ liệu")
            return
        }
        if (!!SinhVienCT1 && mssvsinhvien1 && hosinhvien1 && tensinhvien1 && emailsinhvien1 && sdtsinhvien1 && stcsinhvien1 && dtlsinhvien1) {
            let addsv1 = await fetchAddSinhVienDangKyKL(headers, detai.MaKLTN, TenDeTai, GiangVienHuongDan, mssvsinhvien1, hosinhvien1, tensinhvien1, emailsinhvien1, sdtsinhvien1, dtlsinhvien1, stcsinhvien1)
        }
        if (SinhVienCT1 && mssvsinhvien1 && hosinhvien1 && tensinhvien1 && emailsinhvien1 && sdtsinhvien1 && stcsinhvien1 && dtlsinhvien1) {
            let editsv1 = await fetchEditSinhVienDangKyKL(headers, detai.MaKLTN, TenDeTai, GiangVienHuongDan, mssvsinhvien1, hosinhvien1, tensinhvien1, emailsinhvien1, sdtsinhvien1, dtlsinhvien1.toString(), stcsinhvien1.toString())
        }
        if (SinhVienCT1 && !mssvsinhvien1 && !hosinhvien1 && !tensinhvien1 && !emailsinhvien1 && !sdtsinhvien1 && !stcsinhvien1 && !dtlsinhvien1) {
            let deletesv1 = await fetchDeleteSinhVienDangKyKL(headers, detai.MaKLTN, TenDeTai, GiangVienHuongDan, SinhVienCT1.MaSV)
        }


        if (!!SinhVienCT2 && mssvsinhvien2 && hosinhvien2 && tensinhvien2 && emailsinhvien2 && sdtsinhvien2 && stcsinhvien2 && dtlsinhvien2) {
            let addsv2 = await fetchAddSinhVienDangKyKL(headers, detai.MaKLTN, TenDeTai, GiangVienHuongDan, mssvsinhvien2, hosinhvien2, tensinhvien2, emailsinhvien2, sdtsinhvien2, dtlsinhvien2, stcsinhvien2)
        }
        if (SinhVienCT2 && mssvsinhvien2 && hosinhvien2 && tensinhvien2 && emailsinhvien2 && sdtsinhvien2 && stcsinhvien2 && dtlsinhvien2) {
            let editsv2 = await fetchEditSinhVienDangKyKL(headers, detai.MaKLTN, TenDeTai, GiangVienHuongDan, mssvsinhvien2, hosinhvien2, tensinhvien2, emailsinhvien2, sdtsinhvien2, dtlsinhvien2, stcsinhvien2)
        }
        if (SinhVienCT2 && !mssvsinhvien2 && !hosinhvien2 && !tensinhvien2 && !emailsinhvien2 && !sdtsinhvien2 && !stcsinhvien2 && !dtlsinhvien2) {
            let deletesv2 = await fetchDeleteSinhVienDangKyKL(headers, detai.MaKLTN, TenDeTai, GiangVienHuongDan, SinhVienCT2.MaSV)
        }
        let res = await fetchEditDeTai(headers, detai.MaKLTN, Detai.TenDeTai, TenDeTai, GiangVienHuongDan)
        if (res.status === true) {
            toast.success(res.message)
            navigate(`/admin/khoaluan/${detai.MaKLTN}/detai/${detai.TenDeTai}`)
            return;
        }
        if (res.status === false) {
            toast.error(res.message)
            return;

        }
    }
    const onDeleteSV1 = () => {
        SetMssvsinhvien1("");
        SetHosinhvien1("")
        SetTensinhvien1("")
        SetEmailsinhvien1("")
        SetSdtsinhvien1("")
        SetStcsinhvien1("")
        SetDtlsinhvien1("")
    }
    const onDeleteSV2 = () => {
        SetMssvsinhvien2("");
        SetHosinhvien2("")
        SetTensinhvien2("")
        SetEmailsinhvien2("")
        SetSdtsinhvien2("")
        SetStcsinhvien2("")
        SetDtlsinhvien2("")
    }


    const onChangeInput = (event, SetState) => {
        let changeValue = event.target.value;
        SetState(changeValue);
    }
    const onChangeSelect = (event, SetSelect) => {
        let changeValue = event.target.value;
        SetSelect(changeValue);
    }

    // check dữ liệu
    const [checkdulieuGVHD, SetCheckdulieuGVHD] = useState(true)
    const [checkdulieuTen, SetCheckdulieuTen] = useState(true)
    const [checkdulieuDVCT, SetCheckdulieuDVCT] = useState(true)

    const checkdulieu = (value, SetDuLieu) => {
        value === '' ? SetDuLieu(false) : SetDuLieu(true)
    }

    return (
        <main className="main2">
            <div className="head-title">
                <div className="left">
                    <h1>CHỈNH SỬA ĐỀ TÀI</h1>
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
                            <Link className="active" >{detai.ten}</Link>
                        </li>
                    </ul>

                </div>


            </div>
            <form className="form-edit">
                <div className="container-edit">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="inputDT" htmlFor="inputTenDT">Tên đề tài</label>
                            <input type="text" className="form-control" id="inputTenDT" value={TenDeTai} onChange={(event) => onChangeInput(event, SetTenDeTai)} onBlur={() => checkdulieu(TenDeTai, SetCheckdulieuTen)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuTen ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="inputDT" htmlFor="inputGiangvienhuongdan">Mã giảng viên hướng dẫn</label>
                            <input type="text" className="form-control" id="inputGiangvienhuongdan" value={GiangVienHuongDan} onChange={(event) => onChangeInput(event, SetGiangVienHuongDan)} onBlur={() => checkdulieu(GiangVienHuongDan, SetCheckdulieuGVHD)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuGVHD ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                    </div>
                    <div className="form-row">
                        {/* <div className="form-group col-md-1"> */}
                        <Button className="form-group col-md-1" style={{ marginTop: '1.8rem' }} onClick={() => onDeleteSV1()}>Xóa</Button>
                        {/* </div> */}
                        <div className="form-group col-md-2">
                            <label className="inputDT" htmlFor="inputSDTSV1">Mã số SV1</label>
                            <input type="text" className="form-control" id="inputSDTSV1" value={mssvsinhvien1} onChange={(event) => onChangeInput(event, SetMssvsinhvien1)} />
                        </div>
                        <div className="form-group col-md-3">
                            <label className="inputDT" htmlFor="inputSV1">Họ Sinh viên 1</label>
                            <input type="text" className="form-control" id="inputSV1" value={hosinhvien1} onChange={(event) => onChangeInput(event, SetHosinhvien1)} />
                        </div>
                        <div className="form-group col-md-3">
                            <label className="inputDT" htmlFor="inputSV1">Tên Sinh viên 1</label>
                            <input type="text" className="form-control" id="inputSV1" value={tensinhvien1} onChange={(event) => onChangeInput(event, SetTensinhvien1)} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <label className="inputDT" htmlFor="inputEmailSV1">Email</label>
                            <input type="text" className="form-control" id="inputEmailSV1" value={emailsinhvien1} onChange={(event) => onChangeInput(event, SetEmailsinhvien1)} />
                        </div>
                        <div className="form-group col-md-3">
                            <label className="inputDT" htmlFor="inputEmailSV1">Số điện thoại</label>
                            <input type="text" className="form-control" id="inputEmailSV1" value={sdtsinhvien1} onChange={(event) => onChangeInput(event, SetSdtsinhvien1)} />
                        </div>
                        <div className="form-group col-md-3">
                            <label className="inputDT" htmlFor="inputSTCSV1">Số tín chỉ tích lũy</label>
                            <input type="number" className="form-control" id="inputSTCSV1" value={stcsinhvien1} min={0} onChange={(event) => onChangeInput(event, SetStcsinhvien1)} />
                        </div>
                        <div className="form-group col-md-3">
                            <label className="inputDT" htmlFor="inputDTB1">Điểm TB tích lũy hệ 4</label>
                            <input type="number" className="form-control" id="inputDTB1" value={dtlsinhvien1} min={0} onChange={(event) => onChangeInput(event, SetDtlsinhvien1)} />
                        </div>
                    </div>

                    <div className="form-row">
                        {/* <div className="form-group col-md-3"> */}
                        <Button className="form-group col-md-1" style={{ marginTop: '1.85rem' }} onClick={() => onDeleteSV2()} >Xóa</Button>
                        {/* </div> */}
                        <div className="form-group col-md-2">
                            <label className="inputDT" htmlFor="inputSDTSV2">Mã số SV2</label>
                            <input type="text" className="form-control" id="inputSDTSV2" value={mssvsinhvien2} onChange={(event) => onChangeInput(event, SetMssvsinhvien2)} />
                        </div>
                        <div className="form-group col-md-3">
                            <label className="inputDT" htmlFor="inputSV2">Họ sinh viên 2</label>
                            <input type="text" className="form-control" id="inputSV2" value={hosinhvien2} onChange={(event) => onChangeInput(event, SetHosinhvien2)} />
                        </div>
                        <div className="form-group col-md-3">
                            <label className="inputDT" htmlFor="inputSV2">Tên sinh viên 2</label>
                            <input type="text" className="form-control" id="inputSV2" value={tensinhvien2} onChange={(event) => onChangeInput(event, SetTensinhvien2)} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <label className="inputDT" htmlFor="inputEmailSV2">Email</label>
                            <input type="text" className="form-control" id="inputEmailSV2" value={emailsinhvien2} onChange={(event) => onChangeInput(event, SetEmailsinhvien2)} />
                        </div>
                        <div className="form-group col-md-3">
                            <label className="inputDT" htmlFor="inputEmailSV1">Số điện thoại</label>
                            <input type="text" className="form-control" id="inputEmailSV1" value={sdtsinhvien2} onChange={(event) => onChangeInput(event, SetSdtsinhvien2)} />
                        </div>
                        <div className="form-group col-md-3">
                            <label className="inputDT" htmlFor="inputSTCSV2">Số tín chỉ tích lũy</label>
                            <input type="number " className="form-control" id="inputSTCSV2" value={stcsinhvien2} min={0} onChange={(event) => onChangeInput(event, SetStcsinhvien2)} />
                        </div>
                        <div className="form-group col-md-3">
                            <label className="inputDT" htmlFor="inputDTB2">Điểm TB tích lũy hệ 4</label>
                            <input type="number" className="form-control" id="inputDTB2" value={dtlsinhvien2} min={0} onChange={(event) => onChangeInput(event, SetDtlsinhvien2)} />
                        </div>
                    </div>
                    <h6 style={{ textAlign: 'start', color: 'blue' }}>*Note: Nếu muốn xóa sinh viên đã đăng ký đề tài chỉ cần để trống tất cả thông tin của sinh viên đó </h6>



                    <button className="btn" type="button" onClick={() => handleEditDeTai()} >Lưu</button>
                </div>



            </form>
        </main>
    )
}
export default EditDeTai;