

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as React from 'react';
import { toast } from "react-toastify";
import { fetchAddTotNghiep } from "../../GetData"
const AddTotNghiep = () => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    let navigate = useNavigate();
    const [MaTN, setMaTN] = useState("")
    const [Ten, setTen] = useState("")
    const [NienKhoa, setNienKhoa] = useState("")
    const [FilePDF, setFilePDF] = useState("")

    const [load, setLoad] = useState(false)


    const handleAddTotNghiep = async () => {
        const headers = { 'x-access-token': accessToken };
        if (!headers || !MaTN || !Ten || !NienKhoa) {
            toast.error("Vui lòng điền đầy đủ dữ liệu !")
            return
        }
        if (!FilePDF) {
            toast.error("Vui lòng chọn file danh sách sinh viên !")
            return
        }
        let value_canhbao = new FormData();
        value_canhbao.append("MaTN", MaTN);
        value_canhbao.append("Ten", Ten);
        value_canhbao.append("NienKhoa", NienKhoa);
        value_canhbao.append("FilePDF", FilePDF);
        let res = await fetchAddTotNghiep(headers, value_canhbao)
        setLoad(true)
        if (res.status === true) {
            setTimeout(() => {
                toast.success(res.message)
                navigate("/admin/totnghiep")
            }, [14000])
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
        // file.preview = URL.createObjectURL(file)
        setSL(file)
    }

    // check dữ liệu
    const [checkdulieuMa, setCheckdulieuMa] = useState(true)
    const [checkdulieuTen, setCheckdulieuTen] = useState(true)
    const [checkdulieuNienKhoa, setCheckdulieuNienKhoa] = useState(true)
    const [checkdulieuFile, setCheckdulieuFile] = useState(true)
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
                            <Link>Tốt nghiệp</Link>
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
                            <label className="inputCBHT" htmlFor="inputNienKhoa">Mã đợt tốt nghiệp</label>
                            <input type="text" className="form-control" id="inputNienKhoa" value={MaTN} placeholder="Điền mã đợt tốt nghiệp ..." onChange={(event) => onChangeInputSL(event, setMaTN)} onBlur={() => checkdulieu(MaTN, setCheckdulieuMa)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuMa ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="inputCBHT" htmlFor="inputTen">Tên đợt tốt nghiệp</label>
                            <input type="text" className="form-control" id="inputTen" value={Ten} placeholder="Điền tên đợt tốt nghiệp ..." onChange={(event) => onChangeInputSL(event, setTen)} onBlur={() => checkdulieu(Ten, setCheckdulieuTen)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuTen ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>

                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label className="inputCBHT" htmlFor="inputNienKhoa">Niên khóa</label>
                            <input type="text" className="form-control" id="inputNienKhoa" value={NienKhoa} placeholder="Điền niên khóa ..." onChange={(event) => onChangeInputSL(event, setNienKhoa)} onBlur={() => checkdulieu(NienKhoa, setCheckdulieuNienKhoa)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuNienKhoa ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <div className="custom-file">
                                <label className="inputCBHT" htmlFor="inputDSSV">Danh sách sinh viên</label>
                                <input type="file" accept=".pdf" className="form-control file" id="inputDSSV" onChange={(event) => onChangeFile(event, setFilePDF)} onBlur={() => checkdulieu(FilePDF, setCheckdulieuFile)} />
                                <div className="invalid-feedback" style={{ display: checkdulieuFile ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                                <div className="note-kcb">
                                    <h6>* Note: Vui lòng chọn file pdf </h6>
                                </div>
                            </div>
                        </div>
                    </div>


                    <button className="btn" type="button" onClick={() => handleAddTotNghiep()}>{load !== true ? "Lưu" : "Đang lưu ..."}</button>
                </div>



            </form>



        </main >
    )
}
export default AddTotNghiep;