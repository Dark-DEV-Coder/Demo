
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as React from 'react';
import { fetchAddViTriCtyThucTap, fetchDetailCongTyThucTap } from "../../GetData"
import { toast } from "react-toastify";
const AddViTriThucTap = () => {
    const ctythuctap = useParams();
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    let navigate = useNavigate();
    const [ViTri, setViTri] = useState("")
    const [ToiDa, setToiDa] = useState("0")
    const [Email, setEmail] = useState("")
    const [Ten, setTen] = useState("")

    // component didmount
    useEffect(() => {
        getDetailCongTyThucTap();
        // getDSSVThucTap();
    }, []);
    const getDetailCongTyThucTap = async () => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchDetailCongTyThucTap(headers, ctythuctap.MaDKTT, ctythuctap.id);
        if (res && res.data) {
            setEmail(res.data.Email)
            setTen(res.data.TenCongTy)
        }
    }
    // const handleEditCtyThucTap = async () => {
    //     const headers = { 'x-access-token': accessToken };
    //     if (!headers || !TenCongTy || !Website || !SoDienThoai || !Email || !DiaChi || !HoNguoiLienHe || !TenNguoiLienHe) {
    //         toast.error("Vui lòng điền đầy đủ dữ liệu")
    //         return
    //     }
    //     let res = await fetchEditCtyThucTap(headers, ctythuctap.MaDKTT, ctythuctap.id, HoNguoiLienHe, TenNguoiLienHe, TenCongTy, Website, SoDienThoai, Email, DiaChi)
    //     if (res.status === true) {
    //         toast.success(res.message)
    //         navigate(`/admin/thuctap/single/${ctythuctap.MaDKTT}`)
    //         return;
    //     }
    //     if (res.status === false) {
    //         toast.error(res.message)
    //         return;
    //     }
    // }

    const handleAddViTriCtyThucTap = async () => {
        const headers = { 'x-access-token': accessToken };
        if (!headers || !ViTri || !ToiDa) {
            toast.error("Vui lòng điền đầy đủ dữ liệu")
            return
        }
        let res = await fetchAddViTriCtyThucTap(headers, ctythuctap.MaDKTT, ViTri, ToiDa, Email)
        if (res.status === true) {
            toast.success(res.message)
            navigate(`/admin/thuctap/${ctythuctap.MaDKTT}/single/${ctythuctap.id}/${Ten}`)
            return;
        }
        if (res.status === false) {
            toast.error(res.message)
            return;
        }
    }

    const onChangeInputSL = (event, setState) => {
        let changeValue = event.target.value;
        setState(changeValue);
    }

    // check dữ liệu
    const [checkdulieuVtri, setCheckdulieuVtri] = useState(true)
    const [checkdulieuSL, setCheckdulieuSL] = useState(true)
    const checkdulieu = (value, setDuLieu) => {
        value === '' ? setDuLieu(false) : setDuLieu(true)
    }

    return (
        <main className="main2">
            {/* <HeaderMain title={'Chuyên ngành'} /> */}
            <div className="head-title">
                <div className="left">
                    <h1>VỊ TRÍ THỰC TẬP</h1>
                    <ul className="breadcrumb">
                        <li>
                            <Link>Dashboard</Link>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <Link>Thực tập tốt nghiệp</Link>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <Link>{ctythuctap.MaDKTT}</Link>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <Link className="active" >Tạo mới công ty</Link>
                        </li>
                    </ul>
                </div>

            </div>


            <form className="form-edit">
                <div className="container-edit">
                    <div className="form-row">
                        <div className="form-group col-md-8">
                            <label className="inputGV" htmlFor="inputTenGV">Vị Trí</label>
                            <textarea className="form-control" id="inputTenGV" value={ViTri} onChange={(event) => onChangeInputSL(event, setViTri)} onBlur={() => checkdulieu(ViTri, setCheckdulieuVtri)} rows="8"></textarea>
                            <div className="invalid-feedback" style={{ display: checkdulieuVtri ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                        <div className="form-group col-md-2">
                            <label className="inputGV" htmlFor="inputTenGV">Số lượng</label>
                            <input type="number" className="form-control" id="inputTenGV" value={ToiDa} onChange={(event) => onChangeInputSL(event, setToiDa)} onBlur={() => checkdulieu(ToiDa, setCheckdulieuSL)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuSL ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                            {/* <label className="inputGV" htmlFor="inputTenGV">Đã đăng ký</label>
                            <input type="number" className="form-control" id="inputTenGV" value={DaDangKy} onChange={(event) => onChangeInputSL(event, setDaDangKy)} />

                            <label className="inputGV" htmlFor="inputTenGV">Chưa đăng ký</label>
                            <input type="number" className="form-control" id="inputTenGV" value={ConLai} onChange={(event) => onChangeInputSL(event, setConLai)} /> */}

                        </div>
                    </div>

                    <button className="btn" type="button" onClick={() => handleAddViTriCtyThucTap()} >Lưu</button>
                </div>
            </form>
        </main>
    )
}
export default AddViTriThucTap