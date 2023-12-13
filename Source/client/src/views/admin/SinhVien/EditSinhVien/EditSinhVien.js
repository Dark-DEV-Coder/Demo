import "./EditSinhVien.scss"
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as React from 'react';
import { fetchAllChuyenNganh, fetchAllNganh, fetchDetailNganh, fetchDetailSinhVien, fetchEditSinhVien } from "../../GetData"
import { toast } from "react-toastify";
import moment from "moment";

const EditSinhVien = () => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    let navigate = useNavigate();
    const sinhvien = useParams();
    const [listChuyenNganh, setListChuyenNganh] = useState([]);
    const [listNganh, setListNganh] = useState([]);
    const [masv, setMasv] = useState("")
    const [hosv, setHosv] = useState("")
    const [tensv, setTensv] = useState("")
    const [email, setEmail] = useState("")
    const [sdt, setSdt] = useState("")
    const [gioitinh, setGioitinh] = useState("")
    const [ngaysinh, setNgaysinh] = useState("")
    const [khoa, setKhoa] = useState("")
    const [nganhhoc, setNganhhoc] = useState("")
    const [chuyennganh, setChuyennganh] = useState("")
    const [lop, setLop] = useState("")
    // const [hinh, setHinh] = useState("")
    const [trangthaitotnghiep, setTrangthaitotnghiep] = useState("")

    // component didmount
    useEffect(() => {
        // getListChuyenNganh();
        getListNganh();
        getDetailSinhVien();
        getListChuyenNganh();
    }, []);
    const getListChuyenNganh = async () => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchAllChuyenNganh(headers);
        if (res && res.data && res.data.DanhSach) {
            setListChuyenNganh(res.data.DanhSach)
        }
    }
    const getListNganh = async () => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchAllNganh(headers);
        if (res && res.data && res.data.DanhSach) {
            setListNganh(res.data.DanhSach)
        }
    }
    const getDetailSinhVien = async () => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchDetailSinhVien(headers, sinhvien.MaSV);
        if (res && res.data) {
            setMasv(res.data.MaSV)
            setHosv(res.data.HoSV)
            setTensv(res.data.TenSV)
            setEmail(res.data.Email)
            setSdt(res.data.SoDienThoai)
            setGioitinh(res.data.GioiTinh)
            setNgaysinh(moment(res.data.NgaySinh).format("YYYY-MM-DD"))
            setKhoa(res.data.Khoa)
            setChuyennganh(res.data.ChuyenNganh)
            setNganhhoc(res.data.Nganh)
            setLop(res.data.Lop)
            setTrangthaitotnghiep(res.data.TrangThaiTotNghiep)
        }
    }

    const handleEditSinhVien = async () => {
        const headers = { 'x-access-token': accessToken };
        if (!masv || !hosv || !tensv || !email || !sdt || !ngaysinh || !khoa || !lop) {
            toast.error("Vui lòng điền đầy đủ dữ liệu")
            return
        }
        const value_ngaysinh = new Date(ngaysinh)
        let res = await fetchEditSinhVien(headers, masv, hosv, tensv, email, sdt, gioitinh, value_ngaysinh, khoa, chuyennganh, nganhhoc, lop, trangthaitotnghiep)
        if (res.status === true) {
            toast.success(res.message)
            navigate("/admin/sinhvien")
            return;
        }
        if (res.status === false) {
            toast.error(res.message)
            return;

        }
    }

    const getChuyenNganh = async (value) => {
        const nganh = listNganh.filter(item => item.TenNganh === value)
        const key_Nganh = nganh[0].MaNganh;
        const headers = { 'x-access-token': accessToken };
        let res = await fetchDetailNganh(headers, key_Nganh);
        if (res && res.data && res.data.Nganh) {
            setListChuyenNganh(res.data.ChuyenNganh)
        }
    }

    const onChangeInputSL = (event, setState) => {
        let changeValue = event.target.value;
        setState(changeValue);
    }

    // const onChangeSelectChuyenNganh = (event) => {
    //     let changeValue = event.target.value;
    //     setSelect(changeValue);
    // }
    const onChangeSelectNganh = (event) => {
        let changeValue = event.target.value;
        setNganhhoc(changeValue);
        getChuyenNganh(changeValue);
        setChuyennganh('')
    }

    const onChangeSelect = (event, setSelect) => {
        let changeValue = event.target.value;
        setSelect(changeValue);
    }

    // check dữ liệu
    const [checkdulieuHo, setCheckdulieuHo] = useState(true)
    const [checkdulieuTen, setCheckdulieuTen] = useState(true)
    const [checkdulieuEmail, setCheckdulieuEmail] = useState(true)
    const [checkdulieuSDT, setCheckdulieuSDT] = useState(true)
    const [checkdulieuKhoa, setCheckdulieuKhoa] = useState(true)
    const [checkdulieuLop, setCheckdulieuLop] = useState(true)
    const checkdulieu = (value, setDuLieu) => {
        value === '' ? setDuLieu(false) : setDuLieu(true)
    }

    return (
        <main className="main2">
            {/* <HeaderMain title={'Chuyên ngành'} /> */}
            <div className="head-title">
                <div className="left">
                    <h1>CHỈNH SỬA </h1>
                    <ul className="breadcrumb">
                        <li>
                            <Link>Dashboard</Link>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <Link>Sinh viên</Link>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <Link className="active" >{sinhvien.MaSV}</Link>
                        </li>


                    </ul>
                </div>

            </div>


            <form className="form-new">
                <div className="container-edit">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="inputSV" htmlFor="inputHoGV">Họ lót</label>
                            <input type="text" className="form-control" id="inputHoGV" placeholder="Điền họ lót ..." value={hosv} onChange={(event) => onChangeInputSL(event, setHosv)} onBlur={() => checkdulieu(hosv, setCheckdulieuHo)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuHo ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="inputSV" htmlFor="inputTenGV">Tên</label>
                            <input type="text" className="form-control" id="inputTenGV" placeholder="Điền tên ..." value={tensv} onChange={(event) => onChangeInputSL(event, setTensv)} onBlur={() => checkdulieu(tensv, setCheckdulieuTen)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuTen ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="inputSV" htmlFor="inputEmailGV">Email</label>
                            <input type="email" className="form-control" id="inputEmailGV" placeholder="abc...@gmail.com" value={email} onChange={(event) => onChangeInputSL(event, setEmail)} onBlur={() => checkdulieu(email, setCheckdulieuEmail)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuEmail ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="inputSV" htmlFor="inputSdtGV">Số điện thoại</label>
                            <input type="text" className="form-control" id="inputSdtGV" placeholder="03899...." value={sdt} onChange={(event) => onChangeInputSL(event, setSdt)} onBlur={() => checkdulieu(sdt, setCheckdulieuSDT)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuSDT ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="inputSV" htmlFor="inputGioitinhGV">Giới tính</label>
                            <select value={gioitinh} onChange={(event) => onChangeSelect(event, setGioitinh)} id="inputGioitinhGV" className="form-control">
                                <option value='Nam'>Nam</option>
                                <option value='Nữ'>Nữ</option>
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="inputSV" htmlFor="inputNgaysinh">Ngày sinh</label>
                            <input type="date" className="form-control" id="inputNgaysinh" value={ngaysinh} onChange={(event) => onChangeInputSL(event, setNgaysinh)} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="inputSV" htmlFor="inputNganh">Ngành</label>
                            <select value={nganhhoc} onChange={(event) => onChangeSelectNganh(event)} id="inputNganh" className="form-control">
                                {listNganh && listNganh.length > 0 &&
                                    listNganh.map((item, index) => {
                                        return (
                                            <option key={item.MaNganh} value={item.TenNganh}>{item.TenNganh}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="inputSV" htmlFor="inputChuyenNganh">Chuyên Ngành</label>
                            <select value={chuyennganh} onChange={(event) => onChangeSelect(event, setChuyennganh)} id="inputChuyenNganh" className="form-control">
                                {
                                    listChuyenNganh && listChuyenNganh.length > 0 &&
                                    listChuyenNganh.map((item, index) => {
                                        return (
                                            <option key={item.MaChuyenNganh} value={item.TenChuyenNganh}>{item.TenChuyenNganh}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="inputSV" htmlFor="inputKhoa">Lớp</label>
                            <input type="text" className="form-control" id="inputKhoa" placeholder="Điền khóa ..." value={lop} onChange={(event) => onChangeInputSL(event, setLop)} onBlur={() => checkdulieu(lop, setCheckdulieuLop)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuLop ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="inputSV" htmlFor="inputKhoa">Khóa</label>
                            <input type="text" className="form-control" id="inputKhoa" placeholder="Điền khóa ..." value={khoa} onChange={(event) => onChangeInputSL(event, setKhoa)} onBlur={() => checkdulieu(khoa, setCheckdulieuKhoa)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuKhoa ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>

                    </div>


                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label className="inputSV" htmlFor="inputTrangthaitotnghiep">Trạng thái tốt nghiệp</label>
                            <select value={trangthaitotnghiep} onChange={(event) => onChangeSelect(event, setTrangthaitotnghiep)} id="inputTrangthaitotnghiep" className="form-control">
                                <option value="Chưa tốt nghiệp">Chưa tốt nghiệp</option>
                                <option value="Đã tốt nghiệp">Đã tốt nghiệp</option>
                            </select>
                        </div>

                    </div>
                    <button className="btn" type="button" onClick={() => handleEditSinhVien()}>Lưu</button>
                </div>



            </form>



        </main >
    )
}
export default EditSinhVien