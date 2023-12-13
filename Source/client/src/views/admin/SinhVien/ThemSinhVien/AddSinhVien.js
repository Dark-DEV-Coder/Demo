import "./AddSinhVien.scss"
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as React from 'react';
import { fetchAllChuyenNganh, fetchAllNganh, fetchDetailNganh, fetchAddSinhVien } from "../../GetData"
import { toast } from "react-toastify";
import moment from "moment";

const AddSinhVien = () => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    let navigate = useNavigate();
    const [listChuyenNganh, setListChuyenNganh] = useState([]);
    const [listNganh, setListNganh] = useState([]);
    const [masv, setMasv] = useState('')
    const [hosv, setHosv] = useState('')
    const [tensv, setTensv] = useState('')
    const [email, setEmail] = useState('')
    const [sdt, setSdt] = useState('')
    const [gioitinh, setGioitinh] = useState('Nam')
    const [ngaysinh, setNgaysinh] = useState('2002-01-01')
    const [khoa, setKhoa] = useState('')
    const [nganhhoc, setNganhhoc] = useState('CNTT')
    const [chuyennganh, setChuyennganh] = useState('')
    const [lop, setLop] = useState('')
    const [trangthaitotnghiep, setTrangthaitotnghiep] = useState('')

    // component didmount
    useEffect(() => {
        getListNganh();
    }, []);
    const getListNganh = async () => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchAllNganh(headers);
        if (res && res.data && res.data.DanhSach) {
            setListNganh(res.data.DanhSach)
        }
    }

    const handleAddSinhVien = async () => {
        const headers = { 'x-access-token': accessToken };
        if (!masv || !hosv || !tensv || !email || !sdt || !ngaysinh || !khoa || !lop) {
            toast.error("Vui lòng điền đầy đủ dữ liệu")
            return
        }
        const value_ngaysinh = new Date(ngaysinh)
        let res = await fetchAddSinhVien(headers, masv, hosv, tensv, email, sdt, gioitinh, value_ngaysinh, khoa, chuyennganh, nganhhoc, lop, trangthaitotnghiep)
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

    const onChangeSelectNganh = (event) => {
        let changeValue = event.target.value;
        setNganhhoc(changeValue);
        getChuyenNganh(changeValue);
        setChuyennganh('')
    }

    const onChangeInputSL = (event, setState) => {
        let changeValue = event.target.value;
        setState(changeValue);
    }

    const onChangeSelect = (event, setSelect) => {
        let changeValue = event.target.value;
        setSelect(changeValue);
    }

    // check dữ liệu
    const [checkdulieuMasv, setCheckdulieuMasv] = useState(true)
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
                    <h1>TẠO MỚI </h1>
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
                            <Link className="active" >new</Link>
                        </li>


                    </ul>
                </div>

            </div>


            <form className="form-new">
                <div className="container-edit">
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label className="inputSV" htmlFor="inputHoGV">Mã sinh viên</label>
                            <input type="text" className="form-control" id="inputHoGV" placeholder="Điền mã sinh viên ..." value={masv} onChange={(event) => onChangeInputSL(event, setMasv)} onBlur={() => checkdulieu(masv, setCheckdulieuMasv)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuMasv ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                    </div>
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
                            <select value={chuyennganh} onChange={(event) => onChangeSelect(event, setChuyennganh)} id="inputChuyenNganh" className="form-control" disabled={listChuyenNganh.length === 0 ? true : false}>
                                {listChuyenNganh && listChuyenNganh.length > 0 &&
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
                            <label className="inputSV" htmlFor="inputLop">Lớp</label>
                            <input type="text" className="form-control" id="inputKhoa" placeholder="Điền lớp ..." value={lop} onChange={(event) => onChangeInputSL(event, setLop)} onBlur={() => checkdulieu(lop, setCheckdulieuLop)} />
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
                    <button className="btn" type="button" onClick={() => handleAddSinhVien()} >Lưu</button>
                </div>



            </form>



        </main >
    )
}
export default AddSinhVien