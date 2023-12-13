import '../../../css/style.css'
import { NavLink, Link, useNavigate } from "react-router-dom";
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useEffect, useState } from "react";
import "./NavGV.scss"
const NavGV = (props) => {
    const checkLogin = props.checkLogin;
    const [ThongTin, setThongTin] = useState({})
    let navigate = useNavigate();
    const [hiddenInfor, SetHiddenInfor] = useState(false)
    const danhmuc = props.danhmuc;

    useEffect(() => {
        if (checkLogin) {
            let thongtinnguoidung = JSON.parse(localStorage.getItem("ThongTin"))
            setThongTin(thongtinnguoidung)
        }
    }, [])
    const onClickLogout = () => {
        window.localStorage.clear();
        // SetCheckLogin(false)
        SetHiddenInfor(false)
        navigate("/")
        window.location.reload()
    }
    const onClickHiddenInfor = () => {
        SetHiddenInfor(!hiddenInfor)
    }
    return (
        <>
            <section className="ftco-section">
                <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
                    <div className="container">
                        {/* <a className="navbar-brand" href="index.html">TRANG CHỦ</a> */}
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="fa fa-bars"></span> Menu
                        </button>
                        <div className="collapse navbar-collapse" id="ftco-nav" style={{ justifyContent: 'space-between' }} >
                            <ul className="navbar-nav ">
                                {/* {danhmuc && danhmuc.length > 0 &&
                                danhmuc.map((item, idex) => {
                                    return (
                                        <NavLink key={item.id} to={item.id} className={({ isActive }) => isActive ? "active nav-link nav-item cta" : 'nav-link nav-item cta'} exact="true">
                                            {item.title}
                                        </NavLink>
                                    )

                                })
                            } */}
                                {/* <li className="nav-item cta" activeClassName='active'> */}
                                <NavLink to="/" className={({ isActive }) => isActive ? "active nav-link nav-item cta" : 'nav-link nav-item cta'} exact="true">
                                    TRANG CHỦ
                                </NavLink>
                                {/* </li> */}

                                <li className="nav-item dropdown dropdown1">
                                    <Link className="nav-link dropdown-toggle" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">KHÓA LUẬN</Link>
                                    <div className="dropdown-menu" aria-labelledby="dropdown04">
                                        <Link to="/khoaluan" className="dropdown-item" >Danh sách đề tài</Link>
                                        <Link to="/khoaluan/ds-sinhviendky" className="dropdown-item" >Danh sách sinh viên đăng ký đề tài</Link>
                                        <Link to="/khoaluan/dieukiendkykhoaluan" className="dropdown-item" >Điều kiện đăng ký</Link>
                                        <Link to="/khoaluan/huongdandky" className="dropdown-item" >Hướng dẫn đăng ký</Link>
                                    </div>
                                </li>

                                {/* <li className="nav-item dropdown dropdown1">
                                    <Link className="nav-link dropdown-toggle" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">THỰC TẬP</Link>
                                    <div className="dropdown-menu" aria-labelledby="dropdown04">
                                        <Link to="/thuctap" className="dropdown-item" >Đăng ký thực tập</Link>
                                        <Link to="/thuctap/dieukiendkythuctap" className="dropdown-item" >Điều kiện đăng ký</Link>
                                        <Link to="/thuctap/huongdandkythuctap" className="dropdown-item" >Hướng dẫn đăng ký</Link>
                                    </div>
                                </li>

                                <li className="nav-item dropdown dropdown1">
                                    <Link className="nav-link dropdown-toggle" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">CHUYÊN NGÀNH</Link>
                                    <div className="dropdown-menu" aria-labelledby="dropdown04">
                                        <Link to="/chuyennganh/ds-sinhvien" className="dropdown-item" >Kết quả đăng ký chuyên ngành</Link>
                                        <Link to="/chuyennganh/dieukiendkychuyennganh" className="dropdown-item" >Điều kiện đăng ký</Link>
                                        <Link to="/chuyennganh/huongdandkychuyennganh" className="dropdown-item" >Hướng dẫn đăng ký</Link>
                                    </div>
                                </li> */}
                                {/* <NavLink to="/chuyennganh" className={({ isActive }) => isActive ? "active nav-link nav-item cta" : 'nav-link nav-item cta'}>
                                ĐĂNG KÝ CHUYÊN NGÀNH
                            </NavLink> */}
                                {/* <NavLink to="/chatbox" className={({ isActive }) => isActive ? "active nav-link nav-item cta" : 'nav-link nav-item cta'}>
                                CHATBOX
                            </NavLink> */}
                                <NavLink to="/contract" className={({ isActive }) => isActive ? "active nav-link nav-item cta" : 'nav-link nav-item cta'}>
                                    LIÊN HỆ
                                </NavLink>
                                {/* <li className="nav-item cta"><a href="#" className="nav-link">Menu</a></li>
                                <li className="nav-item cta"><a href="#" className="nav-link">Blog</a></li>
                                <li className="nav-item cta"><a href="#" className="nav-link">Contact</a></li>
                                <li className="nav-item cta"><a href="#" className="nav-link">Book a table</a></li> */}
                            </ul>

                            {/* Chưa đăng nhập */}
                            <NavLink to="/dangnhap" style={checkLogin ? { display: 'none' } : { display: 'block' }} >
                                <button type="button" className="btn btn-secondary btn-lg">ĐĂNG NHẬP</button>
                            </NavLink>

                            {/* Đã đăng nhập */}
                            <div className='avt' onClick={() => onClickHiddenInfor()} onBlur={() => onClickHiddenInfor()} style={checkLogin ? { display: 'block' } : { display: 'none' }}>
                                <ManageAccountsOutlinedIcon style={{ fontSize: '35px', marginRight: '0.5rem', color: '#f2f2f2' }} />
                                <span>Xin chào, {ThongTin.HoTen}</span>
                            </div>

                            <div className="avt-infor" style={hiddenInfor ? { display: 'block' } : { display: 'none' }}>
                                <ul>
                                    {/* <li className="nav-item dropdown dropdown1" style={{ borderBottom: 'dashed 1px white' }}> */}
                                    {/* <div className='container-information'>
                                        <div className='inf'>
                                            <span>Lê Thị Cẩm Duyên</span>
                                        </div>
                                        <div className='inf'>
                                            <span>3119560010</span>
                                        </div>

                                    </div> */}
                                    {/* </li> */}
                                    <li className="nav-item dropdown dropdown1" onClick={() => onClickHiddenInfor()} >
                                        <Link to="/taikhoan" className="li-infor"><AccountCircleOutlinedIcon style={{ marginRight: '0.5rem' }} />Hồ sơ</Link>
                                    </li>
                                    <li className="nav-item dropdown dropdown1" style={{ borderBottom: 'solid 1px black' }} onClick={() => onClickHiddenInfor()}>
                                        <Link to="/taikhoan/doimatkhau" className="li-infor"><PasswordOutlinedIcon style={{ marginRight: '0.5rem' }} />Đổi mật khẩu</Link>
                                    </li>
                                    <li className="nav-item dropdown dropdown1" onClick={() => onClickLogout()}>
                                        <Link className="li-infor"><LogoutOutlinedIcon style={{ marginRight: '0.5rem' }} />Đăng xuất</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav >
            </section >
        </>
    )
}
export default NavGV;