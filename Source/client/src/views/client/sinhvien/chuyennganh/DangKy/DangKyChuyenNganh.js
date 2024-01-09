
import { Link, useNavigate } from "react-router-dom";
import "./DangKyChuyenNganh.scss"
import { useEffect, useState } from "react";
import { fetchDetailChuyenNganh, fetchDkyChuyenNganh, fetchDetailSinhVien, fetchHuyDkyChuyenNganh } from "../../../GetData_client"
import { toast } from "react-toastify";
import moment from "moment";
const DangKyChuyenNganh = () => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const [MaSV, setMaSV] = useState("")
    const [MaDKCN, setMaDKCN] = useState("")
    const [SinhVien, setSinhVien] = useState({})
    const [DKCN, setDKCN] = useState({})
    let navigate = useNavigate();
    const [listChuyenNganh, setListChuyenNganh] = useState([]);
    const [listChuyenNganh2, setListChuyenNganh2] = useState([]);
    const [toida, setToida] = useState([])
    const [dangky, setDangky] = useState([])
    const [nganhhoc, setNganhhoc] = useState("")
    const [chuyennganh, setChuyennganh] = useState("")
    const [manganh, setManganh] = useState("")

    const [SV, setSV] = useState({})

    useEffect(() => {
        let thongtin = JSON.parse(localStorage.getItem("ThongTin"))
        getDetailSinhVien(thongtin.MaSo)
        setMaSV(thongtin.MaSo)
    }, [])

    const getDetailSinhVien = async (MaSo) => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchDetailSinhVien(headers, MaSo);
        // console.log(res)
        let res2 = await fetchDetailChuyenNganh(headers);
        if (res && res.data && res2 && res2.data) {
            setDKCN(res2.data)
            setMaDKCN(res2.data.MaDKCN)
            setSinhVien(res.data);
            setNganhhoc(res.data.Nganh)
            let listcn_cntt = []
            let listcn_dk = []
            let sl_toida = []
            let sl_dadk = []
            let nganh = ""
            res2.data.ThongTin.map((item, index) => {
                if (item.Nganh.TenNganh === res.data.Nganh) {
                    nganh = item.Nganh.MaNganh
                }
                if (item.Nganh.TenNganh === res.data.Nganh) {
                    listcn_dk = [...listcn_dk, item.ChuyenNganh]
                }
                listcn_cntt = [...listcn_cntt, item.ChuyenNganh]
                sl_dadk = [...sl_dadk, item.DaDangKy]
                sl_toida = [...sl_toida, item.ToiDa]

            })
            setManganh(nganh)
            setListChuyenNganh(listcn_cntt)
            setListChuyenNganh2(listcn_dk)
            setDangky(sl_dadk)
            setToida(sl_toida)
        }
    }


    const handleDangKyCN = async () => {
        // console.log()
        const headers = { 'x-access-token': accessToken };
        if (!headers || !chuyennganh) {
            toast.error("Vui lòng chọn lại chuyên ngành một lần nữa !")
            return;
        }
        if (SinhVien.ChuyenNganh === null) {
            let res = await fetchDkyChuyenNganh(headers, MaDKCN, SinhVien.MaSV, manganh, chuyennganh)
            // console.log("DK: ", res)
            if (res.status === true) {
                toast.success(res.message)
                // navigate("/chuyennganh/ds-sinhvien")
                return;
            }
            if (res.status === false) {
                toast.error(res.message)
                return;
            }
        }
        else {
            console.log("CN: ", chuyennganh)
            let huyDky = await fetchHuyDkyChuyenNganh(headers, MaDKCN, SinhVien.MaSV, manganh, chuyennganh)
            console.log(huyDky)
            // if (huyDky.status === true) {
            //     setTimeout(async () => {
            //         let res = await fetchDkyChuyenNganh(headers, MaDKCN, SinhVien.MaSV, manganh, chuyennganh)
            //         console.log("DK: ", res)
            //         if (res.status === true) {
            //             toast.success(res.message)
            //             // navigate("/chuyennganh/ds-sinhvien")
            //             return;
            //         }
            //         if (res.status === false) {
            //             toast.error(res.message)
            //             return;
            //         }
            //     }, 2000)

            // }
        }
    }


    // check dữ liệu
    // const [checktendangnhap, SetChecktendangnhap] = useState(true)
    const [checkmaCN, SetCheckmaCN] = useState(true)
    const onChangeSelect = (event, setSelect) => {
        let changeValue = event.target.value;
        setSelect(changeValue);
    }

    const isEmpty = (v) => {
        return Object.keys(v).length === 0;
    };
    if (!isEmpty(DKCN)) {
        return (
            <div className="container-taikhoan">
                <ol className="breadcrumb" >
                    <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                    <li className="breadcrumb-item">Chuyên ngành</li>
                    <li className="breadcrumb-item active">Đăng ký chuyên ngành</li>
                </ol>
                {/* Thông tin đợt DKCN */}
                <div className="container-tb-update">
                    <h3>{DKCN.Ten}</h3>
                    <h6>Ngày cập nhật : {moment(DKCN.updatedAt).format("DD/MM/YYYY")}</h6>
                    <h6 className="time-line">Thời gian đăng ký : [{moment(DKCN.ThoiGianBD).format("hh:mm:ss DD/MM/YYYY")} - {moment(DKCN.ThoiGianKT).format("hh:mm:ss DD/MM/YYYY")} ] </h6>
                </div>
                {/* Thông tin chuyên ngành của đợt DKCN */}
                <div className="container-tb-update">
                    <h5>Hiện trạng đăng ký</h5>
                    <div className="hien-trang-dky">
                        {listChuyenNganh && listChuyenNganh.length > 0 && listChuyenNganh.map((item, index) => {
                            return (
                                <div key={item.MaChuyenNganh}>
                                    <h6>{item.TenChuyenNganh} : {dangky[index]}/{toida[index]}</h6>
                                </div>

                            )
                        })}
                    </div>
                </div>
                {/* Form đăng ký chuyên ngành */}
                <div className="content-dkythuctap">
                    <div className="container-form">
                        <form className="form-edit">
                            <div className="container-edit">
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label className="inputDK" htmlFor="inputTrinhdo">Mã sinh viên</label>
                                        <input type="text" className="form-control" id="inputTrinhdo" value={MaSV} disabled />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label className="inputDK" htmlFor="inputTrinhdo">Ngành học</label>
                                        <input type="text" className="form-control" id="inputTrinhdo" value={nganhhoc} disabled />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="inputSV" htmlFor="inputChuyenNganh">Chuyên Ngành</label>
                                        <select value={chuyennganh} onChange={(event) => onChangeSelect(event, setChuyennganh)} id="inputChuyenNganh" className="form-control">
                                            {
                                                listChuyenNganh2 && listChuyenNganh2.length > 0 &&
                                                listChuyenNganh2.map((item, index) => {
                                                    return (
                                                        <option key={item.MaChuyenNganh} value={item.MaChuyenNganh}>{item.TenChuyenNganh}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <button type="button" className="btntk btn btn-secondary" onClick={() => handleDangKyCN()} >Lưu</button>
                        </form>
                    </div>
                </div >
            </div >
        )
    }
    else {
        return (
            <div className="container-taikhoan">
                <ol className="breadcrumb" >
                    <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                    <li className="breadcrumb-item">Chuyên ngành</li>
                </ol>
                {/* Thông tin đợt DKCN */}
                <div className="container-tb-update">
                    <h3>Hiện tại không có đợt đăng ký chuyên ngành nào được mở</h3>
                </div>
            </div >
        )
    }


}
export default DangKyChuyenNganh