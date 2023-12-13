import axios from "../custom-axios"

//  GetLogin Client
const fetchLogin = (TenDangNhap, MatKhau) => {
    return axios.post('tai-khoan/DangNhap', {
        TenDangNhap: TenDangNhap,
        MatKhau: MatKhau,
    })
}
export { fetchLogin };

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

// Chi tiết SV Client
const fetchDetailSinhVien = (headers, MaSV) => {
    return axios.get(`sinh-vien/ChiTietSinhVien/${MaSV}`, { headers })
}
export { fetchDetailSinhVien };

// Sửa Thông tin SV
const fetchEditSinhVien = (headers, MaSV, HoSV, TenSV, Email, SoDienThoai, GioiTinh, NgaySinh) => {
    return axios.put(`sinh-vien/ChinhSuaThongTin/${MaSV}`, {
        MaSV: MaSV,
        HoSV: HoSV,
        TenSV: TenSV,
        Email: Email,
        SoDienThoai: SoDienThoai,
        GioiTinh: GioiTinh,
        NgaySinh: NgaySinh,
    }, { headers })
}
export { fetchEditSinhVien };

// Chi tiết GV Client
const fetchDetailGiangVien = (headers, MaGV) => {
    return axios.get(`giang-vien/ChiTietGiangVien/${MaGV}`, { headers })
}
export { fetchDetailGiangVien };

//Sửa thông tin Giảng viên - lỗi
const fetchEditGiangVien = (headers, MaGV, data) => {
    for (const pair of data.entries()) {
        console.log(pair[0] + ": " + pair[1]);
    }
    // console.log(data.HoGV)
    return axios.post(`giang-vien/ChinhSuaThongTin/${MaGV}`, data, { headers });
}
export { fetchEditGiangVien };

// Chi tiết Chuyên ngành
const fetchDetailChuyenNganh = (headers) => {
    return axios.get(`dk-chuyen-nganh/LayDotDKCNDangMo`, { headers })
}
export { fetchDetailChuyenNganh };

// DSSV đăng ký chuyên ngành
const fetchDetailDSSVChuyenNganh = (headers, MaDKCN, MaNganh, MaChuyenNganh) => {
    return axios.post(`dk-chuyen-nganh/DSSVDangKyChuyenNganh/${MaDKCN}`, {
        MaNganh: MaNganh,
        MaChuyenNganh: MaChuyenNganh
    }, { headers })
}
export { fetchDetailDSSVChuyenNganh };

// Chi tiết Khóa luận
const fetchDetailKhoaLuan = (headers) => {
    return axios.get(`khoa-luan-tot-nghiep/ThongTinKLTN`, { headers })
}
export { fetchDetailKhoaLuan };

//Đăng ký chuyên ngành
const fetchDkyChuyenNganh = (headers, MaDKCN, MaSV, MaNganh, MaChuyenNganh) => {
    return axios.post(`dk-chuyen-nganh/SVDangKyChuyenNganh/${MaDKCN}`, {
        MaDKCN: MaDKCN,
        MaSV: MaSV,
        MaNganh: MaNganh,
        MaChuyenNganh: MaChuyenNganh
    }, { headers })
}
export { fetchDkyChuyenNganh };

// Hủy Đăng ký chuyên ngành
const fetchHuyDkyChuyenNganh = (headers, MaDKCN, MaSV, MaNganh, MaChuyenNganh) => {
    return axios.post(`dk-chuyen-nganh/SVHuyDangKyChuyenNganh/${MaDKCN}`, {
        MaDKCN: MaDKCN,
        MaSV: MaSV,
        MaNganh: MaNganh,
        MaChuyenNganh: MaChuyenNganh
    }, { headers })
}
export { fetchHuyDkyChuyenNganh };

// Chi tiết đề tài
const fetchDetailDeTai = (headers, MaKLTN, TenDeTai, MaGV) => {
    return axios.post(`khoa-luan-tot-nghiep/ThongTinChiTietDeTaiGV/${MaKLTN}`, {
        MaGV: MaGV,
        TenDeTai: TenDeTai
    }, { headers })
}
export { fetchDetailDeTai };

// Sửa Tên đề tài
const fetchEditDeTai = (headers, MaKLTN, TenDeTaiCu, TenDeTaiMoi, MaGV) => {
    return axios.post(`khoa-luan-tot-nghiep/ChinhSuaTenDeTaiKhoaLuan/${MaKLTN}`, {
        MaGV: MaGV,
        TenDeTaiCu: TenDeTaiCu,
        TenDeTaiMoi: TenDeTaiMoi
    }, { headers })
}
export { fetchEditDeTai };

// Xóa đề tài
const fetchDeleteDeTai = (headers, MaKLTN, TenDeTai, MaGV) => {
    return axios.post(`khoa-luan-tot-nghiep/XoaDeTaiKhoaLuan/${MaKLTN}`, {
        MaGV: MaGV,
        TenDeTai: TenDeTai
    }, { headers })
}
export { fetchDeleteDeTai };

// Chấp nhận Sv đăng ký
const fetchAcceptSVDangKy = (headers, MaKLTN, TenDeTai, MaGV, MaSV, HoSV, TenSV, Email, SoDienThoai, DTBTL, TinChiTL) => {
    return axios.post(`khoa-luan-tot-nghiep/GVChapNhanSVDangKy/${MaKLTN}`, {
        MaGV: MaGV,
        TenDeTai: TenDeTai,
        MaSV: MaSV,
        HoSV: HoSV,
        TenSV: TenSV,
        Email: Email,
        SoDienThoai: SoDienThoai,
        DTBTL: DTBTL,
        TinChiTL: TinChiTL
    }, { headers })
}
export { fetchAcceptSVDangKy };

// Xóa SV chính thức
const fetchDeleteSVChinhThuc = (headers, MaKLTN, TenDeTai, MaGV, MaSV) => {
    return axios.post(`khoa-luan-tot-nghiep/GVXoaSVDangKyKLChinhThuc/${MaKLTN}`, {
        MaGV: MaGV,
        TenDeTai: TenDeTai,
        MaSV: MaSV
    }, { headers })
}
export { fetchDeleteSVChinhThuc };

// Xóa SV dự kiến
const fetchDeleteSVDuKien = (headers, MaKLTN, TenDeTai, MaGV, MaSV) => {
    return axios.post(`khoa-luan-tot-nghiep/GVXoaSVDangKyKLDuKien/${MaKLTN}`, {
        MaGV: MaGV,
        TenDeTai: TenDeTai,
        MaSV: MaSV
    }, { headers })
}
export { fetchDeleteSVDuKien };

// Thêm đề tài
const fetchAddDeTai = (headers, MaKLTN, TenDeTai, MaGV) => {
    return axios.post(`khoa-luan-tot-nghiep/ThemDeTaiKhoaLuan/${MaKLTN}`, {
        MaGV: MaGV,
        TenDeTai: TenDeTai
    }, { headers })
}
export { fetchAddDeTai };

// DS đề tài theo GV
const fetchDSDeTaiCuaGV = (headers, MaKLTN, MaGV) => {
    return axios.post(`khoa-luan-tot-nghiep/DSDeTaiTheoGiangVien/${MaKLTN}`, {
        MaGV: MaGV
    }, { headers })
}
export { fetchDSDeTaiCuaGV };

// DS đề tài theo GV chưa được đăng ký
const fetchDSDeTaiCuaGVChuaDK = (headers, MaKLTN, MaGV) => {
    return axios.post(`khoa-luan-tot-nghiep/DSDeTaiChuaDangKyTheoGiangVien/${MaKLTN}`, {
        MaGV: MaGV
    }, { headers })
}
export { fetchDSDeTaiCuaGVChuaDK };



// DS đề tài chưa được đăng ký
const fetchDSDeTaiChuaDangKy = (headers, MaKLTN) => {
    // console.log("Mã KLTN: ", MaKLTN)
    // console.log("headers: ", headers)
    return axios.post(`khoa-luan-tot-nghiep/DSDeTaiChuaDangKy/${MaKLTN}`, {
        MaKLTN: MaKLTN
    }, { headers })
}
export { fetchDSDeTaiChuaDangKy };

//SV đăng ký khóa luận
const fetchSinhVienDangKyKhoaLuan = (headers, MaKLTN, TenDeTai, MaGV, MaSV, HoSV, TenSV, Email, SoDienThoai, DTBTL, TinChiTL) => {
    return axios.post(`khoa-luan-tot-nghiep/SVDangKyDeTai/${MaKLTN}`, {
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
    }, { headers })
}
export { fetchSinhVienDangKyKhoaLuan };

// Thông tin đợt đăng ký thực tập
const fetchDetailThucTap = (headers) => {
    return axios.get(`dk-thuc-tap/ChiTietDKTTDangMo`, { headers })
}
export { fetchDetailThucTap };

//SV đăng ký thực tập trong danh sách
const fetchSinhVienDangKyThucTapTrongDS = (headers, MaDKTT, Vitri, EmailCty, MaSV) => {
    return axios.post(`dk-thuc-tap/SVDangKyCtyTrongDS/${MaDKTT}`, {
        ViTri: Vitri,
        EmailCty: EmailCty,
        MaSV: MaSV,
    }, { headers })
}
export { fetchSinhVienDangKyThucTapTrongDS };

//SV đăng ký thực tập ngoài danh sách
const fetchSinhVienDangKyThucTapNgoaiDS = (headers, MaDKTT, Ho, Ten, TenCongTy, Website, SoDienThoai, DiaChi, EmailCty, ViTri, MaSV) => {
    return axios.post(`dk-thuc-tap/SVDangKyCtyNgoaiDS/${MaDKTT}`, {
        Ho: Ho,
        Ten: Ten,
        TenCongTy: TenCongTy,
        Website: Website,
        SoDienThoai: SoDienThoai,
        DiaChi: DiaChi,
        EmailCty: EmailCty,
        ViTri: ViTri,
        MaSV: MaSV,
    }, { headers })
}
export { fetchSinhVienDangKyThucTapNgoaiDS };


//SV hủy đăng ký thực tập
const fetchSinhVienHuyDangKyThucTap = (headers, MaDKTT, MaSV) => {
    return axios.post(`dk-thuc-tap/SVHuyDangKyThucTap/${MaDKTT}`, {
        MaDKTT: MaDKTT,
        MaSV: MaSV,
    }, { headers })
}
export { fetchSinhVienHuyDangKyThucTap };
