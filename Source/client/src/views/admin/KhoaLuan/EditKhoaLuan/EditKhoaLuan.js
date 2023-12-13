import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as React from 'react';
import "./EditKhoaLuan.scss"
import { fetchAllNganh, fetchDetailKhoaLuan, fetchEditKhoaLuan } from "../../GetData"
import { toast } from "react-toastify";
import moment from "moment";
const EditKhoaLuan = () => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const khoaluan = useParams();
    let navigate = useNavigate();
    const [listData_nganh, SetListData_nganh] = useState([]);


    const [ten, setTen] = useState("")
    const [nganh, setNganh] = useState("DCT")
    const [khoahoc, setKhoahoc] = useState("")
    // const [dsdt, setDsdt] = useState("")
    const [tgbd, setTgbd] = useState("")
    const [tgkt, setTgkt] = useState("")

    // component didmount
    useEffect(() => {
        getListNganh();
        getDetailKhoaLuan();

    }, []);

    const getListNganh = async () => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchAllNganh(headers);
        if (res && res.data && res.data.DanhSach) {
            SetListData_nganh(res.data.DanhSach)
        }
    }
    const getDetailKhoaLuan = async () => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchDetailKhoaLuan(headers, khoaluan.MaKLTN);
        if (res && res.data) {
            setTen(res.data.Ten)
            setNganh(res.data.Nganh.MaNganh)
            setKhoahoc(res.data.Khoa)
            setTgbd(moment(res.data.ThoiGianBD).format("YYYY-MM-DD"))
            setTgkt(moment(res.data.ThoiGianKT).format("YYYY-MM-DD"))
        }
    }
    const handleEditKhoaLuan = async () => {
        const headers = { 'x-access-token': accessToken };
        if (!ten || !khoahoc) {
            toast.error("Vui lòng điền đầy đủ dữ liệu")
            return
        }
        const ngayBD = new Date(tgbd)
        const ngayKT = new Date(tgkt)
        let res = await fetchEditKhoaLuan(headers, khoaluan.MaKLTN, ten, khoahoc, nganh, ngayBD, ngayKT)
        if (res.status === true) {
            toast.success(res.message)
            navigate("/admin/khoaluan")
            return;
        }
        if (res.status === false) {
            toast.error(res.message)
            return;

        }
    }
    const onChangeSelect = (event, setSelect) => {
        let changeValue = event.target.value;
        setSelect(changeValue);
    }

    const onChangeInputSL = (event, setSL) => {
        let changeValue = event.target.value;
        setSL(changeValue);
    }

    // check dữ liệu
    const [checkdulieuTen, setCheckdulieuTen] = useState(true)
    const [checkdulieuKhoaHoc, setCheckdulieuKhoaHoc] = useState(true)
    // const [checkdulieuNienKhoa, setCheckdulieuNienKhoa] = useState(true)
    const checkdulieu = (value, setDuLieu) => {
        value === '' ? setDuLieu(false) : setDuLieu(true)
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
                            <Link>Khóa luận</Link>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <Link className="active" >{khoaluan.MaKLTN}</Link>
                        </li>


                    </ul>
                </div>

            </div>
            <form className="form-edit">
                <div className="container-edit">
                    <div className="form-group">
                        <label className="inputKL" htmlFor="inputTen">Tên đợt đăng ký khóa luận</label>
                        <input type="text" className="form-control" id="inputTen" value={ten} onChange={(event) => onChangeInputSL(event, setTen)} onBlur={() => checkdulieu(ten, setCheckdulieuTen)} />
                        <div className="invalid-feedback" style={{ display: checkdulieuTen ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="inputKL" htmlFor="inputKhoa">Khóa học</label>
                            <input type="text" className="form-control" id="inputKhoa" value={khoahoc} onChange={(event) => onChangeInputSL(event, setKhoahoc)} onBlur={() => checkdulieu(khoahoc, setCheckdulieuKhoaHoc)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuKhoaHoc ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="inputSV" htmlFor="inputNganh">Ngành</label>
                            <select value={nganh} onChange={(event) => onChangeSelect(event, setNganh)} id="inputNganh" className="form-control">
                                {listData_nganh && listData_nganh.length > 0 &&
                                    listData_nganh.map((item, index) => {
                                        return (
                                            <option key={item.MaNganh} value={item.MaNganh}>{item.TenNganh}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    {/* <div className="form-row">
                        <div className="form-group col-md-12">
                            <div className="custom-file">
                                <label className="inputKL" htmlFor="inputDSDT">Danh sách đề tài</label>
                                <input type="file" className="form-control file" id="inputDSDT" onChange={(event) => onChangeInputSL(event, setDsdt)} />
                            </div>
                            <div className="invalid-feedback" style={{ display: 'block' }}>Chỉ chấp nhận các file có đuôi là xls, xlsm, xlsx, xlt,...</div>
                        </div>
                    </div> */}
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="inputKL" htmlFor="inputNgayBD">Ngày bắt đầu</label>
                            <input type="date" className="form-control" id="inputNgayBD" value={tgbd} onChange={(event) => onChangeInputSL(event, setTgbd)} />
                        </div>
                        <div className="form-group col-md-6">
                            <label className="inputKL" htmlFor="inputNgayKT">Ngày kết thúc</label>
                            <input type="date" className="form-control" id="inputNgayKT" value={tgkt} onChange={(event) => onChangeInputSL(event, setTgkt)} />
                        </div>
                    </div>
                    <button className="btn" type="button" onClick={() => handleEditKhoaLuan()}>Lưu</button>
                </div>



            </form>



        </main >
    )
}
export default EditKhoaLuan;