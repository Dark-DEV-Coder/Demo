
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAddTaiKhoan, fetchAllQuyenTK } from "../../GetData"
import { toast } from "react-toastify";
const AddTaiKhoan = () => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    let navigate = useNavigate();
    const [MaTK, setMaTK] = useState("")
    const [TenDangNhap, setTenDangNhap] = useState("")
    const [MatKhau, setMatKhau] = useState("")
    const [QuyenTK, setQuyenTK] = useState("SINHVIEN")
    const [listQuyenTK, setListQuyenTK] = useState([]);

    // component didmount
    useEffect(() => {
        getListQuyenTK();
    }, []);

    const getListQuyenTK = async () => {
        const headers = { 'x-access-token': accessToken };
        let res = await fetchAllQuyenTK(headers);
        if (res && res.data && res.data.DanhSach) {
            setListQuyenTK(res.data.DanhSach)
        }
    }

    const handleAddTaiKhoan = async () => {
        const headers = { 'x-access-token': accessToken };
        if (!MaTK || !TenDangNhap || !MatKhau) {
            toast.error("Vui lòng điền đầy đủ dữ liệu !")
            return
        }
        let res = await fetchAddTaiKhoan(headers, MaTK, TenDangNhap, MatKhau, QuyenTK)
        if (res.status === true) {
            toast.success(res.message)
            navigate("/admin/taikhoan")
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
    const onChangeSelect = (event, setSelect) => {
        let changeValue = event.target.value;
        setSelect(changeValue);
    }

    // check dữ liệu
    const [checkdulieuMaTK, setCheckdulieuMaTK] = useState(true)
    const [checkdulieuTenDN, setCheckdulieuTenDN] = useState(true)
    const [checkdulieuMatKhau, setCheckdulieuMatKhau] = useState(true)
    const checkdulieu = (value, setDuLieu) => {
        value === '' ? setDuLieu(false) : setDuLieu(true)
    }
    return (
        <>
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
                                <Link className="active" >Tài khoản</Link>
                            </li>
                            <li><i className='bx bx-chevron-right'></i></li>
                            <li>
                                <Link className="active" >Tạo mới</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <form className="form-new">
                    <div className="container-edit">
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label className="inputTK" htmlFor="inputTenDN">Mã tài khoản</label>
                                <input type="text" className="form-control" id="inputTenDN" placeholder="Điền mã tài khoản ..." value={MaTK} onChange={(event) => onChangeInputSL(event, setMaTK)} onBlur={() => checkdulieu(MaTK, setCheckdulieuMaTK)} />
                                <div className="invalid-feedback" style={{ display: checkdulieuMaTK ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                            </div>
                            <div className="form-group col-md-6">
                                <label className="inputTK" htmlFor="inputTenGV">Tên đăng nhập</label>
                                <input type="text" className="form-control" id="inputTenDN" placeholder="Điền tên đăng nhập ..." value={TenDangNhap} onChange={(event) => onChangeInputSL(event, setTenDangNhap)} onBlur={() => checkdulieu(TenDangNhap, setCheckdulieuTenDN)} />
                                <div className="invalid-feedback" style={{ display: checkdulieuTenDN ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                            </div>
                        </div>
                        <div className="form-row" >
                            <div className="form-group col-md-6">
                                <label className="inputTK" htmlFor="inputTenGV">Mật khẩu</label>
                                <input type="text" className="form-control" id="inputTenDN" placeholder="Điền mật khẩu ..." value={MatKhau} onChange={(event) => onChangeInputSL(event, setMatKhau)} onBlur={() => checkdulieu(MatKhau, setCheckdulieuMatKhau)} />
                                <div className="invalid-feedback" style={{ display: checkdulieuMatKhau ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div>
                            </div>
                            <div className="form-group col-md-6">
                                <label className="inputDT" htmlFor="inputTrangthai">Quyền tài khoản </label>
                                <select value={QuyenTK} id="inputTrangthai" className="form-control" onChange={(event) => onChangeSelect(event, setQuyenTK)} >
                                    {listQuyenTK && listQuyenTK.length > 0 &&
                                        listQuyenTK.map((item, index) => {
                                            return (
                                                <option value={item.MaQTK} key={item.MaQTK}>{item.TenQuyenTK}</option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                        </div>
                        <button className="btn" type="button" style={{ marginTop: '2rem' }} onClick={() => handleAddTaiKhoan()}>Lưu</button>
                    </div>
                </form>


            </main >
        </>
    )
}
export default AddTaiKhoan;