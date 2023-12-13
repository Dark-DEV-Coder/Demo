import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from 'moment';
import * as React from 'react';
import "./AddKhoaLuan.scss"
import { fetchAllNganh, fetchAddKhoaLuan } from "../../GetData"
import { toast } from "react-toastify";
const AddKhoaLuan = () => {

    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    let navigate = useNavigate();
    const [listData_nganh, setListData_nganh] = useState([]);
    const date = moment().format("YYYY-MM-DD");
    const [ma, setMa] = useState("")
    const [ten, setTen] = useState("")
    const [nganh, setNganh] = useState("DCT")
    const [khoahoc, setKhoahoc] = useState("")
    const [dsdt, setDsdt] = useState("")
    const [tgbd, setTgbd] = useState(date)
    const [tgkt, setTgkt] = useState(date)

    // component didmount
    useEffect(() => {
        getListNganh();

    }, []);

    const getListNganh = async () => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchAllNganh(headers);
        if (res && res.data && res.data.DanhSach) {
            setListData_nganh(res.data.DanhSach)
        }
    }

    const handleAddKhoaLuan = async () => {
        const headers = { 'x-access-token': accessToken };
        if (!headers || !ma || !ten || !khoahoc) {
            toast.error("Vui lòng điền đầy đủ dữ liệu")
            return
        }
        const ThoiGianBD = new Date(tgbd);
        const ThoiGianKT = new Date(tgkt);
        let res = await fetchAddKhoaLuan(headers, ma, ten, nganh, khoahoc, ThoiGianBD, ThoiGianKT)
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



    const onChangeInputSL = (event, setSL) => {
        let changeValue = event.target.value;
        setSL(changeValue);
    }
    const onChangeSelect = (event, setSelect) => {
        let changeValue = event.target.value;
        setSelect(changeValue);
    }


    // check dữ liệu
    const [checkdulieuMa, setCheckdulieuMa] = useState(true)
    const [checkdulieuTen, setCheckdulieuTen] = useState(true)
    const [checkdulieuKhoaHoc, setCheckdulieuKhoaHoc] = useState(true)
    const [checkdulieudsdt, setCheckdulieudsdt] = useState(true)
    const checkdulieu = (value, setDuLieu) => {
        value === '' ? setDuLieu(false) : setDuLieu(true)
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
                            <Link>Khóa luận</Link>
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
                            <label className="inputKL" for="inputTen">Mã đợt đăng ký khóa luận</label>
                            <input type="text" className="form-control" id="inputTen" value={ma} placeholder="Điền mã đợt đăng ký ..." onChange={(event) => onChangeInputSL(event, setMa)} onBlur={() => checkdulieu(ma, setCheckdulieuMa)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuMa ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="inputKL" for="inputTen">Tên đợt đăng ký khóa luận</label>
                            <input type="text" className="form-control" id="inputTen" value={ten} placeholder="Điền tên đợt đăng ký ..." onChange={(event) => onChangeInputSL(event, setTen)} onBlur={() => checkdulieu(ten, setCheckdulieuTen)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuTen ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>

                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="inputKL" for="inputKhoa">Khóa học</label>
                            <input type="text" className="form-control" id="inputKhoa" value={khoahoc} placeholder="Điền khóa học  ..." onChange={(event) => onChangeInputSL(event, setKhoahoc)} onBlur={() => checkdulieu(khoahoc, setCheckdulieuKhoaHoc)} />
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
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="inputKL" for="inputNgayBD">Ngày bắt đầu</label>
                            <input type="date" className="form-control" id="inputNgayBD" value={tgbd} onChange={(event) => onChangeInputSL(event, setTgbd)} />
                        </div>
                        <div className="form-group col-md-6">
                            <label className="inputKL" for="inputNgayKT">Ngày kết thúc</label>
                            <input type="date" className="form-control" id="inputNgayKT" value={tgkt} onChange={(event) => onChangeInputSL(event, setTgkt)} />
                        </div>
                    </div>
                    {/* <div className="form-row">
                        <div className="form-group col-md-12">
                            <div className="custom-file">
                                <label className="inputKL" for="inputDSDT">Danh sách đề tài</label>
                                <input type="file" accept=".xls, .xlsx" className="form-control file" id="inputDSDT" onChange={(event) => onChangeInputSL(event, setDsdt)} onBlur={() => checkdulieu(dsdt, setCheckdulieudsdt)} />
                            </div>
                            <div className="invalid-feedback" style={{ display: 'block', color: 'blue' }}>Chỉ chấp nhận các file có đuôi là xls, xlsm, xlsx, xlt,...</div>
                            <div className="invalid-feedback" style={{ display: dsdt ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                    </div> */}
                    <button className="btn" type="button" onClick={() => handleAddKhoaLuan()}>Lưu</button>
                </div>



            </form>



        </main >
    )
}
export default AddKhoaLuan;