import axios from "../custom-axios"

// // GetLogin Admin
const fetchLoginAdmin = (TenDangNhap, MatKhau) => {
    return axios.post('tai-khoan/DangNhapAdmin', {
        TenDangNhap: TenDangNhap,
        MatKhau: MatKhau,
    })
}
export { fetchLoginAdmin };



// Ngành
//Get List Ngành
const fetchAllNganh = (headers) => {
    return axios.get('admin/nganh/DanhSachNganh', { headers });
}
export { fetchAllNganh };

//Get Chi Tiết Ngành
const fetchDetailNganh = (headers, MaNganh) => {
    return axios.get(`admin/nganh/ChiTietNganh/${MaNganh}`, { headers });
}
export { fetchDetailNganh };

//Sửa thông tin Ngành
const fetchEditNganh = (headers, MaNganh, TenNganh) => {
    return axios.put(`admin/nganh/ChinhSua/${MaNganh}`, {
        TenNganh: TenNganh,
    }, { headers });
}
export { fetchEditNganh };

//Thêm thông tin Ngành
const fetchAddNganh = (headers, MaNganh, TenNganh) => {
    return axios.post(`admin/nganh/Them`, {
        MaNganh: MaNganh,
        TenNganh: TenNganh,
    }, { headers });
}
export { fetchAddNganh };

//Xóa  Ngành
const fetchDeleteNganh = (headers, MaNganh) => {
    return axios.delete(`admin/nganh/Xoa/${MaNganh}`, { headers });
}
export { fetchDeleteNganh };
// Ngành


//Giảng viên
//Get List Giảng viên
const fetchAllGiangVien = (headers) => {
    return axios.get('admin/giang-vien/DanhSachGiangVien', { headers });
}
export { fetchAllGiangVien };

//Get Chi Tiết Giảng viên
const fetchDetailGiangVien = (headers, MaGV) => {
    return axios.get(`admin/giang-vien/ChiTietGiangVien/${MaGV}`, { headers });
}
export { fetchDetailGiangVien };

//Sửa thông tin Giảng viên
const fetchEditGiangVien = (headers, MaGV, data) => {
    for (const pair of data.entries()) {
        console.log(pair[0] + ": " + pair[1]);
    }
    // console.log(data.HoGV)
    return axios.post(`admin/giang-vien/ChinhSua/${MaGV}`, data, { headers });
}
export { fetchEditGiangVien };

//Thêm thông tin Giảng viên
const fetchAddGiangVien = (headers, data) => {
    return axios.post(`admin/giang-vien/Them`, data, { headers });
}
export { fetchAddGiangVien };

//Xóa  Giảng viên
const fetchDeleteGiangVien = (headers, MaGV) => {
    return axios.delete(`admin/giang-vien/Xoa/${MaGV}`, { headers });
}
export { fetchDeleteGiangVien };
//Giảng viên

//Chuyên ngành
//Get List Chuyên ngành
const fetchAllChuyenNganh = (headers) => {
    return axios.get('admin/chuyen-nganh/DanhSachChuyenNganh', { headers });
}
export { fetchAllChuyenNganh };

//Get Chi Tiết Chuyên ngành
const fetchDetailChuyenNganh = (headers, MaChuyenNganh) => {
    return axios.get(`admin/chuyen-nganh/ChiTietChuyenNganh/${MaChuyenNganh}`, { headers });
}
export { fetchDetailChuyenNganh };

//Sửa thông tin Chuyên ngành
const fetchEditChuyenNganh = (headers, MaChuyenNganh, MaNganh, TenChuyenNganh) => {
    return axios.put(`admin/chuyen-nganh/ChinhSua/${MaChuyenNganh}`, {
        MaChuyenNganh: MaChuyenNganh,
        MaNganh: MaNganh,
        TenChuyenNganh: TenChuyenNganh,
    }, { headers });
}
export { fetchEditChuyenNganh };

//thêm Chuyên ngành
const fetchAddChuyenNganh = (headers, MaChuyenNganh, MaNganh, TenChuyenNganh) => {
    return axios.post(`admin/chuyen-nganh/Them`, {
        MaChuyenNganh: MaChuyenNganh,
        MaNganh: MaNganh,
        TenChuyenNganh: TenChuyenNganh,
    }, { headers });
}
export { fetchAddChuyenNganh };

//Xóa  Chuyên ngành
const fetchDeleteChuyenNganh = (headers, MaChuyenNganh) => {
    return axios.delete(`admin/chuyen-nganh/Xoa/${MaChuyenNganh}`, { headers });
}
export { fetchDeleteChuyenNganh };

//Chuyên ngành

//Chức năng
//Get List Chức năng
const fetchAllChucNang = (headers) => {
    return axios.get('admin/chuc-nang/DanhSachChucNang', { headers });
}
export { fetchAllChucNang };

//Get Chi Tiết Chức năng
const fetchDetailChucNang = (headers, MaCN) => {
    return axios.get(`admin/chuc-nang/ChiTietChucNang/${MaCN}`, { headers });
}
export { fetchDetailChucNang };

//Sửa  Chức Năng
const fetchEditChucNang = (headers, MaCN, data) => {
    for (const pair of data.entries()) {
        console.log(pair[0] + ": " + pair[1]);
    }
    return axios.post(`admin/chuc-nang/ChinhSua/${MaCN}`, data, { headers });
}
export { fetchEditChucNang };

//Thêm Chức Năng
const fetchAddChucNang = (headers, data) => {
    // for (const pair of data.entries()) {
    //     console.log(pair[0] + ": " + pair[1]);
    // }
    return axios.post(`admin/chuc-nang/Them`, data, { headers });
}
export { fetchAddChucNang };

//Xóa  Chức năng
const fetchDeleteChucNang = (headers, MaCN) => {
    return axios.delete(`admin/chuc-nang/Xoa/${MaCN}`, { headers });
}
export { fetchDeleteChucNang };
//Chức năng

//Sinh Viên
//Get List Sinh Viên
const fetchAllSinhVien = (headers) => {
    return axios.get('admin/sinh-vien/DanhSachSinhVien', { headers });
}
export { fetchAllSinhVien };

//Get Chi Tiết Sinh Viên
const fetchDetailSinhVien = (headers, MaSV) => {
    return axios.get(`admin/sinh-vien/ChiTietSinhVien/${MaSV}`, { headers });
}
export { fetchDetailSinhVien };

//Sửa thông tin Sinh Viên
const fetchEditSinhVien = (headers, MaSV, HoSV, TenSV, Email, SoDienThoai, GioiTinh, NgaySinh, Khoa, ChuyenNganh, Nganh, Lop, TrangThaiTotNghiep) => {
    return axios.put(`admin/sinh-vien/ChinhSua/${MaSV}`, {
        MaSV: MaSV,
        HoSV: HoSV,
        TenSV: TenSV,
        Email: Email,
        SoDienThoai: SoDienThoai,
        GioiTinh: GioiTinh,
        NgaySinh: NgaySinh,
        Khoa: Khoa,
        ChuyenNganh: ChuyenNganh,
        Nganh: Nganh,
        Lop: Lop,
        TrangThaiTotNghiep: TrangThaiTotNghiep,
    }, { headers });
}
export { fetchEditSinhVien };

//Thêm thông tin Sinh Viên
const fetchAddSinhVien = (headers, MaSV, HoSV, TenSV, Email, SoDienThoai, GioiTinh, NgaySinh, Khoa, ChuyenNganh, Nganh, Lop, TrangThaiTotNghiep) => {
    return axios.post(`admin/sinh-vien/Them`, {
        MaSV: MaSV,
        HoSV: HoSV,
        TenSV: TenSV,
        Email: Email,
        SoDienThoai: SoDienThoai,
        GioiTinh: GioiTinh,
        NgaySinh: NgaySinh,
        Khoa: Khoa,
        ChuyenNganh: ChuyenNganh,
        Nganh: Nganh,
        Lop: Lop,
        TrangThaiTotNghiep: TrangThaiTotNghiep,
    }, { headers });
}
export { fetchAddSinhVien };

//Xóa  Sinh Viên
const fetchDeleteSinhVien = (headers, MaSV) => {
    return axios.delete(`admin/sinh-vien/Xoa/${MaSV}`, { headers });
}
export { fetchDeleteSinhVien };

//Import DSSV
const fetchImportDSSVSinhVien = (headers, data) => {
    for (const pair of data.entries()) {
        console.log(pair[0] + ": " + pair[1]);
    }
    return axios.post(`admin/sinh-vien/importFileSV`, data, { headers });
}
export { fetchImportDSSVSinhVien };
//Sinh Viên

//Tài khoản
//Get List Tài khoản giảng viên
const fetchAllTaiKhoanGV = (headers) => {
    return axios.get('admin/tai-khoan/DanhSachTKGiangVien', { headers });
}
export { fetchAllTaiKhoanGV };

//Get List Tài khoản sinh viên
const fetchAllTaiKhoanSV = (headers) => {
    return axios.get('admin/tai-khoan/DanhSachTKSinhVien', { headers });
}
export { fetchAllTaiKhoanSV };

//Get Chi Tiết Tài khoản
const fetchDetailTaiKhoan = (headers, MaTK) => {
    return axios.get(`admin/tai-khoan/ChiTietTaiKhoan/${MaTK}`, { headers });
}
export { fetchDetailTaiKhoan };

//Sửa Tài khoản
const fetchEditTaiKhoan = (headers, MaTK, QuyenTK) => {
    return axios.put(`admin/tai-khoan/ChinhSua/${MaTK}`, {
        MaTK: MaTK,
        MaQTK: QuyenTK,

    }, { headers });
}
export { fetchEditTaiKhoan };

//Kích hoạt Tài khoản
const fetchAcceptTaiKhoan = (headers, MaTK) => {
    return axios.post(`admin/tai-khoan/KichHoatTaiKhoan/${MaTK}`, {
        MaTK: MaTK
    }, { headers });
}
export { fetchAcceptTaiKhoan };

//Thêm Tài khoản
const fetchAddTaiKhoan = (headers, MaTK, TenDangNhap, MatKhau, MaQTK) => {
    return axios.post(`admin/tai-khoan/Them`, {
        MaTK: MaTK,
        TenDangNhap: TenDangNhap,
        MatKhau: MatKhau,
        MaQTK: MaQTK,
    }, { headers });
}
export { fetchAddTaiKhoan };

//Xóa  Tài khoản
const fetchDeleteTaiKhoan = (headers, MaTK) => {
    return axios.delete(`admin/tai-khoan/Xoa/${MaTK}`, { headers });
}
export { fetchDeleteTaiKhoan };

//Đổi mật khẩu  Tài khoản
const fetchEditMatKhau = (headers, MaTK, MatKhauCu, MatKhauMoi, NhapLaiMatKhauMoi) => {
    return axios.post(`tai-khoan/DoiMatKhau`, {
        MaSo: MaTK,
        MatKhauCu: MatKhauCu,
        MatKhauMoi: MatKhauMoi,
        NhapLaiMatKhauMoi: NhapLaiMatKhauMoi,
    }, { headers });
}
export { fetchEditMatKhau };

//Đổi Phục hồi mật khẩu
const fetchPhucHoiMatKhau = (headers, MaTK, MatKhauMoi) => {
    return axios.post(`admin/tai-khoan/PhucHoiMatKhau/${MaTK}`, {
        MaTK: MaTK,
        MatKhauPhucHoi: MatKhauMoi,
    }, { headers });
}
export { fetchPhucHoiMatKhau };
//Tài khoản


// Quyền tài khoản
//Get List Quyền tài khoản
const fetchAllQuyenTK = (headers) => {
    return axios.get('admin/quyen-tai-khoan/DanhSachQuyenTK', { headers });
}
export { fetchAllQuyenTK };

//Get Chi Tiết Quyền tài khoản
const fetchDetailQuyenTK = (headers, MaQTK) => {
    return axios.get(`admin/quyen-tai-khoan/ChiTietQuyenTK/${MaQTK}`, { headers });
}
export { fetchDetailQuyenTK };

//Sửa Quyền tài khoản
const fetchEditQuyenTK = (headers, MaQTK, TenQuyenTK, MaCN, ChucNangCon) => {
    return axios.put(`admin/quyen-tai-khoan/ChinhSua/${MaQTK}`, {
        TenQuyenTK: TenQuyenTK,
        MaCN: MaCN,
        ChucNangCon: ChucNangCon,
    }, { headers });
}
export { fetchEditQuyenTK };

//Thêm Quyền tài khoản
const fetchAddQuyenTK = (headers, MaQTK, TenQuyenTK, MaCN, ChucNangCon) => {
    console.log("API MaQTK : ", MaQTK)
    console.log("API TenQuyenTK : ", TenQuyenTK)
    console.log("API MaCN : ", MaCN)
    console.log("API ChucNangCon : ", ChucNangCon)
    return axios.post(`admin/quyen-tai-khoan/Them`, {
        MaQTK: MaQTK,
        TenQuyenTK: TenQuyenTK,
        MaCN: MaCN,
        ChucNangCon: ChucNangCon,
    }, { headers });
}
export { fetchAddQuyenTK };

//Xóa  Quyền Tài Khoản
const fetchDeleteQuyenTK = (headers, MaQTK) => {
    return axios.delete(`admin/quyen-tai-khoan/Xoa/${MaQTK}`, { headers });
}
export { fetchDeleteQuyenTK };

// Quyền tài khoản

// Cảnh báo học tập
//Get List Cảnh báo điểm học tập
const fetchAllCanhBao_DHT = (headers) => {
    return axios.get('admin/canh-bao-hoc-tap/DanhSachDotCanhBao?page&pageSize&keyword=&KieuCanhBao=Điểm học tập', { headers });
}
export { fetchAllCanhBao_DHT };

//Get List Cảnh báo điểm rèn luyện
const fetchAllCanhBao_DRL = (headers) => {
    return axios.get('admin/canh-bao-hoc-tap/DanhSachDotCanhBao?page&pageSize&keyword=&KieuCanhBao=Điểm rèn luyện', { headers });
}
export { fetchAllCanhBao_DRL };

//Get chi tiết Cảnh báo 
const fetchDetailCanhBao = (headers, MaCBHT) => {
    return axios.get(`admin/canh-bao-hoc-tap/ChiTietDotCanhBao/${MaCBHT}`, { headers });
}
export { fetchDetailCanhBao };

//Get bảng thống kê
const fetchStatisticalCanhBao = (headers, MaCBHT, ThongKeTheo, LocTheoNganh, LocTheoKhoa) => {
    return axios.post(`admin/canh-bao-hoc-tap/ThongKeCBHTSinhVien/${MaCBHT}`, {
        ThongKeTheo: ThongKeTheo,
        LocTheoNganh: LocTheoNganh,
        LocTheoKhoa: LocTheoKhoa,
    }, { headers });
}
export { fetchStatisticalCanhBao };

//Sửa Cảnh báo
const fetchEditCanhBao = (headers, MaCBHT, Ten, Dot, NienKhoa) => {
    return axios.post(`admin/canh-bao-hoc-tap/ChinhSuaThongTin/${MaCBHT}`, {
        MaCBHT: MaCBHT,
        Ten: Ten,
        Dot: Dot,
        NienKhoa: NienKhoa,
    }, { headers });
}
export { fetchEditCanhBao };

//Xóa  Cảnh báo
const fetchDeleteCanhBao = (headers, MaCBHT) => {
    return axios.delete(`admin/canh-bao-hoc-tap/XoaDotCanhBao/${MaCBHT}`, { headers });
}
export { fetchDeleteCanhBao };

//Thêm Cảnh báo
const fetchAddCanhBao = (headers, data) => {
    for (const pair of data.entries()) {
        console.log(pair[0] + ": " + pair[1]);
    }
    return axios.post(`admin/canh-bao-hoc-tap/ThemDotCanhBao`, data, { headers });
}
export { fetchAddCanhBao };
// Cảnh báo học tập

// Tốt nghiệp
//Get List Tốt nghiệp
const fetchAllTotNghiep = (headers) => {
    return axios.get('admin/tot-nghiep/DanhSachDotTotNghiep', { headers });
}
export { fetchAllTotNghiep };

//Get chi tiết Tốt nghiệp
const fetchDetailTotNghiep = (headers, MaTN) => {
    return axios.get(`admin/tot-nghiep/ChiTietDotTotNghiep/${MaTN}`, { headers });
}
export { fetchDetailTotNghiep };

//Get bảng thống kê Tốt nghiệp
const fetchStatisticalTotNghiep = (headers, MaTN, ThongKeTheo, LocTheoNganh, KieuThongKe) => {
    return axios.post(`admin/tot-nghiep/ThongKeTotNghiepSinhVien/${MaTN}`, {
        ThongKeTheo: ThongKeTheo,
        LocTheoNganh: LocTheoNganh,
        KieuThongKe: KieuThongKe,
    }, { headers });
}
export { fetchStatisticalTotNghiep };

//Thêm Tốt nghiệp
const fetchAddTotNghiep = (headers, data) => {
    // for (const pair of data.entries()) {
    //     console.log(pair[0] + ": " + pair[1]);
    // }
    return axios.post(`admin/tot-nghiep/ThemDotTotNghiep`, data, { headers });
}
export { fetchAddTotNghiep };

//Sửa Tốt nghiệp
const fetchEditTotNghiep = (headers, MaTN, Ten, NienKhoa) => {
    return axios.post(`admin/tot-nghiep/ChinhSuaThongTin/${MaTN}`, {
        MaTN: MaTN,
        Ten: Ten,
        NienKhoa: NienKhoa,
    }, { headers });
}
export { fetchEditTotNghiep };

//Xóa  Tốt nghiệp
const fetchDeleteTotNghiep = (headers, MaTN) => {
    return axios.delete(`admin/tot-nghiep/XoaDotTotNghiep/${MaTN}`, { headers });
}
export { fetchDeleteTotNghiep };
// Tốt nghiệp

// Đăng ký chuyên ngành
//Get List Đăng ký chuyên ngành
const fetchAllDangKyCN = (headers) => {
    return axios.get('admin/dk-chuyen-nganh/DanhSachDKCN', { headers });
}
export { fetchAllDangKyCN };

//Get chi tiết Đăng ký chuyên ngành
const fetchDetailDangKyCN = (headers, MaDKCN) => {
    return axios.get(`admin/dk-chuyen-nganh/ChiTietDKCN/${MaDKCN}`, { headers });
}
export { fetchDetailDangKyCN };

//Get chi tiết DSSV Đăng ký chuyên ngành
const fetchDetailDSSVDangKyCN = (headers, MaDKCN, MaNganh, MaChuyenNganh) => {
    return axios.post(`admin/dk-chuyen-nganh/ThonKeSVDangKyChuyenNganh`, {
        MaDKCN: MaDKCN,
        MaNganh: MaNganh,
        MaChuyenNganh: MaChuyenNganh
    }, { headers });
}
export { fetchDetailDSSVDangKyCN };

//Sửa Đăng ký chuyên ngành
const fetchEditDangKyCN = (headers, MaDKCN, Ten, Khoa, ThoiGianBD, ThoiGianKT) => {
    return axios.put(`admin/dk-chuyen-nganh/ChinhSua/${MaDKCN}`, {
        Ten: Ten,
        Khoa: Khoa,
        ThoiGianBD: ThoiGianBD,
        ThoiGianKT: ThoiGianKT,
    }, { headers });
}
export { fetchEditDangKyCN };

//Thêm Đăng ký chuyên ngành
const fetchAddDangKyCN = (headers, MaDKCN, Ten, Khoa, ThoiGianBD, ThoiGianKT) => {
    return axios.post(`admin/dk-chuyen-nganh/Them`, {
        MaDKCN: MaDKCN,
        Ten: Ten,
        Khoa: Khoa,
        ThoiGianBD: ThoiGianBD,
        ThoiGianKT: ThoiGianKT
    }, { headers });
}
export { fetchAddDangKyCN };

//Thêm Chuyên ngành Đăng ký
const fetchAddChuyenNganhDangKyCN = (headers, MaDKCN, MaNganh, MaChuyenNganh, ToiDa) => {

    return axios.post(`admin/dk-chuyen-nganh/ThemChuyenNganhDangKy/${MaDKCN}`, {
        MaDKCN: MaDKCN,
        MaNganh: MaNganh,
        MaChuyenNganh: MaChuyenNganh,
        ToiDa: ToiDa
    }, { headers });
}
export { fetchAddChuyenNganhDangKyCN };

//Sửa số lượng  Chuyên ngành Đăng ký
const fetchEditChuyenNganhDK = (headers, MaDKCN, MaNganh, MaChuyenNganh, SoLuong) => {
    return axios.post(`admin/dk-chuyen-nganh/SuaChuyenNganhDangKy/${MaDKCN}`, {
        MaNganh: MaNganh,
        MaChuyenNganh: MaChuyenNganh,
        SoLuong: SoLuong,
    }, { headers });
}
export { fetchEditChuyenNganhDK };

//Xóa  Chuyên ngành Đăng ký
const fetchDeleteChuyenNganhDK = (headers, MaDKCN, MaNganh, MaChuyenNganh) => {
    return axios.post(`admin/dk-chuyen-nganh/XoaChuyenNganhDangKy/${MaDKCN}`, {
        MaNganh: MaNganh,
        MaChuyenNganh: MaChuyenNganh
    }, { headers });
}
export { fetchDeleteChuyenNganhDK };

//Xóa  Đăng ký chuyên ngành
const fetchDeleteDangKyCN = (headers, MaDKCN) => {
    return axios.delete(`admin/dk-chuyen-nganh/Xoa/${MaDKCN}`, { headers });
}
export { fetchDeleteDangKyCN };

//Cập nhật  Đăng ký chuyên ngành
const fetchUpdateDangKyCN = (headers) => {
    return axios.get(`admin/dk-chuyen-nganh/TuDongCapNhatTrangThaiDKCN`, { headers });
}
export { fetchUpdateDangKyCN };


// Đăng ký chuyên ngành

//Khóa luận
//Get List Khóa luận
const fetchAllKhoaLuan = (headers) => {
    return axios.get('admin/khoa-luan-tot-nghiep/DanhSachKLTN', { headers });
}
export { fetchAllKhoaLuan };

//Get Chi Tiết Khóa luận
const fetchDetailKhoaLuan = (headers, MaKLTN) => {
    return axios.get(`admin/khoa-luan-tot-nghiep/ChiTietKLTN/${MaKLTN}`, { headers });
}
export { fetchDetailKhoaLuan };

//Chỉnh sửa khóa luận
const fetchEditKhoaLuan = (headers, MaKLTN, Ten, Khoa, MaNganh, ThoiGianBD, ThoiGianKT) => {
    return axios.put(`admin/khoa-luan-tot-nghiep/ChinhSua/${MaKLTN}`, {
        Ten: Ten,
        Khoa: Khoa,
        MaNganh: MaNganh,
        ThoiGianBD: ThoiGianBD,
        ThoiGianKT: ThoiGianKT
    }, { headers });
}
export { fetchEditKhoaLuan };

//Thêm khóa luận
const fetchAddKhoaLuan = (headers, MaKLTN, Ten, MaNganh, Khoa, ThoiGianBD, ThoiGianKT) => {
    return axios.post(`admin/khoa-luan-tot-nghiep/Them`, {
        MaKLTN: MaKLTN,
        Ten: Ten,
        Khoa: Khoa,
        MaNganh: MaNganh,
        ThoiGianBD: ThoiGianBD,
        ThoiGianKT: ThoiGianKT
    }, { headers });
}
export { fetchAddKhoaLuan };

//Xóa  khóa luận
const fetchDeleteKhoaLuan = (headers, MaKLTN) => {
    return axios.delete(`admin/khoa-luan-tot-nghiep/Xoa/${MaKLTN}`, { headers });
}
export { fetchDeleteKhoaLuan };

//Tự động cập nhật  khóa luận
const fetchUpdateKhoaLuan = (headers) => {
    return axios.get(`admin/khoa-luan-tot-nghiep/TuDongCapNhatTrangThaiKLTN`, { headers });
}
export { fetchUpdateKhoaLuan };

//Thêm đề tài của khóa luận tốt nghiệp
const fetchAddDeTai = (headers, MaKLTN, TenDeTai, MaGV) => {
    return axios.post(`admin/khoa-luan-tot-nghiep/ThemDeTaiKhoaLuan/${MaKLTN}`, {
        TenDeTai: TenDeTai,
        MaGV: MaGV,
    }, { headers });
}
export { fetchAddDeTai };

//Xóa đề tài của khóa luận tốt nghiệp
const fetchDeleteDeTai = (headers, MaKLTN, TenDeTai, MaGV) => {
    return axios.post(`admin/khoa-luan-tot-nghiep/XoaDeTaiKhoaLuan/${MaKLTN}`, {
        TenDeTai: TenDeTai,
        MaGV: MaGV,
    }, { headers });
}
export { fetchDeleteDeTai };

//Chỉnh sửa đề tài của khóa luận tốt nghiệp
const fetchEditDeTai = (headers, MaKLTN, TenDeTaiCu, TenDeTaiMoi, MaGV) => {
    return axios.post(`admin/khoa-luan-tot-nghiep/ChinhSuaTenDeTaiKhoaLuan/${MaKLTN}`, {
        MaKLTN: MaKLTN,
        TenDeTaiCu: TenDeTaiCu,
        TenDeTaiMoi: TenDeTaiMoi,
        MaGV: MaGV,
    }, { headers });
}
export { fetchEditDeTai };

//Thêm SV đăng ký khóa luận
const fetchAddSinhVienDangKyKL = (headers, MaKLTN, TenDeTai, MaGV, MaSV, HoSV, TenSV, Email, SoDienThoai, DTBTL, TinChiTL) => {
    return axios.post(`admin/khoa-luan-tot-nghiep/ThemSVDangKyKL/${MaKLTN}`, {
        MaKLTN: MaKLTN,
        TenDeTai: TenDeTai,
        MaGV: MaGV,
        MaSV: MaSV,
        HoSV: HoSV,
        TenSV: TenSV,
        Email: Email,
        SoDienThoai: SoDienThoai,
        DTBTL: DTBTL,
        TinChiTL: TinChiTL,
    }, { headers });
}
export { fetchAddSinhVienDangKyKL };

//Sửa SV đăng ký khóa luận
const fetchEditSinhVienDangKyKL = (headers, MaKLTN, TenDeTai, MaGV, MaSV, HoSV, TenSV, Email, SoDienThoai, DTBTL, TinChiTL) => {
    return axios.post(`admin/khoa-luan-tot-nghiep/SuaThongTinSVDangKyKL/${MaKLTN}`, {
        MaKLTN: MaKLTN,
        TenDeTai: TenDeTai,
        MaGV: MaGV,
        MaSV: MaSV,
        HoSV: HoSV,
        TenSV: TenSV,
        Email: Email,
        SoDienThoai: SoDienThoai,
        DTBTL: DTBTL,
        TinChiTL: TinChiTL,
    }, { headers });
}
export { fetchEditSinhVienDangKyKL };

//Xóa SV đăng ký khóa luận
const fetchDeleteSinhVienDangKyKL = (headers, MaKLTN, TenDeTai, MaGV, MaSV) => {
    return axios.post(`admin/khoa-luan-tot-nghiep/XoaSVDangKyKL/${MaKLTN}`, {
        MaKLTN: MaKLTN,
        TenDeTai: TenDeTai,
        MaGV: MaGV,
        MaSV: MaSV,
    }, { headers });
}
export { fetchDeleteSinhVienDangKyKL };

// ExportFile Ds đề tài và sv đăng ký đề tài
const fetchExportFileDSDeTai = (headers, MaKLTN) => {
    return axios.get(`admin/khoa-luan-tot-nghiep/ExportFileExcelDsDeTai/${MaKLTN}`, { headers, responseType: "blob" })
}
export { fetchExportFileDSDeTai };
//Khóa luận

//Thực tập
//Get List Thực tập
const fetchAllThucTap = (headers) => {
    return axios.get('admin/dk-thuc-tap/DanhSachDKTT', { headers });
}
export { fetchAllThucTap };

//Get Chi Tiết Thực tập
const fetchDetailThucTap = (headers, MaDKTT) => {
    return axios.get(`admin/dk-thuc-tap/ChiTietDKTT/${MaDKTT}`, { headers });
}
export { fetchDetailThucTap };

//Get DSSV Thực tập
const fetchGetDSSVThucTap = (headers, MaDKTT) => {
    return axios.post(`admin/dk-thuc-tap/DanhSachSinhVien/${MaDKTT}`, {
        MaDKTT: MaDKTT
    }, { headers });
}
export { fetchGetDSSVThucTap };

//Thêm Thực tập
const fetchAddThucTap = (headers, MaDKTT, Ten, NienKhoa, ThoiGianBD, ThoiGianKT) => {
    return axios.post(`admin/dk-thuc-tap/Them`, {
        MaDKTT: MaDKTT,
        Ten: Ten,
        NienKhoa: NienKhoa,
        ThoiGianBD: ThoiGianBD,
        ThoiGianKT: ThoiGianKT
    }, { headers });
}
export { fetchAddThucTap };

//Edit Thực tập
const fetchEditThucTap = (headers, MaDKTT, Ten, NienKhoa, ThoiGianBD, ThoiGianKT) => {
    return axios.put(`admin/dk-thuc-tap/ChinhSua/${MaDKTT}`, {
        MaDKTT: MaDKTT,
        Ten: Ten,
        NienKhoa: NienKhoa,
        ThoiGianBD: ThoiGianBD,
        ThoiGianKT: ThoiGianKT
    }, { headers });
}
export { fetchEditThucTap };

//Xóa  Thực tập
const fetchDeleteThucTap = (headers, MaDKTT) => {
    return axios.delete(`admin/dk-thuc-tap/Xoa/${MaDKTT}`, { headers });
}
export { fetchDeleteThucTap };

// ExportFile Ds sv và cty thực tập
const fetchExportFileDSSV_Cty = (headers, MaDKTT) => {
    return axios.get(`admin/dk-thuc-tap/ExportFileExcelDsSVDKTT/${MaDKTT}`, { headers, responseType: "blob" })
}
export { fetchExportFileDSSV_Cty };

//Tự động cập nhật thực tập
const fetchUpdateThucTap = (headers) => {
    // console.log(headers)
    return axios.get(`admin/dk-thuc-tap/TuDongCapNhatTrangThaiDKTT`, { headers });
}
export { fetchUpdateThucTap };

//Thêm Công ty thực tập
const fetchAddCtyThucTap = (headers, MaDKTT, Ho, Ten, TenCongTy, Website, SoDienThoai, Email, DiaChi) => {
    return axios.post(`admin/dk-thuc-tap/ThemCongTyTrongDanhSach/${MaDKTT}`, {
        MaDKTT: MaDKTT,
        Ho: Ho,
        Ten: Ten,
        TenCongTy: TenCongTy,
        Website: Website,
        SoDienThoai: SoDienThoai,
        Email: Email,
        DiaChi: DiaChi,

    }, { headers });
}
export { fetchAddCtyThucTap };

//Get Chi Tiết Công ty thực tập
const fetchDetailCongTyThucTap = (headers, MaDKTT, id) => {
    return axios.post(`admin/dk-thuc-tap/ChiTietCty/${MaDKTT}`, { MaDKTT: MaDKTT, ID: id }, { headers });
}
export { fetchDetailCongTyThucTap };

//Sửa thông tin Công ty thực tập
const fetchEditCtyThucTap = (headers, MaDKTT, ID, HoNguoiLienHe, TenNguoiLienHe, TenCongTy, Website, SoDienThoai, Email, DiaChi) => {
    return axios.post(`admin/dk-thuc-tap/SuaThongTinCty/${MaDKTT}`, {
        MaDKTT: MaDKTT,
        ID: ID,
        HoNguoiLienHe: HoNguoiLienHe,
        TenNguoiLienHe: TenNguoiLienHe,
        TenCongTy: TenCongTy,
        Website: Website,
        SoDienThoai: SoDienThoai,
        Email: Email,
        DiaChi: DiaChi,

    }, { headers });
}
export { fetchEditCtyThucTap };

//Xóa Công ty thực tập
const fetchDeleteCtyThucTap = (headers, MaDKTT, Email) => {
    return axios.post(`admin/dk-thuc-tap/XoaCongTyTrongDanhSach/${MaDKTT}`, {
        MaDKTT: MaDKTT,
        Email: Email,
    }, { headers });
}
export { fetchDeleteCtyThucTap };

//Thêm vị trí Công ty thực tập
const fetchAddViTriCtyThucTap = (headers, MaDKTT, ViTri, ToiDa, Email) => {
    return axios.post(`admin/dk-thuc-tap/ThemViTriCongTyTrongDanhSach/${MaDKTT}`, {
        MaDKTT: MaDKTT,
        ViTri: ViTri,
        ToiDa: ToiDa,
        Email: Email,
    }, { headers });
}
export { fetchAddViTriCtyThucTap };

//Xóa vị trí Công ty thực tập
const fetchDeleteViTriCtyThucTap = (headers, MaDKTT, ViTri, Email) => {
    return axios.post(`admin/dk-thuc-tap/XoaViTriCongTyTrongDanhSach/${MaDKTT}`, {
        MaDKTT: MaDKTT,
        ViTri: ViTri,
        Email: Email,
    }, { headers });
}
export { fetchDeleteViTriCtyThucTap };