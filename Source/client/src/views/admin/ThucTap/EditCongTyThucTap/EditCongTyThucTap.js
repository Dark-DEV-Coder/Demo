
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as React from 'react';
import { fetchEditCtyThucTap, fetchDetailCongTyThucTap } from "../../GetData"
import { toast } from "react-toastify";
const EditCongTyThucTap = () => {
    const ctythuctap = useParams();
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    let navigate = useNavigate();
    const [TenCongTy, SetTenCongTy] = useState("")
    const [Website, SetWebsite] = useState("")
    const [SoDienThoai, SetSoDienThoai] = useState("")
    const [Email, SetEmail] = useState("")
    const [DiaChi, SetDiaChi] = useState("")
    const [HoNguoiLienHe, SetHoNguoiLienHe] = useState("")
    const [TenNguoiLienHe, SetTenNguoiLienHe] = useState("")

    // component didmount
    useEffect(() => {
        getDetailCongTyThucTap();
        // getDSSVThucTap();
    }, []);
    const getDetailCongTyThucTap = async () => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchDetailCongTyThucTap(headers, ctythuctap.MaDKTT, ctythuctap.id);
        if (res && res.data) {
            SetTenCongTy(res.data.TenCongTy)
            SetWebsite(res.data.Website)
            SetSoDienThoai(res.data.SoDienThoai)
            SetEmail(res.data.Email)
            SetDiaChi(res.data.DiaChi)
            SetHoNguoiLienHe(res.data.HoNguoiLienHe)
            SetTenNguoiLienHe(res.data.TenNguoiLienHe)
        }
    }
    const handleEditCtyThucTap = async () => {
        const headers = { 'x-access-token': accessToken };
        if (!headers || !TenCongTy || !Website || !SoDienThoai || !Email || !DiaChi || !HoNguoiLienHe || !TenNguoiLienHe) {
            toast.error("Vui lòng điền đầy đủ dữ liệu")
            return
        }
        let res = await fetchEditCtyThucTap(headers, ctythuctap.MaDKTT, ctythuctap.id, HoNguoiLienHe, TenNguoiLienHe, TenCongTy, Website, SoDienThoai, Email, DiaChi)
        if (res.status === true) {
            toast.success(res.message)
            navigate(`/admin/thuctap/single/${ctythuctap.MaDKTT}`)
            return;
        }
        if (res.status === false) {
            toast.error(res.message)
            return;
        }
    }

    // const [ViTri, SetViTri] = useState(dulieutest.ViTri)
    // const [ToiDa, SetToiDa] = useState(dulieutest.ToiDa)
    // const [DaDangKy, SetDaDangKy] = useState(dulieutest.DaDangKy)
    // const [ConLai, SetConLai] = useState(dulieutest.ConLai)



    const onChangeInputSL = (event, SetState) => {
        let changeValue = event.target.value;
        SetState(changeValue);
    }

    const onChangeSelect = (event, SetSelect) => {
        let changeValue = event.target.value;
        SetSelect(changeValue);
    }

    // check dữ liệu
    const [checkdulieuWebsite, SetCheckdulieuWebsite] = useState(true)
    const [checkdulieuTen, SetCheckdulieuTen] = useState(true)
    const [checkdulieuEmail, SetCheckdulieuEmail] = useState(true)
    const [checkdulieuSDT, SetCheckdulieuSDT] = useState(true)
    const [checkdulieuDiaChi, SetCheckdulieuDiaChi] = useState(true)
    const [checkdulieuHo, SetCheckdulieuHo] = useState(true)
    const [checkdulieuTenLH, SetCheckdulieuTenLH] = useState(true)
    const [checkdulieuVitri, SetCheckdulieuVitri] = useState(true)
    const checkdulieu = (value, SetDuLieu) => {
        value === '' ? SetDuLieu(false) : SetDuLieu(true)
    }

    return (
        <main className="main2">
            {/* <HeaderMain title={'Chuyên ngành'} /> */}
            <div className="head-title">
                <div className="left">
                    <h1>CHỈNH SỬA CÔNG TY THỰC TẬP</h1>
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
                            <Link className="active">{ctythuctap.TenCongTy}</Link>
                        </li>


                    </ul>
                </div>

            </div>


            <form className="form-edit">
                <div className="container-edit">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="inputGV" htmlFor="inputTen">Tên công ty</label>
                            <input type="text" className="form-control" id="inputTen" value={TenCongTy} placeholder="Điền tên công ty ..." onChange={(event) => onChangeInputSL(event, SetTenCongTy)} onBlur={() => checkdulieu(TenCongTy, SetCheckdulieuTen)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuTen ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="inputGV" htmlFor="inputWebsite">Website</label>
                            <input type="text" className="form-control" id="inputWebsite" value={Website} placeholder="Điền website công ty ..." onChange={(event) => onChangeInputSL(event, SetWebsite)} onBlur={() => checkdulieu(Website, SetCheckdulieuWebsite)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuWebsite ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="inputGV" htmlFor="inputTen">Họ người liên hệ</label>
                            <input type="text" className="form-control" id="inputTen" value={HoNguoiLienHe} placeholder="Điền họ người liên hệ ..." onChange={(event) => onChangeInputSL(event, SetHoNguoiLienHe)} onBlur={() => checkdulieu(HoNguoiLienHe, SetCheckdulieuHo)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuHo ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="inputGV" htmlFor="inputWebsite">Tên người liên hệ</label>
                            <input type="text" className="form-control" id="inputWebsite" value={TenNguoiLienHe} placeholder="Điền tên người liên hệ ..." onChange={(event) => onChangeInputSL(event, SetTenNguoiLienHe)} onBlur={() => checkdulieu(TenNguoiLienHe, SetCheckdulieuTenLH)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuTenLH ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="inputGV" htmlFor="inputSoDienThoai">Số điện thoại</label>
                            <input type="text" className="form-control" id="inputSoDienThoai" value={SoDienThoai} placeholder="Điền số điện thoại công ty ..." onChange={(event) => onChangeInputSL(event, SetSoDienThoai)} onBlur={() => checkdulieu(SoDienThoai, SetCheckdulieuSDT)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuSDT ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="inputGV" htmlFor="inputEmail">Email</label>
                            <input type="text" className="form-control" id="inputEmail" value={Email} placeholder="Điền email công ty ..." onChange={(event) => onChangeInputSL(event, SetEmail)} onBlur={() => checkdulieu(Email, SetCheckdulieuEmail)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuEmail ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label className="inputGV" htmlFor="inputDiaChi">Địa chỉ</label>
                            <input type="text" className="form-control" id="inputDiaChi" value={DiaChi} placeholder="Điền địa chỉ công ty ..." onChange={(event) => onChangeInputSL(event, SetDiaChi)} onBlur={() => checkdulieu(DiaChi, SetCheckdulieuDiaChi)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuDiaChi ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                    </div>
                    {/* <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="inputGV" htmlFor="inputTenGV">Vị Trí</label>
                            <textarea className="form-control" id="inputTenGV" value={ViTri} onChange={(event) => onChangeInputSL(event, SetViTri)} onBlur={() => checkdulieu(ViTri, SetCheckdulieuVitri)} rows="10"></textarea>
                            <div className="invalid-feedback" style={{ display: checkdulieuVitri ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>
                        <div className="form-group col-md-2">
                            <label className="inputGV" htmlFor="inputTenGV">Số lượng</label>
                            <input type="number" className="form-control" id="inputTenGV" value={ToiDa} onChange={(event) => onChangeInputSL(event, SetToiDa)} />

                            <label className="inputGV" htmlFor="inputTenGV">Đã đăng ký</label>
                            <input type="number" className="form-control" id="inputTenGV" value={DaDangKy} onChange={(event) => onChangeInputSL(event, SetDaDangKy)} />

                            <label className="inputGV" htmlFor="inputTenGV">Chưa đăng ký</label>
                            <input type="number" className="form-control" id="inputTenGV" value={ConLai} onChange={(event) => onChangeInputSL(event, SetConLai)} />

                        </div>
                    </div> */}
                    <button className="btn" type="button" onClick={() => handleEditCtyThucTap()}>Lưu</button>
                </div>
            </form>



        </main >
    )
}
export default EditCongTyThucTap