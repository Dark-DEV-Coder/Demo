import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as React from 'react';
import { fetchDetailThucTap, fetchEditThucTap } from "../../GetData"
import { toast } from "react-toastify";
import moment from "moment";
const EditThucTap = () => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const thuctap = useParams();
    let navigate = useNavigate();

    const [MaDKTT, SetMaDKTT] = useState("")
    const [Ten, SetTen] = useState("")
    const [NienKhoa, SetNienKhoa] = useState("")
    const [ThoiGianBD, SetThoiGianBD] = useState("")
    const [ThoiGianKT, SetThoiGianKT] = useState("")


    // component didmount
    useEffect(() => {
        getDetailThucTap();
    }, []);
    const getDetailThucTap = async () => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchDetailThucTap(headers, thuctap.MaDKTT);
        if (res && res.data) {
            SetMaDKTT(res.data.MaDKTT)
            SetTen(res.data.Ten)
            SetNienKhoa(res.data.NienKhoa)
            SetThoiGianBD(moment(res.data.ThoiGianBD).format("YYYY-MM-DD"))
            SetThoiGianKT(moment(res.data.ThoiGianKT).format("YYYY-MM-DD"))
        }
    }
    const handleEditThucTap = async () => {
        const headers = { 'x-access-token': accessToken };
        if (!Ten || !NienKhoa) {
            toast.error("Vui lòng điền đầy đủ dữ liệu")
            return
        }
        const ngayBD = new Date(ThoiGianBD)
        const ngayKT = new Date(ThoiGianKT)
        let res = await fetchEditThucTap(headers, thuctap.MaDKTT, Ten, NienKhoa, ngayBD, ngayKT)
        if (res.status === true) {
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

    // check dữ liệu
    const [checkdulieuTen, SetCheckdulieuTen] = useState(true)
    const [checkdulieuNienKhoa, SetCheckdulieuNienKhoa] = useState(true)
    const checkdulieu = (value, SetDuLieu) => {
        value === '' ? SetDuLieu(false) : SetDuLieu(true)
    }

    return (
        <main className="main2">
            {/* <HeaderMain title={'Chuyên ngành'} /> */}
            <div className="head-title">
                <div className="left">
                    <h1>CHỈNH SỬA</h1>
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
                            <Link className="active" >{thuctap.MaDKTT}</Link>
                        </li>


                    </ul>
                </div>

            </div>


            <form className="form-edit">
                <div className="container-edit">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="inputKL" htmlFor="inputTen">Tên đợt thực tập tốt nghiệp</label>
                            <input type="text" className="form-control" id="inputTen" placeholder="Điền đợt thực tập tốt nghiệp ..." value={Ten} onChange={(event) => onChangeInputSL(event, SetTen)} onBlur={() => checkdulieu(Ten, SetCheckdulieuTen)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuTen ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="inputKL" htmlFor="inputNienKhoa">Niên khóa</label>
                            <input type="text" className="form-control" id="inputNienKhoa" placeholder="Điền niên khóa ..." value={NienKhoa} onChange={(event) => onChangeInputSL(event, SetNienKhoa)} onBlur={() => checkdulieu(NienKhoa, SetCheckdulieuNienKhoa)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuNienKhoa ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                    </div>
                    {/* <div className="form-row">
                        <div className="form-group col-md-12">
                            <div className="custom-file">
                                <label className="inputKL" htmlFor="inputDSDT">Danh sách đề tài</label>
                                <input type="file" className="form-control file" id="inputDSDT" onChange={(event) => onChangeInputSL(event, SetDsdt)} />
                            </div>
                            <div className="invalid-feedback" style={{ display: 'block' }}>Chỉ chấp nhận các file có đuôi là xls, xlsm, xlsx, xlt,...</div>
                        </div>
                    </div> */}
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
                    <button className="btn" type="button" onClick={() => handleEditThucTap()}>Lưu</button>
                </div>
            </form>
        </main >
    )
}
export default EditThucTap;