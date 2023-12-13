import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as React from 'react';
import { fetchAllChuyenNganh, fetchAllNganh, fetchEditChuyenNganhDK } from "../../GetData"
import { toast } from "react-toastify";
const EditChuyenNganhDKCN = () => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const chuyennganhDK = useParams()
    let navigate = useNavigate();

    const [toida, setToida] = useState("")
    const [listChuyenNganh, setListChuyenNganh] = useState([]);
    const [listNganh, setListNganh] = useState([]);
    const handleEditChuyenNganhDK = async () => {
        const headers = { 'x-access-token': accessToken };
        if (!toida) {
            toast.error("Vui lòng nhập đầy đủ dữ liệu !")
            return
        }
        if (toida < chuyennganhDK.ToiDa) {
            toast.error("Không thể hạ số lượng tối đa !")
            return
        }
        let res = await fetchEditChuyenNganhDK(headers, chuyennganhDK.MaDKCN, chuyennganhDK.MaNganh, chuyennganhDK.MaChuyenNganh, toida)
        if (res.status === true) {
            toast.success(res.message)
            navigate(`/admin/dkychuyennganh/edit/${chuyennganhDK.MaDKCN}`)
            return;
        }
        if (res.status === false) {
            toast.error(res.message)
            return;
        }
    }
    // component didmount
    useEffect(() => {
        getListNganh();
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

    const onChangeInputSL = (event, setState) => {
        let changeValue = event.target.value;
        setState(changeValue);
    }

    // check dữ liệu
    const [checkdulieuToida, SetCheckdulieuToida] = useState(true)
    // const [checkdulieuTen, SetCheckdulieuTen] = useState(true)
    const checkdulieu = (value, SetDuLieu) => {
        value === '' ? SetDuLieu(false) : SetDuLieu(true)
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
                            <Link>Đăng ký chuyên ngành</Link>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <Link>{chuyennganhDK.MaDKCN}</Link>
                        </li>
                        <li><i className='bx bx-chevron-right'></i></li>
                        <li>
                            <Link className="active" >Chỉnh sửa số lượng</Link>
                        </li>
                    </ul>
                </div>

            </div>


            <form className="form-edit">
                <div className="container-edit">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="inputNganh" htmlFor="inputMa">Mã đợt đăng ký chuyên ngành</label>
                            <input type="text" className="form-control" id="inputMa" value={chuyennganhDK.MaDKCN} disabled={true} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label className="inputSV" htmlFor="inputNganh">Ngành</label>
                            <select value={chuyennganhDK.MaNganh} disabled={true} id="inputNganh" className="form-control">
                                {listNganh && listNganh.length > 0 &&
                                    listNganh.map((item, index) => {
                                        return (
                                            <option key={item.MaNganh} value={item.MaNganh}>{item.TenNganh}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="inputSV" htmlFor="inputChuyenNganh">Chuyên Ngành</label>
                            <select value={chuyennganhDK.MaChuyenNganh} disabled={true} id="inputChuyenNganh" className="form-control">
                                {
                                    listChuyenNganh && listChuyenNganh.length > 0 &&
                                    listChuyenNganh.map((item, index) => {
                                        return (
                                            <option key={item.MaChuyenNganh} value={item.MaChuyenNganh}>{item.TenChuyenNganh}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label className="inputSV" htmlFor="inputKhoa">Số lượng tối đa</label>
                            <input type="text" className="form-control" id="inputKhoa" placeholder={`Điền số lượng tối đa (số lượng hiện tại là ${chuyennganhDK.ToiDa} ) ...`} value={toida} onChange={(event) => onChangeInputSL(event, setToida)} onBlur={() => checkdulieu(toida, SetCheckdulieuToida)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuToida ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>

                    </div>


                    <button className="btn" type="button" onClick={() => handleEditChuyenNganhDK()}>Lưu</button>
                </div>
            </form>
        </main >
    )
}
export default EditChuyenNganhDKCN;