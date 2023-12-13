import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as React from 'react';
import { fetchAllChuyenNganh, fetchAllNganh, fetchDetailNganh, fetchAddChuyenNganhDangKyCN } from "../../GetData"
import { toast } from "react-toastify";
const ThemChuyenNganhDKCN = () => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const chuyennganhDK = useParams()
    let navigate = useNavigate();
    const [nganhhoc, setNganhhoc] = useState("DCT")
    const [chuyennganh, setChuyennganh] = useState("")
    const [toida, setToida] = useState("")
    const [listChuyenNganh, setListChuyenNganh] = useState([]);
    const [listNganh, setListNganh] = useState([]);
    const handleAddChuyenNganhDK = async () => {
        const headers = { 'x-access-token': accessToken };
        if (!nganhhoc || !chuyennganh || !toida) {
            toast.error("Vui lòng nhập đầy đủ dữ liệu !")
            return
        }
        let res = await fetchAddChuyenNganhDangKyCN(headers, chuyennganhDK.MaDKCN, nganhhoc, chuyennganh, toida)
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
    const getChuyenNganh = async (value) => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchDetailNganh(headers, value);
        if (res && res.data && res.data.Nganh) {
            setListChuyenNganh(res.data.ChuyenNganh)
        }
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
                    <h1>TẠO MỚI</h1>
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
                            <Link className="active" >Tạo mới</Link>
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
                            <select value={nganhhoc} onChange={(event) => onChangeSelectNganh(event)} id="inputNganh" className="form-control">
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
                            <select value={chuyennganh} onChange={(event) => onChangeSelect(event, setChuyennganh)} id="inputChuyenNganh" className="form-control">
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
                            <input type="text" className="form-control" id="inputKhoa" placeholder="Điền số lượng tối đa ..." value={toida} onChange={(event) => onChangeInputSL(event, setToida)} onBlur={() => checkdulieu(toida, SetCheckdulieuToida)} />
                            <div className="invalid-feedback" style={{ display: checkdulieuToida ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                        </div>

                    </div>


                    <button className="btn" type="button" onClick={() => handleAddChuyenNganhDK()}>Lưu</button>
                </div>
            </form>
        </main >
    )
}
export default ThemChuyenNganhDKCN;