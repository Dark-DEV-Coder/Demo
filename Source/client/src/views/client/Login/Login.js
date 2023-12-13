import './Login.scss'
import Slideshow from '../Slideshow/Slideshow'
import LoginIcon from '@mui/icons-material/Login';
import Nav from '../Nav';
import Nav2 from '../sinhvien/NavSV';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLogin } from "../GetData_client"
const Login = () => {
    let navigate = useNavigate();
    const [TenDangNhap, setTenDangNhap] = useState("");
    const [MatKhau, setMatKhau] = useState("");
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
            toast.error("Vui lòng điền đẩy đủ dữ liệu !")
            return
        }
        setLoadingAPI(true);
        let res = await fetchLogin(TenDangNhap, MatKhau);
        console.log(res)
        // setAccessToken(res.data.accessToken)
        if (res.status) {
            if (res.data && res.data.accessToken) {
                localStorage.setItem("accessToken", res.data.accessToken)
                localStorage.setItem("ThongTin", JSON.stringify(res.data.ThongTin))
            }
            navigate("/")
            window.location.reload()
            return
        }
        if (!res.status) {
            toast.error(res.message)
        }
        setLoadingAPI(false)
    }
    return (
        <>
            <Slideshow />
            <div className='container-login-big' >
                <div className='container-tb-login'>
                    <LoginIcon className='icon-login' sx={{ color: '#202C45', marginLeft: '11%', fontStyle: 'bold' }} />
                    <h5>ĐĂNG NHẬP</h5>
                </div>
                <div className='container-login'>
                    <div className='login'>
                        <div className='login-left'>
                            <form>
                                <div className="form-group formsh">
                                    <label htmlFor="exampleInputEmail1">TÊN ĐĂNG NHẬP</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={TenDangNhap} placeholder="Điền tài khoản ..." onChange={(event) => onChangeInputSL(event, setTenDangNhap)} onBlur={() => checkdulieu(TenDangNhap, setCheckTenDangNhap)} />
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label htmlFor="exampleInputPassword1">MẬT KHẨU</label>
                                        <input type={isShowPass === true ? "text" : "password"} className="form-control" id="exampleInputPassword1" placeholder="Điền mật khẩu ..." value={MatKhau} onChange={(event) => onChangeInputSL(event, setMatKhau)} onBlur={() => checkdulieu(MatKhau, setCheckMatKhau)} />
                                        <div style={{ width: '50px', background: 'red' }} onClick={() => setIsShowPass(!isShowPass)}>
                                            {isShowPass === true ?
                                                <VisibilityIcon style={{ color: '#1E3050', position: 'absolute', right: '22%', top: '63%' }} />
                                                :
                                                <VisibilityOffIcon style={{ color: '#1E3050', position: 'absolute', right: '22%', top: '63%' }} />
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <div className='label-dky' >
                                            <label className='pass-mk'>
                                                <Link to="/dangky">
                                                    <u>Đăng ký tài khoản</u>
                                                </Link>
                                            </label>
                                            <label className='pass-mk' style={{ marginLeft: '25%' }}>
                                                <Link to="/quenmatkhau">
                                                    <u>Quên mật khẩu</u>
                                                </Link>
                                            </label>
                                        </div>
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
export default Login;