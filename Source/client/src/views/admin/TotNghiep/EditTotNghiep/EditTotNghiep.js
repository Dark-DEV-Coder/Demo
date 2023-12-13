import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as React from 'react';
import { fetchDetailTotNghiep, fetchEditTotNghiep } from "../../GetData"
import { toast } from "react-toastify";
const EditTotNghiep = () => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    let navigate = useNavigate();
    const totnghiep = useParams();

    // Table xem chi tiết
    const [MaTN, setMaTN] = useState("")
    const [Ten, setTen] = useState("")
    const [NienKhoa, setNienKhoa] = useState("")
    useEffect(() => {
        getDetailTotNghiep();
    }, []);
    const getDetailTotNghiep = async () => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchDetailTotNghiep(headers, totnghiep.MaTN);
        if (res && res.data) {
            setMaTN(res.data.MaTN)
            setTen(res.data.Ten)
            setNienKhoa(res.data.NienKhoa)
        }
    }
    const handleEditTotNghiep = async () => {
        const headers = { 'x-access-token': accessToken };
        if (!headers || !MaTN || !Ten || !NienKhoa) {
            toast.error("Vui lòng điền đầy đủ dữ liệu")
            return
        }
        let res = await fetchEditTotNghiep(headers, MaTN, Ten, NienKhoa)
        if (res.status === true) {
            toast.success(res.message)
            navigate("/admin/totnghiep")
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
    const onChangeFile = (event, setSL) => {
        const file = event.target.files[0];
        file.preview = URL.createObjectURL(file)
        setSL(file)
    }

    // check dữ liệu
    const [checkdulieuMa, setCheckdulieuMa] = useState(true)
    const [checkdulieuTen, setCheckdulieuTen] = useState(true)
    const [checkdulieuNienKhoa, setCheckdulieuNienKhoa] = useState(true)
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
                            <Link>Tốt nghiệp</Link>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <Link className="active" >{totnghiep.MaTN}</Link>
                        </li>
                    </ul>
                </div>

            </div>


            <form className="form-edit">
                <div className="container-edit">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="inputCBHT" htmlFor="inputNienKhoa">Mã đợt tốt nghiệp</label>
                            <input type="text" className="form-control" id="inputNienKhoa" value={MaTN} onChange={(event) => onChangeInputSL(event, setMaTN)} onBlur={() => checkdulieu(MaTN, setCheckdulieuMa)} disabled={true} />
                            <div className="invalid-feedback" style={{ display: checkdulieuMa ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="inputCBHT" htmlFor="inputTen">Tên đợt tốt nghiệp</label>
                            <input type="text" className="form-control" id="inputTen" value={Ten} onChange={(event) => onChangeInputSL(event, setTen)} onBlur={() => checkdulieu(Ten, setCheckdulieuTen)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuTen ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label className="inputCBHT" htmlFor="inputNienKhoa">Niên khóa</label>
                            <input type="text" className="form-control" id="inputNienKhoa" value={NienKhoa} onChange={(event) => onChangeInputSL(event, setNienKhoa)} onBlur={() => checkdulieu(NienKhoa, setCheckdulieuNienKhoa)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuNienKhoa ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                    </div>
                    <button className="btn" type="button" onClick={() => handleEditTotNghiep()}>Lưu</button>
                </div>
            </form>
        </main >
    )
}
export default EditTotNghiep;