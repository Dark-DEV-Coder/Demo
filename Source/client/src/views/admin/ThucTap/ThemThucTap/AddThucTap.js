import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from 'moment';
import * as React from 'react';
import { fetchAddThucTap, fetchImportDSSVSinhVien } from "../../GetData"
import { toast } from "react-toastify";
const AddThucTap = () => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    let navigate = useNavigate();

    const date = moment().format("YYYY-MM-DD");
    const [MaDKTT, SetMaDKTT] = useState("")
    const [Ten, SetTen] = useState("")
    const [matkhau, SetMatkhau] = useState("")
    const [NienKhoa, SetNienKhoa] = useState("")
    const [ThoiGianBD, SetThoiGianBD] = useState(date)
    const [ThoiGianKT, SetThoiGianKT] = useState(date)

    const [danhsachSV, SetDanhsachSV] = useState('')

    const handleAddThucTap = async () => {
        const headers = { 'x-access-token': accessToken };
        if (!headers || !MaDKTT || !Ten || !NienKhoa || !matkhau) {
            toast.error("Vui lòng điền đầy đủ dữ liệu !")
            return
        }
        if (!danhsachSV) {
            toast.error("Vui lòng chọn danh sách sinh viên !")
            return
        }
        const tgbd = new Date(ThoiGianBD);
        const tgkt = new Date(ThoiGianKT);
        let value_dssv = new FormData();
        value_dssv.append("CapTaiKhoan", "Tạo tài khoản");
        value_dssv.append("MatKhauMacDinh", matkhau);
        value_dssv.append("FileExcel", danhsachSV);
        let res = await fetchAddThucTap(headers, MaDKTT, Ten, NienKhoa, tgbd, tgkt)
        let res2 = await fetchImportDSSVSinhVien(headers, value_dssv)
        console.log("res2: ", res2)
        if (res.status === true && res2.status === true) {
            toast.success(res.message)
            navigate("/admin/thuctap")
            return;
        }
        if (res.status === false) {
            toast.error(res.message)
            return;
        }
    }

    const onChangeInputSL = (event, SetSL) => {
        let changeValue = event.target.value;
        SetSL(changeValue);
    }
    const onChangeFile = (event, setSL) => {
        const file = event.target.files[0];
        // console.log(file)
        // img.preview = URL.createObjectURL(img)
        setSL(file)
    }

    // check dữ liệu
    const [checkdulieuTen, SetCheckdulieuTen] = useState(true)
    const [checkdulieuMa, SetCheckdulieuMa] = useState(true)
    const [checkdulieuMatkhau, SetCheckdulieuMatkhau] = useState(true)
    const [checkdulieuNienKhoa, SetCheckdulieuNienKhoa] = useState(true)

    const [checkdulieuDSSV, SetCheckdulieuDSSV] = useState(true)
    const checkdulieu = (value, SetDuLieu) => {
        value === '' ? SetDuLieu(false) : SetDuLieu(true)
    }

    return (
        <main className="main2">
            {/* <HeaderMain title={'Chuyên ngành'} /> */}
            <div className="head-title">
                <div className="left">
                    <h1>TẠO MỚI</h1>
                    <ul className="breadcrumb">
                        <li>
                            <Link>Dashboard</Link>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <Link>Thực tập</Link>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <Link className="active" >Tạo mới</Link>
                        </li>


                    </ul>
                </div>

            </div>


            <form className="form-edit">
                <div className="container-edit">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="inputKL" htmlFor="inputTen">Mã đợt thực tập tốt nghiệp</label>
                            <input type="text" className="form-control" id="inputTen" placeholder="Điền mã đợt thực tập tốt nghiệp ..." value={MaDKTT} onChange={(event) => onChangeInputSL(event, SetMaDKTT)} onBlur={() => checkdulieu(MaDKTT, SetCheckdulieuMa)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuMa ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="inputKL" htmlFor="inputTen">Tên đợt thực tập tốt nghiệp</label>
                            <input type="text" className="form-control" id="inputTen" placeholder="Điền tên đợt thực tập tốt nghiệp ..." value={Ten} onChange={(event) => onChangeInputSL(event, SetTen)} onBlur={() => checkdulieu(Ten, SetCheckdulieuTen)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuTen ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>

                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label className="inputKL" htmlFor="inputNienKhoa">Niên khóa</label>
                            <input type="text" className="form-control" id="inputNienKhoa" placeholder="Điền niên khóa ..." value={NienKhoa} onChange={(event) => onChangeInputSL(event, SetNienKhoa)} onBlur={() => checkdulieu(NienKhoa, SetCheckdulieuNienKhoa)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuNienKhoa ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                        <div className="form-group col-md-4">
                            <div className="custom-file">
                                <label className="inputDKCN" htmlFor="inputDSSVDKCN">Danh sách sinh viên</label>
                                <input type="file" accept=".xlsx" className="form-control file" id="inputDSSVDKCN" onChange={(event) => onChangeFile(event, SetDanhsachSV)} onBlur={() => checkdulieu(danhsachSV, SetCheckdulieuDSSV)} />
                                <div className="invalid-feedback" style={{ display: checkdulieuDSSV ? 'none' : 'block' }}>Vui lòng chọn file dữ liệu </div>
                                <div className="invalid-feedback" style={{ display: 'block', color: 'blue' }}>Chỉ nhận file có đuôi .xlsx </div>
                            </div>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="inputKL" htmlFor="inputNienKhoa">Mật khẩu</label>
                            <input type="text" className="form-control" id="inputNienKhoa" placeholder="Điền mật khẩu ..." value={matkhau} onChange={(event) => onChangeInputSL(event, SetMatkhau)} onBlur={() => checkdulieu(matkhau, SetCheckdulieuMatkhau)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuMatkhau ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="inputKL" htmlFor="inputNgayBD">Ngày bắt đầu</label>
                            <input type="date" className="form-control" id="inputNgayBD" value={ThoiGianBD} onChange={(event) => onChangeInputSL(event, SetThoiGianBD)} />
                        </div>
                        <div className="form-group col-md-6">
                            <label className="inputKL" htmlFor="inputNgayKT">Ngày kết thúc</label>
                            <input type="date" className="form-control" id="inputNgayKT" value={ThoiGianKT} onChange={(event) => onChangeInputSL(event, SetThoiGianKT)} />
                        </div>
                    </div>
                    <button className="btn" type="button" onClick={() => handleAddThucTap()}>Lưu</button>
                </div>



            </form>



        </main >
    )
}
export default AddThucTap;