import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as React from 'react';
import "./EditCBHT.scss";
import { fetchDetailCanhBao, fetchEditCanhBao } from "../../GetData"
import { toast } from "react-toastify";
const EditCBHT = () => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    let navigate = useNavigate();
    const canhbaohoctap = useParams();
    const [MaCBHT, setMaCBHT] = useState("")
    const [Ten, setTen] = useState("")
    const [NienKhoa, setNienKhoa] = useState("")
    const [Dot, setDot] = useState("")


    useEffect(() => {
        getDetailCanhBao();
    }, []);
    const getDetailCanhBao = async () => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchDetailCanhBao(headers, canhbaohoctap.MaCBHT);
        if (res && res.data) {
            setMaCBHT(res.data.MaCBHT)
            setTen(res.data.Ten)
            setDot(res.data.Dot)
            setNienKhoa(res.data.NienKhoa)
        }
    }

    const handleEditCanhBao = async () => {
        const headers = { 'x-access-token': accessToken };
        if (!Ten || !NienKhoa || !Dot) {
            toast.error("Vui lòng điền đầy đủ dữ liệu !")
            return
        }

        let res = await fetchEditCanhBao(headers, canhbaohoctap.MaCBHT, Ten, Dot, NienKhoa)
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

    const onChangeInputSL = (event, setSL) => {
        let changeValue = event.target.value;
        setSL(changeValue);
    }

    // check dữ liệu
    const [checkdulieuTen, setCheckdulieuTen] = useState(true)
    const [checkdulieuDot, setCheckdulieuDot] = useState(true)
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
                            <Link>Cảnh báo học tập</Link>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <Link className="active" >{canhbaohoctap.MaCBHT}</Link>
                        </li>


                    </ul>
                </div>

            </div>


            <form className="form-edit">
                <div className="container-edit">
                    <div className="form-group">
                        <label className="inputCBHT" htmlFor="inputTen">Tên đợt cảnh báo học tập</label>
                        <input type="text" className="form-control" id="inputTen" value={Ten} onChange={(event) => onChangeInputSL(event, setTen)} onBlur={() => checkdulieu(Ten, setCheckdulieuTen)} />
                        <div className="invalid-feedback" style={{ display: checkdulieuTen ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="inputCBHT" htmlFor="inputNienKhoa">Đợt</label>
                            <input type="text" className="form-control" id="inputNienKhoa" value={Dot} onChange={(event) => onChangeInputSL(event, setDot)} onBlur={() => checkdulieu(Dot, setCheckdulieuDot)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuDot ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="inputCBHT" htmlFor="inputNienKhoa">Niên khóa</label>
                            <input type="text" className="form-control" id="inputNienKhoa" value={NienKhoa} onChange={(event) => onChangeInputSL(event, setNienKhoa)} onBlur={() => checkdulieu(NienKhoa, setCheckdulieuNienKhoa)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuNienKhoa ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                    </div>


                    <button className="btn" type="button" onClick={() => handleEditCanhBao()}>Lưu</button>
                </div>



            </form>



        </main >
    )
}
export default EditCBHT;