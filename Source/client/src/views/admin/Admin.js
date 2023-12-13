import { Title } from "@mui/icons-material";
import {
    Routes,
    Route,
    useParams,
    Navigate
} from "react-router-dom";

import Dashboard from "./Dashboard/Dashboard"
import Tongquan from "./Tongquan/Tongquan";
import { useEffect, useState } from "react";
import Nav from "./Nav/Nav";
import "./Admin.scss"
import DkiChuyenNganh from "./DKiChuyenNganh/DKiChuyenNganh";
import SingleDkiChuyenNganh from "./DKiChuyenNganh/ChiTietDKCN/SingleDkiChuyenNganh";
import EditDKCN from "./DKiChuyenNganh/EditDKCN/EditDKCN";
import AddDKCN from "./DKiChuyenNganh/ThemDKCN/AddDKCN";
import GiangVien from "./GiangVien/GiangVien";
import EditGiangVien from "./GiangVien/EditGiangVien/EditGiangVien";
import AddGiangVien from "./GiangVien/ThemGiangVien/AddGiangVien";
import SinhVien from "./SinhVien/SinhVien";
import AddSinhVien from "./SinhVien/ThemSinhVien/AddSinhVien";
import EditSinhVien from "./SinhVien/EditSinhVien/EditSinhVien";
import Nganh from "./Nganh/Nganh";
import EditNganh from "./Nganh/EditNganh/EditNganh";
import AddNganh from "./Nganh/ThemNganh/AddNganh";
import ChuyenNganh from "./ChuyenNganh/ChuyenNganh";
import EditChuyenNganh from "./ChuyenNganh/EditChuyenNganh/EditChuyenNganh";
import AddChuyenNganh from "./ChuyenNganh/ThemChuyenNganh/AddChuyenNganh";
import KhoaLuan from "./KhoaLuan/KhoaLuan";
import SingleKhoaLuan from "./KhoaLuan/ChiTietKhoaLuan/SingleKhoaLuan";
import ChiTietDeTai from "./KhoaLuan/ChiTietDeTai/ChiTietDeTai";
import EditDeTai from "./KhoaLuan/EditDeTai/EditDeTai";
import EditKhoaLuan from "./KhoaLuan/EditKhoaLuan/EditKhoaLuan";
import AddKhoaLuan from "./KhoaLuan/ThemKhoaLuan/AddKhoaLuan";
import CanhBaoHocTap from "./CanhBaoHocTap/CanhBaoHocTap";
import ChiTietCBHT from "./CanhBaoHocTap/ChiTietCBHT/ChiTietCBHT";
import EditCBHT from "./CanhBaoHocTap/EditCBHT/EditCBHT";
import AddCBHT from "./CanhBaoHocTap/ThemCBHT/AddCBHT";
import Error from "../error/Error";
import ThucTap from "./ThucTap/ThucTap";
import ChiTietThucTap from "./ThucTap/ChiTietThucTap/ChiTietThucTap";
import ViTriThucTap from "./ThucTap/DSViTriThucTap/ViTriThucTap";
import EditThucTap from "./ThucTap/EditThucTap/EditThucTap";
import AddThucTap from "./ThucTap/ThemThucTap/AddThucTap";
import EditCongTyThucTap from "./ThucTap/EditCongTyThucTap/EditCongTyThucTap";
import TaiKhoan from "./TaiKhoan/TaiKhoan";
import SingleTaiKhoan from "./TaiKhoan/SingleTaiKhoan/SingleTaiKhoan";
import EditTaiKhoan from "./TaiKhoan/EditTaiKhoan/EditTaiKhoan";
import AddTaiKhoan from "./TaiKhoan/ThemTaiKhoan/AddTaiKhoan";
import ChucNang from "./ChucNang/ChucNang";
import EditChucNang from "./ChucNang/EditChucNang/EditChucNang";
import AddChucNang from "./ChucNang/ThemChucNang/AddChucNang";
import ChiTietNganh from "./Nganh/ChiTietNganh/ChiTietNganh";
import QuyenTaiKhoan from "./QuyenTaiKhoan/QuyenTaiKhoan";
import ThemQuyenTaiKhoan from "./QuyenTaiKhoan/ThemQuyenTaiKhoan/ThemQuyenTaiKhoan";
import SingleQuyenTaiKhoan from "./QuyenTaiKhoan/SingleQuyenTaiKhoan/SingleQuyenTaiKhoan";
import EditQuyenTaiKhoan from "./QuyenTaiKhoan/EditQuyenTaiKhoan/EditQuyenTaiKhoan";
import LoginAdmin from "./Login/LoginAdmin";
import TotNghiep from "./TotNghiep/TotNghiep";
import ChiTietTotNghiep from "./TotNghiep/SingleTotNghiep/ChiTietTotNghiep";
import AddTotNghiep from "./TotNghiep/ThemTotNghiep/AddTotNghiep";
import EditTotNghiep from "./TotNghiep/EditTotNghiep/EditTotNghiep";
import AddDeTai from "./KhoaLuan/ThemDeTai/AddDeTai";
import AddCongTyThucTap from "./ThucTap/ThemCongTyThucTap/AddCongTyThucTap";
import AddViTriThucTap from "./ThucTap/DSViTriThucTap/AddViTriThucTap";
import DoiMatKhau from "./Password/DoiMatKhau";
import ThemChuyenNganhDKCN from "./DKiChuyenNganh/ChuyenNganhDK/ThemChuyenNganhDKCN";
import PhucHoiMatKhau from "./Password/PhucHoiMatKhau";
import EditChuyenNganhDKCN from "./DKiChuyenNganh/ChuyenNganhDK/EditChuyenNganhDKCN ";
import ImportSV from "./SinhVien/ImportSV/ImportSV";
const Admin = () => {

    const [hiddenDB, setHiddenDB] = useState(false);
    const [switchmode, setSwitchmode] = useState(false);
    // const [accessToken, SetAccessToken] = useState("");
    const changleHidden = () => {
        setHiddenDB(!hiddenDB);
    }
    const changleSwitchMode = () => {
        setSwitchmode(!switchmode);
    }
    return (
        <>
            <div className={switchmode ? "dark" : ""}>
                <Dashboard hiddenDB={hiddenDB} />
                <section id="content">
                    <Nav changleHidden={changleHidden} changleSwitchMode={changleSwitchMode} />
                    <Routes >
                        {/* <Route path="/admin/"> */}
                        <Route index element={<Tongquan />}></Route>
                        <Route path='dkychuyennganh'  >
                            <Route index element={<DkiChuyenNganh />}></Route>
                            <Route path="new" element={<AddDKCN />}></Route>
                            <Route path="single/:MaDKCN" element={<SingleDkiChuyenNganh />}></Route>
                            <Route path="edit/:MaDKCN" element={<EditDKCN />}></Route>

                            <Route path=":MaDKCN/them-chuyen-nganh" element={<ThemChuyenNganhDKCN />}></Route>
                            <Route path=":MaDKCN/chinh-sua-chuyen-nganh/:MaNganh/:MaChuyenNganh/:ToiDa" element={<EditChuyenNganhDKCN />}></Route>
                        </Route>
                        <Route path='khoaluan'  >
                            <Route index element={<KhoaLuan />}></Route>
                            <Route path="new" element={<AddKhoaLuan />}></Route>
                            <Route path="single/:MaKLTN" element={<SingleKhoaLuan />}></Route>
                            <Route path="edit/:MaKLTN" element={<EditKhoaLuan />}></Route>
                            <Route path=":MaKLTN/detai/new" element={<AddDeTai />}></Route>
                            <Route path=":MaKLTN/detai/:TenDeTai" element={<ChiTietDeTai />}></Route>
                            <Route path=":MaKLTN/detai/edit/:TenDeTai" element={<EditDeTai />}></Route>
                        </Route>
                        <Route path='totnghiep'  >
                            <Route index element={<TotNghiep />}></Route>
                            <Route path="new" element={<AddTotNghiep />}></Route>
                            <Route path="single/:MaTN" element={<ChiTietTotNghiep />}></Route>
                            <Route path="edit/:MaTN" element={<EditTotNghiep />}></Route>
                        </Route>
                        <Route path='thuctap'  >
                            <Route index element={<ThucTap />}></Route>
                            <Route path="new" element={<AddThucTap />}></Route>
                            <Route path="single/:MaDKTT" element={<ChiTietThucTap />}></Route>
                            <Route path="edit/:MaDKTT" element={<EditThucTap />}></Route>
                            <Route path=":MaDKTT/new" element={<AddCongTyThucTap />}></Route>
                            <Route path=":MaDKTT/single/:id/:TenCongTy" element={<ViTriThucTap />}></Route>
                            <Route path=":MaDKTT/edit/:id/:TenCongTy" element={<EditCongTyThucTap />}></Route>
                            <Route path=":MaDKTT/:id/new" element={<AddViTriThucTap />}></Route>
                        </Route>
                        <Route path='canhbaohoctap'  >
                            <Route index element={<CanhBaoHocTap />}></Route>
                            <Route path="new" element={<AddCBHT />}></Route>
                            <Route path="single/:MaCBHT" element={<ChiTietCBHT />}></Route>
                            <Route path="edit/:MaCBHT" element={<EditCBHT />}></Route>
                        </Route>
                        <Route path='giangvien'  >
                            <Route index element={<GiangVien />}></Route>
                            <Route path="new" element={<AddGiangVien />} ></Route>
                            <Route path="edit/:MaGV" element={<EditGiangVien />} ></Route>
                        </Route>
                        <Route path='sinhvien'  >
                            <Route index element={<SinhVien />}></Route>
                            <Route path="new" element={<AddSinhVien />} ></Route>
                            <Route path="importFile" element={<ImportSV />} ></Route>
                            <Route path="edit/:MaSV" element={<EditSinhVien />} ></Route>
                        </Route>
                        <Route path='nganhhoc'  >
                            <Route index element={<Nganh />}></Route>
                            <Route path="new" element={<AddNganh />} ></Route>
                            <Route path="single/:MaNganh" element={<ChiTietNganh />} ></Route>
                            <Route path="edit/:MaNganh" element={<EditNganh />} ></Route>
                        </Route>
                        <Route path='chuyennganh'  >
                            <Route index element={<ChuyenNganh />}></Route>
                            <Route path="new" element={<AddChuyenNganh />} ></Route>
                            <Route path="edit/:MaChuyenNganh" element={<EditChuyenNganh />} ></Route>
                        </Route>
                        <Route path='taikhoan'  >
                            <Route index element={<TaiKhoan />}></Route>
                            <Route path="new" element={<AddTaiKhoan />} ></Route>
                            <Route path="single/:MaTK" element={<SingleTaiKhoan />} ></Route>
                            <Route path="edit/:MaTK" element={<EditTaiKhoan />} ></Route>
                            <Route path="doimatkhau" element={<DoiMatKhau />} ></Route>
                            <Route path="phuc-hoi-mat-khau" element={<PhucHoiMatKhau />} ></Route>
                        </Route>
                        <Route path='quyentaikhoan'  >
                            <Route index element={<QuyenTaiKhoan />}></Route>
                            <Route path="new" element={<ThemQuyenTaiKhoan />} ></Route>
                            <Route path="single/:MaQTK" element={<SingleQuyenTaiKhoan />} ></Route>
                            <Route path="edit/:MaQTK" element={<EditQuyenTaiKhoan />} ></Route>
                        </Route>
                        <Route path='chucnang'  >
                            <Route index element={<ChucNang />}></Route>
                            <Route path="new" element={<AddChucNang />} ></Route>
                            <Route path="edit/:MaCN" element={<EditChucNang />} ></Route>
                        </Route>
                        {/* <Route path='login' element={<LoginAdmin loggedIn={loggedIn} CheckLogin={() => CheckLogin()} />}></Route> */}
                        {/* </Route> */}

                    </Routes >
                </section>
            </div >
        </>
    )
}

export default Admin