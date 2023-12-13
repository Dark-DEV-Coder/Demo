
import "./LoginAdmin.scss"
import Nav from "../../client/Nav";
import { useState, useEffect } from "react";
import { fetchLoginAdmin, } from "../GetData"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
const LoginAdmin = (props) => {
    const { loggedIn, CheckLogin } = props
    const OnCheckLogin = () => {
        CheckLogin();
    }
    const GetToken = () => {
        if (localStorage.getItem("accessToken") && localStorage.getItem("MaGV")) {
            navigate("/admin/*")
            return
        }
    }
    useEffect(() => {
        GetToken()
    }, [])
    let navigate = useNavigate();
    const [TenDangNhap, setTenDangNhap] = useState("");
    const [MatKhau, setMatKhau] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [list_CN, setList_CN] = useState([])
    const [isShowPass, setIsShowPass] = useState(false);
    const [loadingAPI, setLoadingAPI] = useState(false)
    const onChangeInputSL = (event, SetState) => {
        let changeValue = event.target.value;
        SetState(changeValue);
    }

    //check dữ liệu
    const [checkTenDangNhap, setCheckTenDangNhap] = useState(true)
    const [checkMatKhau, setCheckMatKhau] = useState(true)

    const checkdulieu = (value, SetDuLieu) => {
        value === '' ? SetDuLieu(false) : SetDuLieu(true)
    }

    const handleLogin = async () => {
        if (!TenDangNhap || !MatKhau) {
            toast.error("Dữ liệu điền chưa đủ điều kiện !")
            return
        }
        setLoadingAPI(true);
        let res = await fetchLoginAdmin(TenDangNhap, MatKhau);
        console.log("Login: ", res)
        if (res.status) {
            if (res.data && res.data.accessToken) {
                navigate("/admin/")
                setList_CN(res.data.ThongTin.QuyenHan.ChucNang)
                localStorage.setItem("accessToken", res.data.accessToken)
                localStorage.setItem("MaGV", res.data.ThongTin.MaGV)
                localStorage.setItem("TenGV", res.data.ThongTin.HoTen)
                localStorage.setItem("HinhGV", res.data.ThongTin.Hinh)
                // localStorage.setItem("QuyenHan", res.data.ThongTin.QuyenHan.MaQTK)
                localStorage.setItem("listChucNang", JSON.stringify(res.data.ThongTin.QuyenHan.ChucNang))
            }
            OnCheckLogin();
            toast.success(res.message)
            navigate("/admin/")
            return

        }
        if (!res.status) {
            toast.error(res.message)
        }
        setLoadingAPI(false)
    }
    return (
        <>
            <Nav />
            <div className='container-login-big' >
                <div className='container-login'>
                    <div className='login'>
                        <div className='login-left'>
                            <form>
                                <div className="form-group formsh">
                                    <label htmlFor="exampleInputEmail1">TÊN ĐĂNG NHẬP</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={TenDangNhap} placeholder="Điền tài khoản ..." onChange={(event) => onChangeInputSL(event, setTenDangNhap)} onBlur={() => checkdulieu(TenDangNhap, setCheckTenDangNhap)} />
                                    {/* <div className="invalid-feedback2" style={{ display: checkTenDangNhap ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div> */}
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label htmlFor="exampleInputPassword1">MẬT KHẨU</label>

                                        <input type={isShowPass === true ? "text" : "password"} className="form-control" id="exampleInputPassword1" placeholder="Điền mật khẩu ..." value={MatKhau} onChange={(event) => onChangeInputSL(event, setMatKhau)} onBlur={() => checkdulieu(MatKhau, setCheckMatKhau)} />
                                        {/*  /> */}
                                        <div onClick={() => setIsShowPass(!isShowPass)}>
                                            {isShowPass === true ?
                                                <VisibilityIcon style={{ color: '#1E3050', position: 'absolute', right: '22%', top: '61%' }} />
                                                :
                                                <VisibilityOffIcon style={{ color: '#1E3050', position: 'absolute', right: '22%', top: '61%' }} />
                                            }
                                        </div>

                                        {/* <div className="invalid-feedback2" style={{ display: checkMatKhau ? 'none' : 'block' }}>Vui lòng điền vào ô dữ liệu </div> */}
                                    </div>
                                </div>

                                <button type="button" className={TenDangNhap && MatKhau ? "active btn2 btn-primary" : "btn2 btn-primary"} disabled={TenDangNhap && MatKhau ? false : true} onClick={() => handleLogin()}><i className="fa-solid fa-sync fa-spin"></i>{loadingAPI ? "Loading ..." : "ĐĂNG NHẬP"}</button>

                            </form>
                        </div>
                        {/* <div className='login-right'>
                            <div className='right'>
                                <h3> CHÀO MỪNG ĐẾN VỚI KHOA CÔNG NGHỆ THÔNG TIN</h3>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </>

    )
}
export default LoginAdmin;