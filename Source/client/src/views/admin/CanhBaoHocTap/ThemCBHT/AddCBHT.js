import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as React from 'react';
import "./AddCBHT.scss"
import { toast } from "react-toastify";
import { fetchAddCanhBao, fetchImportDSSVSinhVien } from "../../GetData"
const AddCBHT = () => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    let navigate = useNavigate();
    const [MaCBHT, SetMaCBHT] = useState("")
    const [Ten, SetTen] = useState("")
    const [NienKhoa, SetNienKhoa] = useState("")
    const [Dot, SetDot] = useState("")
    const [KieuCanhBao, SetKieuCanhBao] = useState("Điểm học tập")
    const [KetQuaDRL, SetKetQuaDRL] = useState("Cảnh báo")
    const [FileExcelPDF, SetFileExcelPDF] = useState("")


    const handleAddCanhBao = async () => {
        const headers = { 'x-access-token': accessToken };
        if (!headers || !MaCBHT || !Ten || !NienKhoa || !Dot || !FileExcelPDF) {
            toast.error("Vui lòng điền đầy đủ dữ liệu")
            return
        }
        let value_canhbao = new FormData();
        value_canhbao.append("MaCBHT", MaCBHT);
        value_canhbao.append("Ten", Ten);
        value_canhbao.append("Dot", Dot);
        value_canhbao.append("NienKhoa", NienKhoa);
        value_canhbao.append("KieuCanhBao", KieuCanhBao);
        value_canhbao.append("KetQuaDRL", KetQuaDRL);
        value_canhbao.append("FileExcelPDF", FileExcelPDF);
        let res = await fetchAddCanhBao(headers, value_canhbao)
        console.log(res)
        if (res.status === true) {
            toast.success(res.message)
            navigate("/admin/canhbaohoctap")
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
    const onChangeSelect = (event, SetSelect) => {
        let changeValue = event.target.value;
        SetSelect(changeValue);
    }
    const onChangeFile = (event, setSL) => {
        const file = event.target.files[0];
        // file.preview = URL.createObjectURL(file)
        setSL(file)
    }

    // check dữ liệu
    const [checkdulieuMa, SetCheckdulieuMa] = useState(true)
    const [checkdulieuDot, SetCheckdulieuDot] = useState(true)
    const [checkdulieuTen, SetCheckdulieuTen] = useState(true)
    const [checkdulieuNienKhoa, SetCheckdulieuNienKhoa] = useState(true)
    const [checkdulieuFile, SetCheckdulieuFile] = useState(true)
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
                            <Link>Cảnh báo học tập</Link>
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
                            <label className="inputCBHT" htmlFor="inputNienKhoa">Mã đợt cảnh báo</label>
                            <input type="text" className="form-control" id="inputNienKhoa" value={MaCBHT} placeholder="Điền mã đợt cảnh báo ..." onChange={(event) => onChangeInputSL(event, SetMaCBHT)} onBlur={() => checkdulieu(MaCBHT, SetCheckdulieuMa)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuMa ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="inputCBHT" htmlFor="inputTen">Tên đợt cảnh báo</label>
                            <input type="text" className="form-control" id="inputTen" value={Ten} placeholder="Điền tên đợt cảnh báo ..." onChange={(event) => onChangeInputSL(event, SetTen)} onBlur={() => checkdulieu(Ten, SetCheckdulieuTen)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuTen ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>

                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="inputCBHT" htmlFor="inputNienKhoa">Niên khóa</label>
                            <input type="text" className="form-control" id="inputNienKhoa" value={NienKhoa} placeholder="Điền niên khóa ..." onChange={(event) => onChangeInputSL(event, SetNienKhoa)} onBlur={() => checkdulieu(NienKhoa, SetCheckdulieuNienKhoa)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuNienKhoa ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="inputCBHT" htmlFor="inputNienKhoa">Đợt</label>
                            <input type="text" className="form-control" id="inputNienKhoa" value={Dot} placeholder="Điền đợt ..." onChange={(event) => onChangeInputSL(event, SetDot)} onBlur={() => checkdulieu(Dot, SetCheckdulieuDot)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuDot ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="inputGV" htmlFor="inputGioitinhGV">Kiểu cảnh báo</label>
                            <select value={KieuCanhBao} onChange={(event) => onChangeSelect(event, SetKieuCanhBao)} id="inputGioitinhGV" className="form-control">
                                <option value='Điểm học tập'>Điểm học tập</option>
                                <option value='Điểm rèn luyện'>Điểm rèn luyện</option>
                            </select>
                        </div>

                        <div className="form-group col-md-6" style={{ display: KieuCanhBao === "Điểm rèn luyện" ? 'block' : 'none' }}>
                            <label className="inputGV" htmlFor="inputGioitinhGV">Kết quả điểm rèn luyện</label>
                            <select value={KetQuaDRL} onChange={(event) => onChangeSelect(event, SetKetQuaDRL)} id="inputGioitinhGV" className="form-control">
                                <option value='Cảnh báo'>Cảnh báo</option>
                                <option value='Tạm dừng'>Tạm dừng</option>
                                <option value='Buộc thôi học'>Buộc thôi học</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <div className="custom-file">
                                <label className="inputCBHT" htmlFor="inputDSSV">Danh sách sinh viên</label>
                                {KieuCanhBao === "Điểm học tập" ?
                                    <input type="file" accept=".xls, .xlsx" className="form-control file" id="inputDSSV" onChange={(event) => onChangeFile(event, SetFileExcelPDF)} onBlur={() => checkdulieu(FileExcelPDF, SetCheckdulieuFile)} />
                                    :
                                    <input type="file" accept=".pdf" className="form-control file" id="inputDSSV" onChange={(event) => onChangeFile(event, SetFileExcelPDF)} onBlur={() => checkdulieu(FileExcelPDF, SetCheckdulieuFile)} />
                                }

                                <div className="invalid-feedback" style={{ display: checkdulieuFile ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                                <div className="note-kcb">
                                    <h6>* Note: Kiểu cảnh báo là "Điểm học tập" vui lòng chọn file excel </h6>
                                    <h6>* Note: Kiểu cảnh báo là "Điểm rèn luyện" vui lòng chọn file pdf </h6>
                                </div>
                            </div>
                        </div>
                    </div>


                    <button className="btn" type="button" onClick={() => handleAddCanhBao()}>Lưu</button>
                </div>



            </form>



        </main >
    )
}
export default AddCBHT;