import { useEffect, useState } from "react";
import "./Dashboard.scss"
import logo from "./logo.png"
import dia from "./dia.png"
import { NavLink, useNavigate, Link } from "react-router-dom";
import LockResetIcon from '@mui/icons-material/LockReset';
const Dashboard = (props) => {
    const { hiddenDB } = props;
    let navigate = useNavigate();
    const LogOut = () => {
        window.localStorage.clear();
        navigate("/")
    }
    const [catalog, setCatalog] = useState([]);
    useEffect(() => {
        let listdata_chucnang = JSON.parse(localStorage.getItem("listChucNang"))
        setCatalog(listdata_chucnang)
    }, [])

    return (

        < section id="sidebar" className={hiddenDB ? "hide" : ""} >
            <a href="#" className="brand">
                <img src={logo} />
                {/* <i className='bx bxs-school'></i>
                    <span className="text">ĐẠI HỌC SÀI GÒN</span> */}
            </a>
            <ul className="side-menu top">
                <li  >
                    <NavLink to={"/admin/"} className={({ isActive }) => isActive ? "active" : ''}>
                        {/* <i className={item.img}></i> */}
                        <img style={{ objectFit: 'cover', height: '20px', width: '20px', marginRight: '10px', marginLeft: '10px' }} src={dia} />
                        <span className="text">Dashboard</span>
                    </NavLink>
                </li>
                {catalog && catalog.length > 0 && catalog.map((item, index) => {
                    return (
                        <li key={item.MaCN.MaCN} >
                            <NavLink to={"/admin/" + item.MaCN.MaCN} className={({ isActive }) => isActive ? "active" : ''}>
                                {/* <i className={item.img}></i> */}
                                <img style={{ objectFit: 'cover', height: '20px', width: '20px', marginRight: '10px', marginLeft: '10px' }} src={item.MaCN.Hinh} />
                                <span className="text">{item.MaCN.TenChucNang}</span>
                            </NavLink>
                        </li>

                    )
                })}
            </ul>
            <ul className="side-menu" style={{ borderTop: 'solid 2px black' }}>
                <li>
                    <NavLink to={"/admin/taikhoan/doimatkhau"} className={({ isActive }) => isActive ? "active logout" : 'logout'}>
                        <a href="#" className="logout">
                            <i className='bx bxs-edit-alt' ></i>
                            <span className="text">Đổi mật khẩu</span>
                        </a>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/admin/taikhoan/phuc-hoi-mat-khau"} className={({ isActive }) => isActive ? "active logout" : 'logout'}>
                        <a href="#" className="logout">
                            <i className='bx bx-reset'></i>
                            <span className="text" >Phục hồi mật khẩu</span>
                        </a>
                    </NavLink>
                </li>
                <li onClick={() => LogOut()}>
                    <a href="#" className="logout">
                        <i className='bx bx-log-out'></i>
                        <span className="text">Đăng xuất</span>
                    </a>
                </li>
            </ul>
        </ section >


    )

}
export default Dashboard;