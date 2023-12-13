import Error from "../error/Error";
import Footer from "./Footer/Footer";
import Login from "./Login/Login";
import Nav from "./Nav";
import NavSV from "./sinhvien/NavSV";
import TrangChu from "./TrangChu";
import DetailNotification from "./Notification/DetailNotification";
import {

    Routes,
    Route,

} from "react-router-dom";
import KhoaLuan from "./sinhvien/khoaluan/KhoaLuan";
import DieuKien from "./sinhvien/khoaluan/DieuKien/DieuKien";
import HuongDanDK from "./sinhvien/khoaluan/HuongDanDK/HuongDanDK";
import DangKy from "./sinhvien/khoaluan/DangKy/DangKy";
import KQDKchuyennganh from "./sinhvien/chuyennganh/KQDKchuyennganh";
import DieuKienDK_CN from "./sinhvien/chuyennganh/DieuKien/DieuKienDK_CN"
import HuongDanDK_CN from "./sinhvien/chuyennganh/HuongDanDK/HuongDanDK_CN"
import Thuctap from "./sinhvien/thuctap/Thuctap";
import DieuKienDK_TT from "./sinhvien/thuctap/DieuKien/DieuKienDK_TT";
import HuongDanDK_TT from "./sinhvien/thuctap/HuongDanDK/HuongDanDK_TT";
import ChatBox from "./sinhvien/Chat/ChatBox";
import Contact from "./sinhvien/Contact/Contact";
import Taikhoan from "./taikhoan/Taikhoan";
import Doimatkhau from "./taikhoan/doimatkhau/Doimatkhau";
import NavGV from "./giangvien/NavGV";
import KhoaLuanGV from "./giangvien/khoaluan/KhoaLuanGV";
import Signup from "./Signup/Signup";
import Quenmatkhau from "./taikhoan/quenmatkhau/Quenmatkhau";
import { useEffect, useState } from "react";
import DangKyChuyenNganh from "./sinhvien/chuyennganh/DangKy/DangKyChuyenNganh";
import DsDeTaicuaGiangVien from "./giangvien/khoaluan/DsDeTaiCuaGiangVien/DsDeTaicuaGiangVien";
import ThemDeTai from "./giangvien/khoaluan/ThemDeTai";
import ChinhSuaDeTai from "./giangvien/khoaluan/ChinhSuaDeTai/ChinhSuaDeTai";
import ThongTinDotThucTap from "./sinhvien/thuctap/ThongTinDotThucTap/ThongTinDotThucTap";
const Client = () => {
    const [checkLogin, setCheckLogin] = useState(false)
    const [checkQuyen, setCheckQuyen] = useState(false)
    const danhmucSV = [
        { id: '/', title: 'TRANG CHỦ' },
        { id: 'thuctap', title: 'THỰC TẬP' },
        { id: 'khoaluan', title: 'KHÓA LUẬN' },
        { id: 'chuyennganh', title: 'ĐĂNG KÝ CHUYÊN NGÀNH' },
        // { id: 'canhbaohoctap', title: 'CẢNH BÁO HỌC TẬP' },
        { id: 'chat', title: 'CHATBOX' },
    ]

    const danhmucGV = [
        { id: '/', title: 'TRANG CHỦ' },
        { id: 'thuctap', title: 'THỰC TẬP' },
        { id: 'khoaluan', title: 'KHÓA LUẬN' },
        { id: 'chuyennganh', title: 'CHUYÊN NGÀNH' },
        { id: 'totnghiep', title: 'TỐT NGHIỆP' },
        { id: 'canhbaohoctap', title: 'CẢNH BÁO HỌC TẬP' },
    ]

    const checklogin = () => {
        localStorage.getItem("accessToken") && localStorage.getItem("ThongTin") ? setCheckLogin(true) : setCheckLogin(false)
        localStorage.getItem("accessToken") && localStorage.getItem("ThongTin") && JSON.parse(localStorage.getItem("ThongTin")).ChucVu === "Sinh viên" ? setCheckQuyen(true) : setCheckQuyen(false)
    }
    useEffect(() => {
        checklogin()
    })
    return (
        <div>

            {/* Check quyền để chạy Nav giảng viên hay sinh viên */}
            {checkLogin
                ?
                <div>
                    {checkQuyen
                        ?
                        <div>
                            <Nav />
                            <NavSV danhmuc={danhmucSV} checkLogin={checkLogin} />
                            <ChatBox />
                            <Routes >
                                <Route path="/">
                                    <Route index path='' element={<TrangChu />} exact></Route>
                                    {/* <Route path='dangnhap' element={<Login />}></Route>
                            <Route path='dangky' element={<Signup />}></Route> */}
                                    {/* <Route path='thuctap' element={<Error />} ></Route> */}
                                    <Route path='khoaluan' >
                                        <Route index element={<KhoaLuan />}></Route>
                                        <Route path='dky-khoaluan' element={<DangKy />}></Route >
                                        <Route path='dieukiendkykhoaluan' element={<DieuKien />}></Route>
                                        <Route path='huongdandky' element={<HuongDanDK />}></Route>
                                    </Route>
                                    <Route path='thuctap' >
                                        <Route index element={<ThongTinDotThucTap />}></Route>
                                        <Route path='dky-thuctap' element={<Thuctap />}></Route>
                                        <Route path='dieukiendkythuctap' element={<DieuKienDK_TT />}></Route>
                                        <Route path='huongdandkythuctap' element={<HuongDanDK_TT />}></Route>
                                    </Route>
                                    <Route path='chuyennganh' >
                                        <Route index element={<Error />}></Route>
                                        <Route path='dangky' element={<DangKyChuyenNganh />}></Route >
                                        <Route path='ds-sinhvien' element={<KQDKchuyennganh />}></Route >
                                        <Route path='dieukiendkychuyennganh' element={<DieuKienDK_CN />}></Route>
                                        <Route path='huongdandkychuyennganh' element={<HuongDanDK_CN />}></Route>
                                    </Route>
                                    <Route path='taikhoan' >
                                        <Route index element={<Taikhoan />}></Route>
                                        <Route path='doimatkhau' element={<Doimatkhau />}></Route >
                                    </Route>

                                    <Route path='contract' element={<Contact />}></Route>
                                    {/* <Route path='thongbao/chitiet' element={<DetailNotification />}></Route> */}
                                    <Route path='*' element={<Error />}></Route>
                                </Route>
                            </Routes >
                        </div>
                        :
                        <div>
                            <Nav />
                            <NavGV danhmuc={danhmucGV} checkLogin={checkLogin} />
                            <ChatBox />
                            <Routes >
                                <Route path="/">
                                    <Route index path='' element={<TrangChu />} exact></Route>
                                    {/* <Route path='dangnhap' element={<Login />}></Route>
                                <Route path='dangky' element={<Signup />}></Route> */}
                                    <Route path='khoaluan' >
                                        <Route index element={<DsDeTaicuaGiangVien />}></Route>
                                        <Route path='chinhsua-detai/:TenDeTai' element={<ChinhSuaDeTai />}></Route >
                                        <Route path='ds-sinhviendky' element={<KhoaLuanGV />}></Route >
                                        <Route path='taomoi' element={<ThemDeTai />}></Route >
                                        {/* <Route path='dieukiendkykhoaluan' element={<DieuKien />}></Route>
                                    <Route path='huongdandky' element={<HuongDanDK />}></Route> */}
                                    </Route>
                                    {/* <Route path='thuctap' >
                                    <Route index element={<Thuctap />}></Route>
                                    <Route path='dieukiendkythuctap' element={<DieuKienDK_TT />}></Route>
                                    <Route path='huongdandkythuctap' element={<HuongDanDK_TT />}></Route>
                                </Route>
                                <Route path='chuyennganh' >
                                    <Route index element={<Error />}></Route>
                                    <Route path='ds-sinhvien' element={<KQDKchuyennganh />}></Route >
                                    <Route path='dieukiendkychuyennganh' element={<DieuKienDK_CN />}></Route>
                                    <Route path='huongdandkychuyennganh' element={<HuongDanDK_CN />}></Route>
                                </Route> */}
                                    <Route path='taikhoan' >
                                        <Route index element={<Taikhoan />}></Route>
                                        <Route path='doimatkhau' element={<Doimatkhau />}></Route >
                                    </Route>

                                    <Route path='contract' element={<Contact />}></Route>
                                    {/* <Route path='thongbao/chitiet' element={<DetailNotification />}></Route> */}
                                    <Route path='*' element={<Error />}></Route>
                                </Route>
                            </Routes >
                        </div>
                    }
                    <Footer />
                </div>
                :
                <div>
                    <Nav />
                    <NavSV danhmuc={danhmucSV} />
                    <ChatBox />
                    <Routes >
                        <Route path="/">
                            <Route index path='' element={<TrangChu />} exact></Route>
                            <Route path='dangnhap' element={<Login />}></Route>
                            <Route path='dangky' element={<Signup />}></Route>
                            <Route path='quenmatkhau' element={<Quenmatkhau />}></Route>
                            <Route path='contract' element={<Contact />}></Route>
                            {/* <Route path='thongbao/chitiet' element={<DetailNotification />}></Route> */}
                            <Route path='*' element={<Error />}></Route>
                        </Route>
                    </Routes >
                    <Footer />
                </div>
            }

        </div>

    )
}
export default Client;